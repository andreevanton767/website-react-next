import { Order } from '@/enums/search';
import { Service } from '@/enums/components';

import { Blok } from '@/types/storyblok';
import { FooterBlokProps, HeaderBlokProps, LayoutProps } from '@/types/layout';

import { SearchTopProps } from '@/components/SearchTop';
import { ParsedUrlQuery } from 'querystring';
import { PostPreviewProps } from '@/components/PostPreview';
import { TopLevelContentEntry } from './blogPost';

//region query params (from URL query string)
export interface ParsedSearchQuery extends ParsedUrlQuery {
  search: string;
  categories: Service | Service[];
  page: string;
  per_page: string;
  sort: Order;
  tags: string | string[];
}
//

//region blok props
export interface SearchpageItem {
  id: number;
  content: Blok<
    Omit<SearchTopProps, 'tags'> & {
      header: HeaderBlokProps;
      footer: FooterBlokProps;
      title: string;
      description: string;
      keywords: string;
    }
  >;
}

export interface TagBlokProps {
  content: Blok<{
    icon: string;
    label: string;
    tag: string;
    color: string;
  }>;
}

export interface SearchPostBlok {
  slug: string;
  first_published_at: string;
  content: {
    categories: Service[];
    tags: {
      content: Blok<{
        icon: string;
        label: string;
      }>;
    }[];
    cover: {
      filename: string;
      alt: string;
    };
    title: string;
    long_text: TopLevelContentEntry;
  };
}
//endregion

//region res props
export interface SearchpageItemRes {
  SearchpageItem: SearchpageItem;
}

export interface TagItemsRes {
  TagItems: {
    items: Omit<Omit<TagBlokProps, 'icon'>, 'color'>[];
  };
}

export interface SearchPostsRes {
  PostItems: {
    total: number;
    items?: SearchPostBlok[];
  };
}
//endregion

//region mapped props
export interface MappedSearchProps {
  topProps: SearchTopProps;
  layoutProps: LayoutProps;
  postPreviews: PostPreviewProps[];
  numPages: number;
}
//endregion
