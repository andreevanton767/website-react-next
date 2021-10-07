import OtherCategories from './OtherCategories';

import { Service } from '@/enums/components';

import { cardProps } from '@/components/YCategoryCard/YCategoryCard.stories';

export default {
  title: 'Other Categories',
  component: OtherCategories,
};

const featuredCategories = [
  Service.AffiliateMarketing,
  Service.ConversionOptimization,
  Service.EmailMarketing,
  Service.IntegrationImplementation,
  Service.OnlineAdvertising,
];

const categories = Array(5)
  .fill(cardProps)
  .map((entry: typeof cardProps, index) => ({
    ...entry,
    category: featuredCategories[index],
  })) as Parameters<typeof OtherCategories>[0]['categories'];

const title = 'Other Categories';

export const Default = (): JSX.Element => (
  <OtherCategories categories={categories} title={title} />
);
