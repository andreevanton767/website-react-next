import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { ThreePoints } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

interface Article {
  heading: string;
  text: string;
  image: string;
}

interface ListItem {
  text: string;
}

interface Props {
  title: string;
  subtitle: string;
}

export interface ArticlesProps extends Props {
  type: ThreePoints.Articles;
  points: [Article, Article, Article];
}

export interface OrderedProps extends Props {
  type: ThreePoints.OrderedList;
  points: [ListItem, ListItem, ListItem];
  description: string;
  cover: string;
}

const ServiceThreePoints: React.FC<ArticlesProps | OrderedProps> = ({
  title,
  subtitle,
  type,
  ...props
}) => {
  if (type == ThreePoints.Articles) {
    /**
     * Type: Articles
     */
    const { points } = props as ArticlesProps;

    return (
      <section className={sectionClasses.join(' ')}>
        <div className={containerClasses.join(' ')}>
          <YHeading {...titleProps[type]} className={titleClasses.join(' ')}>
            {title}
          </YHeading>
          <YHeading {...subtitleProps}>{subtitle}</YHeading>
          <div className="grid grid-cols-1 mt-10 mb-25 gap-10 lg:grid-cols-3 lg:gap-42.5">
            {points.map(({ text, image, heading }, index) => {
              const Image = useMemo(
                () =>
                  dynamic(() => import(`@/assets/illustrations/${image}.svg`), {
                    ssr: false,
                  }),
                []
              );

              return (
                <article key={index} className="w-full relative px-1 lg:px-0">
                  <div className="relative left-1/2 transform -translate-x-1/2 w-67.5 h-47.5 mb-8 lg:w-80 lg:h-60 lg:mb-10">
                    <Image />
                  </div>
                  <YHeading
                    className="text-white lg:w-3/4 lg:mx-auto"
                    {...pointsProps}
                  >
                    {heading}
                  </YHeading>
                  <YText
                    className="text-gray-400 mt-2 max-w-md mx-auto lg:mx-0"
                    {...articleTextProps}
                  >
                    {text}
                  </YText>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    /**
     * Type: Ordered List
     */
    const { description, cover, points } = props as OrderedProps;

    const CoverImage = useMemo(
      () =>
        dynamic(() => import(`@/assets/illustrations/${cover}.svg`), {
          ssr: false,
        }),
      []
    );

    return (
      <section className={sectionClasses.join(' ')}>
        <div className={containerClasses.join(' ')}>
          <div className="relative left-1/2 transform -translate-x-1/2 w-103 h-72.5 mb-7.5 lg:w-153 lg:h-112.5 lg:mb-15">
            <CoverImage />
          </div>
          <YHeading {...titleProps[type]} className={titleClasses.join(' ')}>
            {title}
          </YHeading>
          <YHeading {...subtitleProps}>{subtitle}</YHeading>
          <YText
            fontSize={FontSize.SM}
            lineHeight={FontLineHeight.Relaxed}
            className="text-gray-400 mt-2 max-w-md mx-auto lg:mt-4 lg:w-125 lg:text-base lg:leading-9"
            as="p"
          >
            {description}
          </YText>
          <ol className="whitespace-nowrap overflow-y-hidden scroll-x-container list-none my-8 mb-16 pb-5 lg:mb-25 lg:mt-15">
            {points.map(({ text }, index) => (
              <li
                key={index}
                className={[
                  index == 0 ? '' : 'ml-6 lg:ml-8',
                  'w-70 h-47 p-7 border border-blue-100 rounded-xl inline-block text-left align-text-top scroll-x-item',
                ].join(' ')}
              >
                <YHeading
                  className="text-white text-shadow-blue"
                  {...indexProps}
                >
                  {index}
                </YHeading>
                <YHeading
                  className="text-white whitespace-normal mt-2"
                  {...pointsProps}
                >
                  {text}
                </YHeading>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
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

const containerClasses = ['container', 'pt-10', 'lg:py-30', 'text-center'];

const titleClasses = ['hidden', 'lg:block', 'text-gray-400', 'mb-3'];

/**
 * Text props for each region
 */
const titleProps = {
  [ThreePoints.Articles]: {
    fontSize: FontSize.LG,
    fontWeight: FontWeight.SemiBold,
    as: 'h1',
  },
  [ThreePoints.OrderedList]: {
    fontSize: FontSize.LG,
    lineHeight: FontLineHeight.Relaxed,
    fontWeight: FontWeight.SemiBold,
    as: 'h1',
  },
} as Record<ThreePoints, Parameters<typeof YHeading>[0]>;

const subtitleProps = {
  fontSize: FontSize.LG,
  lineHeight: FontLineHeight.Relaxed,
  as: 'h2',
  className: 'text-white lg:text-xxl lg:leading-13',
} as Parameters<typeof YHeading>[0];

const pointsProps = {
  fontSize: FontSize.LG,
  as: 'h3',
} as Parameters<typeof YHeading>[0];

const articleTextProps = {
  fontSize: FontSize.SM,
  lineHeight: FontLineHeight.Relaxed,
  as: 'p',
} as Parameters<typeof YText>[0];

const indexProps = {
  fontSize: FontSize.XXL,
  fontWeight: FontWeight.SemiBold,
  as: 'h3',
} as Parameters<typeof YHeading>[0];

export default ServiceThreePoints;
