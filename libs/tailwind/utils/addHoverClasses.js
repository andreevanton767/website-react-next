'use strict';
exports.__esModule = true;
var addHoverClassName = function (className, e) {
  return className
    .replace(/card-[a-z\-]+\s?/, function (inner) {
      return e('hover:' + inner.trim()) + ':hover ';
    })
    .trim();
};
exports['default'] = function (obj, e) {
  var safeObject = {};
  Object.keys(obj).forEach(function (className) {
    safeObject[className] = obj[className];
    safeObject[addHoverClassName(className, e)] = safeObject[className];
  });
  return safeObject;
};
