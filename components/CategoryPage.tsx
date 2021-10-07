import React, { useContext, useEffect, useState } from 'react';

import { SearchPostsRes } from '@/types/search';
import { CategorypageItem } from '@/types/categoryPage';

import BlogTop from '@/components/BlogTop';

import { mapCategoryProps } from '@/utils/storyblok/categoryPage';
import { initEditor } from '@/utils/storyblok';
import { GlobalStateContext } from '@/store/GlobalStateContext';
import { updatePageContext } from '@/utils/globalState';
import PostPreviewBody from './PostPreviewBody';

interface Props {
  CategorypageItem: CategorypageItem;
  PostItems: SearchPostsRes['PostItems'];
}

/**
 * Post component used to both render a post page as well as controll post preview (for visual editing) in storyblok
 * @param param0
 * @returns
 */
const CategoryPage: React.FC<Props> = ({ CategorypageItem, PostItems }) => {
  // set story for visual editing
  const [story, setStory] = useState<CategorypageItem>(CategorypageItem);

  useEffect(() => {
    setStory(CategorypageItem);
  }, [CategorypageItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    const body = document.querySelector('body');
    body.className = 'bg-white';
  }, []);

  // props for rendering UI
  const {
    layoutProps,
    topProps,
    featuredCategories,
    postPreviews,
    numPages,
  } = mapCategoryProps(story, PostItems);

  // handle layout updates
  const { dispatch } = useContext(GlobalStateContext);

  const pageContext = { ...layoutProps, isWebsite: false };
  useEffect(() => {
    updatePageContext(pageContext, dispatch);
  }, [CategorypageItem]);

  return (
    <>
      <BlogTop {...topProps} />
      <PostPreviewBody
        postPreviews={postPreviews}
        numPages={numPages}
        featuredCategories={featuredCategories}
      />
    </>
  );
};

export default CategoryPage;
