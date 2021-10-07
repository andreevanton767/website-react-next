import { Order } from '@/enums/search';

interface SearchQueryFunction {
  (props: {
    searchString?: string;
    page?: number;
    selectedCategories?: string[];
    selectedTags?: string[];
    sort?: string;
  }): string;
}

/**
 * Takes in search params and creates a query string
 * @param param0
 * @returns
 */
export const yGetSearchQuery: SearchQueryFunction = ({
  searchString = '',
  page = 1,
  selectedCategories = [],
  selectedTags = [],
  sort = Order.ASC,
}) => {
  const searchParam = searchString ? `search=${searchString}` : '';
  const categoriesParam = selectedCategories.length
    ? `categories=${selectedCategories.join(',')}`
    : '';
  const tagsParam = selectedTags.length ? `tags=${selectedTags.join(',')}` : '';
  const pageParam = `page=${page}`;
  const sortParam = `sort=${sort}`;

  // filter empty params
  const filteredParams = [
    searchParam,
    categoriesParam,
    tagsParam,
    pageParam,
    sortParam,
  ].filter((param) => Boolean(param));

  return `?${filteredParams.join('&')}`;
};
