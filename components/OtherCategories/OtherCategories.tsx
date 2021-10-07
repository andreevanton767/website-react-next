import { HTMLAttributes } from 'react';

import { FontSize } from '@/enums/font';

import YCategoryCard from '@/components/YCategoryCard';
import YHeading from '@/components/YHeading';

import style from './OtherCategories.module.css';

type CategoryProps = Omit<
  Omit<
    Omit<Omit<Parameters<typeof YCategoryCard>[0], 'children'>, 'cardStyle'>,
    'size'
  >,
  'className'
>;

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  categories: CategoryProps[];
}

const OtherCategories: React.FC<Props> = ({ title, categories, className }) => {
  return (
    <section
      className={['bg-white overflow-hidden w-full lg:h-auto', className].join(
        ' '
      )}
    >
      <div className="relative py-10 lg:w-xl lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:pt-25 lg:pb-0 lg:px-32 lg:border lg:border-blog-gray-300 lg:rounded-3xl">
        <YHeading
          fontSize={FontSize.XL}
          className="text-blog-gray-100 w-full text-center mb-5 lg:mb-0 lg:text-xxl lg:leading-13 select-none"
          as="h1"
        >
          {title}
        </YHeading>
        <div className="relative w-full whitespace-nowrap scroll-x-container scroll-pl-10 flex items-stretch lg:block lg:py-0 lg:static lg:grid lg:grid-cols-2">
          <div
            key="scroll snap offest"
            className="w-0 h-0 flex-shrink-0 scroll-x-item mr-10 lg:hidden"
          />
          {categories.map((category, index) => {
            const numItems = categories.length;

            const additionalClasses =
              index < numItems - 1 - ((numItems + 1) % 2)
                ? 'mr-5 lg:border-b'
                : numItems % 2 === 1
                ? 'mr-10 lg:border-none lg:col-span-2'
                : 'mr-5 lg:border-none';

            const split = index % 2 ? style.split : '';

            return (
              <div
                key={category.category}
                className={[
                  'flex-shrink-0 whitespace-normal scroll-x-item w-75 border border-blog-gray-300 rounded-lg lg:border-0 lg:rounded-none lg:h-auto lg:mr-0 lg:w-auto lg:block lg:py-15 lg:px-3',
                  additionalClasses,
                  split,
                ].join(' ')}
              >
                <YCategoryCard {...category} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherCategories;
