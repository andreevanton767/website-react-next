import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, m as motion, MotionProps } from 'framer-motion';

import { ArrowType } from '@/enums/components';

import filterPosition from '@/libs/utils/filterPosition';

import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';
import YArrowButton from '@/components/YArrowButton';

interface ScrollProps {
  className?: string;
  showMoreLabel?: string;
  children: ({ position }: { position: ArrowType }) => JSX.Element;
}

export const YSlider: React.FC<ScrollProps> = ({
  className,
  children,
  showMoreLabel,
}) => {
  const [position, setPosition] = useState<ArrowType>(ArrowType.Left);
  const [diff, setDiff] = useState(0);

  const sliderContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderContainer.current) {
      setDiff(
        sliderContainer.current.scrollWidth -
          sliderContainer.current.clientWidth
      );
    }
  }, [sliderContainer.current]);

  const motionProps = {
    animate: position,
    variants: {
      left: {
        x: 0,
      },
      right: {
        x: -diff,
      },
    },
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  } as MotionProps;

  const createArrowElement = (direction: ArrowType) => (
    <YArrowButton
      key={`arrow-${direction}`}
      onClick={() => setPosition(direction)}
      className={`absolute h-full top-0 w-40 ${direction}-0`}
      showMore={showMoreLabel}
      type={direction}
    />
  );

  const arrowDirection = Object.values(ArrowType).find(
    (key) => key != position
  );

  return (
    <YAnimateItem className={filterPosition([], className)}>
      <motion.div {...motionProps} ref={sliderContainer}>
        {children({ position })}
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        {createArrowElement(arrowDirection)}
      </AnimatePresence>
    </YAnimateItem>
  );
};

export default YSlider;
