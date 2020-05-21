import {SortType} from '../const.js';
import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from "../const.js";

export default class Films {
  constructor() {
    this._films = [];
    this._sortedFilms = [];
    this._activeFilterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms(sortType = this._sortType) {
    this._sortedFilms = [];
    this._sortType = sortType;
    const clonedFilms = this._films.slice();

    switch (sortType) {
      case SortType.DATE:
        this._sortedFilms = clonedFilms.sort((a, b) => b.release - a.release);
        break;
      case SortType.RATING:
        this._sortedFilms = clonedFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        this._sortedFilms = clonedFilms;
        break;
      default:
        this._sortedFilms = clonedFilms;
        break;
    }

    return getFilmsByFilter(this._sortedFilms, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  resetSortType() {
    if (this._sortType !== SortType.DEFAUL) {
      this._sortType = SortType.DEFAULT;
    }
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [...this._films.slice(0, index), film, ...this._films.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
