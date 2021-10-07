import React, { useMemo } from 'react';
import { m as motion } from 'framer-motion';

interface BackgroundProps {
  className?: string;
  open?: boolean;
  openClasses?: string;
  closedClasses?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const AnimateBackground = React.forwardRef<HTMLElement, BackgroundProps>(
  (
    {
      children,
      open,
      className = '',
      openClasses = '',
      closedClasses = '',
      as,
    },
    ref
  ) => {
    const openProps = useMemo(() => getProps(openClasses), [openClasses]);
    const closedProps = useMemo(() => getProps(closedClasses), [closedClasses]);

    const CustomTag = as || 'section';

    return React.createElement(
      motion[CustomTag],
      {
        ref,
        className,
      },
      <div className="relative">
        <motion.div {...openProps} animate={open ? 'show' : 'hide'} />
        <motion.div {...closedProps} animate={open ? 'hide' : 'show'} />
        {children}
      </div>
    );
  }
);

// const sizeClasses = ['h-', 'w-', 'max-w-', 'max-h-'];
const positionClasses = [
  'absolute',
  'relative',
  'static',
  'fixed',
  'top-',
  'left-',
  'right-',
  'bottom-',
];
const transformClasses = ['transform', 'translate', 'scale', 'rotate', 'skew'];
// const marginClasses = ['m-', 'mx-', 'my-', 'mt-', 'mb-', 'ml-', 'mr-'];
// const paddingClasses = ['p-', 'px-', 'py-', 'pt-', 'pb-', 'pl-', 'pr-'];

const filterClasses = (classes: string, forbiddenClasses: string[]) => {
  if (!classes) return [''];
  let result = classes.split(' ');

  forbiddenClasses.forEach((forbiddenClass) => {
    result = result.filter((className) => !className.includes(forbiddenClass));
  });

  return result;
};

const bgProps = {
  className: 'absolute top-0 left-0 right-0 bottom-0',
  initial: false,
  variants: {
    show: { opacity: 1 },
    hide: { opacity: 0 },
  },
  transition: { duration: 0.4 },
};

const getProps = (classes: string) => ({
  ...bgProps,
  className: [
    bgProps.className,
    ...filterClasses(classes, [
      // ...sizeClasses,
      ...positionClasses,
      ...transformClasses,
      // ...marginClasses,
      // ...paddingClasses,
    ]),
  ].join(' '),
});

export default AnimateBackground;
