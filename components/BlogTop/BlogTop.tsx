import React, { HTMLAttributes } from 'react';

import { BlogTopType, ButtonShape, Service } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YButton from '@/components/YButton';
import YHeading from '@/components/YHeading';
import YLink from '@/components/YLink';
import YText from '@/components/YText';

import HeroImage from './HeroImage';

import yTrimExcerpt from '@/libs/utils/yTrimExcerpt';

import useTranslations from '@/hooks/useTranslations';

export interface BlogTopAdditionalProps {
  firstPublished: string;
  buttonText: string;
  featuredPostLabel: string;
  postSlug: string;
}

export interface BlogTopProps {
  title: string;
  text: string;
  categories: Service[];
  type?: BlogTopType;
}

type Props = BlogTopProps &
  Partial<BlogTopAdditionalProps> &
  HTMLAttributes<HTMLElement>;

const BlogTop: React.FC<Props> = ({
  categories,
  firstPublished,
  text,
  title,
  buttonText,
  featuredPostLabel,
  type = BlogTopType.Home,
  postSlug,
  className,
}) => {
  const { getCategoryStrings, getDateString } = useTranslations();

  const categoryNameString = getCategoryStrings(categories);

  const preText = (
    <div className="mb-1 lg:whitespace-nowrap lg:mb-4 select-none">
      <YText className="w-full text-primary lg:hidden uppercase">
        {featuredPostLabel}
      </YText>
      <YText
        fontSize={FontSize.XS}
        fontWeight={FontWeight.Bold}
        className="hidden text-blog-gray-100 opacity-50 mr-4 lg:inline-block"
      >
        {categoryNameString}
      </YText>
      <YText
        fontSize={FontSize.XS}
        fontWeight={FontWeight.SemiBold}
        className="hidden text-blog-gray-100 opacity-50 lg:inline-block"
      >
        {getDateString(firstPublished)}
      </YText>
    </div>
  );

  const buttonElement = (
    <YLink href={`blog/p/${postSlug}`}>
      <YButton
        shape={ButtonShape.Round}
        className="text-xs leading-5 px-4 py-2 lg:px-4.5 lg:py-2.5 bg-blue-400 select-none"
      >
        {buttonText}
      </YButton>
    </YLink>
  );

  return (
    <section className={['relative w-full', className].join(' ')}>
      <div className="relative container border border-white pb-10 lg:pb-0 lg:h-180">
        <HeroImage
          className="absolute w-84.5 top-15 left-1/2 transform -translate-x-1/2 lg:w-150 lg:left-auto lg:right-0 lg:w-156 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
          service={categories[0]}
        />
        <div className="relative z-20 max-w-md text-center mx-auto mt-100 lg:mt-0 lg:text-left lg:mx-0 lg:max-w-none lg:w-100 lg:absolute lg:left-13.6 lg:top-1/2 lg:transform lg:-translate-y-1/2">
          {type === BlogTopType.Home && preText}
          <YHeading
            fontSize={FontSize.XL}
            lineHeight={FontLineHeight.Relaxed}
            className="text-blue-400 w-full text-center mb-1 lg:mb-4 lg:text-4xl lg:leading-19 lg:text-left select-none"
            as="h1"
          >
            {title}
          </YHeading>
          <YText
            fontSize={FontSize.SM}
            lineHeight={FontLineHeight.Loose}
            className="text-blog-gray-100 mb-3 lg:mb-5 lg:w-94.6 select-none"
            as="p"
          >
            {yTrimExcerpt(text, 250)}
          </YText>
          {type === BlogTopType.Home && buttonElement}
        </div>
      </div>
    </section>
  );
};

export default BlogTop;
