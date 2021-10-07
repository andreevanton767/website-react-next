import { Language } from '@/enums/language';

const logo = {
  icon: 'logo-main',
  link: '/home',
};

const buttonProps = {
  text: 'Contact us',
  link: '/contact',
};

const subItems = [
  {
    text: 'Personalization',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x92/59d7f41d58/personalization.png',
      alt: '',
    },
  },
  {
    text: 'Data & Analitics',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/007721f1b1/data-analytics.png',
      alt: '',
    },
  },
  {
    text: 'Email Marketing',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/6d339d373c/email-marketing.png',
      alt: '',
    },
  },
  {
    text: 'Affiliate Marketing',
    link: '/services/affiliate',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/69ea0d4a27/affiliate-marketing.png',
      alt: '',
    },
  },
  {
    text: 'Conversion Optimization',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/c630d47b95/conversion-optimization.png',
      alt: '',
    },
  },
  {
    text: 'Marketing Automatization',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/28be580929/marketing-automation.png',
      alt: '',
    },
  },
  {
    text: 'Online Advertising',
    link: '/',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/045e4aef2a/online-advertising.png',
      alt: '',
    },
  },
  {
    text: 'Integration/Implementation',
    link: '/services/integration',
    icon: {
      filename:
        'https://a.storyblok.com/f/98632/145x90/66bb0ea695/integration-implementation.png',
      alt: '',
    },
  },
];

const navItems = [
  {
    text: 'Home',
    link: '/home',
  },
  {
    text: 'Services',
    link: '/',
    subItems,
  },
  {
    text: 'About',
    link: '/about',
  },
  {
    text: 'Cases',
    link: '/',
  },
  {
    text: 'Partners',
    link: '/',
  },
  {
    text: 'Blog',
    link: '/',
  },
  {
    text: 'Contact',
    link: '/contact',
  },
];

export const props = {
  logo,
  navItems,
  buttonProps,
  locales: Object.values(Language),
  searchLabel: 'Search',
};
