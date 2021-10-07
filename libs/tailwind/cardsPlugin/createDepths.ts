import { CSSProperties } from 'react';

import { DepthTuple, ColorTuple, TailwindComponents } from './types';

interface AddDepthArgs {
  depth: number;
  colorOuter: string;
  colorInner?: string;
  skew?: number;
}

/**
 * Creates 3d depth simulating shadows
 *
 * @param param0 object with depth in px, outerColor -> outline or full shadow if inner not provided,
 * innerColor -> inner shadow for transparent effect
 * skew -> if provided skews shadow
 *
 * @returns css shadows for box shadow property
 */
const addDepth = ({
  depth,
  colorOuter,
  colorInner,
  skew = 0,
}: AddDepthArgs) => {
  const inner = [];
  const outer = [];

  for (let i = 1 - skew; i <= depth; i++) {
    if (colorInner) {
      inner.push(`-${i + skew}px ${i}px 0 -1px ${colorInner}`);
    }
    outer.push(`-${i + skew}px ${i}px ${colorOuter}`);
  }

  return [...inner, ...outer].join(', ').concat(';');
};

/**
 *  Creates depths classes with given depth, and colors
 *  single color -> adds depth
 *  both colors -> creates depth with color1 outline and color2 fill
 */
const createDepths = (
  depthTuple: DepthTuple,
  color1: ColorTuple,
  color2: ColorTuple | null,
  skew: number = 0
) => {
  const [depthKey, depth] = depthTuple;
  const [colorOuterKey, colorOuter] = color1;
  const [colorInnerKey, colorInner] = color2 || [null];

  const componentStyles = {
    position: 'relative',
    boxSizing: 'border-box',
  };

  let depthClasses = {} as TailwindComponents;

  if (!color2) {
    depthClasses[`.depth-${depthKey}-${colorOuterKey}`] = {
      ...componentStyles,
      boxShadow: addDepth({ depth, colorOuter }),
    } as CSSProperties;
  } else {
    depthClasses[`.depth-${depthKey}-${colorOuterKey}-${colorInnerKey}`] = {
      ...componentStyles,
      border: `1px solid ${colorOuter}`,
      boxShadow: addDepth({ depth, colorOuter, colorInner }),
    } as CSSProperties;
  }

  // adds CSS with class for element nested under '.skew' class
  if (skew) {
    depthClasses[`under_skew`] = {
      boxShadow: addDepth({
        depth,
        colorOuter,
        colorInner: colorInner || undefined,
        skew,
      }),
    };
  }

  return depthClasses;
};

export default createDepths;
