import {lorem} from '../const.js';


const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const castFilmDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours ? `${hours}h ` : ``}${minutes ? `${minutes}m` : ``}`;
};

const getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

const getRandomInteger = function (min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);

  return Math.floor(randomNumber);
};

const shuffleArray = function (array) {
  const clonedItems = array.concat();

  for (let i = clonedItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedItems[i], clonedItems[j]] = [clonedItems[j], clonedItems[i]];
  }

  return clonedItems;
};

const getRandomArrayItems = (arr, count) => {
  return shuffleArray(arr).slice(0, count);
};

const getRandomArrayItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomLorem = (limit) => {
  const sentences = lorem.split(`.`)
    .filter((it) => Boolean(it))
    .map((it) => it.trim());

  const result = shuffleArray(sentences)
    .filter((it) => Boolean(it))
    .slice(0, getRandomInteger(1, limit ? limit : sentences.length))
    .join(`. `);

  return result + `.`;
};


export {castTimeFormat, castFilmDuration, getRandomNumber, getRandomInteger, getRandomArrayItem, getRandomArrayItems, getRandomLorem};
