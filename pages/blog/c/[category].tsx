import { ApolloQueryResult } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

import { CategorypageItem, CategorypageItemRes } from '@/types/categoryPage';
import { SearchPostsRes } from '@/types/search';

import CategoryPage from '@/components/CategoryPage';

import { GET_CATEGORY } from '@/libs/api/categoryPage';
import { searchPosts } from '@/libs/api/search';

import graphqlClient from '@/utils/graphql';

interface ErrorRes {
  errorCode: number;
}

interface CategoryPageDataRes {
  CategorypageItem: CategorypageItem;
  PostItems: SearchPostsRes['PostItems'];
}

type Props = Partial<ErrorRes & CategoryPageDataRes>;

const Category: React.FC<Props> = ({ errorCode, ...categoryPageData }) => {
  /**
   * Early error handling
   */
  if (errorCode) return <Error statusCode={errorCode} />;

  return <CategoryPage {...(categoryPageData as CategoryPageDataRes)} />;
};

type ServerSideReturnType = ErrorRes | CategoryPageDataRes;

export const getServerSideProps: GetServerSideProps<ServerSideReturnType> = async ({
  preview,
  query: { category, page = '1' },
  locale,
  res,
}) => {
  /**
   *  Early error handling
   */
  // typescript guard (category should always be a string as page name is '[category].tsx' format)
  if (typeof category != 'string') {
    res.statusCode = 400;
    return { props: { errorCode: 400 } };
  }

  /**
   * Prepare params for gql queries
   */
  const lang = locale === 'en' ? '' : `${locale}/`;

  const id = `${lang}blog/c/${category}`;

  // try and get data
  const [
    {
      data: { CategorypageItem },
    },
    {
      data: { PostItems },
    },
  ] = await Promise.all([
    getCategorypageItem({ preview, id }),
    searchPosts({ preview, categories: [category], search: '', page }),
  ]);

  if (CategorypageItem) {
    return {
      props: {
        CategorypageItem,
        PostItems,
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
const getCategorypageItem = ({
  preview,
  id,
}: {
  preview?: boolean;
  id: string;
}): Promise<ApolloQueryResult<CategorypageItemRes>> =>
  graphqlClient({ preview }).query({ query: GET_CATEGORY, variables: { id } });

export default Category;
