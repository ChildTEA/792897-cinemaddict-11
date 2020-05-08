import AbstractSmartComponent from '../components/abstract-smart-component.js';

export const SortType = {
  DATE: `date-down`,
  RATING: `rating-down`,
  DEFAULT: `default`,
};

const createSortTemplate = (currentSortType) => {

  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button${currentSortType === SortType.DEFAULT ? ` sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button${currentSortType === SortType.DATE ? ` sort__button--active` : ``}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button${currentSortType === SortType.RATING ? ` sort__button--active` : ``}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      this._sortTypeChangeHandler = handler;

      handler(this._currentSortType);
      this.rerender();
    });
  }
}
