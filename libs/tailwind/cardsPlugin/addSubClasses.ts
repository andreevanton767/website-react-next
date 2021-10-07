import { CSSProperties } from 'react';
import { TailwindOptionsPartial } from './types';

// base classes for nested components
const placeholderClasses = {
  ['.placeholder']: {
    position: 'absolute',
    left: '20px',
    border: 'none',
    borderRadius: '2px',
    height: '15px',
  },
  ['.placeholder-title']: {
    right: '22px',
    bottom: '58px',
  },
  ['.placeholder-subtitle']: {
    right: '52px',
    bottom: '35px',
  },
} as Record<string, CSSProperties>;

const iconClasses = {
  ['.icon']: {
    height: '60px',
    width: '60px',
    margin: '0 auto 19px auto',
  },
  ['.icon svg']: {
    height: '100%',
    width: '100%',
  },
} as Record<string, CSSProperties>;

const textClasses = {
  ['.text']: {
    marginTop: '4px',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '20px',
  },
  ['.title']: {
    fontWeight: 700,
  },
  ['.subtitle']: {
    fontWeight: 600,
  },
} as Record<string, CSSProperties>;

// variants with respet to color
const placeholder = {
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
const addSubClasses = ({ theme }: TailwindOptionsPartial) => {
  const variants = {
    white: {
      base: '#FFFFFF',
      shadow: '#D5DFE9',
    },
    ...theme('cards.variants'),
  };

  // add variant subclasses
  let variantClasses = {} as Record<string, CSSProperties>;
  Object.keys(variants).forEach((color) => {
    // add placeholder variants
    variantClasses[`.card-${color} .placeholder`] = {
      ...(placeholder[color] || placeholder.white),
      boxShadow:
        color == 'white'
          ? 'inset 0px 2px 0px #233057'
          : 'inset 0px 2px 0px #1C1C1C',
    };

    variantClasses[`.card-${color}-transparent .placeholder`] = {
      backgroundColor: variants[color].base,
      opacity: 0.4,
    } as CSSProperties;

    // add icon variants
    variantClasses[`.card-${color} .icon`] = {
      color: color == 'white' ? '#BFD8E4' : '#FFFFFF',
    };

    variantClasses[`.card-${color}-transparent .icon`] = {
      backgroundColor: variants[color].base,
      opacity: '0.4',
      transform: 'translateX(2px)',
      border: 'none',
      borderRadius: '20px',
    };

    // add text variants
    variantClasses[`.card-${color} .title`] = {
      color: ['white', 'gray'].includes(color) ? '#305EED' : '#FFFFFF',
    };

    variantClasses[`.card-${color} .subtitle`] = {
      color: ['white', 'gray'].includes(color) ? '#80B0C8' : '#FFFFFF',
    };
  });

  return {
    ...placeholderClasses,
    ...iconClasses,
    ...textClasses,
    ...variantClasses,
  };
};

export default addSubClasses;
