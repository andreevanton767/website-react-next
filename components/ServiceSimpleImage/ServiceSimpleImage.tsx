import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { TextPosition } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

interface Props {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  textPosition?: TextPosition;
}

const ServiceSimpleImage: React.FC<Props> = ({
  title,
  subtitle,
  text,
  image,
  textPosition = TextPosition.Right,
}) => {
  const ImageElement = useMemo(
    () =>
      dynamic(() => import(`@/assets/illustrations/${image}.svg`), {
        ssr: false,
      }),
    []
  );

  return (
    <section className="w-full pt-12.5 pb-10 lg:py-30 border-b border-soft">
      <div className="container lg:px-0">
        <div
          className={[
            'relative',
            'lg:h-119',
            'lg:w-162',
            'lg:transform',
            ...containerClasses[textPosition],
          ].join(' ')}
        >
          <div className="w-full h-224 mb-10 lg:mb-0 lg:px-auto">
            <ImageElement />
          </div>
          <div
            className={[
              'lg:absolute',
              'lg:w-100',
              'lg:top-1/2',
              'lg:transform',
              'lg:-translate-y-1/2',
              ...textBoxClasses[textPosition],
            ].join(' ')}
          >
            <YHeading
              {...titleProps}
              className="text-gray-400 hidden lg:block mb-3"
            >
              {title}
            </YHeading>
            <YHeading
              fontSize={FontSize.LG}
              className="text-white mb-2 lg:mb-4 lg:text-xxl lg:leading-13"
              as="h2"
            >
              {subtitle}
            </YHeading>
            <YText
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-gray-400 lg:text-base lg:leading-9"
              as="p"
            >
              {text}
            </YText>
          </div>
        </div>
      </div>
    </section>
  );
};

const textBoxClasses = {
  [TextPosition.Left]: ['lg:-left-125'],
  [TextPosition.Right]: ['lg:-right-125'],
};

const containerClasses = {
  [TextPosition.Left]: ['lg:mr-0', 'lg:ml-auto', 'lg:translate-x-16.6'],
  [TextPosition.Right]: ['lg:ml-0', 'lg:mr-auto', 'lg:-translate-x-16.6'],
};

const titleProps = {
  fontSize: FontSize.LG,
  fontWeight: FontWeight.SemiBold,
  lineHeight: FontLineHeight.Relaxed,
  as: 'h1',
} as Parameters<typeof YHeading>[0];

export default ServiceSimpleImage;
