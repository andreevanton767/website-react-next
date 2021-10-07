import { BlogTopType } from '@/enums/components';

import {
  CategorypageItem,
  CategoryTopProps,
  FeaturedCategories,
} from '@/types/categoryPage';
import { LayoutProps } from '@/types/layout';
import { MappedSearchProps, SearchPostsRes } from '@/types/search';
import { mapPostPreviews } from './search';

interface CategoryPropsReturnType {
  layoutProps: LayoutProps;
  topProps: CategoryTopProps;
  featuredCategories: FeaturedCategories;
  numPages: number;
  postPreviews: MappedSearchProps['postPreviews'];
}

export const mapCategoryProps = (
  CategorypageItem: CategorypageItem,
  PostItems: SearchPostsRes['PostItems']
): CategoryPropsReturnType => ({
  layoutProps: extractLayoutProps(CategorypageItem),
  topProps: extractTopProps(CategorypageItem),
  featuredCategories: extractFeaturedCategories(CategorypageItem),
  ...mapPostPreviews(PostItems),
});

const extractLayoutProps = ({ content }: CategorypageItem): LayoutProps => {
  const {
    metaDescription: description,
    header,
    footer,
    title,
    keywords,
  } = content;

  return {
    metaContent: { description, title, keywords },
    header,
    footer,
    editableContent: content,
  };
};

const extractTopProps = ({
  content: { title, description: text, category },
}: CategorypageItem): CategoryTopProps => ({
  title,
  text,
  type: BlogTopType.Category,
  categories: [category],
});

const extractFeaturedCategories = ({
  content: { featuredCategories, buttonText },
}: CategorypageItem): FeaturedCategories => ({
  buttonText,
  categories: featuredCategories.map(
    ({ content: { title, category, description } }) => ({
      title,
      category,
      description,
    })
  ),
});
