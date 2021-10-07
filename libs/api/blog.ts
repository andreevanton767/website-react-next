import { gql, DocumentNode } from '@apollo/client';

export const GET_BLOG_HOME: DocumentNode = gql`
  query GetBlogHome($id: ID!) {
    BloghomeItem(id: $id) {
      id
      content {
        _uid
        component
        featuredPostLabel
        featuredPost {
          slug
          firstPublishedAt
          content
        }
        featuredCategories
        readNow
        seePosts
        allPosts
        topicLabel
        subscribeSection
        otherCategoriesTitle
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

export const GET_ALL_CATEGORIES: DocumentNode = gql`
  query GetCategories($lang: String) {
    CategorypageItems(starts_with: $lang) {
      items {
        content {
          category
          description
        }
      }
    }
  }
`;
