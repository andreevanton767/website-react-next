import PostPreview from './PostPreview';

import { Service } from '@/enums/components';

import { paragraphMixed } from '@/components/PostComponents/storiesData';

export default {
  title: 'Post Preview',
  component: PostPreview,
};

const props = {
  slug: 'test_slug',
  categories: [Service.DataAnalytics],
  firstPublished: new Date(Date.now()).toString(),
  views: 145,
  cover: { filename: '', alt: '' },
  title: 'In nunc proin pretium.',
  tags: [
    { label: 'beginner', icon: 'analytics' },
    { label: 'beginner', icon: 'analytics' },
  ],
  excerpt: paragraphMixed.content,
};

export const Default = (): JSX.Element => (
  <div className="py-20 bg-white">
    <PostPreview {...props} />
  </div>
);

export const WithCover = (): JSX.Element => (
  <div className="py-20 bg-white">
    <PostPreview
      {...props}
      cover={{
        filename:
          'https://a.storyblok.com/f/98632/1680x1100/8f158c4185/about-cover.jpg',
      }}
    />
  </div>
);
