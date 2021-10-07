import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { FontLineHeight, FontSize } from '@/enums/font';

import YButton from '@/components/YButton';
import YHeading from '@/components/YHeading';
import YLink from '@/components/YLink';
import YText from '@/components/YText';

interface ButtonProps {
  text: string;
  link: string;
}

interface Props {
  title: string;
  description: string;
  buttonProps: ButtonProps;
}

const AboutContact: React.FC<Props> = ({
  title,
  description,
  buttonProps: { link, text: buttonText },
}) => {
  const content = (
    <div className="w-full text-center pt-111.1 pb-15 md:text-left md:pt-60 md:w-100 md:pb-75 text-white">
      <YHeading
        fontSize={FontSize.XL}
        lineHeight={FontLineHeight.Relaxed}
        className="pb-3 w-full md:text-xxl md:leading-15"
        as="h1"
      >
        {title}
      </YHeading>
      <YText
        fontSize={FontSize.SM}
        lineHeight={FontLineHeight.Loose}
        className="pb-5 w-full text-gray-300 md:text-gray-200 md:text-base md:leading-11"
        as="p"
      >
        {description}
      </YText>
      <YLink href={link}>
        <YButton
          shadow
          className="px-5 py-3 text-sm leading-6 md:text-md md:leading-7"
        >
          {buttonText}
        </YButton>
      </YLink>
    </div>
  );

  const YImage = useMemo(
    () => dynamic(() => import('@/components/YImage'), { ssr: false }),
    []
  );

  const backgroundImageClasses = [
    'absolute',
    'w-120',
    'h-84.5',
    'top-10',
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    'lg:h-130.1',
    'lg:w-185.1',
    'md:left-100',
    'md:top-1/2',
    'md:-translate-y-1/2',
    'md:translate-x-0',
  ];

  const Cloud = useMemo(() => dynamic(() => import('./Cloud')), []);

  return (
    <section className="w-full overflow-hidden border-soft border-b">
      <div className="container border border-transparent relative md:p-0">
        <Cloud />
        {content}
      </div>
    </section>
  );
};

export default AboutContact;
