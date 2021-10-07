import React from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

import { PostItem } from '@/types/blogPost';
import { PostLayoutRes } from '@/types/layout';

import PostPage from '@/components/PostPage';
import PostLayoutPreview from '@/components/PostLayoutPreview';

import { GET_POST_LAYOUT, GET_POST, getRecentPosts } from '@/libs/api/post';

import graphqlClient from '@/utils/graphql';

interface ErrorRes {
  errorCode: number;
}

interface LayoutPreviewRes {
  layoutPreview: true;
  PostlayoutItem: PostLayoutRes['PostlayoutItem'];
}

interface PostDataRes {
  PostItem?: PostItem;
  PostlayoutItem: PostLayoutRes['PostlayoutItem'];
}

type Props = Partial<ErrorRes & LayoutPreviewRes & PostDataRes>;

const Post: React.FC<Props> = ({
  errorCode,
  layoutPreview = false,
  PostlayoutItem,
  PostItem,
}) => {
  /**
   * Early error handling
   */
  if (errorCode) return <Error statusCode={errorCode} />;

  if (layoutPreview)
    return <PostLayoutPreview PostlayoutItem={PostlayoutItem} />;

  return <PostPage PostlayoutItem={PostlayoutItem} PostItem={PostItem} />;
};

type ServerSideReturnType = ErrorRes | LayoutPreviewRes | PostDataRes;

export const getServerSideProps: GetServerSideProps<ServerSideReturnType> = async ({
  locale,
  preview = false,
  params: { post },
  res,
}) => {
  /**
   *  Early error handling
   */
  // typescript guard (post should always be a string as page name is '[post].tsx' format)
  if (typeof post != 'string') {
    res.statusCode = 400;
    return { props: { errorCode: 400 } };
  }

  // fail early if accessing 'layout' from outside preview
  // if (post === 'layout' && !preview) {
  //   res.statusCode = 403;
  //   return { props: { errorCode: 403 } };
  // }

  /**
   * Prepare params for gql queries
   */
  const lang = locale === 'en' ? '' : `${locale}/`;

  const id = `${lang}blog/p/${post}`;

  const layoutId = `${lang}blog/p/layout`;

  /**
   * Get and return data from CMS
   */
  if (post === 'layout') {
    // this is for post layout content (available only in preview)
    // get layout props
    const {
      data: { PostlayoutItem },
    } = await getLayoutData({ preview, layoutId });

    return { props: { layoutPreview: true, PostlayoutItem } };
  } else {
    // this is normal ([lang]/p/[post_name]) access
    // try and get data
    const [
      {
        data: { PostItem },
      },
      {
        data: { PostlayoutItem },
      },
    ] = await Promise.all([
      getPostData({ preview, id }),
      getLayoutData({ preview, layoutId }),
    ]);

    if (PostItem !== null) {
      return {
        props: {
          PostlayoutItem,
          PostItem,
        },
      };
    } else {
      /**
       * Late error handling (404)
       */
      res.statusCode = 404;
      return { props: { errorCode: 404 } };
    }
  }
};

// gql query functions
const getPostData = ({
  preview = false,
  id,
}: {
  preview?: boolean;
  id: string;
}): Promise<ApolloQueryResult<{ PostItem: PostItem }>> =>
  graphqlClient({ preview }).query({
    query: GET_POST,
    variables: { id },
  });

const getLayoutData = async ({
  preview = false,
  layoutId,
}: {
  preview?: boolean;
  layoutId: string;
}): Promise<ApolloQueryResult<PostLayoutRes>> =>
  graphqlClient({
    preview,
  }).query({ query: GET_POST_LAYOUT, variables: { layoutId } });

export default Post;
