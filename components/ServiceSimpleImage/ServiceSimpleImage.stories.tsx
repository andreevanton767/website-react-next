import ServiceSimpleImage from './ServiceSimpleImage';

import { TextPosition } from '@/enums/components';

export default {
  title: 'Service: Simple Section with Image',
  component: ServiceSimpleImage,
};

const props = {
  title: 'Affiliate marketing',
  subtitle: 'What are the pros?',
  text:
    'When using personalization you keep in mind the needs and preferences of your audience so that you market the right product to the right person at the right time.',
};

export const AffiliateMarketingSection2 = (): JSX.Element => (
  <ServiceSimpleImage
    textPosition={TextPosition.Left}
    image="affiliate-marketing-2"
    {...props}
  />
);

export const AffiliateMarketingSection3 = (): JSX.Element => (
  <ServiceSimpleImage image="affiliate-marketing-3" {...props} />
);

export const OnlineAdvertisingSection3 = (): JSX.Element => (
  <ServiceSimpleImage image="social-media-advertising-2" {...props} />
);

export const EmailMarketingSection3 = (): JSX.Element => (
  <ServiceSimpleImage image="email-marketing-3" {...props} />
);

export const PersonalizationSection3 = (): JSX.Element => (
  <ServiceSimpleImage image="personalization-2" {...props} />
);

export const ConversionOptimizationSection1 = (): JSX.Element => (
  <ServiceSimpleImage
    textPosition={TextPosition.Left}
    image="conversion-optimization-1"
    {...props}
  />
);
