import { HTMLAttributes } from 'react';

import { BlogCategorySize, BlogCategoryStyle } from '@/enums/components';

import YCategoryCard from '@/components/YCategoryCard';

type CategoryProps = Omit<
  Omit<
    Omit<Omit<Parameters<typeof YCategoryCard>[0], 'children'>, 'cardStyle'>,
    'size'
  >,
  'className'
>;

interface Props extends HTMLAttributes<HTMLElement> {
  categories: [CategoryProps, CategoryProps, CategoryProps];
}

const FeaturedCategories: React.FC<Props> = ({ categories, className }) => (
  <section className={['w-full bg-white', className].join(' ')}>
    <div className="relative left-1/2 transform -translate-x-1/2 grid grid-cols-1 gap-5 max-w-xl lg:max-w-none lg:w-xl lg:grid-cols-2 lg:gap-15 lg:mb-15 z-20">
      {categories.map((...args) => renderCategory(...args))}
    </div>
  </section>
);

/**
 * Renders collection of categories with first large and others small
 * @param category
 * @param index
 * @returns
 */
const renderCategory = (
  category: CategoryProps,
  index: number,
  ..._: any[]
) => {
  const props = {
    ...category,
    key: category.category,
    cardStyle: index === 2 ? BlogCategoryStyle.Dark : BlogCategoryStyle.Light,
    size: index === 0 ? BlogCategorySize.LG : BlogCategorySize.MD,
    className: [
      'shadow-blog-sm',
      'lg:shadow-blog-lg',
      ,
      index === 0 ? 'lg:col-span-2' : '',
    ].join(' '),
  };

  return <YCategoryCard {...props} />;
};

export default FeaturedCategories;
