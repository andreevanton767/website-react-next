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
var _a, _b, _c;
exports.__esModule = true;
// base classes for nested components
var placeholderClasses =
  ((_a = {}),
  (_a['.placeholder'] = {
    position: 'absolute',
    left: '20px',
    border: 'none',
    borderRadius: '2px',
    height: '15px',
  }),
  (_a['.placeholder-title'] = {
    right: '22px',
    bottom: '58px',
  }),
  (_a['.placeholder-subtitle'] = {
    right: '52px',
    bottom: '35px',
  }),
  _a);
var iconClasses =
  ((_b = {}),
  (_b['.icon'] = {
    height: '60px',
    width: '60px',
    margin: '0 auto 19px auto',
  }),
  (_b['.icon svg'] = {
    height: '100%',
    width: '100%',
  }),
  _b);
var textClasses =
  ((_c = {}),
  (_c['.text'] = {
    marginTop: '4px',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '20px',
  }),
  (_c['.title'] = {
    fontWeight: 700,
  }),
  (_c['.subtitle'] = {
    fontWeight: 600,
  }),
  _c);
// variants with respet to color
var placeholder = {
  white: {
    backgroundColor: '#305EED',
    opacity: 0.1,
  },
  gray: {
    backgroundColor: '#305EED',
    opacity: 0.1,
  },
  blue: {
    backgroundColor: '#062233',
    opacity: 0.3,
  },
  green: {
    backgroundColor: '#25A055',
    opacity: 0.4,
  },
  orange: {
    backgroundColor: '#CB7F27',
    opacity: 0.4,
  },
};
/**
 * Creates subclasses with base properties shared across all variants
 * and nested variants with respect to theme colors
 *
 *
 */
var addSubClasses = function (_a) {
  var theme = _a.theme;
  var variants = __assign(
    {
      white: {
        base: '#FFFFFF',
        shadow: '#D5DFE9',
      },
    },
    theme('cards.variants')
  );
  // add variant subclasses
  var variantClasses = {};
  Object.keys(variants).forEach(function (color) {
    // add placeholder variants
    variantClasses['.card-' + color + ' .placeholder'] = __assign(
      __assign({}, placeholder[color] || placeholder.white),
      {
        boxShadow:
          color == 'white'
            ? 'inset 0px 2px 0px #233057'
            : 'inset 0px 2px 0px #1C1C1C',
      }
    );
    variantClasses['.card-' + color + '-transparent .placeholder'] = {
      backgroundColor: variants[color].base,
      opacity: 0.4,
    };
    // add icon variants
    variantClasses['.card-' + color + ' .icon'] = {
      color: color == 'white' ? '#BFD8E4' : '#FFFFFF',
    };
    variantClasses['.card-' + color + '-transparent .icon'] = {
      backgroundColor: variants[color].base,
      opacity: '0.4',
      transform: 'translateX(2px)',
      border: 'none',
      borderRadius: '20px',
    };
    // add text variants
    variantClasses['.card-' + color + ' .title'] = {
      color: ['white', 'gray'].includes(color) ? '#305EED' : '#FFFFFF',
    };
    variantClasses['.card-' + color + ' .subtitle'] = {
      color: ['white', 'gray'].includes(color) ? '#80B0C8' : '#FFFFFF',
    };
  });
  return __assign(
    __assign(
      __assign(__assign({}, placeholderClasses), iconClasses),
      textClasses
    ),
    variantClasses
  );
};
exports['default'] = addSubClasses;
