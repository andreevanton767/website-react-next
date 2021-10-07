import React, { useMemo } from 'react';

import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import images from './images';

import YText from '@/components/YText';
import YHeading from '@/components/YHeading';
import YImage from '@/components/YImage';

import usePrefetch from '@/hooks/usePrefetch';

interface Review {
  image: { filename: string; alt?: string };
  name: string;
  text: string;
}

interface Article {
  icon: string;
  title: string;
  description: string;
}

export interface ReviewsFrame {
  reviews: [Review, Review];
}

export interface ArticlesFrame {
  articles: [Article, Article, Article, Article];
}

type Frames = [ReviewsFrame, ArticlesFrame, ArticlesFrame];

interface Props {
  frames: Frames;
  activeFrame: number;
}

const PersonalizationFrame: React.FC<Props> = ({ frames, activeFrame }) => {
  const prefetchImages = Object.values(images[ScreenSize.LG]);

  usePrefetch(prefetchImages);

  const { reviews } = frames[0];
  const { articles } = [1, 2].includes(activeFrame)
    ? (frames[activeFrame] as Frames[1])
    : { articles: null };

  /**
   * Desktop content
   */
  const desktopReviewsAdditionalClasses = [
    'left-3.5',
    '-right-11.5 translate-x-full',
  ];

  const desktopFrame1 = (
    <div className="w-124.1 h-70 absolute top-0 left-0 z-10">
      <YImage {...images[ScreenSize.LG].mobilePane} />
      <YImage
        className="absolute -top-32.5 -right-5 transform translate-x-full h-120 w-207.6"
        {...images[ScreenSize.LG].websitePane}
      />
      {reviews.map(({ image, name, text }, index) => (
        <article
          key={`${name}-${index}`}
          className={[
            'absolute bottom-25 transform translate-y-full',
            desktopReviewsAdditionalClasses[index],
          ].join(' ')}
        >
          <YImage
            className={[
              'w-15 h-15 rounded-full border-4 overflow-hidden mb-3',
              index == 0 ? 'border-blue-100' : 'border-primary',
            ].join(' ')}
            {...image}
            width={60}
            height={60}
          />
          <YHeading
            fontSize={FontSize.SM}
            lineHeight={FontLineHeight.Relaxed}
            fontWeight={FontWeight.SemiBold}
            as="h3"
            className="text-white ml-0.5 mb-2"
          >
            {name}
          </YHeading>
          <YText
            fontSize={FontSize.XS}
            lineHeight={FontLineHeight.Relaxed}
            className="text-white opacity-50 w-61.6"
            as="p"
          >
            {text}
          </YText>
        </article>
      ))}
    </div>
  );

  const frame2Cover = <YImage {...images[ScreenSize.LG].frame2} />;

  const frame3Cover = (
    <YImage {...images[ScreenSize.LG].frame3} className="w-lg" />
  );

  const desktopFrame2 = (
    <div className="absolute top-5 left-0 w-130.5">
      <div
        className={[
          'absolute -top-60 transform translate-x-full',
          activeFrame == 1 ? '-right-18' : 'right-0',
        ].join(' ')}
      >
        {activeFrame == 1 ? frame2Cover : frame3Cover}
      </div>
      <div className="grid grid-cols-2 gap-10">
        {articles?.map(({ icon, title, description }, index) => {
          const Icon = useMemo(
            () => require(`@/assets/icons/${icon}.svg`).default,
            []
          );

          return (
            <article key={`${title}-${index}`}>
              <div className="w-8 h-8 mb-5 fill-current text-white opacity-50">
                <Icon />
              </div>
              <YHeading
                fontSize={FontSize.SM}
                fontWeight={FontWeight.SemiBold}
                as="h3"
                className="text-white"
              >
                {title}
              </YHeading>
              <YText
                fontSize={FontSize.XS}
                lineHeight={FontLineHeight.Relaxed}
                className="text-white opacity-50"
                as="p"
              >
                {description}
              </YText>
            </article>
          );
        })}
      </div>
    </div>
  );

  const desktopFrames = [desktopFrame1, desktopFrame2, desktopFrame2];

  return <div className="relative">{desktopFrames[activeFrame]}</div>;
};

export default PersonalizationFrame;
