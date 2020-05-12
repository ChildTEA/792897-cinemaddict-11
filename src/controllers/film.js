import {render, replace} from '../utils/render-component.js';
import AbstractComponent from '../components/abstract-component.js';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class FilmController extends AbstractComponent {
  constructor(container, onDataChange, onViewChange) {
    super();

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._isDetailsOpened = false;
    this._mode = Mode.DEFAULT;

    this._siteBodyElement = document.querySelector(`body`);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onMoverCardClick = this._onMoverCardClick.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setCardClickHandler(this._onMoverCardClick);

    this._filmCardComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmCardComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmCardComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmDetailsComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmDetailsComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this.closeFilmDetails();
    }
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.closeFilmDetails();
    }
  }

  _onMoverCardClick() {
    this._onViewChange();
    this._mode = Mode.POPUP;
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
      this._mode = Mode.DEFAULT;
    }
  }
}
