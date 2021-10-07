import React, { HTMLAttributes, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

import { FontSize, FontWeight, FontLineHeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import useBreakpoint from '@/hooks/useBreakpoint';

import { Card } from './BackgroundGridLG';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YOutLink from '@/components/YOutLink';
import YImage from '@/components/YImage';
import YConditinoalButton, {
  ButtonProps,
} from '@/components/YConditionalButton/YConditionalButton';

export interface PartnerCompany {
  logo: string;
  link: string;
  title: string;
}

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  buttonProps: ButtonProps;
  showCompanies?: boolean;
  partners?: PartnerCompany[];
  cards?: Card[];
}

const HomeTop: React.FC<Props> = ({
  title,
  description,
  buttonProps,
  showCompanies = false,
  partners,
  cards,
  ...props
}) => {
  const { screenSize, screenReady } = useBreakpoint();

  const sectionRef = useRef<HTMLElement>();

  const renderCompanies = partners.map(({ logo, title, link }) => {
    const PartnerLogo = useMemo(
      () => require(`@/assets/icons/${logo}.svg`).default,
      []
    );
    return (
      <YOutLink
        key={title}
        href={link}
        className="outline-none mr-15 inline-block scroll-x-item"
        aria-label={`${title} website`}
      >
        <PartnerLogo />
      </YOutLink>
    );
  });

  const BackgroundGrid = useMemo(
    () =>
      dynamic(
        () =>
          screenSize == ScreenSize.LG
            ? import('./BackgroundGridLG')
            : import('./BackgroundGridSM'),
        { ssr: false }
      ) as React.FC<{
        cards: typeof cards;
      }>,
    [screenSize]
  );

  return (
    <section
      {...props}
      ref={sectionRef}
      className="relative overflow-hidden select-none"
    >
      <div className="container relative pt-88.1 lg:px-0 lg:pt-48.5">
        <div
          className={[
            'absolute top-0 md:right-0 lg:right-auto home-top-grid',
          ].join(' ')}
        >
          {screenReady && (
            <>
              <YImage
                className="absolute top-6.5 left-5.5 w-503.25 h-385.5 lg:w-404 lg:left-2"
                filename="https://a.storyblok.com/f/98632/2013x1542/3fc365e9cf/hometop-grid-sm.png"
                width={2013}
                height={1542}
                srcSet={{
                  [ScreenSize.LG]:
                    'https://a.storyblok.com/f/98632/1616x1542/154b45d9c1/hometop-grid-lg.png',
                }}
                responsive={{
                  [ScreenSize.LG]: {
                    width: 1616,
                    height: 1542,
                  },
                }}
                alt="transparent cards on grid in background"
                preload
              />
              <BackgroundGrid cards={cards} />
            </>
          )}
        </div>
        <div className="relative z-20 max-w-md lg:w-100">
          <YHeading
            fontSize={FontSize.XXL}
            fontWeight={FontWeight.ExtraBold}
            lineHeight={FontLineHeight.Tight}
            className="text-white mb-2 w-65 lg:mb-5 lg:text-4xl lg:leading-20 lg:w-full"
            as="h1"
          >
            {title} <br />
          </YHeading>
          <YText
            fontSize={FontSize.SM}
            lineHeight={FontLineHeight.Relaxed}
            className="text-gray-300 mb-5 lg:mb-8 lg:text-md lg:leading-11"
            as="p"
          >
            {description} <br />
          </YText>
          <YConditinoalButton
            className="mb-10 lg:mb-36"
            {...buttonProps}
            sectionRef={sectionRef}
          />
        </div>
        <div
          className={[
            'relative',
            'z-20',
            'w-full',
            'h-6.5',
            'mb-20.1',
            'lg:mx-auto',
            'overflow-y-hidden',
            'whitespace-nowrap',
            'lg:flex',
            'lg:justify-center',
            'lg:overflow-hidden',
            'scroll-x-container',
          ].join(' ')}
        >
          {showCompanies && partners && renderCompanies}
        </div>
      </div>
      <br />
    </section>
  );
};

export default HomeTop;
