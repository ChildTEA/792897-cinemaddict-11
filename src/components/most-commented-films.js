import AbstractComponent from './abstract-component.js';

const createMostCommentedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container" id="most-commented-films-list"></div>
    </section>`
  );
};


export default class MostCommentedFilms extends AbstractComponent {
  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}
