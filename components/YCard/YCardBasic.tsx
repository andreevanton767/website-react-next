import React, { useMemo } from 'react';

interface Props {
  icon?: string;
  empty?: boolean;
  className?: string;
  cardClasses?: string;
  title?: string;
  description?: string;
}

const YCardBasic: React.FC<Props> = ({
  empty,
  className: classes,
  cardClasses,
  title,
  description,
  icon,
  children,
}) => {
  const Icon = useMemo(
    () => require(`@/assets/icons/${icon ? icon : 'content'}.svg`).default,
    []
  );

  const iconElement = (
    <div className="icon fill-current flex items-stretch">
      <Icon />
    </div>
  );

  const text =
    title && description ? (
      <>
        <p className="text title serif">{title}</p>
        <p className="text subtitle sans">{description}</p>
      </>
    ) : (
      <>
        <div className="placeholder placeholder-title" />
        <div className="placeholder placeholder-subtitle" />
      </>
    );

  return (
    <div className={['w-43.6 h-53.6', classes].join(' ')}>
      <div className={filterDefaultCard(baseClasses, cardClasses)}>
        {!empty && (
          <>
            {iconElement}
            {text}
          </>
        )}
      </div>
      {children}
    </div>
  );
};

// local utils
const filterDefaultCard = (baseClasses: string[], classes: string) =>
  classes?.split(' ').includes('card')
    ? [
        ...baseClasses.filter((className) => className != 'card-white'),
        classes,
      ].join(' ')
    : [...baseClasses, classes].join(' ') || baseClasses.join(' ');

const baseClasses = [
  'rounded',
  'cursor-default',
  'select-none',
  'mt-2',
  'ml-3',
  'px-2.5',
  'z-10',
  'w-40',
  'h-50',
  'pt-6.5',
  'card-white',
];

export default YCardBasic;
