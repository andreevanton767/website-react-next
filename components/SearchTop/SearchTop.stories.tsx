import SearchTop from './SearchTop';

export default {
  title: 'Search Top',
  component: SearchTop,
};

const props = {
  searchLabel: 'Search',
  categoryLabel: 'Category',
  filterLabel: 'Filter',
  sortByLabel: 'Sort',
  tagsLabel: 'Tags',
  dateLabel: 'Date',
} as Parameters<typeof SearchTop>[0];

export const Default = (): JSX.Element => <SearchTop {...props} />;
