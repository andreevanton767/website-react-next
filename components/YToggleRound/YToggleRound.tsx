import React from 'react';
import {
  m as motion,
  MotionConfig,
  AnimationFeature,
  MotionProps,
} from 'framer-motion';

import filterPosition from '@/libs/utils/filterPosition';

interface Props {
  open?: boolean;
  onClick?: () => void;
  className?: string;
}

const YToggleRound: React.FC<Props> = ({ open, onClick, className }) => {
  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <MotionConfig features={[AnimationFeature]}>
      <motion.div
        onClick={handleClick}
        {...{ ...motionProps, animate: open ? 'open' : 'closed' }}
        className={filterPosition(baseClasses, className)}
      >
        <div
          className={[...lineClasses, open ? 'w-4' : 'w-5', 'rotate-90'].join(
            ' '
          )}
        />
        <div className={[...lineClasses, open ? 'w-4' : 'w-5'].join(' ')} />
      </motion.div>
    </MotionConfig>
  );
};

const lineClasses = [
  'absolute',
  'bg-white',
  'h-0.5',
  'top-1/2',
  'left-1/2',
  'transform',
  '-translate-x-1/2',
  '-translate-y-1/2',
];

const motionProps = {
  initial: {
    background: '#53D084',
    border: 'none',
    rotate: 0,
  },
  variants: {
    open: {
      background: 'rgba(0, 0, 0, 0)',
      border: '1px solid rgba(99, 152, 255, 0.1)',
      rotate: 45,
    },
    closed: {
      background: '#53D084',
      border: 'none',
      rotate: 0,
    },
  },
} as MotionProps;

const baseClasses = ['rounded-full', 'h-10', 'w-10', 'cursor-pointer'];

export default YToggleRound;
