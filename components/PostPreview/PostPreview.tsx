import React, { useCallback } from 'react';

import { Service } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import { ContentEntry } from '@/types/blogPost';
import { SbImage } from '@/types/storyblok';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YImage from '@/components/YImage';
import YConditionalWrapper from '@/components/YConditionalWrapper';
import YParagraph from '@/components/PostComponents/YPostParagraph';
import YLink from '@/components/YLink';

import ViewsSVG from '@/assets/inline/views.svg';

import useTranslations from '@/hooks/useTranslations';

interface Tag {
  icon: string;
  label: string;
}

export interface Props {
  slug: string;
  categories: Service[];
  firstPublished: string;
  views: number;
  tags?: Tag[];
  cover?: SbImage;
  title: string;
  excerpt?: ContentEntry[];
}

enum Stat {
  Category = 'category',
  Date = 'date',
  Views = 'views',
  Tags = 'tags',
}

const PostPreview: React.FC<Props> = ({
  title,
  excerpt,
  firstPublished,
  views,
  tags,
  cover,
  categories,
  slug,
}) => {
  const hasCover = Boolean(cover.filename);

  const { getCategoryStrings, getDateString } = useTranslations();

  const dateString = getDateString(firstPublished);
  const [categoryString] = getCategoryStrings(categories);

  const postStats = (
    <>
      <YText {...getStatProps(Stat.Category, hasCover)}>
        {categoryString}
        <span
          key="category-separator"
          className={getSeparatorClasses(hasCover)}
        />
      </YText>
      <YText {...getStatProps(Stat.Date, hasCover)}>
        {dateString}
        <span
          key="date-separator"
          className={[
            'hidden',
            getSeparatorClasses(hasCover),
            hasCover ? '' : 'md:flex',
          ].join(' ')}
        />
      </YText>
      <YText {...getStatProps(Stat.Views, hasCover)}>
        <span className="hidden">
          <span key="views-icon" className="mr-2 fill-current h-5 w-5">
            <ViewsSVG />
          </span>
          {views}
        </span>
        <span className="hidden md:flex items-center">
          {tags?.map(({ icon, label }, index) => {
            const Icon = require(`@/assets/icons/${icon}.svg`).default;
            return (
              <React.Fragment key={label}>
                {index > 0 && (
                  /** || !hasCover ** @TODO uncomment this when views are added */
                  <span
                    className={getSeparatorClasses(hasCover)}
                    key={`${label}-dot`}
                  />
                )}
                <span
                  key={`${label}-icon`}
                  className="mr-3 fill-current svg-fit h-5 w-5"
                >
                  <Icon />
                </span>
                <span key={`${label}-label`}>{label}</span>
              </React.Fragment>
            );
          })}
        </span>
      </YText>
    </>
  );

  const coverImageWrapper = useCallback(
    ({ children }): JSX.Element => (
      <figure className="relative overflow-hidden shadow-blog-blue w-full max-w-83.5 h-57 mb-6 rounded-lg md:max-w-none md:h-90 md:mb-9 md:rounded-xl">
        <YImage
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-full"
          {...cover}
          width={334}
          height={0}
          responsive={{
            [ScreenSize.MD]: { width: 0, height: 360 },
          }}
        />
        {children}
      </figure>
    ),
    [hasCover]
  );

  const preTextContainerTag = hasCover ? 'figcaption' : 'p';

  const preTextElement = (
    <YConditionalWrapper condition={hasCover} wrapper={coverImageWrapper}>
      {React.createElement(
        preTextContainerTag,
        {
          className: getPreTextContainerClasses(hasCover),
        },
        postStats
      )}
    </YConditionalWrapper>
  );

  return (
    <YLink href={`blog/p/${slug}`}>
      <section className="w-full overflow-hidden select-none cursor-pointer">
        <div className="border-b border-blog-gray-300 w-full max-w-sm mx-auto px-5 py-10 md:max-w-none md:w-md md:py-20 lg:w-213 lg:px-0">
          {preTextElement}
          <div className="text-left w-full lg:w-200 lg:mx-auto">
            <YHeading
              fontSize={FontSize.MD}
              lineHeight={FontLineHeight.Relaxed}
              className="text-blue-400 mb-1 md:mb-3 md:text-xll md:leading-13"
              as="h1"
            >
              {title}
            </YHeading>
            {/* <YText
              fontSize={FontSize.XS}
              lineHeight={FontLineHeight.Loose}
              className="text-blog-gray-200 md:text-sm md:leading-10"
              as="p"
            >
              {excerpt}
            </YText> */}
            {excerpt && (
              <div className="-ml-5">
                <YParagraph content={excerpt} />
              </div>
            )}
          </div>
        </div>
      </section>
    </YLink>
  );
};

// stats container
const getPreTextContainerClasses = (hasCover: boolean) =>
  [
    ...preTextContainerBaseClasses,
    ...(hasCover ? preTextHasCover : preTextNoCover),
  ].join(' ');

const preTextContainerBaseClasses = [
  'flex',
  'flex-wrap',
  'flex-start',
  'items-center',
  'h-5',
];

const preTextHasCover = [
  'absolute',
  'left-4',
  'right-4',
  'bottom-4',
  'md:left-6.5',
  'md:right-6.5',
  'md:bottom-5',
];

const preTextNoCover = ['relative', 'mb-3', 'lg:ml-6.5', 'lg:mb-4'];

// stats props
const getStatProps = (stat: Stat, hasCover: boolean) =>
  ({
    fontSize: FontSize.XS,
    fontWeight: stat === Stat.Category ? FontWeight.Bold : FontWeight.SemiBold,
    className: [
      ...statsBaseClasses,
      ...(hasCover
        ? [
            ...hasImageAdditionalClasses.shared,
            ...hasImageAdditionalClasses[stat],
          ]
        : [...additionalClasses.shared, ...additionalClasses[stat]]),
    ].join(' '),
    key: stat,
    as: 'span',
  } as Parameters<typeof YText>[0]);

const statsBaseClasses = ['flex', 'items-center'];

const additionalClasses = {
  shared: ['text-blog-gray-100'],
  [Stat.Category]: [],
  [Stat.Date]: [],
  [Stat.Views]: ['hidden', 'md:flex'],
};

const hasImageAdditionalClasses = {
  shared: ['text-white'],
  [Stat.Category]: [],
  [Stat.Date]: ['hidden', 'md:block'],
  [Stat.Views]: ['md:absolute', 'md:right-0'],
};

// dot separator
const getSeparatorClasses = (hasCover: boolean) =>
  [
    'w-1',
    'h-1',
    'rounded-full',
    'mx-4',
    hasCover ? 'bg-white' : 'bg-blog-gray-100',
  ].join(' ');

export default PostPreview;
