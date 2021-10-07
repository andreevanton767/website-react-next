import ServiceThreePoints from './ServiceThreePoints';

import { integration1, conversion2, affiliate1 } from './storiesData';

export default {
  title: 'Service: Three Point Section',
  component: ServiceThreePoints,
};

export const IntegrationImplementationSection1 = (): JSX.Element => (
  <ServiceThreePoints {...integration1} />
);

export const ConversionOptimizationSection2 = (): JSX.Element => (
  <ServiceThreePoints {...conversion2} />
);

export const AffiliateMarketingSection1 = (): JSX.Element => (
  <ServiceThreePoints {...affiliate1} />
);
