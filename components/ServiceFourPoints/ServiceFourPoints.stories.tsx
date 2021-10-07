import ServiceFourPoints from './ServiceFourPoints';

import { email1, integration3, online3, personalization2 } from './storiesData';

export default {
  title: 'Service: Four Points Section',
  component: ServiceFourPoints,
};

export const EmailMarketingSection1 = (): JSX.Element => (
  <ServiceFourPoints {...email1} />
);

export const IntegrationImplementationSection3 = (): JSX.Element => (
  <ServiceFourPoints {...integration3} />
);

export const OnlineAdvertisingSection3 = (): JSX.Element => (
  <ServiceFourPoints {...online3} />
);

export const PersonaliztionSection2 = (): JSX.Element => (
  <ServiceFourPoints {...personalization2} />
);
