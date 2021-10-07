import React from 'react';

import { ArrowType } from '@/enums/components';
import { FontWeight, FontSize } from '@/enums/font';

import YText from '@/components/YText';
import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';

import ArrowSvg from '@/assets/icons/arrow-right.svg';

import filterPosition from '@/libs/utils/filterPosition';

interface ArrowProps {
  type?: ArrowType;
  className?: string;
  onClick?: () => void;
  showMore?: string;
}

const YArrowButton: React.FC<ArrowProps> = ({
  type = ArrowType.Right,
  className,
  onClick,
  showMore,
}) => {
  const containerClasses = ['w-8', 'h-12.5'];

  const arrowBoxClasses = [
    'h-7',
    'w-7',
    'absolute',
    'top-1/2',
    type == ArrowType.Right ? 'right-1/4' : 'left-1/4',
    'transform',
    '-translate-y-1/2',
    'rounded-full',
    'bg-blue-50',
    'flex',
    'justify-center',
    'items-center',
    'cursor-pointer',
  ];

  const more = showMore || 'More';

  return (
    <YAnimateItem
      onClick={onClick}
      className={filterPosition(containerClasses, className)}
    >
      <div
        className={[
          ...arrowBoxClasses,
          type == ArrowType.Left ? 'transform rotate-180' : '',
        ].join(' ')}
      >
        <ArrowSvg />
        <YText
          fontWeight={FontWeight.SemiBold}
          className={[
            'absolute',
            '-bottom-1',
            'left-1/2',
            'transform',
            '-translate-x-1/2',
            'translate-y-full',
            type == ArrowType.Left ? 'hidden' : '',
          ].join(' ')}
          fontSize={FontSize.XXS}
          as="p"
        >
          {more}
        </YText>
      </div>
    </YAnimateItem>
  );
};

export default YArrowButton;
