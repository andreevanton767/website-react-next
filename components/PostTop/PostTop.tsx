import React, { useMemo } from 'react';

import { Service } from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import { SbImage } from '@/types/storyblok';

import YImage from '@/components/YImage';
import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import MetaBox, { MetaBoxProps } from './MetaBox';

import Views from '@/assets/inline/views.svg';

import useTranslations from '@/hooks/useTranslations';

interface Tag {
  label: string;
  color: string;
}

export interface Props extends Omit<MetaBoxProps, 'className'> {
  tags?: Tag[];
  title?: string;
  intro?: string;
  categories?: Service[];
  firstPublished?: string;
  views?: number;
  graphic?: string;
  cover?: SbImage;
}

const PostTop: React.FC<Props> = ({
  tags,
  title,
  intro,
  categories,
  firstPublished,
  views,
  cover,
  graphic,
  ...metaBoxProps
}) => {
  // top section
  const coverElement = useMemo(() => getCoverElement(graphic, cover), [
    graphic,
    cover,
  ]);

  const dot = (
    <span className="inline-block flex-shrink-0 w-1 h-1 mx-4 bg-blog-gray-100 rounded-full" />
  );

  const { getDateString, getCategoryStrings } = useTranslations();

  const categoryStrings = getCategoryStrings(categories);
  const categoryElement = (
    <React.Fragment key="categories-string">
      {categoryStrings.map((curr, index) => (
        <span
          key={`${curr}-${index}`}
          className="flex items-center whitespace-nowrap"
        >
          {index > 0 && dot}
          {curr}
        </span>
      ))}
    </React.Fragment>
  );

  const dateString = (
    <span key="date-string" className="whitespace-nowrap">
      {getDateString(firstPublished)}
    </span>
  );

  const stats = (
    <YText
      key="stats"
      lineHeight={FontLineHeight.Relaxed}
      className="hidden flex items-center justify-center text-blog-gray-100 mx-4 md:flex"
    >
      {[categoryElement, dot, dateString, dot]}
      <span className="flex items-center w-5 h-5 mr-2 fill-current">
        <Views />
      </span>
      {views}
    </YText>
  );

  const topSectionText = (
    <div className="relative text-center max-w-lg w-full min-h-51.5 mx-auto px-5 pt-6 md:max-w-203.6 md:min-h-93.6 md:mb-10 md:pt-37.5">
      <div className="flex justify-center flex-wrap items-center w-full mb-3 md:w-1/2 md:mx-auto md:mb-6">
        {tags?.map(({ color, label }) => (
          <div
            key={label + color}
            style={{ background: color }}
            className="flex-shrink-0 mx-1.5 mb-3 px-2.5 py-1 rounded-lg"
          >
            <YHeading
              className="text-white"
              fontSize={FontSize.XXS}
              fontWeight={FontWeight.Medium}
            >
              {label}
            </YHeading>
          </div>
        ))}
      </div>
      <YHeading
        fontSize={FontSize.XL}
        lineHeight={FontLineHeight.Relaxed}
        className="text-blue-400 mb-2 md:text-3xl md:leading-17"
        as="h1"
      >
        {title}
      </YHeading>
      <YText
        key="intro"
        lineHeight={FontLineHeight.Relaxed}
        fontWeight={FontWeight.SemiBold}
        className="text-blue-400 md:text-lg md:leading-11 md:mb-4"
        as="p"
      >
        {intro}
      </YText>
      {stats}
    </div>
  );

  return (
    <section className="relative w-full pt-15.5 lg:pt-0 select-none">
      <div className="relative max-w-8xl w-full mx-auto">
        <div className="relative w-full flex flex-col md:flex-col-reverse">
          <div className="absolute bg-white w-full top-0 bottom-0 md:top-204.5" />
          {coverElement}
          {topSectionText}
        </div>
        <MetaBox className={metaBoxClasses.join(' ')} {...metaBoxProps} />
      </div>
    </section>
  );
};

/**
 * Creates cover element: uses image if available, else falls back to provided graphic
 * @param graphic always be available either user set or default
 * @param image optional, if provided, has priprity over graphic
 * @returns cover element with corresponding container
 */
const getCoverElement = (graphic: string, image: SbImage) => {
  const showImage = Boolean(image.filename);

  const Graphic = showImage
    ? undefined
    : require(`@/assets/illustrations/${graphic}.svg`).default;

  const returnElement = showImage ? (
    <YImage {...getCoverImageProps(image)} />
  ) : (
    <Graphic />
  );

  return (
    <div
      className={[
        ...coverBaseClasses,
        ...(showImage ? imageAdditionalClasses : graphicAdditionalClasses),
      ].join(' ')}
    >
      {returnElement}
    </div>
  );
};

// cover element
const coverBaseClasses = [
  'relative',
  'flex',
  'justify-center',
  'items-center',
  'overflow-hidden',
  'w-full',
  'h-72.5',
];

const graphicAdditionalClasses = ['md:h-143.6', 'svg-fit'];
const imageAdditionalClasses = ['md:h-auto'];

const getCoverImageProps = (image: SbImage) => ({
  ...image,
  className: 'h-full w-auto flex-shrink-0',
  height: 290,
  width: 0,
  responsive: {
    [ScreenSize.MD]: {
      width: 1080,
      height: 0,
    },
    [ScreenSize.LG]: {
      width: 1680,
      height: 0,
    },
  },
});

// author and social media box classes
const metaBoxClasses = [
  'lg:absolute',
  'lg:-bottom-20',
  'lg:transform',
  'lg:translate-y-full',
  'lg:right-5',
  'xl:right-1/2',
  'xl:translate-x-160',
];

export default PostTop;
