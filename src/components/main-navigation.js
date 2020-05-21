import AbstractSmartComponent from '../components/abstract-smart-component.js';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createNavigationFilterItem = (filter, activeFilterName) => {
  const isActive = filter.name === activeFilterName;
  return (
    `<a href="#${filter.name}" class="main-navigation__item${isActive ?
      ` main-navigation__item--active` : ``}">
      ${filter.name === `all` ? `All movies` : `${capitalizeFirstLetter(filter.name)} <span class="main-navigation__item-count">${filter.count}</span>`}
      </a>`
  );
};

const createMainNavigationTemplate = (filters, activeFilterName) => {
  const navigationItemsMarkup = filters.map((it) => createNavigationFilterItem(it, activeFilterName)).join(`\n`);

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

const getFilterName = (link) => {
  const index = link.indexOf(`#`);

  if (index === -1) {
    return false;
  }
  const filterName = link.slice(index + 1);
  return filterName;
};


export default class MainNavigation extends AbstractSmartComponent {
  constructor(filters, activeFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = activeFilterType;
    this._filterTypeChangeHandler = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterTypeChangeHandler);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName === `A`) {
          const filterName = getFilterName(evt.target.href);

          if (!filterName) {
            return;
          }
          this._currentFilter = filterName;
          this._filterTypeChangeHandler = handler;
          this.rerender();
          handler(filterName);
        }
      });
  }
}
