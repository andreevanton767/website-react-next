import React, { useRef } from 'react';

import { FontLineHeight, FontSize } from '@/enums/font';
import { FeaturedPosts } from '@/enums/components';

import YArticleCard, { ArticleProps } from '@/components/YLatestArticlesCard';
import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import ScrollControl from './ScrollControl';

import yTrimExcerpt from '@/libs/utils/yTrimExcerpt';

export interface Props {
  title: string;
  moreArticlesLabel: string;
  articles?: Omit<ArticleProps, 'type'>[];
}

const PostsSlider: React.FC<Props> = ({
  title,
  articles,
  moreArticlesLabel,
}) => {
  const numArticles = articles?.length || 0;
  const moreArticlesString = `${numArticles} ${moreArticlesLabel}`;

  const containerRef = useRef<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden h-sm pt-9 lg:h-lg lg:pt-40 select-none">
      <div className="relative h-full lg:absolute lg:left-0 lg:right-0 lg:flex lg:items-start 2xl:left-1/2 2xl:-right-154.5 2xl:transform 2xl:-translate-x-154.5">
        <div className="relative px-5 lg:pt-10 lg:px-8 lg:w-60 lg:h-122.5 lg:border-l lg:border-blog-gray-300">
          <YHeading
            fontSize={FontSize.LG}
            lineHeight={FontLineHeight.Relaxed}
            className="text-blue-400 lg:text-xll lg:leading-13 lg:mb-1.5"
            as="h1"
          >
            {title}
          </YHeading>
          <YText
            fontSize={FontSize.SM}
            className="text-blog-gray-200 mb-7 lg:leading-8"
            as="p"
          >
            {moreArticlesString}
          </YText>
          <ScrollControl
            className="hidden lg:flex absolute left-8 bottom-10 items-center h-11"
            containerRef={containerRef}
          />
        </div>
        <div
          className="lg:absolute scroll-pl-5 left-60 right-0 scroll-x-container"
          ref={containerRef}
        >
          <div className="whitespace-nowrap scroll-x-item">
            <div className="inline-block h-full w-0 mr-5" />
            {articles?.map(({ intro, ...article }) => (
              <YArticleCard
                key={article.slug}
                className="inline-block whitespace-normal align-top scroll-x-item w-81 h-126.5 mr-5 lg:w-86 lg:h-122.5 lg:mr-7"
                type={FeaturedPosts.BlogPost}
                intro={yTrimExcerpt(intro, 130)}
                {...article}
              />
            ))}
            <div className="inline-block h-full w-0 scroll-x-item" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsSlider;
