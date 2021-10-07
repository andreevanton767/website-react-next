import { DocumentNode, gql } from '@apollo/client';

/**
 * Returns header component, used for layout component preview while editing with storyblok
 */
export const GET_HEADER: DocumentNode = gql`
  query HeaderItem($id: ID!) {
    HeaderItem(id: $id, resolve_relations: "page.header,page.footer") {
      uuid
      content {
        _uid
        logoIcon
        logoLink {
          id
          url
          linktype
          fieldtype
          cachedUrl
        }
        navItems
        component
        buttonLink {
          cachedUrl
        }
        buttonText
        searchLabel
        headerType
      }
    }
  }
`;

/**
 * Returns footer component, used for layout component preview while editing with storyblok
 */
export const GET_FOOTER: DocumentNode = gql`
  query FooterItem($id: ID!) {
    FooterItem(id: $id, resolve_relations: "page.header,page.footer") {
      uuid
      content {
        _uid
        city
        component
        contactButton
        contentDescription
        contentHeading
        email
        linksFirst
        linksSecond
        phoneLabel
        phoneValue
        postalCode
        socialMedia
        street
        searchLabel
        footerType
      }
    }
  }
`;

/**
 * Returns slugs for layout components => header, footer
 */
export const GET_LAYOUT_COMPONENT_SLUGS: DocumentNode = gql`
  query {
    HeaderItems {
      items {
        full_slug
      }
    }
    FooterItems {
      items {
        full_slug
      }
    }
  }
`;
