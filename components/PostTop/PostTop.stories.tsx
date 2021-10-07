import PostTop from './PostTop';

import { props, propsWithImage } from './storiesData';

export default {
  title: 'Post Top',
  component: PostTop,
};

export const WithGraphic = (): JSX.Element => (
  <div className="bg-white md:pb-112.5">
    <PostTop {...props} />
  </div>
);

export const WithImage = (): JSX.Element => (
  <div className="bg-white md:pb-112.5">
    <PostTop {...propsWithImage} />
  </div>
);
