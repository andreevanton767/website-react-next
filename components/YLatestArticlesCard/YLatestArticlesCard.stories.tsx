import YLatestArticlesCard from './YLatestArticlesCard';

import { FeaturedPosts, Service } from '@/enums/components';

export default {
  title: 'Latest Articles Card',
  component: YLatestArticlesCard,
};

const props = {
  categories: [Service.DataAnalytics],
  firstPublished: new Date(Date.now()).toString(),
  title: 'Varius sodales nec integer consectetur.',
  intro:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique dignissim risus imperdiet posuere metus justo a est.',
  slug: 'post_slug',
};

export const ServicePage = () => (
  <div className="w-lg">
    <YLatestArticlesCard
      className="inline-block w-60 h-101.5 lg:w-75 md:h-111.1 mr-10 lg:mr-22.5"
      type={FeaturedPosts.ServicePage}
      {...props}
    />
    <YLatestArticlesCard
      className="inline-block w-60 h-101.5 lg:w-75 md:h-111.1"
      type={FeaturedPosts.ServicePage}
      cover={{
        filename:
          'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
      }}
      {...props}
    />
  </div>
);

export const PostPage = () => (
  <div className="bg-white p-10">
    <YLatestArticlesCard
      className="inline-block w-81.1 h-126.5 md:w-86 md:h-122.5 mr-5 md:mr-7"
      type={FeaturedPosts.BlogPost}
      {...props}
    />
    <YLatestArticlesCard
      className="inline-block w-81.1 h-126.5 md:w-86 md:h-122.5"
      type={FeaturedPosts.BlogPost}
      cover={{
        filename:
          'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
      }}
      {...props}
    />
  </div>
);
