import {render, remove} from '../utils/render-component.js';
import SortComponent, {SortType} from '../components/sort.js';
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


const renderFilms = (filmsListContainerElement, films) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsListContainerElement);

    filmController.render(film);

    return filmController;
  });
};

const getSortedFilms = (films, sortType) => {
  const showingFilms = films.slice();
  let sortedFilms = [];

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    default:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms;
};


export default class Page {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedFilmsControllers = [];
    this._extraFilmsControllers = [];
    this._showedFilmsCount = SHOWING_FILMS_ON_START_COUNT;

    this._sortComponent = new SortComponent();
    this._showmorebuttonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = getSortedFilms(films, SortType.DEFAULT);

    const renderBasicFilms = (container) => {
      render(container, this._sortComponent);
      render(container, this._filmsListComponent);

      const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

      const filmsToRender = this._films.slice(0, SHOWING_FILMS_ON_START_COUNT);
      const newFilms = renderFilms(filmsListContainerElement, filmsToRender);

      this._showedFilmsControllers = newFilms;
      this._showedFilmsCount = SHOWING_FILMS_ON_START_COUNT;

      this._renderShowMoreButton(this._films);
    };

    const renderExtraFilms = (container, topRatedFilms, mostCommentedFilms) => {
      render(container, this._topRatedFilmsComponent);
      render(container, this._mostCommentedFilmsComponent);

      const topRatedFilmsListElement = this._topRatedFilmsComponent.getElement().querySelector(`#top-rated-films-list`);
      this._extraFilmsControllers.concat(renderFilms(topRatedFilmsListElement, topRatedFilms));

      render(container, this._mostCommentedFilmsComponent);
      const mostCommentedFilmsListElement = this._mostCommentedFilmsComponent.getElement().querySelector(`#most-commented-films-list`);
      this._extraFilmsControllers.concat(renderFilms(mostCommentedFilmsListElement, mostCommentedFilms));
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

  _renderShowMoreButton(films) {
    if (films.length <= this._showedFilmsCount) {
      return;
    }

    const filmsListContainerElement = this._filmsSectionComponent.getElement().querySelector(`.films-list__container`);
    this._showedFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

    render(this._filmsListComponent.getElement(), this._showmorebuttonComponent);

    this._showmorebuttonComponent.setButtonClickHandler(() => {
      const prevFilmsCount = this._showedFilmsCount;
      this._showedFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

      const filmsToRender = films.slice(prevFilmsCount, this._showedFilmsCount);
      this._showedFilmsControllers.concat(renderFilms(filmsListContainerElement, filmsToRender));

      if (this._showedFilmsCount >= films.length) {
        remove(this._showmorebuttonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._films = getSortedFilms(this._films, sortType);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;
    remove(this._showmorebuttonComponent);

    const filmsToRender = this._films.slice(0, SHOWING_FILMS_ON_START_COUNT);
    this._showedFilmsControllers = renderFilms(filmsListContainerElement, filmsToRender);

    this._showedFilmsCount = SHOWING_FILMS_ON_START_COUNT;
    this._renderShowMoreButton(this._films);
  }
}
