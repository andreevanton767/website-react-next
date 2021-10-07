import React from 'react';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

import {
  SearchpageItem,
  ParsedSearchQuery,
  TagItemsRes,
  TagBlokProps,
  SearchPostsRes,
} from '@/types/search';

import SearchPage from '@/components/SearchPage';

import { getSearchPage, GET_TAGS, searchPosts } from '@/libs/api/search';

import graphqlClient from '@/utils/graphql';
import { ApolloQueryResult } from '@apollo/client';

interface ErrorProps {
  errorCode: number;
}

interface DataRes {
  PostItems: SearchPostsRes['PostItems'];
  SearchpageItem: SearchpageItem;
  tagItems: TagBlokProps[];
}

type Props = Partial<ErrorProps & DataRes>;

const Search: React.FC<Props> = ({ errorCode, ...searchPageProps }) => {
  /**
   * Early error handling
   */
  if (errorCode) return <Error statusCode={errorCode} />;

  return <SearchPage {...(searchPageProps as DataRes)} />;
};

export const getServerSideProps: GetServerSideProps<
  DataRes | ErrorProps,
  ParsedSearchQuery
> = async ({
  preview,
  res,
  query: { search, categories, page, sort, tags },
  locale,
}) => {
  /**
   * Prepare params for gql queries
   */
  const lang = locale === 'en' ? '' : `${locale}/`;

  /**
   * Prepare search params
   */
  const emptySearch = async (): Promise<
    Partial<ApolloQueryResult<SearchPostsRes>>
  > => ({
    data: { PostItems: { total: 0, items: [] } },
  });

  const searchPromise = search
    ? searchPosts({
        preview,
        search,
        categories,
        lang,
        page,
        sort,
        tags,
      })
    : emptySearch();

  const [
    {
      data: { SearchpageItem },
    },
    {
      data: { PostItems },
    },
    {
      data: {
        TagItems: { items: tagItems },
      },
    },
  ] = await Promise.all([
    getSearchPage({ preview, lang }),
    searchPromise,
    getTags({ preview, lang }),
  ]);

  if (SearchpageItem) {
    return {
      props: {
        SearchpageItem,
        PostItems,
        tagItems,
      },
    };
  } else {
    /**
     * Late error handling (404)
     */
    res.statusCode = 404;
    return { props: { errorCode: 404 } };
  }
};

// gql queries
const getTags = ({
  preview,
  lang,
}: {
  preview: boolean;
  lang: string;
}): Promise<ApolloQueryResult<TagItemsRes>> =>
  graphqlClient({ preview }).query({
    query: GET_TAGS,
    variables: {
      lang,
    },
  });

export default Search;
