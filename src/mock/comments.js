import {getRandomArrayItem, getRandomInteger, getRandomLorem} from '../utils/common.js';

const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Matas Galvan`,
  `Ameer Sutton`,
  `Jim Cruz`,
  `Rimsha Dunlop`,
  `Annaliese Gallegos`,
  `Stefania Vasquez`,
  `Evan Ramsey`,
  `Priya Burks`
];

const EMOJI_IMGS = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const getRandomDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() - getRandomInteger(0, 2);
  const date = getRandomInteger(0, currentDate.getDate());
  let hours = getRandomInteger(0, 23);
  let minutes = getRandomInteger(0, 59);

  if (currentDate === new Date(year, month, date)) {
    hours = getRandomInteger(0, currentDate.getHours());
    minutes = getRandomInteger(0, currentDate.getMinutes());
  }

  return new Date(year, month, date, hours, minutes);
};

const generateComment = () => {
  return {
    author: getRandomArrayItem(AUTHORS),
    date: getRandomDate(),
    emoji: getRandomArrayItem(EMOJI_IMGS),
    text: getRandomLorem(1),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


export {generateComments};
