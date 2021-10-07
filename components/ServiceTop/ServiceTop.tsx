import React, { useRef } from 'react';
import { Service } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YConditionalButton, {
  ButtonProps,
} from '@/components/YConditionalButton/YConditionalButton';

interface Props {
  title: string;
  description: string;
  buttonProps: ButtonProps;
  serviceLabel: string;
  service: Service;
}

import HeroImage from './HeroImage';

const ServiceTop: React.FC<Props> = ({
  title,
  description,
  buttonProps,
  serviceLabel,
  service,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full border-b border-soft"
    >
      <div className="container lg:px-0">
        <div className="relative w-full mb-10 pt-80 lg:pt-0 lg:my-37.5 lg:w-150 lg:h-125 lg:ml-auto lg:mr-0">
          <HeroImage
            className="absolute w-96 h-80 lg:h-125 lg:w-150 top-11.5 sm:left-1/2 sm:transform sm:-translate-x-1/2 md:transform-none lg:transform lg:left-0 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:w-full"
            service={service}
          />
          <div className="max-w-md lg:max-w-none lg:w-100 lg:absolute lg:top-1/2 lg:transform lg:-translate-x-120 lg:-translate-y-1/2">
            <YHeading
              fontSize={FontSize.XS}
              fontWeight={FontWeight.Regular}
              className="text-primary mb-2 lg:mb-3 lg:text-base"
              as="h2"
            >
              {serviceLabel}
            </YHeading>
            <YHeading
              fontSize={FontSize.XL}
              lineHeight={FontLineHeight.Relaxed}
              className="text-white w-37.5 mb-2 lg:mb-3 lg:w-full lg:text-4xl lg:leading-21"
              as="h1"
            >
              {title}
            </YHeading>
            <YText
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-gray-300 mb-5 lg:mb-6 lg:w-94.6 lg:text-base lg:leading-11"
              as="p"
            >
              {description}
            </YText>
            <YConditionalButton {...buttonProps} sectionRef={sectionRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTop;
