import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';

import {renderComponent} from './util.js';
import NoFilmsComponent from './components/no-films.js';
import FilmCardComponent from './components/film-card.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsListComponent from './components/films-list.js';
import FilmsSectionComponent from './components/films-section.js';
import HeaderProfileComponent from './components/header-profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import MostCommentedFilmsComponent from './components/most-commented-films.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import TopRatedFilmsComponent from './components/top-rated-films.js';

const FILMS_COUNT = 20;
const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const renderFilm = (container, film) => {
  const onEscKeyDown = (evt) => {
    evt.preventDefault();

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const popupCloseButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  const onFilmCardClick = () => {
    renderComponent(siteBodyElement, filmDetailsComponent.getElement());

    popupCloseButton.addEventListener(`click`, () => {
      filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCommentsLink = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  filmPoster.addEventListener(`click`, onFilmCardClick);
  filmTitle.addEventListener(`click`, onFilmCardClick);
  filmCommentsLink.addEventListener(`click`, onFilmCardClick);

  renderComponent(container, filmCardComponent.getElement());
};

const renderBasicFilms = (container, films) => {
  const filmsListElement = new FilmsListComponent();
  renderComponent(container, filmsListElement.getElement());

  const filmsListContainerElement = filmsListElement.getElement().querySelector(`.films-list__container`);

  films.slice(0, SHOWING_FILMS_ON_START_COUNT).forEach((it) => {
    renderFilm(filmsListContainerElement, it);
  });

  renderComponent(filmsListElement.getElement(), new ShowMoreButtonComponent().getElement());

  const loadMoreButton = filmsListElement.getElement().querySelector(`.films-list__show-more`);

  let showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
  let prevFilmsCount = SHOWING_FILMS_ON_START_COUNT < FILMS_COUNT ? SHOWING_FILMS_ON_START_COUNT : FILMS_COUNT;

  loadMoreButton.addEventListener(`click`, () => {
    showingFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

    films.slice(prevFilmsCount, showingFilmsCount).
      forEach((film) => renderFilm(filmsListContainerElement, film));

    prevFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

    if (showingFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
};

const renderExtraFilms = (container, topRatedFilms, mostCommentedFilms) => {
  renderComponent(container, new TopRatedFilmsComponent().getElement());
  const topRatedFilmsListElement = container.querySelector(`#top-rated-films-list`);
  topRatedFilms.forEach((it) => renderFilm(topRatedFilmsListElement, it));

  renderComponent(container, new MostCommentedFilmsComponent().getElement());
  const mostCommentedFilmsListElement = container.querySelector(`#most-commented-films-list`);
  mostCommentedFilms.forEach((it) => renderFilm(mostCommentedFilmsListElement, it));
};

const renderFilmsCatalog = (films) => {
  renderComponent(siteMainElement, new FilmsSectionComponent().getElement());
  const filmsElement = siteMainElement.querySelector(`section.films`);

  if (films.length === 0) {
    const noFilmsElement = new NoFilmsComponent();
    renderComponent(filmsElement, noFilmsElement.getElement());
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

  renderBasicFilms(filmsElement, films);
  renderExtraFilms(filmsElement, topRatedFilms, mostCommentedFilms);
};

const films = generateFilms(FILMS_COUNT);


// Site header
renderComponent(siteHeaderElement, new HeaderProfileComponent().getElement());


// Main navigation
const filters = generateFilters(films);
renderComponent(siteMainElement, new MainNavigationComponent(filters).getElement());

renderFilmsCatalog(films);

