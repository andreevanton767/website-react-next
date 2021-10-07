'use strict';
exports.__esModule = true;
exports['default'] = function (hex, opacity) {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .map(function (strNum, index) {
      return index == 0 ? 'rgba(' : parseInt(strNum, 16).toString();
    })
    .reduce(function (prev, curr, index) {
      return index == 0
        ? 'rgba('
        : index < 3
        ? prev + (curr + ', ')
        : prev + (curr + ', ' + opacity + ')');
    });
};
