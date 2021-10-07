import { useEffect, useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { NextApiRequest } from 'next';
import SbEditable from 'storyblok-react';

import { LanguageCodesResponse } from '@/types/i18n';
import { FooterBlokProps, HeaderBlokProps } from '@/types/layout';

import { GET_LANGUAGES } from '@/libs/api/i18n';

import graphqlClient from '@/utils/graphql';
import { initEditor } from '@/utils/storyblok';

import DynamicComponent from '@/components/DynamicComponent';

import {
  GET_HEADER,
  GET_FOOTER,
  GET_LAYOUT_COMPONENT_SLUGS,
} from '@/libs/api/preview';

const ComponentPreview = ({
  item,
  locales,
}: StaticPropsResult): JSX.Element => {
  const [story, setStory] = useState<HeaderBlokProps | FooterBlokProps>(item);
  const contentOfStory = { ...story.content, locales };

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
  }, []);

  return (
    <div className="h-screen bg-secondary">
      <script
        src={
          '//app.storyblok.com/f/storyblok-latest.js?t=BKFRTWedKaTnP3sHlkRQBQtt'
        }
      />
      <SbEditable content={contentOfStory}>
        <DynamicComponent blok={{ ...contentOfStory }} />
      </SbEditable>
    </div>
  );
};

export default ComponentPreview;

interface StaticPropsResult {
  item: HeaderBlokProps | FooterBlokProps;
  locales: ApolloQueryResult<LanguageCodesResponse>;
}

export const getStaticProps = async ({
  preview = true,
  params,
  locale,
}: {
  preview: boolean;
  params?: { lang: string; component: string[] };
  locale: string;
}): Promise<{ props: StaticPropsResult }> => {
  const { component } = params;

  const id =
    locale === 'en' ? `/layout/${component}` : `${locale}/layout/${component}`;
  const query = id.includes('header') ? GET_HEADER : GET_FOOTER;

  const componentPromise: ApolloQueryResult<{
    HeaderItem?: HeaderBlokProps;
    FooterItem?: FooterBlokProps;
  }> = await graphqlClient({
    preview,
  }).query({
    query,
    variables: {
      id,
    },
  });

  const localesPromise: Promise<
    ApolloQueryResult<LanguageCodesResponse>
  > = graphqlClient({ preview }).query({
    query: GET_LANGUAGES,
  });

  const [res, locales] = await Promise.all([componentPromise, localesPromise]);

  const item = res.data.HeaderItem || res.data.FooterItem;

  return {
    props: {
      item,
      locales,
    },
  };
};

interface SlugsObject {
  items: {
    full_slug: string;
  }[];
}

interface SlugsSchema {
  HeaderItems: SlugsObject;
  FooterItems: SlugsObject;
}

interface StaticPathResults {
  paths: string[];
  fallback: boolean;
}

export const getStaticPaths = async ({
  preview = true,
}: NextApiRequest): Promise<StaticPathResults> => {
  const result: {
    paths: string[];
    fallback: boolean;
  } = {
    paths: [],
    fallback: false,
  };

  const promise1: Promise<ApolloQueryResult<SlugsSchema>> = graphqlClient({
    preview,
  }).query({
    query: GET_LAYOUT_COMPONENT_SLUGS,
  });

  const promise2: Promise<
    ApolloQueryResult<LanguageCodesResponse>
  > = graphqlClient({ preview }).query({
    query: GET_LANGUAGES,
  });

  const [response, response2] = await Promise.all([promise1, promise2]);

  if (
    (!response.data?.HeaderItems.items.length &&
      !response.data?.FooterItems.items.length) ||
    !response2.data?.Space
  ) {
    return result;
  }

  let slugs: any = response.data;
  slugs = [...slugs.HeaderItems.items, ...slugs.FooterItems.items];

  [...response2.data?.Space.languageCodes, 'en'].forEach((lang: string) => {
    slugs.forEach((item) => {
      const path = `/${lang}/${item.full_slug}`;

      result.paths.push(path);
    });
  });

  return result;
};
