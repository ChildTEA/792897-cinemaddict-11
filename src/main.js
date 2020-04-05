import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsPopupTemplate} from './components/film-details-popup.js';
import {createFilmsListContainerTemplate} from './components/films-list.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createHeaderProfileTemplate} from './components/header-profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createMostCommentedFilmsTemplate} from './components/most-commented-films.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createTopRatedFilmsTemplate} from './components/top-rated-films.js';

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderComponentNTimes = (container, template, count = 1, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};


// Site header
renderComponent(siteHeaderElement, createHeaderProfileTemplate());


// Main navigation
renderComponent(siteMainElement, createMainNavigationTemplate());


// Films catalog

// Basic films
renderComponent(siteMainElement, createFilmsSectionTemplate());

const filmsElement = siteMainElement.querySelector(`section.films`);

renderComponent(filmsElement, createFilmsListContainerTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

renderComponentNTimes(filmsListContainerElement, createFilmCardTemplate(), FILMS_COUNT);
renderComponent(filmsListElement, createShowMoreButtonTemplate());


//  Top rated films
renderComponent(filmsElement, createTopRatedFilmsTemplate());

const topRatedFilmsListElement = filmsElement.querySelector(`#top-rated-films-list`);

renderComponentNTimes(topRatedFilmsListElement, createFilmCardTemplate(), TOP_RATED_FILMS_COUNT);


//  Most commented films
renderComponent(filmsElement, createMostCommentedFilmsTemplate());

const mostCommentedFilmsListElement = filmsElement.querySelector(`#most-commented-films-list`);

renderComponentNTimes(mostCommentedFilmsListElement, createFilmCardTemplate(), MOST_COMMENTED_FILMS_COUNT);

// Popup
renderComponent(siteBodyElement, createFilmDetailsPopupTemplate());
