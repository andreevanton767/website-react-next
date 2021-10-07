import { AllHTMLAttributes, createElement } from 'react';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

interface Props extends AllHTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  fontSize?:
    | FontSize.XXS
    | FontSize.XS
    | FontSize.SM
    | FontSize.MD
    | FontSize.LG;
  fontWeight?:
    | FontWeight.Regular
    | FontWeight.SemiBold
    | FontWeight.Bold
    | FontWeight.ExtraBold;
  lineHeight?: FontLineHeight;
}

export default function YText({
  as = 'span',
  fontSize = FontSize.MD,
  fontWeight = FontWeight.Regular,
  lineHeight = FontLineHeight.Tight,
  children,
  className = '',
  ...props
}: Props): JSX.Element {
  const CustomTag = as as keyof JSX.IntrinsicElements;

  const classes = getFontClasses({ fontSize, lineHeight, fontWeight });
  classes.push('font-sans select-none');

  return createElement(
    CustomTag,
    { className: `${classes.join(' ')} ${className}`.trim(), ...props },
    children
  );
}

/**
 * Returns the font classes
 *
 * @param fontSize
 * @param lineHeight
 * @param fontWeight
 */
const getFontClasses = ({ fontSize, lineHeight, fontWeight }): string[] => {
  return [
    fontSizeLookup[fontSize]?.fontSize,
    fontSizeLookup[fontSize].lineHeight[lineHeight],
    fontWeightLookup[fontWeight],
  ];
};

const fontSizeLookup = {
  [FontSize.XXS]: {
    fontSize: 'text-xxs',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-4',
      [FontLineHeight.Relaxed]: 'leading-6',
      [FontLineHeight.Loose]: 'leading-8',
    },
  },
  [FontSize.XS]: {
    fontSize: 'text-xs',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-5',
      [FontLineHeight.Relaxed]: 'leading-7',
      [FontLineHeight.Loose]: 'leading-9',
    },
  },
  [FontSize.SM]: {
    fontSize: 'text-sm',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-6',
      [FontLineHeight.Relaxed]: 'leading-8',
      [FontLineHeight.Loose]: 'leading-10',
    },
  },
  [FontSize.MD]: {
    fontSize: 'text-md',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-7',
      [FontLineHeight.Relaxed]: 'leading-9',
      [FontLineHeight.Loose]: 'leading-11',
    },
  },
  [FontSize.LG]: {
    fontSize: 'text-lg',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-9',
      [FontLineHeight.Relaxed]: 'leading-11',
      [FontLineHeight.Loose]: 'leading-12',
    },
  },
  [FontSize.XL]: {
    fontSize: 'text-xl',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-11',
      [FontLineHeight.Relaxed]: 'leading-12',
      [FontLineHeight.Loose]: 'leading-13',
    },
  },
  [FontSize.XXL]: {
    fontSize: 'text-xxl',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-13',
      [FontLineHeight.Relaxed]: 'leading-15',
      [FontLineHeight.Loose]: 'leading-17',
    },
  },
  [FontSize['2XL']]: {
    fontSize: 'text-2xl',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-17',
      [FontLineHeight.Relaxed]: 'leading-18',
      [FontLineHeight.Loose]: 'leading-19',
    },
  },
  [FontSize['3XL']]: {
    fontSize: 'text-3xl',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-17',
      [FontLineHeight.Relaxed]: 'leading-18',
      [FontLineHeight.Loose]: 'leading-19',
    },
  },
  [FontSize['4XL']]: {
    fontSize: 'text-4xl',
    lineHeight: {
      [FontLineHeight.Tight]: 'leading-19',
      [FontLineHeight.Relaxed]: 'leading-20',
      [FontLineHeight.Loose]: 'leading-21',
    },
  },
};

const fontWeightLookup = {
  [FontWeight.Regular]: 'font-normal',
  [FontWeight.SemiBold]: 'font-semibold',
  [FontWeight.Bold]: 'font-bold',
  [FontWeight.ExtraBold]: 'font-extrabold',
};
