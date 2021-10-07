import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { PageItem } from '@/types/storyblok';

import DynamicComponent from '@/components/DynamicComponent';

import { initEditor } from '@/utils/storyblok';
import { updatePageContext } from '@/utils/globalState';

import { GlobalStateContext } from '@/store/GlobalStateContext';

interface Props {
  PageItem: PageItem;
}

const Background = dynamic(() => import('@/components/BackgroundGradient'));

const Page: React.FC<Props> = ({ PageItem }) => {
  const [story, setStory] = useState<PageItem>(PageItem);
  const contentOfStory = story.content;

  useEffect(() => {
    setStory(PageItem);
  }, [PageItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    const body = document.querySelector('body');
    body.className = 'bg-secondary';
  }, []);

  const {
    header,
    footer,
    title,
    description,
    keywords,
    backgroundGradient,
  } = contentOfStory;

  const pageContext = {
    header,
    footer,
    metaContent: { title, description, keywords },
    editableContent: contentOfStory,
    isWebsite: true,
  };

  // update global state on each page/locale change
  const { dispatch } = useContext(GlobalStateContext);

  useEffect(() => {
    updatePageContext(pageContext, dispatch);
  }, [PageItem.id]);

  return (
    <>
      {backgroundGradient && <Background page={backgroundGradient} />}
      {contentOfStory.body.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </>
  );
};

export default Page;
