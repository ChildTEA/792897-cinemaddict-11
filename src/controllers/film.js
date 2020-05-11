import {render} from '../utils/render-component.js';
import AbstractComponent from '../components/abstract-component.js';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';

export default class FilmController extends AbstractComponent {
  constructor(container) {
    super();

    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._isDetailsOpened = false;

    this._siteBodyElement = document.querySelector(`body`);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onMoverCardClick = this._onMoverCardClick.bind(this);
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setCardClickHandler(this._onMoverCardClick);

    render(this._container, this._filmCardComponent);
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.closeFilmDetails();
    }
  }

  _onMoverCardClick() {
    render(this._siteBodyElement, this._filmDetailsComponent);
    this._isDetailsOpened = true;

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  closeFilmDetails() {
    if (this._isDetailsOpened) {
      this._filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
