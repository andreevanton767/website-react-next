import AboutDifferent from './AboutDifferent';

export default {
  title: "About: How we're different",
  component: AboutDifferent,
};

const article = {
  title: 'Personalization',
  subtitle: 'The leading Customer Data Platform',
  text:
    "Join 20000+ businesses that use Segment's software and APIs to collect, clean, and control their customer data.",
};

const props = {
  title: "how we're different",
  articles: Array(4).fill(article),
};

export const Default = (): JSX.Element => <AboutDifferent {...props} />;
