import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';

import {render} from './utils/render-component.js';
import HeaderProfileComponent from './components/header-profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import FilmsCatalog from './controllers/films-catalog.js';

const FILMS_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);
const filters = generateFilters(films);

const filmsCatalogController = new FilmsCatalog(siteMainElement);
const headerProfileComponent = new HeaderProfileComponent();
const mainNavigationComponent = new MainNavigationComponent(filters);


render(siteHeaderElement, headerProfileComponent);
render(siteMainElement, mainNavigationComponent);
filmsCatalogController.render(films);
