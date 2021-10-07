import { createElement, useRef, forwardRef, MutableRefObject } from 'react';
import { ButtonShape, ButtonSize } from '@/enums/components';
import styles from './YButton.module.css';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';

type Props = AriaButtonProps & {
  as?: keyof JSX.IntrinsicElements;
  buttonSize?: ButtonSize;
  shape?: ButtonShape;
  shadow?: boolean;
  className?: string;
};

const YButton = forwardRef(
  (
    {
      as = 'button',
      buttonSize = ButtonSize.MD,
      shape = ButtonShape.Square,
      shadow = false,
      children,
      className: classes,
      ...props
    }: Props,
    forwardedRef?: MutableRefObject<HTMLElement>
  ): JSX.Element => {
    const CustomTag = as as keyof JSX.IntrinsicElements;

    const fallbackRef = useRef();
    const ref = forwardedRef || fallbackRef;

    const { buttonProps } = useButton({ ...props } as AriaButtonProps, ref);

    const defaultClasses = [
      styles.base,
      'bg-primary',
      'rounded',
      'font-serif',
      'font-semibold',
      'text-white',
      'select-none',
      'cursor-pointer',
    ];

    const shapeClass = shape === ButtonShape.Square ? '' : 'rounded-4xl';
    const shadowClass = shadow ? styles.shadow : '';

    const filteredSizeClasses = filterSizeClasses(
      ['px', 'py', 'text', 'leading'],
      classes,
      sizeClasses[buttonSize]
    );

    const className = [
      ...filterColorClass(classes, defaultClasses),
      ...filteredSizeClasses,
      shapeClass,
      shadowClass,
      classes,
    ].join(' ');

    return createElement(
      CustomTag,
      {
        className,
        ref,
        ...buttonProps,
      },
      children,
      ''
    );
  }
);

const filterSizeClasses = (classType: string[], classes, sizeClasses) => {
  if (!classes) return sizeClasses;

  let result: string[] = [...sizeClasses];

  classType.forEach((type) => {
    result = classes.includes(type)
      ? result.filter((value) => !value.includes(type))
      : result;
  });

  return result;
};

const filterColorClass = (classes: string, defaultClasses: string[]) => {
  if (!classes) return defaultClasses;

  let result: string[] = [...defaultClasses];

  result = classes.includes('bg')
    ? result.filter(
        (value) => !value.includes('bg') && !value.includes('text-white')
      )
    : result;

  return result;
};

const sizeClasses = {
  [ButtonSize.XS]: ['px-4.6', 'py-1.9', 'text-xxs', 'leading-4'],
  [ButtonSize.SM]: ['px-4.5', 'py-2.5', 'text-xs', 'leading-5'],
  [ButtonSize.MD]: ['px-5', 'py-3', 'text-sm', 'leading-6'],
  [ButtonSize.LG]: ['px-5', 'py-3', 'text-md', 'leading-7'],
};

export default YButton;
