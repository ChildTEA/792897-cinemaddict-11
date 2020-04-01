'use strict';

const siteHeaderElement = document.querySelector(`body .header`);
const siteMainElement = document.querySelector(`body .main`);


const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createHeaderProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

renderComponent(siteHeaderElement, createHeaderProfileTemplate());
