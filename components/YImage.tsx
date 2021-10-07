import React, { useMemo } from 'react';
import Head from 'next/head';

import { BreakPoint, ScreenSize } from '@/enums/screenSize';

import { __SbImageBaseURL__, __SbImageServer__ } from '@/libs/constants';

type SrcSet = Partial<
  {
    [index in ScreenSize]: string;
  }
>;

type BreakPointSet = Partial<
  {
    [index in ScreenSize]: {
      width: number;
      height?: number;
    };
  }
>;

type Props = {
  height?: number;
  width: number;
  name?: string;
  filename: string;
  className?: string;
  alt?: string;
  srcSet?: SrcSet;
  responsive?: BreakPointSet;
  preload?: boolean;
};

/**
 * Picture component compatible with storyblok image component
 */
const YImage: React.FC<Props> = ({
  filename: original,
  width,
  height = 0,
  className,
  alt,
  srcSet,
  responsive,
  preload = false,
}) => {
  const fallback = original ? createSrcSet('png', width, height, original) : '';

  const baseParams = { width, height, src: original };
  const responsiveParams = useMemo(
    () => createResponsive(baseParams, responsive, srcSet),
    [original]
  );
  const withBreakpoints = useMemo(() => addBreakpoints(responsiveParams), [
    original,
  ]);
  // const jitClasses = useMemo(() => createJitClasses(responsiveParams), [original]);

  const explicitDimensions = {
    width: responsiveParams.base.width,
    height: responsiveParams.base.height,
  };

  const pictureComponent = (
    <picture
      className={['block image-container select-none', className].join(' ')}
    >
      {withBreakpoints?.map(({ src, width, height, media }) => {
        const webp = original ? createSrcSet('webp', width, height, src) : '';
        const png = original ? createSrcSet('png', width, height, src) : '';

        // adds image to head preload tags
        // adds only webp since most modern browsers support it
        // this way, png preloading is avioded to avoid unnecessary files
        // if the browser doesn't suport webp, it probably has bigger issues than image prefetch
        const preloadTags = preload ? (
          <Head>
            <link rel="preload" href={webp} as="image" />
          </Head>
        ) : null;

        return (
          <React.Fragment key={`${media || ''}-image`}>
            {preloadTags}
            <source srcSet={webp} type="image/webp" media={media} />
            <source srcSet={png} type="image/png" media={media} />
          </React.Fragment>
        );
      })}
      <img alt={alt} {...explicitDimensions} srcSet={fallback} />
    </picture>
  );

  return pictureComponent;
};

/**
 * Creates scrSet for stoyrblok image server
 * @param format image format
 * @param width
 * @param height
 * @param original original url: https://a.storyblok.com/{filaname}
 * @returns storyblok srcSet with req params
 */
export const createSrcSet = (
  format: string,
  width: number,
  height: number,
  original: string
) => {
  const filename = original.replace(__SbImageBaseURL__, '');

  const sizeArgs = `/fit-in/${width}x${height}`;

  const filters = `/filters:fill(transparent):format(${format}):quality(100)`;

  return [__SbImageServer__, sizeArgs, filters, filename].join('');
};

type ResponsiveParams = {
  height: number;
  width: number;
  src: string;
  media?: string;
};
type ResponsiveCollection = { base: ResponsiveParams } & Partial<
  {
    [index in ScreenSize]: ResponsiveParams;
  }
>;

/**
 * Creates responsive parameters for each defined screen
 * - defined screen: has at least one of the property defined (dimensions, src)
 * - if one of the properties is not defined, falls back to same property of screen before going mobile first
 * - * goes mobile first, using base as smallest param and creates new params for breakpoints going up
 * - ** if no responsive param are provided, returns only base
 * @param dimensions {width, height} for breakpoint, if height is not defined falls back to 0, letting server adjust
 * @param srcSet different image sources for screen sizes
 * @returns
 */
const createResponsive = (
  base: ResponsiveParams,
  dimensions?: BreakPointSet,
  srcSet?: SrcSet
): ResponsiveCollection => {
  // init result with base params
  let result: ResponsiveCollection = { base };

  // if no responsive params are present (dimensions or srcSet) return only base
  if (!dimensions && !srcSet) return result;

  const screens = Object.values(ScreenSize);

  // fallback for dimensions and src if such param is not provided for certain breakpoint
  let currentDimensions = { width: base.width, height: base.height };
  let currentSource = base.src;

  // assign responsive params for each defined *(at least one of responsive params is present) breakpoint
  screens.forEach((screen) => {
    if (!(dimensions && dimensions[screen]) && !(srcSet && srcSet[screen]))
      return;
    currentDimensions =
      dimensions && dimensions[screen]
        ? {
            width: dimensions[screen].width,
            height: dimensions[screen].height || 0,
          }
        : currentDimensions;

    currentSource = srcSet && srcSet[screen] ? srcSet[screen] : currentSource;

    result[screen] = { ...currentDimensions, src: currentSource };
  });

  return result;
};

/**
 * Iterates through screen sizes defined in responsive collection (Record) and adds max-width for each breakpoint except last, boing mobile first
 * @param responsiveCollection collection of responsive params keyed by breakpoint
 * @returns responsive collection (Array) updated with breakpoints
 */
const addBreakpoints = (
  responsiveCollection: ResponsiveCollection
): ResponsiveParams[] => {
  const screens = Object.keys(responsiveCollection);

  let result = [responsiveCollection.base];

  if (screens.length == 1) return result;

  screens.forEach((curr, index) => {
    result[index] = responsiveCollection[curr];
    if (screens[index + 1]) {
      result[index].media = `(max-width: ${
        Number(BreakPoint[screens[index + 1].toUpperCase()]) - 1
      }px)`;
    }
  });
  return result;
};

/**
 * Iterates through collection of responsive params and creates string of classNames for tailwind JIT dimensions
 * @param screens
 */
const createJitClasses = (responsiveCollection: ResponsiveCollection) =>
  Object.keys(responsiveCollection)
    .map((curr) => {
      const { height, width } = responsiveCollection[curr];
      const prefix = curr == 'base' ? '' : `${curr}:`;
      return `${prefix}w-[${width}px] ${`${prefix}h-${
        height ? `[${height}px]` : 'auto'
      }`}`;
    })
    .join(' ');

export default YImage;
