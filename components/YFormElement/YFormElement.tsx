import React, { useRef, createElement } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { InputElement, InputStyle, InputType } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YText from '@/components/YText';

interface Props extends AriaTextFieldProps {
  style?: InputStyle;
  element?: InputElement;
  inputType?: InputType;
  className?: string;
  info?: string;
  error?: boolean;
  errorMessage?: string;
}

const YFormElement: React.FC<Props> = ({
  style = InputStyle.Light,
  element = InputElement.Input,
  inputType = InputType.Text,
  className: classes = '',
  info,
  error,
  errorMessage,
  ...props
}) => {
  const { label } = props;
  const ref = useRef();

  const { labelProps, inputProps } = useTextField(
    { ...props, type: inputType } as AriaTextFieldProps,
    ref
  );

  const inputElement = createElement(element, {
    ref,
    ...inputProps,
    className: getInputClasses(element, style),
  });

  const className = ['relative', ...classes.split(' ')].join(' ');

  return (
    <div className={addBasicWidth(className)}>
      <label {...labelProps}>
        <YText
          fontWeight={FontWeight.SemiBold}
          className="text-gray-300"
          fontSize={FontSize.XS}
        >
          {label}
        </YText>
      </label>
      {inputElement}
      {info && (
        <YText
          className="text-gray-400 absolute bottom-0 transform translate-y-full"
          {...messageProps}
        >
          {info}
        </YText>
      )}
      {error && (
        <YText
          className="text-red-300 absolute bottom-0 transform translate-y-full"
          {...messageProps}
        >
          {`* ${errorMessage}`}
        </YText>
      )}
    </div>
  );
};

const messageProps = {
  fontSize: FontSize.XXS,
  lineHeight: FontLineHeight.Relaxed,
  as: 'p',
} as Parameters<typeof YText>[0];

const addBasicWidth = (className: string) =>
  className.includes(' w-') ? className : `${className} w-65`;

const getInputClasses = (element: InputElement, style: InputStyle) =>
  [...baseClasses, sizeClasses[element], colorClasses[style]].join(' ');

const baseClasses = [
  'w-full',
  'mt-3',
  'py-4',
  'px-5',
  'mb-1',
  'rounded',
  'text-gray-300',
  'border-none',
  'border',
  'outline-none',
  'border-blue-100',
  'focus:border-solid',
];

const sizeClasses = {
  [InputElement.Input]: 'h-13',
  [InputElement.TextArea]: 'h-25 resize-none no-scrollbar',
};

const colorClasses = {
  [InputStyle.Dark]: 'bg-white bg-opacity-15',
  [InputStyle.Light]: 'bg-gray-100',
};

export default YFormElement;
