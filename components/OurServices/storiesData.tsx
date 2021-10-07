const description =
  'Data & Analitics, Conversion Optimization, E-mail marketing, Social Media Advertising, Affiliate Marketing, Integration & Implementation, Something Else';

const button = {
  buttonText: 'Contact us',
  buttonLink: '/contact',
};

const services = [
  {
    title: 'Personalization',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'user',
  },
  {
    title: 'Data & Analicits',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'analytics',
  },
  {
    title: 'E-mail marketing',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'email',
  },
  {
    title: 'Affiliate marketing',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'user-voice',
  },
  {
    title: 'Conversion optimization',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'analise',
  },
  {
    title: 'Marketing automation',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'chip',
  },
  {
    title: 'Social media advertising',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'megaphone',
  },
  {
    title: 'Integration & Implementation',
    subtitle: 'PHP, Node.js',
    description,
    ...button,
    icon: 'code',
  },
];

const partners = [
  {
    title: 'mixpanel',
    logo: 'companies/mixpanel',
    link: 'https://mixpanel.com',
  },
  {
    title: 'customer IO',
    logo: 'companies/customer-io',
    link: 'https://customer.io',
  },
  {
    title: 'segment',
    logo: 'companies/segment',
    link: 'https://segment.com',
  },
];

export const props = {
  title: 'Our Services',
  description:
    "Join 20,000+ businesses that use Segment's software and APIs to collect, clean and control their customer data",
  services,
  partners,
};
