import AboutTop from './AboutTop';

export default {
  title: 'About Top',
  component: AboutTop,
};

const props = {
  title: 'Who We Are',
  description:
    'YEA is up and running since 2020 with a young team. While we are small in size, we are strong in doing and thinking.',
  cover: {
    filename:
      'https://a.storyblok.com/f/98632/1680x1100/8f158c4185/about-cover.jpg',
  },
};

export const Default = (): JSX.Element => <AboutTop {...props} />;
