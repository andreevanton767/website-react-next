import createDepths from './createDepths';
import {
  Variant,
  DepthTuple,
  ColorTuple,
  TailwindOptionsPartial,
} from './types';

interface VariantWithDepths extends Variant {
  depths: {
    fill: string;
    transparent: string;
  };
}

interface VariantsWithDepths {
  [index: string]: VariantWithDepths;
}

/**
 * Creates depth classes based on color inputs, adds those classes as components to tailwind and returns classNames for further application.
 * The side effect here is that all of the depth classes remain in Tailwind until purge so they can be used for different components.
 *
 * @param param object with tailwind component function options passed from parent function, as well as normalized color
 *
 * @returns updated variants object with added depths: {fill, transparent} for each entry
 */
const addDepthClasses = ({
  addComponents,
}: TailwindOptionsPartial & {
  variants: Record<string, Variant>;
}): VariantsWithDepths => {
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
  };

  const depth = [2, 7] as DepthTuple;
  const background = '#062233';
  const skew = 1;

  let components = {};

  Object.keys(variants).forEach((color) => {
    const { base, shadow } = variants[color];

    const fillTuple = [`${color}-shadow`, shadow] as ColorTuple;
    const transparentTuple = [`${color}-transparent`, base] as ColorTuple;

    const backgroundTuple = ['background', background] as ColorTuple;

    const depthFillClasses = createDepths(depth, fillTuple, null, skew);
    const depthTransparentClasses = createDepths(
      depth,
      transparentTuple,
      backgroundTuple,
      skew
    );

    let returnClasses = {};

    // get names of newly created classes
    const fillClassName = Object.keys(depthFillClasses)[0];
    const transparentClassName = Object.keys(depthTransparentClasses)[0];

    returnClasses[fillClassName] = depthFillClasses[fillClassName];
    returnClasses[transparentClassName] =
      depthTransparentClasses[transparentClassName];

    // add classes nested under skew
    returnClasses[`.skew .card-${color}`] = depthFillClasses['under_skew'];
    returnClasses[`.skew .card-${color}-transparent`] =
      depthTransparentClasses['under_skew'];

    // add newly created depth components to tailwind
    addComponents(returnClasses);

    // add classnames to return object under appropriate color name
    components = {
      ...components,
      [color]: {
        ...variants[color],
        depths: {
          fill: fillClassName,
          transparent: transparentClassName,
        },
      },
    };
  });

  return components;
};

export default addDepthClasses;
