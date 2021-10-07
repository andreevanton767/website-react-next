import { ApolloQueryResult } from '@apollo/client';
import { NextApiRequest } from 'next';
import Error from 'next/error';

import { PageItem, PageItemRes, PageSlugsResponse } from '@/types/storyblok';

import Page from '@/components/Page';

import graphqlClient from '@/utils/graphql';

import { GET_PAGE, GET_PAGE_SLUGS } from '@/libs/api/page';
import { getLanguages } from '@/libs/api/i18n';

interface ErrorRes {
  errorCode: number;
}

interface PageDataRes {
  PageItem: PageItem;
}

type Props = Partial<ErrorRes & PageDataRes>;

const Home: React.FC<Props> = ({ errorCode, ...props }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return <Page {...(props as PageDataRes)} />;
};

export default Home;

interface StaticPropsResult {
  props: PageDataRes | ErrorRes;
}

export const getStaticProps = async ({
  preview = false,
  params,
  locale,
}: {
  preview: boolean;
  params?: { lang: string; page: string[] };
  locale: string;
}): Promise<StaticPropsResult> => {
  const page = params.page ? params.page.join('/') : 'home';
  const id = locale === 'en' ? page : `${locale}/${page}`;

  const {
    data: { PageItem },
  } = await getPageData({ preview, id });

  if (PageItem) {
    return {
      props: {
        PageItem,
      },
    };
  } else {
    return { props: { errorCode: 404 } };
  }
};

interface PathInterface {
  params: {
    page: string[];
  };
  locale: string;
}

interface StaticPathResults {
  paths: PathInterface[];
  fallback: boolean;
}

export const getStaticPaths = async ({
  preview = false,
}: NextApiRequest): Promise<StaticPathResults> => {
  const result: {
    paths: PathInterface[];
    fallback: boolean;
  } = {
    paths: [],
    fallback: false,
  };

  const promise1: Promise<ApolloQueryResult<PageSlugsResponse>> = graphqlClient(
    {
      preview,
    }
  ).query({
    query: GET_PAGE_SLUGS,
  });

  const promise2 = getLanguages({ preview });

  const [response, response2] = await Promise.all([promise1, promise2]);

  if (!response.data?.PageItems.items.length || !response2.data?.Space) {
    return result;
  }

  [...response2.data?.Space.languageCodes, 'en'].forEach((lang: string) => {
    response.data?.PageItems.items.forEach((item) => {
      const path = {
        params: {
          page: item.full_slug === 'home' ? [''] : [item.full_slug],
        },
        locale: lang,
      };

      result.paths.push(path);
    });
  });

  return result;
};

// gql queries

const getPageData = ({
  preview,
  id,
}: {
  preview: boolean;
  id: string;
}): Promise<ApolloQueryResult<PageItemRes>> =>
  graphqlClient({
    preview,
  }).query({
    query: GET_PAGE,
    variables: {
      id,
    },
  });
