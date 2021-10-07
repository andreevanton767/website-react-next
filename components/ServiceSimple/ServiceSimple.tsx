import React from 'react';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';

interface Props {
  heading: string;
  description: string;
}

const ServiceSimple: React.FC<Props> = ({ heading, description }) => {
  return (
    <section className="relative w-full border-soft border-b py-15 md:py-40">
      <div className="container md:flex md:justify-between">
        <YHeading
          fontSize={FontSize.XL}
          fontWeight={FontWeight.SemiBold}
          lineHeight={FontLineHeight.Relaxed}
          as="h1"
          className="text-primary w-35 mb-5 md:w-54.5 md:text-4xl md:leading-19"
        >
          {heading}
        </YHeading>
        <YHeading
          fontSize={FontSize.LG}
          lineHeight={FontLineHeight.Loose}
          fontWeight={FontWeight.SemiBold}
          className="text-white w-full mb-5 md:w-190 md:text-xxl md:leading-17"
        >
          {description}
        </YHeading>
      </div>
    </section>
  );
};

export default ServiceSimple;
