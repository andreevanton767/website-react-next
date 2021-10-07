import createCards from './createCards';
import { TailwindComponents } from './types';
import addOpacity from '../utils/addOpacity';
import addHoverClasses from '../utils/addHoverClasses';

// a mock function which logs components to console
const addUtilities = (components: TailwindComponents) => {
  console.log(JSON.stringify(components, null, 2));
};

const theme = (query: string): any =>
  query == 'cards.variants' ? variants : undefined;

const variants = {
  white: {
    base: '#FFFFFF',
    shadow: '#D5DFE9',
  },
  gray: {
    base: '#D5DFE9',
    shadow: '#FFFFFF',
  },
  blue: {
    base: '#305EED',
    shadow: '#143DB0',
  },
  green: {
    base: '#53D084',
    shadow: '#25A055',
  },
  orange: {
    base: '#F2A143',
    shadow: '#CB7F27',
  },
  fake: {
    base: 'base',
    shadow: '',
  },
};

//createCards({ addUtilities, theme });

// console.log(addOpacity(variants.gray.base, 0.5));
const classes = {
  '.card .icon': {
    backgroundColor: 'blue',
    opacity: 0.1,
  },
  '.card-blue .icon': {
    backgroundColor: 'green',
    opacity: 0.5,
  },
  '.card-blue-transparent .icon': {
    backgroundColor: 'green',
    opacity: 0.5,
  },
  '.card-blue': {
    backgroundColor: 'green',
    opacity: 0.5,
  },
};
const e = (str: string) => str;

console.log(JSON.stringify(addHoverClasses(classes, e), null, 2));
