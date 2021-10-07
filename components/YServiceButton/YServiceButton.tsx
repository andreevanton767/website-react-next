import React, { createElement, useMemo } from 'react';

import { FontSize, FontWeight } from '@/enums/font';

import YText from '@/components/YText';
import dynamic from 'next/dynamic';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  active?: boolean;
  onClick?: (service: Props['title']) => void;
  icon: string;
  title: string;
  className?: string;
  interactive?: boolean;
  iconGreen?: boolean;
}

const ServiceButton: React.FC<Props> = ({
  onClick = () => {},
  icon,
  title,
  className,
  active,
  as = 'div',
  interactive = true,
  iconGreen,
}) => {
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(title);
  };

  const iconClasses = [
    'h-7',
    'w-7',
    'mx-5',
    'flex',
    'justify-center',
    'items-center',
    'fill-current',
    iconGreen ? 'text-primary' : '',
  ].join(' ');

  const Icon = useMemo(
    () =>
      dynamic(() => import(`@/assets/icons/${icon}.svg`), {
        ssr: false,
      }),
    []
  );

  const children = (
    <>
      <div className={iconClasses}>
        <Icon />
      </div>
      <div>
        <YText
          fontSize={FontSize.XS}
          fontWeight={active ? FontWeight.Bold : FontWeight.SemiBold}
        >
          {title}
        </YText>
      </div>
    </>
  );

  const baseClasses = [
    'svg-fit',
    'border',
    'rounded-lg',
    'flex',
    'items-center',
    'h-15',
  ];

  const activeClasses = active
    ? 'border-primary text-primary'
    : 'border-soft text-white opacity-50 hover:border-primary hover:text-primary';

  const interactiveClasses = !interactive
    ? ''
    : `cursor-pointer transition ease duration-200 ${activeClasses}`;

  return createElement(
    as,
    {
      className: [...baseClasses, interactiveClasses, className].join(' '),
      onClick: handleClick,
    },
    children
  );
};

export default ServiceButton;
