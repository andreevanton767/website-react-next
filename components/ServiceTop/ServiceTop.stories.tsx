import ServiceTop from './ServiceTop';

import {
  integrationImplementation,
  affiliateMarketing,
  onlineAdvertising,
  emailMarketing,
  personalization,
  marketingAutomation,
  conversionOptimization,
  dataAnalytics,
} from './storiesData';

export default {
  title: 'Service Top',
  component: ServiceTop,
};

export const IntegrationImplementation = (): JSX.Element => (
  <ServiceTop {...integrationImplementation} />
);
export const AffiliateMarketing = (): JSX.Element => (
  <ServiceTop {...affiliateMarketing} />
);
export const OnlineAdvertising = (): JSX.Element => (
  <ServiceTop {...onlineAdvertising} />
);
export const EmailMarketing = (): JSX.Element => (
  <ServiceTop {...emailMarketing} />
);
export const Personalization = (): JSX.Element => (
  <ServiceTop {...personalization} />
);
export const MarketingAutomation = (): JSX.Element => (
  <ServiceTop {...marketingAutomation} />
);
export const DataAnalytics = (): JSX.Element => (
  <ServiceTop {...dataAnalytics} />
);
export const ConversionOptimization = (): JSX.Element => (
  <ServiceTop {...conversionOptimization} />
);
