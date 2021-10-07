import React, { HTMLAttributes, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { FontLineHeight, FontSize } from '@/enums/font';
import {
  InputButtonSize,
  InputButtonStyle,
  SubscriptionStyle,
} from '@/enums/components';

import YInputButton from '@/components/YInputButton';
import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

export interface Props {
  title: string;
  description: string;
  placeholder?: string;
  buttonText: string;
  type?: SubscriptionStyle;
}

const SubscribeSection: React.FC<Props & HTMLAttributes<HTMLElement>> = ({
  title,
  description,
  buttonText,
  placeholder,
  type = SubscriptionStyle.BlogPost,
  className,
}) => {
  const [renderBackground, setRenderBackground] = useState(false);

  useEffect(() => {
    if (type === SubscriptionStyle.BlogHome) {
      setRenderBackground(true);
    }
  }, []);

  const Background = dynamic(() => import('./BackgroundLetters'));

  return (
    <section
      className={[
        'relative z-20 bg-white w-full overflow-hidden select-none',
        className,
      ].join(' ')}
    >
      <div className={getContianerClasses(type)}>
        {renderBackground && <Background />}
        <YHeading {...getTitleProps(type)}>{title}</YHeading>
        <YText {...getDescriptionProps(type)}>{description}</YText>
        <YInputButton
          placeholder={placeholder}
          {...getInputButtonProps(type, buttonText)}
        />
      </div>
    </section>
  );
};

// container classes
const getContianerClasses = (type: SubscriptionStyle) =>
  [...containerBaseClasses, ...containerByType[type]].join(' ');

const containerBaseClasses = [
  'relative',
  'w-full',
  'py-10',
  'text-center',
  'px-4',
  'lg:mx-auto',
];

const containerByType = {
  [SubscriptionStyle.BlogHome]: [
    'shadow-blog-sm',
    'lg:my-15',
    'lg:pl-15',
    'lg:max-w-7xl',
    'lg:py-20.5',
    'lg:text-left',
    'lg:shadow-blog-lg',
    'lg:pl-35',
  ],
  [SubscriptionStyle.BlogPost]: [
    'border-blog-gray-300',
    'border-t',
    'border-b',
    'lg:max-w-189',
    'lg:px-auto',
  ],
};

// title classes
const getTitleProps = (type: SubscriptionStyle) =>
  ({
    fontSize: FontSize.XL,
    className: [
      'text-blue-400',
      'lg:leading-13',
      type === SubscriptionStyle.BlogHome
        ? 'mb-1 mt-37.5 lg:mt-0 lg:text-xxl'
        : 'mb-2 lg:mb-1 lg:text-xll',
    ].join(' '),
    as: 'h1',
  } as Parameters<typeof YHeading>[0]);

// description props
const getDescriptionProps = (type: SubscriptionStyle) =>
  ({
    ...descriptionProps[type],
    className: [...descriptionBaseClasses, ...descriptionClasses[type]].join(
      ' '
    ),
    as: 'p',
  } as Parameters<typeof YText>[0]);

const descriptionProps = {
  [SubscriptionStyle.BlogHome]: {
    fontSize: FontSize.SM,
    lineHeight: FontLineHeight.Loose,
  },
  [SubscriptionStyle.BlogPost]: {
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.Relaxed,
  },
};

const descriptionBaseClasses = ['text-blog-gray-200', 'mb-5'];

const descriptionClasses = {
  [SubscriptionStyle.BlogHome]: [],
  [SubscriptionStyle.BlogPost]: ['lg:text-sm', 'lg:leading-8', 'lg:mb-7'],
};

// input button props
const getInputButtonProps = (type: SubscriptionStyle, buttonText: string) => ({
  size: InputButtonSize.LG,
  inputStyle:
    type === SubscriptionStyle.BlogHome
      ? InputButtonStyle.BlogBlack
      : InputButtonStyle.BlogGreen,
  buttonText,
  className: [...inputBaseClasses, ...inputClassesByType[type]].join(' '),
});

const inputBaseClasses = ['w-75', 'mx-auto'];

const inputClassesByType = {
  [SubscriptionStyle.BlogHome]: ['lg:w-xs', 'lg:mx-0'],
  [SubscriptionStyle.BlogPost]: ['lg:w-100'],
};

export default SubscribeSection;
