import PostBody from './PostBody';
import PostTop from '@/components/PostTop/';

import props from './storiesData';
import { propsWithImage } from '@/components/PostTop/storiesData';

export default {
  title: 'Post Body',
  component: PostBody,
};

console.log('props', propsWithImage);

export const Default = (): JSX.Element => (
  <div className="bg-white">
    <PostBody {...props} />
  </div>
);

export const WithPostTop = (): JSX.Element => (
  <div className="bg-white">
    <PostTop {...propsWithImage} />
    <PostBody {...props} />
  </div>
);
