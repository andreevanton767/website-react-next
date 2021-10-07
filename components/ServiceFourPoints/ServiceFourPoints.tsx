import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { FourPoints } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

interface Article {
  heading: string;
  text: string;
}

interface Props {
  title: string;
  subtitle: string;
  description: string;
  points: [Article, Article, Article, Article];
  cover: string;
  type?: FourPoints;
}

const ServiceFourPoints: React.FC<Props> = ({
  title,
  subtitle,
  description,
  points,
  cover,
  type = FourPoints.OrderedList,
}) => {
  const pointsSection =
    type == FourPoints.OrderedList ? (
      <ol className="whitespace-nowrap overflow-y-hidden scroll-x-container text-left list-none mt-8 lg:grid lg:grid-cols-2 lg:gap-6">
        {points.map(({ heading, text }, index) => (
          <li
            key={index}
            className={[
              index == 0 ? '' : 'ml-6',
              'w-60 p-4 border border-blue-100 rounded-xl inline-block whitespace-normal align-text-top scroll-x-item lg:block lg:m-0',
            ].join(' ')}
          >
            <YHeading className="text-white text-shadow-blue" {...indexProps}>
              {index}
            </YHeading>
            <YHeading
              {...orderedArticleProps}
              as="h4"
              fontWeight={FontWeight.SemiBold}
              className="text-white"
            >
              {heading}
            </YHeading>
            <YText className="text-gray-400" {...orderedArticleProps} as="p">
              {text}
            </YText>
          </li>
        ))}
      </ol>
    ) : (
      <div
        className="whitespace-nowrap overflow-y-hidden scroll-x-container
       text-left list-none mt-8 lg:relative lg:-left-7 lg:overflow-visible"
      >
        {points.map(({ text, heading }, index) => (
          <article
            key={index}
            className={[
              index == 0 ? '' : 'ml-6 lg:ml-8',
              'w-65 h-52 p-7 bg-blue-100 bg-opacity-10 rounded-xl inline-block whitespace-normal align-text-top scroll-x-item',
            ].join(' ')}
          >
            <YHeading
              {...statsProps}
              className={['text-white', statsShadows[index]].join(' ')}
            >
              {heading}
            </YHeading>
            <YText {...statsTextProps} className="text-gray-300 mt-2">
              {text}
            </YText>
          </article>
        ))}
      </div>
    );

  const CoverImage = useMemo(
    () =>
      dynamic(() => import(`@/assets/illustrations/${cover}.svg`), {
        ssr: false,
      }),
    []
  );

  return (
    <section className={sectionClasses.join(' ')}>
      <div
        className={[
          ...containerClasses,
          type == FourPoints.OrderedList
            ? 'py-10 lg:py-20'
            : 'pt-5 pb-10 lg:pt-25 lg:pb-30',
        ].join(' ')}
      >
        <div className={getInnerContainerClasses(type)}>
          <div className={getImageClasses(type)}>
            <CoverImage />
          </div>
          <div className={getTextBoxClasses(type)}>
            <YHeading {...titleProps} className={titleClasses.join(' ')}>
              {title}
            </YHeading>
            <YHeading
              fontSize={FontSize.LG}
              lineHeight={FontLineHeight.Relaxed}
              className="text-white lg:text-xxl lg:leading-13"
              as="h2"
            >
              {subtitle}
            </YHeading>
            <YText
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-gray-400 mt-2 mx-auto max-w-md lg:mx-0 lg:mt-4 lg:w-100 lg:text-base lg:leading-9"
              as="p"
            >
              {description}
            </YText>
            {type == FourPoints.OrderedList && pointsSection}
          </div>
        </div>
        {type == FourPoints.Stats && pointsSection}
      </div>
    </section>
  );
};
/**
 * Base classNames for each region
 */
const sectionClasses = [
  'relative',
  'w-full',
  'overflow-hidden',
  'border-soft',
  'border-b',
];

const containerClasses = ['container', 'lg:px-0'];

const titleClasses = ['hidden', 'lg:block', 'text-gray-400', 'mb-3'];

// inner container / image container
const getInnerContainerClasses = (type: FourPoints) =>
  ['relative', ...innerContainerClasses[type]].join(' ');

const innerContainerClasses = {
  [FourPoints.OrderedList]: ['lg:ml-142.5'],
  [FourPoints.Stats]: ['lg:ml-115'],
};

// text box
const getTextBoxClasses = (type: FourPoints) =>
  [
    'text-center mt-7.5 lg:mt-0 lg:text-left lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2',
    ...textBoxClasses[type],
  ].join(' ');

const textBoxClasses = {
  [FourPoints.OrderedList]: ['lg:-left-142.5'],
  [FourPoints.Stats]: ['lg:-left-115', 'lg:w-100'],
};

// cover image
const getImageClasses = (type: FourPoints) =>
  [
    'relative left-1/2 transform -translate-x-1/2 lg:transform-none lg:static',
    ...imageClasses[type],
  ].join(' ');

const imageClasses = {
  [FourPoints.OrderedList]: ['w-100 h-70 lg:w-237 lg:h-173.6'],
  [FourPoints.Stats]: ['w-126.5 h-90 lg:w-162 lg:h-119 lg:mb-15'],
};

/**
 * Text props for each region
 */
const titleProps = {
  fontSize: FontSize.LG,
  lineHeight: FontLineHeight.Relaxed,
  fontWeight: FontWeight.SemiBold,
  as: 'h1',
} as Parameters<typeof YHeading>[0];

// Ordered articles
const indexProps = {
  fontSize: FontSize.XL,
  as: 'h3',
} as Parameters<typeof YHeading>[0];

const orderedArticleProps = {
  fontSize: FontSize.XS,
  lineHeight: FontLineHeight.Relaxed,
} as Parameters<typeof YText>[0];

// Stats articles
const statsProps = {
  fontSize: FontSize.XXL,
  fontWeight: FontWeight.SemiBold,
  as: 'h3',
} as Parameters<typeof YHeading>[0];

const statsShadows = [
  'text-shadow-blue',
  'text-shadow-green',
  'text-shadow-blue',
  'text-shadow-red',
];

const statsTextProps = {
  fontSize: FontSize.SM,
  lineHeight: FontLineHeight.Relaxed,
  as: 'p',
} as Parameters<typeof YText>[0];

export default ServiceFourPoints;
