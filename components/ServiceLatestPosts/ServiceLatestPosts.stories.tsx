import ServiceLatestPosts from './ServiceLatestPosts';

import { Service } from '@/enums/components';

export default {
  title: 'Service Latest Posts',
  component: ServiceLatestPosts,
};

const article = {
  category: Service.DataAnalytics,
  createdAt: new Date(Date.now()).toString(),
  title: 'Varius sodales nec integer consectetur.',
  intro:
    'Customers want to be attracted, to know that a brand cares about them and has taken the time to do the necessary research.',
  cover: 'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
};

const props = {
  articles: Array(3)
    .fill(article)
    .map((article, index) => ({ ...article, slug: `test_slug_${index}` })),
  title: 'Latest Posts',
  category: Service.Personalization,
};

export const Default = (): JSX.Element => <ServiceLatestPosts {...props} />;
