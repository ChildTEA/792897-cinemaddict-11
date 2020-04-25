import {createElement} from '../util.js';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createNavigationFilterItem = (filter, isActive) => {
  return (
    `<a href="#${filter.name}" class="main-navigation__item${isActive ?
      ` main-navigation__item--active` : ``}">
      ${filter.name === `all` ? `All movies` : `${capitalizeFirstLetter(filter.name)} <span class="main-navigation__item-count">${filter.count}</span>`}
      </a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const navigationItemsMarkup = filters.map((it, i) => createNavigationFilterItem(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${navigationItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    `
  );
};


export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
