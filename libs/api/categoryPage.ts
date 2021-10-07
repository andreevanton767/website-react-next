import { DocumentNode, gql } from '@apollo/client';

export const GET_CATEGORY: DocumentNode = gql`
  query CategoryPageItem($id: ID!) {
    CategorypageItem(id: $id) {
      id
      content {
        _uid
        component
        title
        description
        featuredCategories {
          content
        }
        buttonText
        metaDescription
        keywords
        header {
          content
        }
        footer {
          content
        }
        category
      }
    }
  }
`;
