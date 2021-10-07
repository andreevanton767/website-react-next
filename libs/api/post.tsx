import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client';

import { Service } from '@/enums/components';

import { RecentPostsRes } from '@/types/blogPost';

import graphqlClient from '@/utils/graphql';

export const GET_POST: DocumentNode = gql`
  query PostItem($id: ID!) {
    PostItem(id: $id) {
      id
      first_published_at
      content {
        _uid
        authors {
          content
        }
        tags {
          content
        }
        categories
        description
        keywords
        title
        intro
        cover {
          alt
          filename
        }
        graphic
        long_text
        component
      }
    }
  }
`;

export const GET_POST_LAYOUT: DocumentNode = gql`
  query PostLayoutItem($layoutId: ID!) {
    PostlayoutItem(id: $layoutId) {
      id
      content {
        _uid
        component
        header {
          content
        }
        contentsLabel
        shareLabel
        socialLinks
        postSliderTitle
        moreArticlesLabel
        footer {
          content
        }
      }
    }
  }
`;

export const GET_RECENT_POSTS: DocumentNode = gql`
  query RecentPosts(
    $category: String!
    $startsWith: String!
    $exclude: String
    $limit: Int
  ) {
    PostItems(
      starts_with: $startsWith
      sort_by: "first_published_at:desc"
      filter_query_v2: { categories: { in_array: [$category] } }
      excluding_slugs: $exclude
      per_page: $limit
    ) {
      items {
        slug
        first_published_at
        content {
          title
          intro
          categories
          cover {
            filename
          }
        }
      }
    }
  }
`;

export const getRecentPosts = async ({
  preview = false,
  category,
  lang,
  exclude = '',
  limit = 100,
}: {
  preview: boolean;
  category: Service;
  lang: string;
  exclude?: string;
  limit?: number;
}): Promise<ApolloQueryResult<RecentPostsRes>> =>
  graphqlClient({ preview }).query({
    query: GET_RECENT_POSTS,
    variables: { category, startsWith: lang, exclude, limit },
  });
