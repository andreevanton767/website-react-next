import { FontSize, FontWeight } from '@/enums/font';
import { FeaturedPosts, Service } from '@/enums/components';

import YArticleCard from '@/components/YLatestArticlesCard';
import YHeading from '@/components/YHeading';

import yTrimExcerpt from '@/libs/utils/yTrimExcerpt';

import useRecentPosts from '@/hooks/useRecentPosts';

import style from './ServiceLatestPosts.module.css';

interface Props {
  title: string;
  category: Service;
}

const ServiceLatestPosts: React.FC<Props> = ({ title, category }) => {
  // get recent posts
  const { articles, fetching } = useRecentPosts({
    location: FeaturedPosts.ServicePage,
    category,
  });

  return (
    <section className="w-full h-148 lg:h-204.5 border-b border-soft">
      <div className="container px-0 pt-5 lg:px-0 lg:pt-30">
        <div className="w-full text-center px-5 lg:text-left lg:px-0">
          <YHeading
            fontSize={FontSize.LG}
            fontWeight={FontWeight.SemiBold}
            className="block text-gray-400 mb-1 lg:leading-11 lg:mb-2"
          >
            Blog
          </YHeading>
          <YHeading
            fontSize={FontSize.XL}
            className="text-white mb-7 lg:text-xxl lg:leading-13 lg:mb-15"
            as="h1"
          >
            {title}
          </YHeading>
        </div>
        <div className="scroll-x-container overflow-y-hidden w-full h-101.5 lg:h-111.1 whitespace-nowrap">
          <div
            className={[...offsetItemClasses, style.offsetStart].join(' ')}
          />
          {articles?.map(({ intro, ...article }, index) => (
            <YArticleCard
              className={[
                'scroll-x-item-center inline-block h-full w-60 lg:w-75 whitespace-normal',
                index !== 2 ? 'mr-10 lg:mr-22.5' : '',
              ].join(' ')}
              {...article}
              intro={yTrimExcerpt(intro, 130)}
              type={FeaturedPosts.ServicePage}
            />
          ))}
          <div
            className={[...offsetItemClasses, style.offsetStart].join(' ')}
          />
        </div>
      </div>
    </section>
  );
};

const offsetItemClasses = [
  'scroll-x-item',
  'inline-block',
  'h-full',
  'w-0',
  'lg:hidden',
];

export default ServiceLatestPosts;
