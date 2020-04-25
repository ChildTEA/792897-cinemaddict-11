import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';

import {positionToRenderPosition, renderComponent} from './util.js';
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

const films = generateFilms(FILMS_COUNT);

const topRatedFilms = films
  .sort((a, b) => {
    return b.rating - a.rating;
  })
  .slice(0, TOP_RATED_FILMS_COUNT);

const mostCommentedFilms = films
  .sort((a, b) => {
    return b.comments.length - a.comments.length;
  })
  .slice(0, MOST_COMMENTED_FILMS_COUNT);

// Site header
renderComponent(siteHeaderElement, new HeaderProfileComponent().getElement());


// Main navigation
const filters = generateFilters(films);
renderComponent(siteMainElement, new MainNavigationComponent(filters).getElement());


// Films catalog

// Basic films
renderComponent(siteMainElement, new FilmsSectionComponent().getElement());

const filmsElement = siteMainElement.querySelector(`section.films`);

renderComponent(filmsElement, new FilmsListComponent().getElement());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

films.slice(0, SHOWING_FILMS_ON_START_COUNT).forEach((it) => {
  renderComponent(filmsListContainerElement, new FilmCardComponent(it).getElement());
});

renderComponent(filmsListElement, new ShowMoreButtonComponent().getElement());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

let showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
let prevFilmsCount = SHOWING_FILMS_ON_START_COUNT < FILMS_COUNT ? SHOWING_FILMS_ON_START_COUNT : FILMS_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  showingFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderComponent(filmsListContainerElement, new FilmCardComponent(film).getElement(), positionToRenderPosition.BEFOREEND));

  prevFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});


//  Top rated films
renderComponent(filmsElement, new TopRatedFilmsComponent().getElement());

const topRatedFilmsListElement = filmsElement.querySelector(`#top-rated-films-list`);

topRatedFilms.forEach((it) => {
  renderComponent(topRatedFilmsListElement, new FilmCardComponent(it).getElement());
});

renderComponent(filmsElement, new MostCommentedFilmsComponent().getElement());

const mostCommentedFilmsListElement = filmsElement.querySelector(`#most-commented-films-list`);

mostCommentedFilms.forEach((it) => {
  renderComponent(mostCommentedFilmsListElement, new FilmCardComponent(it).getElement());
});


// Popup
renderComponent(siteBodyElement, new FilmDetailsComponent(films[0]).getElement());
