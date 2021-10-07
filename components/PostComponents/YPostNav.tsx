import React from 'react';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

import usePostNav from '@/hooks/usePostNav';

import { __fallbackIntroHeading__ } from '@/libs/constants';

type Sections = ReturnType<typeof usePostNav>['sections'];

interface Props extends React.HTMLAttributes<HTMLElement> {
  contentsLabel: string;
  sections: Sections;
  registerNavBox?: (node: HTMLElement) => void;
}

const YPostNav: React.FC<Props> = ({
  sections,
  className,
  contentsLabel,
  registerNavBox = () => {},
}) => {
  return (
    <nav
      ref={registerNavBox}
      className={['w-52.5 select-none', className].join(' ')}
    >
      <span className="inline-block relative w-auto">
        <YHeading
          fontSize={FontSize.XXS}
          fontWeight={FontWeight.SemiBold}
          className="text-blog-gray-100 uppercase leading-none block mb-2"
          as="h2"
        >
          {contentsLabel}
        </YHeading>
        <span className="block w-1/2 h-0.5 bg-blog-gray-100 mb-2" />
      </span>
      <ul>
        {sections.map(({ heading, isIntersecting, onClick }) =>
          heading !== __fallbackIntroHeading__ ? (
            <YText
              key={heading}
              onClick={onClick}
              {...getTextProps(isIntersecting)}
            >
              {heading}
            </YText>
          ) : null
        )}
      </ul>
    </nav>
  );
};

const getTextProps = (isIntersecting: boolean) =>
  ({
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.Relaxed,
    className: [
      'py-1.5',
      'cursor-pointer',
      ...(isIntersecting
        ? ['font-bold', 'text-primary']
        : ['font-semibold', 'text-blog-gray-200']),
    ].join(' '),
    as: 'li',
  } as Parameters<typeof YText>[0]);

export default YPostNav;
