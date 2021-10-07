import { useSearchField } from '@react-aria/searchfield';
import { AriaSearchFieldProps } from '@react-types/searchfield';
import React, { useEffect, useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { useRouter } from 'next/router';

import { SearchButtonSize } from '@/enums/components';

import useDebounce from '@/hooks/useDebounce';

import Search from '@/assets/icons/search.svg';

import style from './YSearchField.module.css';

interface SearchComponentProps extends AriaSearchFieldProps {
  className?: string;
  searchButtonSize?: SearchButtonSize;
  autoSubmit?: boolean;
}

const YSearchField: React.FC<SearchComponentProps> = ({
  children,
  onSubmit,
  className,
  searchButtonSize = SearchButtonSize.SM,
  autoSubmit = true,
  ...props
}) => {
  // get starting value for search if one is present
  const router = useRouter();
  const searchParam =
    router && router.query ? (router.query.search as string) : '';

  const [searchString, setSearchString] = useState(searchParam || '');

  useEffect(() => {
    if (searchString) {
      setSearchString(searchParam);
    }
  }, [searchParam]);

  // init search state and input/button ref
  const inputRef = useRef();
  const buttonRef = useRef();

  const { inputProps } = useSearchField(
    { ...props, onSubmit } as AriaSearchFieldProps,
    { value: searchString, setValue: setSearchString },
    inputRef
  );

  const { buttonProps } = useButton({ type: 'submit' }, buttonRef);

  // get debounced submit function to be subscribed to search state changes
  const debounce = useDebounce(onSubmit, 300);

  // subscribe to search state change and fire debounced function
  useEffect(() => {
    if (searchString?.length > 3 && autoSubmit) {
      debounce(searchString);
    }
  }, [searchString]);

  const handleFormSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    onSubmit(searchString);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={[
        'relative flex items-center overflow-hidden bg-blog-gray-400 rounded-lg md:rounded-15',
        className,
      ].join(' ')}
    >
      <input
        ref={inputRef}
        {...inputProps}
        className={[
          'placeholder-current focus:outline-none bg-transparent text-blog-gray-100 h-full w-full',
          style.search,
        ].join(' ')}
      />
      <button
        {...buttonProps}
        type="submit"
        className={[
          ...searchButtonClasses[searchButtonSize],
          'focus:outline-none',
        ].join(' ')}
      >
        <Search />
      </button>
    </form>
  );
};

const searchButtonClasses = {
  [SearchButtonSize.SM]: ['w-5', 'h-5'],
  [SearchButtonSize.MD]: ['w-6', 'h-6'],
  [SearchButtonSize.LG]: ['w-6.5', 'h-6.5'],
};

export default YSearchField;
