import AbstractSmartComponent from './abstract-smart-component.js';

const createFilmCardTemplate = (film) => {
  const clonedFilm = Object.assign({}, film);
  const {title, rating, release, duration, genres, comments, poster, description, isWatchlist, isHistory, isFavorite} = clonedFilm;
  const posterPath = `./images/posters/`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.getFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${posterPath}${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ?
      `${description.slice(0, 139)}...` : description}</p>
      <a class="film-card__comments">${comments.length} comment${comments.length > 1 ? `s` : ``}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isHistory ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._cardClickHandler = null;
    this._watchlistClickHandler = null;
    this._watchedClickHandler = null;
    this._favoriteClickHandler = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setCardClickHandler(handler) {
    const filmPoster = this.getElement()
      .querySelector(`.film-card__poster`);
    const filmTitle = this.getElement()
      .querySelector(`.film-card__title`);
    const filmCommentsLink = this.getElement()
      .querySelector(`.film-card__comments`);

    filmPoster.addEventListener(`click`, handler);
    filmTitle.addEventListener(`click`, handler);
    filmCommentsLink.addEventListener(`click`, handler);

    this._cardClickHandler = handler;
  }

  setWatchlistClickHandler(handler) {
    const button = this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`);

    button.addEventListener(`click`, handler);

    this._watchlistClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    const button = this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`);

    button.addEventListener(`click`, handler);

    this._watchedClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    const button = this.getElement()
      .querySelector(`.film-card__controls-item--favorite`);

    button.addEventListener(`click`, handler);

    this._favoriteClickHandler = handler;
  }
}
