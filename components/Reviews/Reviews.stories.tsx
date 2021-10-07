import Reviews from './Reviews';

export default {
  title: 'Reviews',
  component: Reviews,
};

const review = {
  text:
    'With real time integrated data flows from Segment, we can truly understand what people are doing with our platform.',
  stats:
    '70% increase in revenue following a three-month customer messaging pilot program',
  name: 'Nic Sauriol',
  role: 'Software Development Leader',
  logo: 'companies/ibm',
};

const props = {
  title: 'Reviews',
  description: "Join 20,000+ businesses that use Segment's software and APIs.",
  buttonProps: {
    link: '/contact',
    text: 'Contact us',
  },
  reviews: [review, { ...review, name: 'Different Guy' }],
};

export const Default = (): JSX.Element => <Reviews {...props} />;
