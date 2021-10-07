import { ApolloQueryResult } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

import {
  BloghomeItem,
  BloghomeItemRes,
  CategoriesRes,
  CategoryItem,
} from '@/types/blog';

import BlogHome from '@/components/BlogHome';

import graphqlClient from '@/utils/graphql';

import { GET_ALL_CATEGORIES, GET_BLOG_HOME } from '@/libs/api/blog';

interface ErrorRes {
  errorCode: number;
}

interface PostDataRes {
  BloghomeItem: BloghomeItem;
  CategoryItems: CategoryItem[];
}

type Props = Partial<ErrorRes & PostDataRes>;

const Home: React.FC<Props> = ({ errorCode, ...props }) => {
  /**
   * Early error handling
   */
  if (errorCode) return <Error statusCode={errorCode} />;

  return <BlogHome {...(props as PostDataRes)} />;
};

type ServerSideReturnType = ErrorRes | PostDataRes;

export const getServerSideProps: GetServerSideProps<ServerSideReturnType> = async ({
  preview,
  res,
  locale,
}) => {
  const lang = locale === 'en' ? '' : `${locale}/`;

  const id = `${lang}blog`;

  // get initial data
  const [
    {
      data: { BloghomeItem },
    },
    {
      data: { CategorypageItems },
    },
  ] = await Promise.all([
    getBlogData({ preview, id }),
    getAllCategories({ preview, lang }),
  ]);

  // late error handling (404)
  if (!BloghomeItem) {
    res.statusCode = 404;
    return { props: { errorCode: 404 } };
  } else {
    return {
      props: {
        CategoryItems: CategorypageItems.items,
        BloghomeItem,
        locale,
      },
    };
  }
};

// gql functions
const getBlogData = async ({
  preview,
  id,
}: {
  preview: boolean;
  id: string;
}): Promise<ApolloQueryResult<BloghomeItemRes>> =>
  graphqlClient({ preview }).query({ query: GET_BLOG_HOME, variables: { id } });

const getAllCategories = async ({
  preview,
  lang,
}: {
  preview: boolean;
  lang: string;
}): Promise<ApolloQueryResult<CategoriesRes>> =>
  graphqlClient({ preview }).query({
    query: GET_ALL_CATEGORIES,
    variables: {
      lang,
    },
  });

export default Home;
