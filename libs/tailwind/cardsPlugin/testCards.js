'use strict';
exports.__esModule = true;
var addHoverClasses_1 = require('../utils/addHoverClasses');
// a mock function which logs components to console
var addUtilities = function (components) {
  console.log(JSON.stringify(components, null, 2));
};
var theme = function (query) {
  return query == 'cards.variants' ? variants : undefined;
};
var variants = {
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
var classes = {
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
var e = function (str) {
  return str;
};
console.log(JSON.stringify(addHoverClasses_1['default'](classes, e), null, 2));
