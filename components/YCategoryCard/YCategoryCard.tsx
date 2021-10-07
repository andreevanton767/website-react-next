import React from 'react';

import {
  ButtonShape,
  Service,
  BlogCategorySize,
  BlogCategoryStyle,
  FeaturedPosts,
} from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import YButton from '@/components/YButton';
import YHeading from '@/components/YHeading';
import YLink from '@/components/YLink';
import YText from '@/components/YText';

import useRecentPosts from '@/hooks/useRecentPosts';

import yTrimExcerpt from '@/libs/utils/yTrimExcerpt';

import { covers, coversLg } from './heroImages';
import useTranslations from '@/hooks/useTranslations';

interface PostPreview {
  slug: string;
  firstPublished: string;
  title: string;
  intro: string;
}

export interface CategoryCardProps {
  category: Service;
  description: string;
  buttonSm: string;
  buttonLg?: string;
  topic?: string;
  latestPosts?: { buttonText: string };
}

interface Props extends CategoryCardProps {
  size?: BlogCategorySize;
  cardStyle?: BlogCategoryStyle;
  className?: string;
}

const YCategoryCard: React.FC<Props> = ({
  category,
  description,
  buttonSm,
  buttonLg,
  topic,
  size = BlogCategorySize.SM,
  cardStyle = BlogCategoryStyle.Light,
  className,
  latestPosts,
}) => {
  const { getDateString, getCategoryStrings } = useTranslations();

  const [title] = getCategoryStrings([category]);

  const coverElement = (
    <div className={getCoverClasses(size)}>
      <div className={getCoverInnerClasses(size, category)}>
        {covers[category]}
      </div>
      {size === BlogCategorySize.LG && (
        <div className={[...coverInnerDefault, ...coverLgClasses].join(' ')}>
          {coversLg[category]}
        </div>
      )}
    </div>
  );

  const textBox = (
    <div className={[...textBoxDefault, ...textBoxBySize[size]].join(' ')}>
      {size !== BlogCategorySize.SM && (
        <YText className="w-full text-primary mb-1 lg:hidden uppercase" as="p">
          {topic}
        </YText>
      )}
      <YHeading
        fontSize={getHeadingSize(size)}
        lineHeight={FontLineHeight.Relaxed}
        className={getHeadingClasses(size, cardStyle)}
        as="h1"
      >
        {title}
      </YHeading>
      <YText
        {...getTextSize(size)}
        className={getTextClasses(size, cardStyle)}
        as="p"
      >
        {description}
      </YText>
      <YLink href={`blog/c/${category}`}>
        <YButton
          shape={ButtonShape.Round}
          className={getButtonClasses(size, cardStyle)}
        >
          <span className="lg:hidden">{buttonSm}</span>
          <span className="hidden lg:inline">{buttonLg || buttonSm}</span>
        </YButton>
      </YLink>
    </div>
  );

  // latest posts for size === LG
  const { articles } = useRecentPosts({
    category: size === BlogCategorySize.LG ? category : null,
    location: FeaturedPosts.ServicePage,
  });

  const createPostPreview = (
    { title, intro, firstPublished, slug }: PostPreview,
    last: boolean
  ) => (
    <li
      key={slug}
      className={['relative w-full', last ? '' : 'mb-14'].join(' ')}
    >
      <YText
        fontSize={FontSize.SM}
        fontWeight={FontWeight.SemiBold}
        className="text-blog-gray-100 absolute -left-8 transform -translate-x-full"
      >
        {getDateString(firstPublished)}
      </YText>
      <YHeading
        fontSize={FontSize.MD}
        fontWeight={FontWeight.SemiBold}
        className="text-blue-400 mb-1"
        as="h2"
      >
        {title}
      </YHeading>
      <YText
        {...getTextSize(size)}
        className={getTextClasses(size, cardStyle)}
        as="p"
      >
        {yTrimExcerpt(intro, 130)}
      </YText>
      <YLink href={`blog/p/${slug}`}>
        <YButton
          shape={ButtonShape.Round}
          className={getButtonClasses(BlogCategorySize.SM, cardStyle)}
        >
          {latestPosts?.buttonText}
        </YButton>
      </YLink>
    </li>
  );

  const latestPostsElement = articles ? (
    <ul className="hidden lg:block relative z-30 ml-auto w-91.6">
      {articles
        .slice(0, 3)
        .map((post, index) =>
          createPostPreview(post, index === articles.length - 1)
        )}
    </ul>
  ) : null;

  return (
    <article className={getContainerClasses(size, cardStyle, className)}>
      {coverElement}
      {textBox}
      {size === BlogCategorySize.LG && latestPostsElement}
    </article>
  );
};

// container
const getContainerClasses = (
  size: BlogCategorySize,
  style: BlogCategoryStyle,
  className: string
) =>
  [
    ...containerClasses,
    ...colorClasses[style],
    ...containerSizeClasses[size],
    className,
  ].join(' ');

const containerClasses = [
  'bg-white',
  'relative',
  'overflow-hidden',
  'w-full',
  'rounded-xl',
  3,
];
const colorClasses = {
  [BlogCategoryStyle.Light]: ['bg-white'],
  [BlogCategoryStyle.Dark]: ['bg-blue-400'],
};
const containerSizeClasses = {
  [BlogCategorySize.SM]: [
    'pb-5',
    'px-6',
    'lg:px-16',
    'lg:flex',
    'lg:flex-wrap',
    'lg:justify-between',
    'lg:items-center',
  ],
  [BlogCategorySize.MD]: ['pb-10', 'lg:py-20', 'lg:pl-35'],
  [BlogCategorySize.LG]: ['pb-10', 'lg:py-25', 'lg:px-35', 'lg:min-h-205'],
};

// cover container
const coverDefault = ['relative', 'w-full'];

const getCoverClasses = (size: BlogCategorySize) =>
  [
    ...coverDefault,
    ...(size === BlogCategorySize.SM
      ? [
          ...coverClassesBySize[ScreenSize.SM][size],
          ...coverClassesBySize[ScreenSize.LG][size],
        ]
      : [
          ...coverClassesBySize[ScreenSize.SM][BlogCategorySize.MD],
          ...coverClassesBySize[ScreenSize.LG][size],
        ]),
  ].join(' ');

const coverClassesBySize = {
  [ScreenSize.SM]: {
    [BlogCategorySize.SM]: ['h-57'],
    [BlogCategorySize.MD]: ['h-80'],
  },
  [ScreenSize.LG]: {
    [BlogCategorySize.SM]: ['lg:w-90', 'lg:h-67.5', 'lg:mb-5'],
    [BlogCategorySize.MD]: ['lg:w-80', 'lg:h-75', 'lg:mb-15'],
    [BlogCategorySize.LG]: [
      'lg:absolute',
      'lg:-left-35',
      'lg:-bottom-35',
      'lg:h-150',
      'lg:w-200',
    ],
  },
};

// cover inner
const getCoverInnerClasses = (size: BlogCategorySize, category: Service) =>
  [
    ...coverInnerDefault,
    ...(size === BlogCategorySize.MD &&
    [
      Service.DataAnalytics,
      Service.MarketingAutomation,
      Service.OnlineAdvertising,
      Service.Personalization,
    ].includes(category)
      ? coverInnerAdditional
      : size === BlogCategorySize.LG
      ? ['lg:hidden']
      : []),
  ].join(' ');

const coverInnerDefault = [
  'svg-fit',
  'absolute',
  'w-full',
  'h-3/4',
  'top-1/2',
  'left-1/2',
  'transform',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'lg:h-full',
];

const coverInnerAdditional = [
  'lg:-left-7',
  'lg:top-auto',
  'lg:bottom-0',
  'lg:transform-none',
];

// cover lg inner
const coverLgClasses = ['hidden', 'lg:block'];

// text box
const textBoxDefault = [
  'max-w-md',
  'text-center',
  'mx-auto',
  'lg:max-w-none',
  'lg:mx-0',
  'lg:w-90',
  'relative',
  'z-30',
];

const textBoxBySize = {
  [BlogCategorySize.SM]: [],
  [BlogCategorySize.MD]: ['lg:text-left'],
  [BlogCategorySize.LG]: ['lg:text-left', 'lg:float-left'],
};

// heading
const getHeadingSize = (size: BlogCategorySize) =>
  size === BlogCategorySize.SM ? FontSize.LG : FontSize.XL;

const getHeadingClasses = (size: BlogCategorySize, style: BlogCategoryStyle) =>
  [
    ...headingDefault,
    ...headingColorClasses[style],
    ...headingBySize[size],
  ].join(' ');

const headingDefault = ['cursor-normal', 'select-none', 'w-full', 'mb-1'];

const headingColorClasses = {
  [BlogCategoryStyle.Light]: ['text-blue-400'],
  [BlogCategoryStyle.Dark]: ['text-white'],
};

const headingBySize = {
  [BlogCategorySize.SM]: ['lg:mb-3', 'lg:text-xl', 'lg:leading-11'],
  [BlogCategorySize.MD]: ['lg:mb-2', 'lg:text-xxl', 'lg:leading-13'],
  [BlogCategorySize.LG]: ['lg:mb-2', 'lg:text-xxl', 'lg:leading-13'],
};

// description text
const getTextSize = (size: BlogCategorySize) =>
  (size === BlogCategorySize.SM
    ? { fontSize: FontSize.XS, lineHeight: FontLineHeight.Relaxed }
    : {
        fontSize: FontSize.SM,
        lineHeight: FontLineHeight.Loose,
      }) as Parameters<typeof YText>[0];

const getTextClasses = (size: BlogCategorySize, style: BlogCategoryStyle) =>
  [...textDefault, ...textBySize[size], ...textColorClasses[style]].join(' ');

const textDefault = ['cursor-normal', 'select-none', 'mb-3', 'lg:w-full'];

const textBySize = {
  [BlogCategorySize.SM]: ['lg:text-sm', 'lg:leading-8', 'lg:mb-6'],
  [BlogCategorySize.MD]: ['lg:mb-5'],
  [BlogCategorySize.LG]: ['lg:mb-4'],
};

const textColorClasses = {
  [BlogCategoryStyle.Light]: ['text-blog-gray-200'],
  [BlogCategoryStyle.Dark]: ['text-blog-gray-100'],
};

// button
const getButtonClasses = (size: BlogCategorySize, style: BlogCategoryStyle) => {
  const baseClasses = [
    'text-xs',
    'leading-5',
    'px-4',
    'py-2',
    'lg:px-4.5',
    'lg:py-2.5',
    'select-none',
  ];

  const color =
    size === BlogCategorySize.SM || style === BlogCategoryStyle.Dark
      ? 'bg-white text-blue-400'
      : 'bg-blue-400 text-white';

  const border = size === BlogCategorySize.SM ? 'border border-blue-400' : '';

  return [...baseClasses, color, border].join(' ');
};

export default YCategoryCard;
