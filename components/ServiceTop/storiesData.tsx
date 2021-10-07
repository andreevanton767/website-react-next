import { Service } from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';

const props = {
  serviceLabel: 'SERVICE',
  description:
    'The integration & implementation part of our services is where we help companies integrate the tools we offer.',
  buttonProps: {
    link: '/',
    text: 'Learn More',
  },
};

export const integrationImplementation = {
  ...props,
  title: 'Integration/ Implementation',
  service: Service.IntegrationImplementation,
};
export const affiliateMarketing = {
  ...props,
  title: 'Affiliate Marketing',
  service: Service.AffiliateMarketing,
};
export const onlineAdvertising = {
  ...props,
  title: 'Online Advertising',
  service: Service.OnlineAdvertising,
};
export const emailMarketing = {
  ...props,
  title: 'Email Marketing',
  service: Service.EmailMarketing,
};
export const personalization = {
  ...props,
  title: 'Personalization',
  service: Service.Personalization,
};
export const marketingAutomation = {
  ...props,
  title: 'Marketing Automation',
  service: Service.MarketingAutomation,
};
export const dataAnalytics = {
  ...props,
  title: 'Data & Analytics',
  service: Service.DataAnalytics,
};
export const conversionOptimization = {
  ...props,
  title: 'Conversion Optimization',
  service: Service.ConversionOptimization,
};
