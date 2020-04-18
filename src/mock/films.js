import {castFilmDuration, getRandomNumber, getRandomLorem, getRandomArrayItem} from '../util.js';
import {generateComments} from './comments.js';

const MAX_SENTENCES_IN_DESCRIPTION = 5;

const FILMS_ITEMS = [
  {
    title: `Made for each other`,
    poster: `made-for-each-other.png`,
    director: [`David O. Selznick`],
    writers: [`Rose Franken`, `Jo Swerling`, `Frank Ryan`],
    cast: [`Carole Lombard`, `James Stewart`],
    release: new Date(1939, 1, 10),
    duration: `92`,
    country: `United States`,
    genres: [`Comedy`, `Drama`, `Romance`],
  },
  {
    title: `Popeye meets sinbad`,
    poster: `popeye-meets-sinbad.png`,
    director: [`Dave Fleischer`, `Willard Bowsky`],
    writers: [`Max Fleischer`, `Adolph Zukor`],
    cast: [`Jack Mercer`, `Mae Questel`, `Gus Wickie`, `Lou Fleischer`],
    release: new Date(1936, 10, 27),
    duration: `16`,
    country: `United States`,
    genres: [`Animation`, `Short`, `Adventure`],
  },
  {
    title: `Sagebrush trail`,
    poster: `sagebrush-trail.jpg`,
    director: [`Armand Schaefer`],
    writers: [`Lindsley Parsons`, `Lindsley Parsons`],
    cast: [`John Wayne`, `Nancy Shubert`, `Lane Chandler`],
    release: new Date(1933, 11, 15),
    duration: `54`,
    country: `United States`,
    genres: [`Action`, `Drama`, `Romance`],
  },
  {
    title: `Santa Claus conquers the martians`,
    poster: `santa-claus-conquers-the-martians.jpg`,
    director: [`Nicholas Webster`],
    writers: [`Glenville Mareth`, `Paul L. Jacobson`],
    cast: [`John Call`, `Leonard Hicks`, `Vincent Beck`],
    release: new Date(1964, 10, 14),
    duration: `81`,
    country: `United States`,
    genres: [`Adventure`, `Comedy`, `Family`],
  },
  {
    title: `The dance of life`,
    poster: `the-dance-of-life.jpg`,
    director: [`John Cromwell`, `Edward Sutherland`],
    writers: [`Benjamin Glazer`, `Arthur Hopkins`],
    cast: [`Hal Skelly`, `Nancy Carroll`, `Dorothy Revier`],
    release: new Date(1929, 6, 16),
    duration: `115`,
    country: `United States`,
    genres: [`Drama`, `Musical`, `Romance`],
  },
  {
    title: `The great flamarion`,
    poster: `the-great-flamarion.jpg`,
    director: [`Anthony Mann`],
    writers: [`Anne Wigton`, `Heinz Herald`],
    cast: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    release: new Date(1945, 2, 30),
    duration: `78`,
    country: `United States`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
  },
  {
    title: `The man with the golden arm`,
    poster: `the-man-with-the-golden-arm.jpg`,
    director: [`Otto Preminger`],
    writers: [`Walter Newman`, `Lewis Meltzer`],
    cast: [`Frank Sinatra`, `Kim Novak`, `Eleanor Parker`],
    release: new Date(1956, 0, 16),
    duration: `119`,
    country: `United States`,
    genres: [`Crime`, `Drama`, `Film-Noir`],
  },
];

const MPAA_RATINGS = [`G`, `PG`, `PG-13`, `R`, `NC-17`];

const generateFilm = () => {
  const film = getRandomArrayItem(FILMS_ITEMS);

  return {
    title: film.title,
    poster: film.poster,
    rating: getRandomNumber(100) / 10,
    director: film.director,
    writers: film.writers,
    cast: film.cast,
    release: film.release,
    duration: castFilmDuration(film.duration),
    country: film.country,
    genres: film.genres,
    description: getRandomLorem(MAX_SENTENCES_IN_DESCRIPTION),
    mpaaRating: getRandomArrayItem(MPAA_RATINGS),
    comments: generateComments(getRandomNumber(5)),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
