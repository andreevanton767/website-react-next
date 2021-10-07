import React, { useContext, useEffect, useState } from 'react';

import { PostItem } from '@/types/blogPost';
import { PostLayoutRes } from '@/types/layout';

import PostTop from '@/components/PostTop';
import PostBody from '@/components/PostBody';
import PostsSlider from '@/components/PostsSlider';

import { mapPostProps } from '@/utils/storyblok/blogPost';
import { mapPostLayoutProps } from '@/utils/storyblok/layout';
import { initEditor } from '@/utils/storyblok';
import { updatePageContext } from '@/utils/globalState';

import { GlobalStateContext } from '@/store/GlobalStateContext';
import { FeaturedPosts, Service } from '@/enums/components';
import useRecentPosts from '@/hooks/useRecentPosts';

interface Props {
  PostItem: PostItem;
  PostlayoutItem: PostLayoutRes['PostlayoutItem'];
}

/**
 * Post component used to both render a post page as well as controll post preview (for visual editing) in storyblok
 * @param param0
 * @returns
 */
const PostPage: React.FC<Props> = ({ PostlayoutItem, PostItem }) => {
  // set story for visual editing
  const [story, setStory] = useState<PostItem>(PostItem);
  const contentOfStory = story.content;
  useEffect(() => {
    setStory(PostItem);
  }, [PostItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    // setFirstRender(false);
    const body = document.querySelector('body');
    body.className = 'bg-white';
  }, []);

  // get mapped layout props
  const {
    topLayoutProps,
    bodyLayoutProps,
    sliderLayoutProps,
  } = mapPostLayoutProps(PostlayoutItem);

  // get mapped post content
  const { topProps, bodyProps, metaContent } = mapPostProps(story);

  // layout component props
  const { header, footer } = PostlayoutItem.content;

  const layoutProps = {
    metaContent,
    editableContent: contentOfStory,
    header,
    footer,
  };

  // udpate global state store with layout data on each id change (lang in this case)
  const { dispatch } = useContext(GlobalStateContext);

  const pageContext = { ...layoutProps, isWebsite: false };
  useEffect(() => {
    updatePageContext(pageContext, dispatch);
  }, [PostlayoutItem]);

  // get recent posts content (client side)
  const { articles, fetching } = useRecentPosts({
    location: FeaturedPosts.BlogPost,
    category: topProps.categories[0],
  });

  return (
    <>
      <PostTop {...{ ...topProps, ...topLayoutProps }} />
      <PostBody {...{ ...bodyProps, ...bodyLayoutProps }} />
      {fetching ? null : (
        <PostsSlider {...sliderLayoutProps} articles={articles} />
      )}
    </>
  );
};

export default PostPage;
