import Pagination from './Pagination';

import { cardProps } from '@/components/YCategoryCard/YCategoryCard.stories';

import { Service } from '@/enums/components';

export default {
  title: 'Pagination',
  component: Pagination,
};

const props = {
  onChange: (page: number) => {
    console.log(page);
  },
  showCategories: {
    categories: [
      { ...cardProps, category: Service.MarketingAutomation },
      { ...cardProps, category: Service.AffiliateMarketing },
    ],
    buttonText: 'See posts',
  },
};
export const Default = (): JSX.Element => (
  <Pagination numPages={7} {...props} />
);

export const SuggestCategories = (): JSX.Element => (
  <Pagination numPages={7} {...props} />
);

export const LessPages = (): JSX.Element => (
  <Pagination numPages={3} {...props} />
);

export const MorePages = (): JSX.Element => (
  <Pagination numPages={12} {...props} />
);
