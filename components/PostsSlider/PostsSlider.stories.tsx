import PostsSlider from './PostsSlider';

import { Service } from '@/enums/components';

export default {
  title: 'Posts Slider',
  components: PostsSlider,
};

const article = {
  category: Service.DataAnalytics,
  createdAt: new Date(Date.now()).toString(),
  title: 'Varius sodales nec integer consectetur.',
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique dignissim risus imperdiet posuere metus justo a est.',
  cover: 'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
};

const props = {
  title: 'Other Articles',
  moreArticlesLabel: 'more articles in this category',
  articles: Array(6)
    .fill(article)
    .map((article, index) => ({ ...article, slug: `test_slug_${index}` })),
};

export const Default = (): JSX.Element => (
  <div className="bg-white">
    <PostsSlider {...props} />
  </div>
);
