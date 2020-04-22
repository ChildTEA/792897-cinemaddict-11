import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';

import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsPopupTemplate} from './components/film-details-popup.js';
import {createFilmsListContainerTemplate} from './components/films-list.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createHeaderProfileTemplate} from './components/header-profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createMostCommentedFilmsTemplate} from './components/most-commented-films.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createTopRatedFilmsTemplate} from './components/top-rated-films.js';

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

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Site header
renderComponent(siteHeaderElement, createHeaderProfileTemplate());


// Main navigation
const filters = generateFilters(films);
renderComponent(siteMainElement, createMainNavigationTemplate(filters));


// Films catalog

// Basic films
renderComponent(siteMainElement, createFilmsSectionTemplate());

const filmsElement = siteMainElement.querySelector(`section.films`);

renderComponent(filmsElement, createFilmsListContainerTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

films.slice(0, SHOWING_FILMS_ON_START_COUNT).forEach((it) => {
  renderComponent(filmsListContainerElement, createFilmCardTemplate(it));
});

renderComponent(filmsListElement, createShowMoreButtonTemplate());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

let showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
let prevFilmsCount = SHOWING_FILMS_ON_START_COUNT < FILMS_COUNT ? SHOWING_FILMS_ON_START_COUNT : FILMS_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  showingFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderComponent(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

  prevFilmsCount += SHOWING_FILMS_BY_BUTTON_COUNT;

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});


//  Top rated films
renderComponent(filmsElement, createTopRatedFilmsTemplate());

const topRatedFilmsListElement = filmsElement.querySelector(`#top-rated-films-list`);

topRatedFilms.forEach((it) => {
  renderComponent(topRatedFilmsListElement, createFilmCardTemplate(it));
});

renderComponent(filmsElement, createMostCommentedFilmsTemplate());

const mostCommentedFilmsListElement = filmsElement.querySelector(`#most-commented-films-list`);

mostCommentedFilms.forEach((it) => {
  renderComponent(mostCommentedFilmsListElement, createFilmCardTemplate(it));
});


// Popup
renderComponent(siteBodyElement, createFilmDetailsPopupTemplate(films[0]));
