import React, { useEffect, useState } from 'react';
import {
  m as motion,
  MotionConfig,
  AnimationFeature,
  AnimateLayoutFeature,
  AnimateSharedLayout,
} from 'framer-motion';

import { FontSize, FontWeight } from '@/enums/font';

import filterPosition from '@/libs/utils/filterPosition';

import YHeading from '@/components/YHeading';

import style from './YButtonGroup.module.css';

interface Props {
  buttons: string[];
  className?: string;
  onChange?: (index: number) => void;
}

const YButtonGroup: React.FC<Props> = ({
  buttons,
  className,
  onChange = () => null,
}) => {
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    onChange(active);
  }, [active]);

  return (
    <MotionConfig features={[AnimationFeature, AnimateLayoutFeature]}>
      <AnimateSharedLayout>
        <div className={filterPosition(defaultClasses, className)}>
          {buttons.map((button, index) => {
            const isActive = active == index;

            return (
              <React.Fragment key={`button-${index}`}>
                {index != 0 && (
                  <div
                    key={`dot-${index}`}
                    className="relative -top-1/4 transform -translate-y-full h-1 w-1 rounded-full bg-white bg-opacity-30 inline-block md:-translate-y-1/2"
                  />
                )}
                <button
                  onClick={() => handleClick(index)}
                  className="relative z-10 px-4 -mx-1 py-3.5 md:px-5 md:py-4 focus:outline-none inline-block top-1/2 transform -translate-y-1/2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active"
                      transition={{ duration: 0.2, type: 'tween' }}
                      className={[
                        'absolute top-0 left-0 right-0 bottom-0 bg-blue-100 rounded-10 -z-10 underline-blue',
                        style.buttonUnderline,
                      ].join(' ')}
                    />
                  )}
                  <YHeading
                    fontSize={FontSize.XXS}
                    fontWeight={
                      isActive ? FontWeight.ExtraBold : FontWeight.Regular
                    }
                    className={[
                      'relative z-20 md:text-sm md:leading-6',
                      isActive ? 'text-white md:font-bold' : 'text-gray-300',
                    ].join(' ')}
                  >
                    {button}
                  </YHeading>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </AnimateSharedLayout>
    </MotionConfig>
  );
};

const defaultClasses = [
  'h-8.5',
  'md:h-10',
  'px-1',
  'bg-blue-500',
  'rounded-10',
  'inline-block',
  'align-center',
];

export default YButtonGroup;
