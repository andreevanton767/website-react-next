import { useEffect, useState } from 'react';

import { Service } from '@/enums/components';

import { PostLayoutRes } from '@/types/layout';

import { PostNav } from '@/components/PostComponents';
import { MetaBox } from '@/components/PostTop';
import Layout from '@/components/Layout';
import PostsSlider from './PostsSlider';

import { initEditor } from '@/utils/storyblok';
import { mapPostLayoutProps } from '@/utils/storyblok/layout';

import { authors } from '@/components/PostTop/storiesData';

const PostLayoutPreview: React.FC<PostLayoutRes> = ({ PostlayoutItem }) => {
  const [story, setStory] = useState<PostLayoutRes['PostlayoutItem']>(
    PostlayoutItem
  );
  const contentOfStory = story.content;

  useEffect(() => {
    setStory(PostlayoutItem);
  }, [PostlayoutItem]);

  useEffect(() => {
    setTimeout(() => initEditor([story, setStory]), 200);
    const body = document.querySelector('body');
    body.className = 'bg-white';
  }, []);

  const {
    topLayoutProps,
    bodyLayoutProps,
    sliderLayoutProps,
  } = mapPostLayoutProps(story);

  const { header, footer } = contentOfStory;

  const layoutComponentProps = {
    title: 'Layout preview',
    header,
    footer,
    editableContent: contentOfStory,
  };

  const metaBoxProps = {
    ...topLayoutProps,
    authors,
  };

  return (
    <Layout {...layoutComponentProps}>
      <div className="relative max-w-189 mx-auto pt-15.5 md:pt-37.5">
        <MetaBox {...metaBoxProps} className="lg:float-right" />
        <PostNav
          {...bodyLayoutProps}
          className="lg:float-left"
          sections={sections}
        />
      </div>
      <div className="relative md:h-sm w-full overflow-hidden">
        <PostsSlider {...sliderLayoutProps} articles={articles} />
      </div>
    </Layout>
  );
};

// dummy data
const onClick = () => {};

const sections = [
  { heading: 'Title1', isIntersecting: true, onClick },
  { heading: 'Title2', isIntersecting: false, onClick },
  { heading: 'Title3', isIntersecting: false, onClick },
];

const article = {
  slug: '',
  intro:
    'This is a dummy article to fill layout with content, please focus on editable parts',
  categories: [Service.Personalization],
  firstPublished: new Date(Date.now()).toString(),
};

const articles = Array(10)
  .fill(article)
  .map((article, index) => ({ ...article, title: `Dummy Article ${index}` }));

export default PostLayoutPreview;
