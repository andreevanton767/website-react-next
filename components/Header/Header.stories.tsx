import Header from './Header';
import { Default as HomeTop } from '@/components/HomeTop/HomeTop.stories';
import { CategoryTop as BlogTop } from '@/components/BlogTop/BlogTop.stories';

import { props } from './storiesData';
import { LayoutType } from '@/enums/components';

export default {
  title: 'Header',
  component: Header,
};

export const Website = (): JSX.Element => (
  <Header {...props} headerType={LayoutType.Website} />
);

export const Blog = (): JSX.Element => (
  <Header {...props} headerType={LayoutType.Blog} />
);

export const WithContent = (): JSX.Element => (
  <>
    <Header {...props} headerType={LayoutType.Website} />
    <HomeTop />
  </>
);

export const BlogWithContent = (): JSX.Element => (
  <>
    <Header {...props} headerType={LayoutType.Blog} />
    <BlogTop />
  </>
);
