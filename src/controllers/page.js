import {render, remove} from '../utils/render-component.js';
import SortComponent from '../components/sort.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmController from './film.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsSectionComponent from '../components/films-section.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import TopRatedFilmsComponent from '../components/top-rated-films.js';


const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;


const renderFilms = (filmsListContainerElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsListContainerElement, onDataChange, onViewChange);

    filmController.render(film);

    return filmController;
  });
};


export default class Page {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._showedFilmsControllers = [];
    this._extraFilmsControllers = [];
    this._showedFilmsCount = 0;

    this._sortComponent = new SortComponent();
    this._showmorebuttonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    const renderBasicFilms = (container) => {
      render(container, this._sortComponent);
      render(container, this._filmsListComponent);

      const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

      const filmsToRender = films.slice(0, SHOWING_FILMS_ON_START_COUNT);
      this._showedFilmsControllers = renderFilms(filmsListContainerElement, filmsToRender, this._onDataChange, this._onViewChange);

      this._showedFilmsCount = filmsToRender.length >= SHOWING_FILMS_ON_START_COUNT ?
        SHOWING_FILMS_ON_START_COUNT : filmsToRender.length;

      this._renderShowMoreButton();
    };

    const renderExtraFilms = (container, topRatedFilms, mostCommentedFilms) => {
      render(container, this._topRatedFilmsComponent);
      render(container, this._mostCommentedFilmsComponent);

      const topRatedFilmsListElement = this._topRatedFilmsComponent.getElement().querySelector(`#top-rated-films-list`);

      this._extraFilmsControllers = this._extraFilmsControllers.concat(renderFilms(topRatedFilmsListElement, topRatedFilms, this._onDataChange, this._onViewChange));

      render(container, this._mostCommentedFilmsComponent);
      const mostCommentedFilmsListElement = this._mostCommentedFilmsComponent.getElement().querySelector(`#most-commented-films-list`);

      this._extraFilmsControllers = this._extraFilmsControllers.concat(renderFilms(mostCommentedFilmsListElement, mostCommentedFilms, this._onDataChange, this._onViewChange));
    };

    render(this._container, this._filmsSectionComponent);
    if (films.length === 0) {
      render(this._filmsSectionComponent.getElement(), this._noFilmsElement);
      return;
    }

    const topRatedFilms = films.slice()
      .sort((a, b) => {
        return b.rating - a.rating;
      })
      .slice(0, TOP_RATED_FILMS_COUNT);

    const mostCommentedFilms = films.slice()
      .sort((a, b) => {
        return b.comments.length - a.comments.length;
      })
      .slice(0, MOST_COMMENTED_FILMS_COUNT);


    renderBasicFilms(this._filmsSectionComponent.getElement());
    renderExtraFilms(this._filmsSectionComponent.getElement(), topRatedFilms, mostCommentedFilms);
  }

  _onFilterChange() {
    this._removeBasicFilms();
    this._updateFilms(SHOWING_FILMS_ON_START_COUNT);
  }

  _renderShowMoreButton() {
    if (this._showmorebuttonComponent.isElement()) {
      remove(this._showmorebuttonComponent);
    }

    if (this._filmsModel.getFilms().length <= this._showedFilmsCount) {
      return;
    }

    const filmsListContainerElement = this._filmsSectionComponent.getElement().querySelector(`.films-list__container`);

    render(this._filmsListComponent.getElement(), this._showmorebuttonComponent);

    this._showmorebuttonComponent.setButtonClickHandler(() => {
      const prevFilmsCount = this._showedFilmsCount;
      this._showedFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

      const filmsToRender = this._filmsModel.getFilms().slice(prevFilmsCount, this._showedFilmsCount);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(renderFilms(filmsListContainerElement, filmsToRender, this._onDataChange, this._onViewChange));

      if (this._showedFilmsCount >= this._filmsModel.getFilms().length) {
        remove(this._showmorebuttonComponent);
      }
    });
  }

  _updateFilms(count) {
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const films = this._filmsModel.getFilms();
    const actualCount = count <= films.length ? count : films.length;
    const filmsToRender = films.slice(0, actualCount);

    this._showedFilmsControllers = renderFilms(filmsListContainerElement, filmsToRender, this._onDataChange, this._onViewChange);
    this._showedFilmsCount = actualCount;

    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
    this._extraFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const films = this._filmsModel.getFilms(sortType);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;

    const filmsToRender = films.slice(0, SHOWING_FILMS_ON_START_COUNT);
    this._showedFilmsControllers = renderFilms(filmsListContainerElement, filmsToRender, this._onDataChange, this._onViewChange);

    this._showedFilmsCount = SHOWING_FILMS_ON_START_COUNT;
    this._renderShowMoreButton();
  }

  _removeBasicFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }
}
