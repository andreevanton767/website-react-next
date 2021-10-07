import React from 'react';
import { m as motion, MotionConfig, AnimationFeature } from 'framer-motion';

import { ToggleStyle, ToggleType } from '@/enums/components';

import filterPosition from '@/libs/utils/filterPosition';

interface Props {
  open?: boolean;
  onClick?: () => void;
  className?: string;
  type?: ToggleType;
  toggleStyle?: ToggleStyle;
}

enum Line {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}

const YMenuToggle: React.FC<Props> = ({
  className,
  onClick,
  open = true,
  type = ToggleType.Hamburger,
  toggleStyle = ToggleStyle.Light,
}) => {
  const lineClasses = [
    ...lineClassesForType[type],
    'bg-white',
    'absolute',
    'h-0.5',
  ].join(' ');

  const getMotionProps = (linePosition: Line) => {
    const animate = open ? 'open' : 'closed';

    return type == ToggleType.Plus && linePosition == Line.Top
      ? null
      : { animate, ...getLineProps(linePosition, toggleStyle) };
  };

  const lines = (
    <>
      <motion.div className={lineClasses} {...getMotionProps(Line.Top)} />
      <motion.div
        className={[lineClasses, ...additionalLineClasses[type]].join(' ')}
        {...getMotionProps(Line.Middle)}
      />
      {type == ToggleType.Hamburger && (
        <motion.div className={lineClasses} {...getMotionProps(Line.Bottom)} />
      )}
    </>
  );

  const containerClasses = {
    [ToggleType.Hamburger]: ['h-7.5', 'w-7.5', 'p-1'],
    [ToggleType.Plus]: ['h-3.5', 'w-3.5'],
  };

  return (
    <div
      className={filterPosition(containerClasses[type], className)}
      onClick={onClick || null}
    >
      <MotionConfig features={[AnimationFeature]}>{lines}</MotionConfig>
    </div>
  );
};

const lineClassesForType = {
  [ToggleType.Hamburger]: ['left-1', 'right-1'],
  [ToggleType.Plus]: [
    'bg-gray-600',
    'w-3.5',
    'transform',
    '-translate-y-1/2',
    'top-1/2',
  ],
};

const additionalLineClasses = {
  [ToggleType.Hamburger]: ['top-1/2', 'transform', '-translate-y-1/2'],
  [ToggleType.Plus]: ['rotate-90', 'left-1/2', '-translate-x-1/2'],
};

// motion options
const lineColor = {
  [ToggleStyle.Light]: {
    closed: '#ffff',
    open: '#ffff',
  },
  [ToggleStyle.Dark]: {
    closed: '#B2B2B2',
    open: '#000000',
  },
};

const openProps = {
  [Line.Top]: {
    rotate: 45,
    y: 10,
  },
  [Line.Middle]: {
    opacity: 0,
  },
  [Line.Bottom]: {
    rotate: -45,
    y: 10,
  },
};

const closedProps = {
  [Line.Top]: { y: 4 },
  [Line.Middle]: { opacity: 1 },
  [Line.Bottom]: { y: 16 },
};

const getLineProps = (linePosition: Line, toggleStyle: ToggleStyle) => {
  const colors = lineColor[toggleStyle];

  const open = { ...openProps[linePosition], background: colors.open };
  const closed = { ...closedProps[linePosition], background: colors.closed };

  return {
    variants: {
      open,
      closed,
      initial: closed,
    },
  };
};

const lineProps = {
  [Line.Top]: {
    variants: {
      open: {
        rotate: 45,
        y: 10,
      },
      closed: {
        y: 4,
        // rotate: 0,
      },
    },
    initial: { y: 4 },
  },
  [Line.Middle]: {
    variants: {
      open: {
        opacity: 0,
      },
      closed: {
        opacity: 1,
      },
    },
    initial: {
      opacity: 1,
    },
    transition: {
      duration: 0.2,
    },
  },
  [Line.Bottom]: {
    variants: {
      open: {
        rotate: -45,
        y: 10,
      },
      closed: {
        y: 16,
        // rotate: 0,
      },
    },
    initial: { y: 16 },
  },
};

export default YMenuToggle;
