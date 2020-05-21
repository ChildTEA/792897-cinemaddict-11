import {generateFilms} from './mock/films.js';
import FilmsModel from './models/films.js';

import {render} from './utils/render-component.js';
import HeaderProfileComponent from './components/header-profile.js';
import FilterController from './controllers/filter.js';
import PageController from './controllers/page.js';

const FILMS_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);
const filmsModel = new FilmsModel();

filmsModel.setFilms(films);

const pageController = new PageController(siteMainElement, filmsModel);
const headerProfileComponent = new HeaderProfileComponent();
const filterController = new FilterController(siteMainElement, filmsModel);


render(siteHeaderElement, headerProfileComponent);
filterController.render();
pageController.render();
