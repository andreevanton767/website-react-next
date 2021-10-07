import { useEffect, useRef, useState } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { useButton } from '@react-aria/button';

import { Service } from '@/enums/components';
import { FontSize } from '@/enums/font';

import YText from '@/components/YText';
import YCategoryCard from '@/components/YCategoryCard/YCategoryCard';
import React from 'react';

interface CategoryCard {
  category: Service;
  title: string;
  description: string;
}

export interface FeaturedCategories {
  categories: CategoryCard[];
  buttonText: string;
}

interface Props {
  numPages: number;
  featuredCategories?: FeaturedCategories;
  onChange: (page: number) => void;
  current?: number;
}

const Pagination: React.FC<Props> = ({
  numPages,
  featuredCategories,
  onChange,
  current,
}) => {
  // set starting page if recieved/valid, if not, falback to 1
  const startingPage = current && current <= numPages ? current : 1;

  const [currentPage, setCurrentPage] = useState(startingPage);
  const mount = useRef(true);

  const buttonsToShow = new Array(5)
    .fill(null)
    .map((_, index) =>
      currentPage < 5
        ? index + 1
        : numPages - currentPage < 3
        ? -4 + index + numPages
        : currentPage - 2 + index
    );

  // subscribe to current page updates from outside
  useEffect(() => {
    if (current && current <= numPages) {
      setCurrentPage(current);
    }
  }, [current]);

  useEffect(() => {
    if (!mount.current) {
      onChange(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    mount.current = false;
  }, []);

  // hide under certain conditions
  const hidden =
    numPages > 1
      ? ''
      : Boolean(featuredCategories)
      ? 'hidden md:block'
      : 'hidden';

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        className={[
          'border-blog-gray-300 border-t border-b max-w-213 w-full h-18 py-5 md:border-b-0 md:min-h-64 md:h-auto md:mx-auto md:py-10',
          hidden,
        ].join(' ')}
      >
        {numPages > 1 && (
          <div className="flex justify-center items-center w-full md:mb-20">
            {buttonsToShow.map((page, index) => {
              if (index >= numPages) return null;

              const selected = page === currentPage;

              const handlePress = () => {
                setCurrentPage(page);
              };

              const dots = (
                <div className="w-3 mx-1.5 text-center text-blog-gray-100">
                  ...
                </div>
              );

              return (
                <React.Fragment key={page}>
                  {index === 0 && page > 1 && dots}
                  <PageButton
                    page={page}
                    onPress={handlePress}
                    selected={selected}
                  />
                  {index === 4 && page < numPages && dots}
                </React.Fragment>
              );
            })}
          </div>
        )}
        {featuredCategories && (
          <div className="hidden md:grid md:w-213 relative left-1/2 transform -translate-x-1/2 md:grid-cols-2 md:gap-10 md:mb-25">
            {featuredCategories?.categories.map((category) => (
              <YCategoryCard
                key={category.category}
                className="shadow-blog-lg md:px-16 md:py-12.5 lg:py-12.5"
                {...category}
                buttonSm={featuredCategories.buttonText}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface PageButtonProps extends AriaButtonProps {
  selected: boolean;
  page: number;
}

const PageButton: React.FC<PageButtonProps> = ({
  selected,
  page,
  ...props
}) => {
  const ref = useRef();

  const { buttonProps } = useButton(props, ref);

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={[
        'relative flex items-center justify-center w-8 h-8 mx-1.5 cursor-pointer rounded-full focus:outline-none',
        selected ? 'bg-blog-gray-400' : '',
      ].join(' ')}
    >
      <YText
        fontSize={FontSize.XS}
        className={[
          'absolute',
          'top-1/2',
          'left-1/2',
          'transform',
          '-translate-x-1/2',
          '-translate-y-1/2',
          `text-blog-gray-${selected ? 200 : 100}`,
        ].join(' ')}
      >
        {page}
      </YText>
    </button>
  );
};

export default Pagination;
