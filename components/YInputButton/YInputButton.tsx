import React, { InputHTMLAttributes, useRef, useState } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import {
  ButtonShape,
  InputButtonSize,
  InputButtonStyle,
} from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';

import YButton from '@/components/YButton';

interface Props extends AriaTextFieldProps {
  size?: InputButtonSize;
  inputStyle?: InputButtonStyle;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

const YInputButton: React.FC<Props> = ({
  buttonText,
  placeholder,
  className,
  inputStyle = InputButtonStyle.Default,
  size = InputButtonSize.SM,
  ...props
}) => {
  const [inputText, setInputText] = useState('');

  const ref = useRef();

  const { inputProps } = useTextField(
    { ...props, 'aria-label': 'Email input' } as AriaTextFieldProps,
    ref
  ) as {
    inputProps: InputHTMLAttributes<HTMLInputElement>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /**@TODO integrate with segment */
    window.analytics.alias(inputText, {}, () => {
      window.analytics.identify(inputText);
    });

    console.log(inputText);
  };

  return (
    <form
      className={getContainerClasses(inputStyle, size, className)}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        placeholder={placeholder || 'your email'}
        className={getInputClasses(inputStyle, size)}
      />
      <YButton type="submit" {...getButtonProps(inputStyle, size)}>
        {buttonText || 'Sign Up'}
      </YButton>
    </form>
  );
};

// container classes
const getContainerClasses = (
  style: InputButtonStyle,
  size: InputButtonSize,
  className: string
) =>
  [
    ...filterSizeClasses(className, containerBaseClasses),
    ...additionalClasses[size],
    ...(style === InputButtonStyle.Default
      ? ['bg-white', 'bg-opacity-15']
      : ['bg-transparent']),
  ].join(' ');

const containerBaseClasses = [
  'flex',
  'items-center',
  'justify-center',
  'rounded',
  'overflow-hidden',
];

const additionalClasses = {
  [InputButtonSize.SM]: ['py-1.9', 'pr-1.9', 'h-13', 'w-81.1'],
  [InputButtonSize.LG]: [
    'flex-wrap',
    'w-full',
    'sm:flex-nowrap',
    'sm:h-13',
    'sm:w-81.1',
  ],
};

// input field classes
const getInputClasses = (style: InputButtonStyle, size: InputButtonSize) =>
  [
    ...inputBase,
    ...(style === InputButtonStyle.Default
      ? inputColorClasses[style]
      : inputColorClasses[InputButtonStyle.BlogGreen]),
    ...inputSizeClasses[size],
  ].join(' ');

const inputBase = [
  'w-full',
  'pl-5',
  'focus:outline-none',
  'rounded',
  'placeholder-current',
];

const inputColorClasses = {
  [InputButtonStyle.Default]: [
    'text-white',
    'text-opacity-50',
    'bg-transparent',
  ],
  [InputButtonStyle.BlogGreen]: ['text-blog-gray-100', 'bg-blog-gray-400'],
};

const inputSizeClasses = {
  [InputButtonSize.SM]: ['h-full', 'mr-3'],
  [InputButtonSize.LG]: ['h-12', 'mb-4', 'sm:mb-0', 'sm:h-full', 'sm:mr-3'],
};

// button classes
const getButtonProps = (style: InputButtonStyle, size: InputButtonSize) => ({
  shape: size === InputButtonSize.LG ? ButtonShape.Round : ButtonShape.Square,
  className: [
    ...buttonBaseClasses,
    ...(size === InputButtonSize.LG
      ? [
          ...buttonLgAdditional,
          style === InputButtonStyle.BlogGreen ? 'sm:bg-primary' : '',
        ]
      : []),
  ].join(' '),
});

const buttonBaseClasses = [
  'text-xs',
  'whitespace-nowrap',
  'h-full',
  'flex',
  'items-center',
  'justify-center',
  'px-4.5',
];

const buttonLgAdditional = [
  'bg-blue-400',
  'py-2.5',
  'sm:py-auto',
  'sm:rounded',
];

const filterSizeClasses = (className: string, baseClasses: string[]) => {
  if (!className) return baseClasses;

  const prefixes = [
    '',
    ...Object.values(ScreenSize).map((scrSize) => `${scrSize}:`),
  ];
  const sizeClasses = ['w-', 'h-'];

  let filteredBaseClasses = [...baseClasses];

  prefixes.forEach((prefix) => {
    sizeClasses.forEach((sizeClass) => {
      const testClass = `${prefix}${sizeClass}`;

      if (className.includes(testClass)) {
        filteredBaseClasses = filteredBaseClasses.filter(
          (className) => !className.includes(testClass)
        );
      }
    });
  });

  return [...filteredBaseClasses, className];
};

export default YInputButton;
