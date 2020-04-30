import {castFilmDuration, getRandomNumber, getRandomInteger, getRandomLorem, getRandomArrayItem, getRandomArrayItems} from '../utils/common.js';
import {generateComments} from './comments.js';

const MAX_SENTENCES_IN_DESCRIPTION = 5;

const FILMS_TITLES = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const FILMS_POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const FILMS_DIRECTORS = [
  `David O. Selznick`,
  `Dave Fleischer`,
  `Willard Bowsky`,
  `Armand Schaefer`,
  `Nicholas Webster`,
  `John Cromwell`,
  `Edward Sutherland`
];

const FILMS_WRITERS = [
  `Rose Franken`,
  `Jo Swerling`,
  `Frank Ryan`,
  `Max Fleischer`,
  `Adolph Zukor`,
  `Glenville Mareth`,
  `Paul L. Jacobson`
];

const FILMS_ACTORS = [
  `Carole Lombard`,
  `James Stewart`,
  `Jack Mercer`,
  `Mae Questel`,
  `Gus Wickie`,
  `Lou Fleischer`,
  `Nancy Carroll`
];

const COUNTRIES_ABBREVIATIONS = [
  `AU`,
  `IN`,
  `JP`,
  `USA`,
  `UK`,
  `USSR`,
];

const FILMS_GENRES = [
  `Adventure`,
  `Animation`,
  `Comedy`,
  `Drama`,
  `Family`,
  `Romance`,
  `Short`,
];

const MPAA_RATINGS = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`
];

const getRandomFilmDate = () => {
  const year = getRandomInteger(1900, 2000);
  const month = getRandomNumber(11);
  let date;

  if (month === 1) {
    date = date = getRandomNumber(28);
  } else {
    date = getRandomNumber(30);
  }

  return new Date(year, month, date);
};

const generateFilm = () => {

  return {
    cast: getRandomArrayItems(FILMS_ACTORS, getRandomNumber(3)),
    comments: generateComments(getRandomNumber(5)),
    country: getRandomArrayItem(COUNTRIES_ABBREVIATIONS),
    description: getRandomLorem(MAX_SENTENCES_IN_DESCRIPTION),
    director: getRandomArrayItems(FILMS_DIRECTORS, 1),
    duration: castFilmDuration(getRandomInteger(20, 240)),
    genres: getRandomArrayItems(FILMS_GENRES, getRandomInteger(2, 3)),
    isFavorite: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
    mpaaRating: getRandomArrayItem(MPAA_RATINGS),
    poster: getRandomArrayItem(FILMS_POSTERS),
    rating: getRandomNumber(100) / 10,
    release: getRandomFilmDate(),
    title: getRandomArrayItem(FILMS_TITLES),
    titleOriginal: getRandomArrayItem(FILMS_TITLES),
    writers: getRandomArrayItems(FILMS_WRITERS, getRandomNumber(3)),

  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
