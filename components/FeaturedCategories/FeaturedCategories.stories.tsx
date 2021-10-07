import FeaturedCategories from './FeaturedCategories';

import { Service } from '@/enums/components';

import {
  cardProps,
  post,
} from '@/components/YCategoryCard/YCategoryCard.stories';

export default {
  title: 'Featured Categories',
  component: FeaturedCategories,
};

const featuredCategories = [
  Service.Personalization,
  Service.MarketingAutomation,
  Service.DataAnalytics,
];

const firstCategoryAdditional = {
  buttonLg: 'All posts',
  latestPosts: {
    posts: Array(3).fill(post),
    buttonText: 'Read now',
  },
};

const categories = Array(3)
  .fill(cardProps)
  .map((entry: typeof cardProps, index) => ({
    ...{
      ...entry,
      category: featuredCategories[index],
    },
    ...(index === 0 ? firstCategoryAdditional : {}),
  })) as Parameters<typeof FeaturedCategories>[0]['categories'];

export const Default = (): JSX.Element => (
  <FeaturedCategories categories={categories} />
);
