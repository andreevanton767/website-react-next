import { MutableRefObject, useEffect, useState } from 'react';

import YButton from '@/components/YButton';

import ArrowRight from '@/assets/icons/arrow-right.svg';

type DIVRef = MutableRefObject<HTMLDivElement | null>;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  containerRef: DIVRef;
}

const ScrollControl: React.FC<Props> = ({ containerRef, ...props }) => {
  // control animated scrol
  const handleScroll = (direction: 'left' | 'right') => {
    const leftOffset = scrollControl(direction, containerRef);

    containerRef.current?.scrollTo({
      left: leftOffset,
      top: 0,
      behavior: 'smooth',
    });
  };

  // control disabled arrow
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(false);

  useEffect(() => {
    const controlDisabled = (e: Event) => {
      const element = e.target as HTMLDivElement;

      const { clientWidth, scrollWidth, scrollLeft } = element;

      if (scrollLeft === scrollWidth - clientWidth) {
        setRightDisabled(true);
      } else if (rightDisabled) {
        setRightDisabled(false);
      }

      if (scrollLeft === 0) {
        setLeftDisabled(true);
      } else if (leftDisabled) {
        setLeftDisabled(false);
      }
    };

    if (containerRef.current) {
      const container = containerRef.current;

      container.addEventListener('scroll', controlDisabled);
    }

    return () => {
      containerRef.current?.removeEventListener('scroll', controlDisabled);
    };
  }, [containerRef.current, leftDisabled, rightDisabled]);

  return (
    <div {...props}>
      <YButton
        aria-label="scroll button left"
        onPress={() => handleScroll('left')}
        className={getArrowClasses(leftDisabled, 'left')}
      >
        <ArrowRight />
      </YButton>
      <YButton
        aria-label="scroll button right"
        onPress={() => handleScroll('right')}
        className={getArrowClasses(rightDisabled, 'right')}
      >
        <ArrowRight />
      </YButton>
    </div>
  );
};

// arrow classes
const getArrowClasses = (disabled: boolean, direction: 'left' | 'right') =>
  [
    ...arrowClasses,
    ...(direction === 'left' ? leftAdditional : rightAdditional),
    disabled ? 'text-blog-gray-200' : 'text-black',
  ].join(' ');

const arrowClasses = [
  'w-11',
  'h-11',
  'flex',
  'px-0',
  'py-0',
  'bg-transparent',
  'items-center',
  'justify-center',
  'fill-current',
  'border',
  'border-blog-gray-300',
  'rounded-full',
];

const leftAdditional = ['transform', 'rotate-180'];
const rightAdditional = ['ml-2'];

type ScrollControl = (direction: 'left' | 'right', refs: DIVRef) => number;

/**
 * Handles scroll left or right
 * @param direction scroll direction
 * @param containerRef ref of the scroll container
 * @returns number to be passed to "scrollTo" x offset
 */
const scrollControl: ScrollControl = (direction, containerRef) => {
  // fail fast if ref.current not defined
  if (!containerRef.current) return 0;

  // width of single card in the slider
  const cardWidth = 372;

  const container = containerRef.current;

  // get window offset values
  const clientWidth = container.clientWidth;
  const scrollFrame = clientWidth - (clientWidth % cardWidth);

  const scrollLeft = container.scrollLeft;

  // calculate params
  const scroll = {
    right: scrollLeft + scrollFrame,
    left: scrollLeft - scrollFrame,
  };

  return scroll[direction];
};

export default ScrollControl;
