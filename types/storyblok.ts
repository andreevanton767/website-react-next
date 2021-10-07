import { PageBackground } from '@/enums/components';
import { Language } from '@/enums/language';

import { FooterBlokProps, HeaderBlokProps } from '@/types/layout';

//region Exported Types
export interface PageItem {
  id: number;
  content: Blok<{
    body: Blok<Record<string, any>>[]; // maybe make this more detailed in the future
    header: HeaderBlokProps;
    footer: FooterBlokProps;
    description: string;
    title: string;
    keywords: string;
    backgroundGradient: PageBackground;
  }>;
}

export interface PageItemRes {
  PageItem: PageItem;
}

export type PageItems = Collection<PageItem>;

export type PageSlugsResponse = {
  PageItems: Collection<{ full_slug: string }>;
};

export type Blok<P extends {} = {}> = {
  _uid: string;
  _editable: string;
  component: any; // maybe add enum of all components in the future
} & P;
//endregion

//region Mapped Types
type Collection<T> = {
  total: number;
  items: T[];
};
//endregion

//region Other Types
type Alternate = {
  fullSlug: string;
  id: number;
  isFolder: boolean;
  name: string;
  parentId: number;
  published: boolean;
  slug: string;
};

export type Space = {
  domain: string;
  id: number;
  languageCodes: Language[];
  name: string;
  version: number;
};

export interface SbImage {
  id?: number;
  alt?: string;
  name?: string;
  focus?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
}

export interface SbLink {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
  cachedUrl: string;
}
//endregion
