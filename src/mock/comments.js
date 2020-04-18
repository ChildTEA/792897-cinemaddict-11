import {getRandomArrayItem, getRandomInteger, getRandomLorem} from '../util.js';

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

const EMOHI_IMGS = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(0, 8);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const generateComment = () => {
  return {
    author: getRandomArrayItem(AUTHORS),
    date: getRandomDate(),
    emoji: getRandomArrayItem(EMOHI_IMGS),
    text: getRandomLorem(1),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


export {generateComments};
