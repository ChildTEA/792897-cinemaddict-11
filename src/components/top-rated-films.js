import AbstractComponent from './abstract-component.js';

const createTopRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container" id="top-rated-films-list"></div>
    </section>`
  );
};


export default class TopRatedFilms extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createTopRatedFilmsTemplate(this._film);
  }
}
