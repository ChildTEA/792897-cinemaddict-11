import {render, remove} from '../utils/render-component.js';
import SortComponent, {SortType} from '../components/sort.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsSectionComponent from '../components/films-section.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import TopRatedFilmsComponent from '../components/top-rated-films.js';


const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;


const renderFilm = (container, film) => {
  const siteBodyElement = document.querySelector(`body`);

  const onEscKeyDown = (evt) => {
    evt.preventDefault();

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const onFilmCardClick = () => {
    render(siteBodyElement, filmDetailsComponent);

    filmDetailsComponent.setCloseButtonClickHandler(() => {
      filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.setCardClickHandler(onFilmCardClick);

  render(container, filmCardComponent);
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

    this._sortComponent = new SortComponent();
    this._showmorebuttonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();
  }

  render(films) {
    let sortedFilms = getSortedFilms(films, SortType.DEFAULT);

    const renderBasicFilms = (container) => {
      const renderShowMoreButton = () => {
        if (films.length <= showingFilmsCount) {
          return;
        }

        render(this._filmsListComponent.getElement(), this._showmorebuttonComponent);

        this._showmorebuttonComponent.setButtonClickHandler(() => {
          showingFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

          sortedFilms.slice(prevFilmsCount, showingFilmsCount).
            forEach((film) => renderFilm(filmsListContainerElement, film));

          prevFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

          if (showingFilmsCount >= films.length) {
            remove(this._showmorebuttonComponent);
          }
        });
      };


      render(container, this._sortComponent);
      render(container, this._filmsListComponent);

      const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        sortedFilms = getSortedFilms(films, sortType);

        filmsListContainerElement.innerHTML = ``;
        remove(this._showmorebuttonComponent);

        sortedFilms.slice(0, SHOWING_FILMS_ON_START_COUNT).forEach((it) => {
          renderFilm(filmsListContainerElement, it);
        });

        showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
        prevFilmsCount = SHOWING_FILMS_ON_START_COUNT;
        renderShowMoreButton();
      });


      sortedFilms.slice(0, SHOWING_FILMS_ON_START_COUNT).forEach((it) => {
        renderFilm(filmsListContainerElement, it);
      });

      let showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
      let prevFilmsCount = SHOWING_FILMS_ON_START_COUNT < films.length ? SHOWING_FILMS_ON_START_COUNT : films.length;

      renderShowMoreButton();
    };


    const renderExtraFilms = (container, topRatedFilms, mostCommentedFilms) => {
      render(container, this._topRatedFilmsComponent);
      render(container, this._mostCommentedFilmsComponent);

      const topRatedFilmsListElement = this._topRatedFilmsComponent.getElement().querySelector(`#top-rated-films-list`);
      topRatedFilms.forEach((it) => renderFilm(topRatedFilmsListElement, it));

      render(container, this._mostCommentedFilmsComponent);
      const mostCommentedFilmsListElement = this._mostCommentedFilmsComponent.getElement().querySelector(`#most-commented-films-list`);
      mostCommentedFilms.forEach((it) => renderFilm(mostCommentedFilmsListElement, it));
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
}
