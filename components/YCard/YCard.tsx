import React, { createElement, useMemo, useRef } from 'react';
import { useHover, HoverProps } from '@react-aria/interactions';

import YLink from '@/components/YLink';
import YContitionalWrapper from '@/components/YConditionalWrapper';

type CardProps = HoverProps & {
  title?: string;
  description?: string;
  icon?: string;
  className?: string;
  onHover?: () => void;
  hovered?: boolean;
};

interface Props extends CardProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  cardClasses?: string;
  link?: string;
  style?: React.CSSProperties;
}

// wrapper component
const YCard: React.FC<Props> = ({
  as,
  className: classes,
  cardClasses,
  children,
  icon,
  title,
  description,
  hovered,
  link,
  style,
  onHoverStart,
  onHoverEnd,
}) => {
  const customTag = as ? as : 'div';

  const ref = useRef();

  const { hoverProps } = useHover({ onHoverStart, onHoverEnd });

  // text section

  const text =
    title && description ? (
      <React.Fragment key="text">
        <p key="title" className="text title serif">
          {title}
        </p>
        <p key="subtitle" className="text subtitle sans">
          {description}
        </p>
      </React.Fragment>
    ) : (
      <React.Fragment key="text">
        <div
          key="placeholder-title"
          className="placeholder placeholder-title"
        />
        <div
          key="placeholder-subtitle"
          className="placeholder placeholder-subtitle"
        />
      </React.Fragment>
    );

  // icon section
  const NewIcon = useMemo(
    () => require(`@/assets/icons/${icon}.svg`).default,
    []
  );

  const iconElement = (
    <div key="icon" className="icon fill-current flex items-stretch">
      <NewIcon />
    </div>
  );

  // topface section
  const className = [
    ...baseClasses,
    cardClasses,
    hovered ? 'card-blue' : 'card-white',
  ].join(' ');

  const Card = createElement(
    customTag,
    {
      ref,
      className,
      ...hoverProps,
      // ...cardHoverProps,
    },
    [iconElement, text]
  );

  const linkWrapper = ({ children }) => <YLink href={link}>{children}</YLink>;

  // container element section
  const containerClasses = ['w-43.6 h-53.6 select-none', classes].join(' ');
  return (
    <YContitionalWrapper condition={Boolean(link)} wrapper={linkWrapper}>
      <div
        style={style}
        className={[
          containerClasses,
          link ? 'cursor-pointer' : 'cursor-normal',
        ].join(' ')}
      >
        {Card}
        {children}
      </div>
    </YContitionalWrapper>
  );
};

const baseClasses = [
  'rounded',
  'mt-2',
  'ml-3',
  'px-2.5',
  'z-10',
  'w-40',
  'h-50',
  'pt-6.5',
];

export default YCard;
