import React from 'react';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

import style from './AboutDifferent.module.css';

interface Article {
  title: string;
  subtitle: string;
  text: string;
}

interface Props {
  title: string;
  articles: Article[];
}

const AboutDifferent: React.FC<Props> = ({ title, articles }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className={[
          'absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-8xl h-115 md:h-100 -z-10',
          style.gradient,
        ].join(' ')}
      />
      <div className="container relative mb-15 md:mb-26 text-left z-20">
        <YHeading
          fontSize={FontSize.XL}
          lineHeight={FontLineHeight.Relaxed}
          fontWeight={FontWeight.SemiBold}
          className="text-primary mt-5 mb-7 w-36 md:text-3xl md:leading-13 lg:absolute lg:top-0 lg:left-0 lg:w-56.1"
          as="h1"
        >
          {title}
        </YHeading>
        <div className="grid grid-cols-1 gap-9 lg:ml-80 md:grid-cols-2 md:gap-x-25 md:gap-y-16">
          {articles.map(({ title, subtitle, text }, index) => (
            <article
              key={`${title}-${index}`}
              className="w-full border-t border-blue-100 pt-6 md:pt-9"
            >
              <YHeading
                fontSize={FontSize.MD}
                fontWeight={FontWeight.SemiBold}
                className="text-gray-300 mb-4 md:text-lg md:leading-9 md:text-gray-400 md:mb-6"
                as="h2"
              >
                {title}
              </YHeading>
              <YHeading
                fontSize={FontSize.LG}
                lineHeight={FontLineHeight.Relaxed}
                className="text-white mb-2 md:text-xxl md:leading-15 md:mb-5"
                as="h3"
              >
                {subtitle}
              </YHeading>
              <YText
                fontSize={FontSize.SM}
                lineHeight={FontLineHeight.Loose}
                className="text-gray-300 md:text-base md:leading-11"
                as="p"
              >
                {text}
              </YText>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDifferent;
