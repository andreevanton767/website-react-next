import { HTMLAttributes, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';

import SearchButtonSVG from '@/assets/icons/search.svg';

const SearchButton: React.FC<
  AriaButtonProps & HTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  const ref = useRef();

  const { buttonProps } = useButton(props, ref);

  return (
    <button
      className={[...baseClasses, className].join(' ')}
      {...buttonProps}
      ref={ref}
    >
      <SearchButtonSVG />
    </button>
  );
};

const baseClasses = [
  'w-6.5',
  'h-6.5',
  'svg-fit',
  'fill-current',
  'text-blog-gray-100',
];

export default SearchButton;
