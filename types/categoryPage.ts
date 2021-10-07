import { BlogTopType, Service } from '@/enums/components';

import { Blok } from '@/types/storyblok';
import { FooterBlokProps, HeaderBlokProps } from '@/types/layout';

import { BlogTopProps } from '@/components/BlogTop';
import { FeaturedCategories as Featured } from '@/components/Pagination';

//region component props
export type CategoryTopProps = Omit<BlogTopProps, 'type'> & {
  type: BlogTopType.Category;
};

export type FeaturedCategories = Featured;
//endregion

//region blok types
export type CategoryBlok = Blok<{
  header: HeaderBlokProps;
  footer: FooterBlokProps;
  title: string;
  description: string;
  metaDescription: string;
  keywords: string;
  category: Service;
}>;
//endregion

//region category page res
export interface CategorypageItem {
  id: number;
  content: CategoryBlok & {
    featuredCategories: {
      content: CategoryBlok;
    }[];
    buttonText: string;
  };
}

export interface CategorypageItemRes {
  CategorypageItem: CategorypageItem;
}
//endregion
