import { BlogTopType } from '@/enums/components';

import {
  MappedBlogProps,
  FeaturedCategoriesProps,
  CategoryItem,
  BloghomeItem,
} from '@/types/blog';

interface MapPropsPayload {
  CategoryItems: CategoryItem[];
  BloghomeItem: BloghomeItem;
}

export const mapBlogProps = ({
  CategoryItems,
  BloghomeItem,
}: MapPropsPayload): MappedBlogProps => {
  // save editeble for layout props
  const editableContent = BloghomeItem.content;

  // lose the Blok part, get subscribe props
  const {
    _editable,
    _uid,
    component,
    subscribeSection,
    ...blogProps
  } = editableContent;

  // get layout props
  const {
    title,
    description,
    keywords,
    header,
    footer,
    ...cardProps
  } = blogProps;

  const layoutProps = {
    metaContent: { title, description, keywords },
    header,
    footer,
    editableContent,
  };

  // get button labels
  const { allPosts, readNow, seePosts, ...featuredProps } = cardProps;
  const buttonText = { allPosts, readNow, seePosts };

  // get top props
  const { featuredPost, featuredPostLabel, ...categoryProps } = featuredProps;

  const {
    slug: postSlug,
    firstPublishedAt: firstPublished,
    ...topPost
  } = featuredPost;
  const { intro: text, ...featuredPostContent } = topPost.content;

  const topProps = {
    ...featuredPostContent,
    text,
    postSlug,
    buttonText: buttonText.readNow,
    firstPublished,
    featuredPostLabel,
    type: BlogTopType.Home,
  };

  // get category cards props
  const featuredCategories = {
    categories: CategoryItems.filter(({ content: { category } }) =>
      categoryProps.featuredCategories.includes(category)
    ).map(({ content }, index) => ({
      ...content,
      buttonSm: buttonText.seePosts,
      topic: categoryProps.topicLabel,
      ...(index === 0
        ? {
            buttonLg: buttonText.allPosts,
            latestPosts: {
              buttonText: buttonText.readNow,
            },
          }
        : {}),
    })),
  } as FeaturedCategoriesProps;

  const otherCategoriesProps = {
    title: featuredProps.otherCategoriesTitle,
    categories: CategoryItems.filter(
      ({ content: { category } }) =>
        !categoryProps.featuredCategories.includes(category)
    ).map(({ content }) => ({ ...content, buttonSm: buttonText.seePosts })),
  };

  return {
    topProps,
    featuredCategories,
    subscribeProps: subscribeSection[0],
    layoutProps,
    otherCategoriesProps,
  };
};
