import { Service } from '@/enums/components';

import { Blok } from '@/types/storyblok';
import { PostItem } from '@/types/blogPost';
import { FooterBlokProps, HeaderBlokProps, LayoutProps } from '@/types/layout';

import { CategoryCardProps } from '@/components/YCategoryCard';
import { SubscribeProps } from '@/components/SubscribeSection';
import { BlogTopAdditionalProps, BlogTopProps } from '@/components/BlogTop';

//region component props
type LargeCategoryCard = Required<CategoryCardProps>;
type MiddleCategoryCard = Omit<
  Omit<LargeCategoryCard, 'latestPosts'>,
  'buttonLg'
>;
type SmallCategorycard = Omit<MiddleCategoryCard, 'topic'>;
//endregion

//region blok props
export type SubscribeBlok = Blok<Required<SubscribeProps>>;
//endregion

//region res data
export interface BloghomeItem {
  id: number;
  content: Blok<{
    featuredPostLabel: string;
    featuredPost: PostItem;
    featuredCategories: Service[];
    readNow: string;
    seePosts: string;
    allPosts: string;
    topicLabel: string;
    otherCategoriesTitle: string;
    subscribeSection: SubscribeBlok;
    header: HeaderBlokProps;
    footer: FooterBlokProps;
    title: string;
    description: string;
    keywords: string;
  }>;
}

export interface BloghomeItemRes {
  BloghomeItem: BloghomeItem;
}

export interface CategoryItem {
  content: { category: Service; description: string };
}

export interface CategoriesRes {
  CategorypageItems: {
    items: CategoryItem[];
  };
}
//endregion

//region mapped props
export interface FeaturedCategoriesProps {
  categories: [LargeCategoryCard, MiddleCategoryCard, MiddleCategoryCard];
}

export interface OtherCategoriesProps {
  title: string;
  categories: SmallCategorycard[];
}

export interface MappedBlogProps {
  topProps: Required<BlogTopProps & BlogTopAdditionalProps>;
  featuredCategories: FeaturedCategoriesProps;
  subscribeProps: SubscribeProps;
  otherCategoriesProps: OtherCategoriesProps;
  layoutProps: LayoutProps;
}

//endregion
