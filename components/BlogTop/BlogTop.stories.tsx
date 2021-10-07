import BlogTop from './BlogTop';

import { BlogTopType, Service } from '@/enums/components';

export default {
  title: 'Blog Top',
  component: BlogTop,
};

const props = {
  title: 'Increased trust and authority',
  buttonProps: {
    buttonText: 'Read More',
    buttonLink: '/',
  },
  categories: [Service.ConversionOptimization],
  createdAt: new Date(Date.now()).toString(),
  text:
    'Customers want to be attracted, to know that brand cares about them and has taken the time to do the necessary research.',
  featuredPostLabel: 'Popular article',
} as Parameters<typeof BlogTop>[0];

export const Personalization = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.Personalization]} />
);

export const IntegrationImplementation = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.IntegrationImplementation]} />
);

export const ConversionOptimization = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.ConversionOptimization]} />
);

export const AffiliateMarketing = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.AffiliateMarketing]} />
);

export const MarketingAutomation = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.MarketingAutomation]} />
);

export const OnlineAdvertising = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.OnlineAdvertising]} />
);

export const DataAnalytics = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.DataAnalytics]} />
);

export const EmailMarketing = (): JSX.Element => (
  <BlogTop {...props} categories={[Service.EmailMarketing]} />
);

export const CategoryTop = (): JSX.Element => (
  <BlogTop
    {...props}
    type={BlogTopType.Category}
    categories={[Service.EmailMarketing]}
  />
);
