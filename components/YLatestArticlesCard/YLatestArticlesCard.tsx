import React, { HTMLAttributes } from 'react';

import { ScreenSize } from '@/enums/screenSize';
import { FeaturedPosts, Service } from '@/enums/components';
import { FontLineHeight, FontSize } from '@/enums/font';

import { SbImage } from '@/types/storyblok';

import YText from '@/components/YText';
import YImage from '@/components/YImage';
import YHeading from '@/components/YHeading';
import YLink from '@/components/YLink';

import useTranslations from '@/hooks/useTranslations';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  slug: string;
  categories: Service[];
  firstPublished: string;
  cover?: SbImage;
  title: string;
  intro: string;
  type: FeaturedPosts;
}

const YLatestArticlesCard: React.FC<Props> = ({
  categories,
  firstPublished,
  cover,
  title,
  intro,
  type,
  slug,
  className,
  ...props
}) => {
  // cover image
  const coverElement = (
    <div className={getCoverClasses(type)}>
      {cover?.filename && (
        <YImage
          className="absloute left-1/2 transform -translate-x-1/2 h-full"
          {...cover}
          width={0}
          height={220}
          responsive={{ [ScreenSize.MD]: { width: 0, height: 240 } }}
        />
      )}
    </div>
  );

  // info section
  const dot = (
    <span
      key="dot"
      className="inline-block w-1 h-1 mx-3 rounded-full bg-blog-gray-100"
    />
  );

  const { getCategoryStrings, getDateString } = useTranslations();

  const dateString = getDateString(firstPublished);
  const categoryStrings = getCategoryStrings(categories);
  const categoriesElement = (
    <>
      {categoryStrings.map((curr) => (
        <span key={curr} className="flex items-center whitespace-nowrap">
          {curr}
        </span>
      ))}
    </>
  );

  const preText = (
    <YText
      fontSize={FontSize.XS}
      className="flex items-center text-blog-gray-100 mb-3 md:mb-2"
    >
      <span key="categoriesElement" className="font-bold">
        {categoriesElement}
      </span>
      {dot}
      <span key="dateString" className="font-semibold whitespace-nowrap">
        {dateString}
      </span>
    </YText>
  );

  return (
    <YLink href={`blog/p/${slug}`}>
      <article className={getContainerClasses(className)} {...props}>
        {coverElement}
        <div className={textBoxClasses[type].join(' ')}>
          {type === FeaturedPosts.BlogPost && preText}
          <YHeading {...titleProps[type]}>{title}</YHeading>
          <YText {...getTextProps(type)}>{intro}</YText>
        </div>
      </article>
    </YLink>
  );
};

// container classes
const getContainerClasses = (className: string) =>
  [...containerBaseClasses, className].join(' ');

const containerBaseClasses = [
  'cursor-pointer',
  'select-none',
  'article-card',
  'overflow-hidden',
];

// cover classes
const getCoverClasses = (type: FeaturedPosts) =>
  [...baseCoverClasses, ...additionalClasses[type]].join(' ');

const baseCoverClasses = ['relative', 'overflow-hidden', 'w-full'];

const additionalClasses = {
  [FeaturedPosts.BlogPost]: [
    'bg-blog-gray-400',
    'h-55',
    'mb-8',
    'md:h-60',
    'article-cover',
  ],
  [FeaturedPosts.ServicePage]: [
    'bg-blue-200',
    'rounded-lg',
    'h-50',
    'mb-5',
    'lg:mb-10',
  ],
};

// text box classes
const textBoxClasses = {
  [FeaturedPosts.BlogPost]: ['text-left', 'pr-5'],
  [FeaturedPosts.ServicePage]: ['text-center', 'lg:text-left'],
};

// title props
const titleProps = {
  [FeaturedPosts.BlogPost]: {
    fontSize: FontSize.LG,
    className: 'text-blue-400 mb-3 pr-4',
    as: 'h3',
  },
  [FeaturedPosts.ServicePage]: {
    fontSize: FontSize.MD,
    className: 'text-white mb-2 lg:text-lg lg:leading-9 lg:mb-4',
    as: 'h2',
  },
} as Record<FeaturedPosts, Parameters<typeof YHeading>[0]>;

// intro props
const getTextProps = (type: FeaturedPosts) => ({
  ...textPropsBase,
  ...textPropsAdditional[type],
});

const textPropsBase = {
  fontSize: FontSize.SM,
  as: 'p',
} as Parameters<typeof YText>[0];

const textPropsAdditional = {
  [FeaturedPosts.BlogPost]: {
    lineHeight: FontLineHeight.Loose,
    className: 'text-blog-gray-200',
  },
  [FeaturedPosts.ServicePage]: {
    lineHeight: FontLineHeight.Relaxed,
    className: 'text-gray-400',
  },
} as Record<FeaturedPosts, Parameters<typeof YText>[0]>;

export default YLatestArticlesCard;
