import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client';

import { Order } from '@/enums/search';

import { SearchpageItemRes, SearchPostsRes } from '@/types/search';

import graphqlClient from '@/utils/graphql';

const GET_SEARCH_PAGE: DocumentNode = gql`
  query SearchPage($id: ID!) {
    SearchpageItem(id: $id) {
      id
      content {
        _uid
        component
        searchLabel
        placeholder
        filterLabel
        categoryLabel
        tagsLabel
        sortByLabel
        dateLabel
        title
        description
        keywords
        header {
          content
        }
        footer {
          content
        }
      }
    }
  }
`;

const SEARCH_POSTS: DocumentNode = gql`
  query RecentPosts(
    $sortString: String!
    $lang: String
    $page: Int!
    $filterQuery: PostFilterQuery!
  ) {
    PostItems(
      filter_query_v2: $filterQuery
      starts_with: $lang
      sort_by: $sortString
      per_page: 4
      page: $page
    ) {
      total
      items {
        slug
        first_published_at
        content {
          categories
          tags {
            content
          }
          cover {
            filename
            alt
          }
          title
          long_text
        }
      }
    }
  }
`;

export const GET_TAGS: DocumentNode = gql`
  query TagItems($lang: String!) {
    TagItems(starts_with: $lang) {
      items {
        content {
          _uid
          label
          tag
        }
      }
    }
  }
`;

interface SearchProps {
  search: string | string[];
  page?: string | string[];
  categories?: string | string[];
  sort?: string | string[];
  tags?: string | string[];
  preview?: boolean;
  lang?: string;
}

export const getSearchPage = ({
  preview,
  lang,
}: {
  preview: boolean;
  lang: string;
}): Promise<ApolloQueryResult<SearchpageItemRes>> =>
  graphqlClient({ preview }).query({
    query: GET_SEARCH_PAGE,
    variables: {
      id: `${lang}blog/search`,
    },
  });

export const searchPosts = async ({
  preview = false,
  search = '',
  page: pageParam,
  categories: categoriesParam = [],
  sort: sortParam,
  tags: tagsParam = [],
  lang,
}: SearchProps): Promise<ApolloQueryResult<SearchPostsRes>> => {
  // check and fallback the params (mostly to satisfy TypeScript)
  const searchString =
    typeof search === 'string' ? `${search}*` : `${search.join('')}*`;

  const page = typeof pageParam === 'string' ? Number(pageParam) : 1;

  const categories =
    typeof categoriesParam === 'string'
      ? categoriesParam.split(',')
      : categoriesParam;

  const sort = typeof sortParam === 'string' ? (sortParam as Order) : Order.ASC;

  const tags = typeof tagsParam === 'string' ? tagsParam.split(',') : tagsParam;

  const sortString = `first_published_at:${Order[sort]}`;

  // create filter_query_v2
  let filterQuery: Record<string, any> = { title: { like: searchString } };
  if (tags.length) filterQuery.tags = { in_array: tags };
  if (categories.length) filterQuery.categories = { in_array: categories };

  return graphqlClient({ preview }).query({
    query: SEARCH_POSTS,
    variables: {
      filterQuery,
      sortString,
      lang,
      page,
    },
  });
};
