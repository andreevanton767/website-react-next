'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
exports.__esModule = true;
/**
 * Creates 3d depth simulating shadows
 *
 * @param param0 object with depth in px, outerColor -> outline or full shadow if inner not provided,
 * innerColor -> inner shadow for transparent effect
 * skew -> if provided skews shadow
 *
 * @returns css shadows for box shadow property
 */
var addDepth = function (_a) {
  var depth = _a.depth,
    colorOuter = _a.colorOuter,
    colorInner = _a.colorInner,
    _b = _a.skew,
    skew = _b === void 0 ? 0 : _b;
  var inner = [];
  var outer = [];
  for (var i = 1 - skew; i <= depth; i++) {
    if (colorInner) {
      inner.push('-' + (i + skew) + 'px ' + i + 'px 0 -1px ' + colorInner);
    }
    outer.push('-' + (i + skew) + 'px ' + i + 'px ' + colorOuter);
  }
  return __spreadArrays(inner, outer).join(', ').concat(';');
};
/**
 *  Creates depths classes with given depth, and colors
 *  single color -> adds depth
 *  both colors -> creates depth with color1 outline and color2 fill
 */
var createDepths = function (depthTuple, color1, color2, skew) {
  if (skew === void 0) {
    skew = 0;
  }
  var depthKey = depthTuple[0],
    depth = depthTuple[1];
  var colorOuterKey = color1[0],
    colorOuter = color1[1];
  var _a = color2 || [null],
    colorInnerKey = _a[0],
    colorInner = _a[1];
  var componentStyles = {
    position: 'relative',
    boxSizing: 'border-box',
  };
  var depthClasses = {};
  if (!color2) {
    depthClasses['.depth-' + depthKey + '-' + colorOuterKey] = __assign(
      __assign({}, componentStyles),
      {
        boxShadow: addDepth({ depth: depth, colorOuter: colorOuter }),
      }
    );
  } else {
    depthClasses[
      '.depth-' + depthKey + '-' + colorOuterKey + '-' + colorInnerKey
    ] = __assign(__assign({}, componentStyles), {
      border: '1px solid ' + colorOuter,
      boxShadow: addDepth({
        depth: depth,
        colorOuter: colorOuter,
        colorInner: colorInner,
      }),
    });
  }
  // adds CSS with class for element nested under '.skew' class
  if (skew) {
    depthClasses['under_skew'] = {
      boxShadow: addDepth({
        depth: depth,
        colorOuter: colorOuter,
        colorInner: colorInner || undefined,
        skew: skew,
      }),
    };
  }
  return depthClasses;
};
exports['default'] = createDepths;
