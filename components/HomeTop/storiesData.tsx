// default data from spec, to be used with stories
const partners = [
  {
    logo: 'companies/google',
    link: 'https://google.com',
    title: 'google',
  },
  {
    logo: 'companies/segment',
    link: 'https://segment.com',
    title: 'segment',
  },
  {
    logo: 'companies/boldking',
    link: 'https://boldking.com',
    title: 'boldking',
  },
  {
    logo: 'companies/nike',
    link: 'https://nike.com',
    title: 'nike',
  },
  {
    logo: 'companies/deloitte',
    link: 'https://deloitte.com',
    title: 'deloitte',
  },
];

export const defaultProps = {
  title: 'The leading Customer Data Platform',
  description:
    "Join 20000+ businesses that use Segment's software and APIs to collect, clean, and control their customer data.",
  buttonProps: {
    text: 'Learn More',
    link: '/',
  },
  partners,
};

export const cards = [
  {
    title: 'Structure',
    description: 'Another client - another story',
    icon: 'content',
  },
  {
    title: 'Cart Upsell',
    description: 'Personalized Suggestion',
    icon: 'cart',
  },
  {
    title: 'Navigation',
    description: 'Custom navigation patterns',
    icon: 'directions',
  },
  {
    title: 'Email',
    description: 'Personalized follow up email',
    icon: 'email',
  },
  {
    title: 'Content',
    description: 'Adaptive content per user',
    icon: 'carousel',
  },
];
