import React, { useContext, useEffect, useState } from 'react';

import { BloghomeItem, CategoryItem } from '@/types/blog';

import FeaturedCategories from '@/components/FeaturedCategories';
import SubscribeSection from '@/components/SubscribeSection';
import OtherCategories from '@/components/OtherCategories';
import BlogTop from '@/components/BlogTop';

import { initEditor } from '@/utils/storyblok';
import { mapBlogProps } from '@/utils/storyblok/blog';
import { updatePageContext } from '@/utils/globalState';

import { GlobalStateContext } from '@/store/GlobalStateContext';

import Highlight from '@/assets/fade-highlights/highlight-blog-top.svg';

interface Props {
  BloghomeItem: BloghomeItem;
  CategoryItems: CategoryItem[];
}

/**
 * Post component used to both render a post page as well as controll post preview (for visual editing) in storyblok
 * @param param0
 * @returns
 */
const PostPage: React.FC<Props> = ({ BloghomeItem, CategoryItems }) => {
  // set story for visual editing
  const [story, setStory] = useState<BloghomeItem>(BloghomeItem);

  useEffect(() => {
    setStory(BloghomeItem);
  }, [BloghomeItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    const body = document.querySelector('body');
    body.className = 'bg-white';
  }, []);

  const {
    layoutProps,
    topProps,
    featuredCategories,
    subscribeProps,
    otherCategoriesProps,
  } = mapBlogProps({ BloghomeItem, CategoryItems });

  // udpate global state store with layout data on each id change (lang in this case)
  const { dispatch } = useContext(GlobalStateContext);

  const pageContext = { ...layoutProps, isWebsite: false };
  useEffect(() => {
    updatePageContext(pageContext, dispatch);
  }, [BloghomeItem]);

  return (
    <div className="flex flex-col">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 flex-shrink-0 hidden lg:block">
        <Highlight />
      </div>
      <BlogTop className="flex-shrink-0" {...topProps} />
      <FeaturedCategories className="flex-shrink-0" {...featuredCategories} />
      <SubscribeSection
        className="flex-shrink-0 order-last lg:order-none"
        {...subscribeProps}
      />
      <OtherCategories className="flex-shrink-0" {...otherCategoriesProps} />
    </div>
  );
};

export default PostPage;
