import { createElement, forwardRef, MutableRefObject } from 'react';
import { m as motion, MotionProps } from 'framer-motion';

interface Props extends MotionProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  layout?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Wrapper around Item with default of entry, exit animations (opacity) and transition (0.4s)
 * Any motion prop can be overriden by passing different value as component prop
 */
const AnimateItem: React.FC<Props> = forwardRef(
  (
    { className, children, onClick = () => {}, as, ...props },
    ref?: MutableRefObject<HTMLElement>
  ) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick(e);
    };

    const itemMotionProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 },
      ...(props as MotionProps),
    };

    const CustomTag = as ? motion[as] : motion.div;

    return createElement(
      CustomTag,
      {
        ref,
        onClick: handleClick,
        className: className,
        ...itemMotionProps,
      },
      children
    );
  }
);

export default AnimateItem;
