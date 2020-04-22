const filterNames = [`all`, `watchlist`, `history`, `favorites`];

const getFilterCount = (filter, films) => {
  switch (filter) {
    case `all`:
      return films.length;
    case `watchlist`:
      return films.filter((it) => it.isWatchlist).length;
    case `history`:
      return films.filter((it) => it.isHistory).length;
    case `favorites`:
      return films.filter((it) => it.isFavorite).length;
    default:
      return 0;
  }
};

const generateFilters = (films) => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: getFilterCount(it, films),
    };
  });
};


export {generateFilters};
