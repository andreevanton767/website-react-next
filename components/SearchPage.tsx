import React, { useContext, useEffect, useState } from 'react';

import { SearchpageItem, SearchPostsRes, TagBlokProps } from '@/types/search';

import SearchTop from '@/components/SearchTop';
import PostPreviewBody from '@/components/PostPreviewBody';

import { initEditor } from '@/utils/storyblok';
import { mapSearchProps } from '@/utils/storyblok/search';
import { updatePageContext } from '@/utils/globalState';

import { GlobalStateContext } from '@/store/GlobalStateContext';

interface Props {
  PostItems: SearchPostsRes['PostItems'];
  SearchpageItem: SearchpageItem;
  tagItems: TagBlokProps[];
}

/**
 * Post component used to both render a post page as well as controll post preview (for visual editing) in storyblok
 * @param param0
 * @returns
 */
const SearchPage: React.FC<Props> = ({
  PostItems,
  SearchpageItem,
  tagItems,
}) => {
  // set story for visual editing
  const [story, setStory] = useState<SearchpageItem>(SearchpageItem);

  useEffect(() => {
    setStory(SearchpageItem);
  }, [SearchpageItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    const body = document.querySelector('body');
    body.className = 'bg-white';
  }, []);

  const { topProps, layoutProps, postPreviews, numPages } = mapSearchProps(
    SearchpageItem,
    PostItems,
    tagItems
  );

  // handle layout updates
  const { dispatch } = useContext(GlobalStateContext);

  const pageContext = { ...layoutProps, isWebsite: false };
  useEffect(() => {
    updatePageContext(pageContext, dispatch);
  }, [SearchpageItem]);

  return (
    <>
      <SearchTop {...topProps} />
      <PostPreviewBody
        postPreviews={postPreviews}
        numPages={numPages}
        scrollToTop
      />
    </>
  );
};

export default SearchPage;
