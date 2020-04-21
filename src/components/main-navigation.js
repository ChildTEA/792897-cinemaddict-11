const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createMainNavigationTemplate = (filters) => {
  const nagigationItemsMarkup = filters.map((it, i) => createNavigationFilterItem(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${nagigationItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    `
  );
};

const createNavigationFilterItem = (filter, isActive) => {
  return (
    `<a href="#${filter.name}" class="main-navigation__item${isActive ?
      ` main-navigation__item--active` : ``}">
      ${filter.name === `all` ? `All movies` : `${capitalizeFirstLetter(filter.name)} <span class="main-navigation__item-count">${filter.count}</span>`}
      </a>`
  );
};

export {createMainNavigationTemplate};
