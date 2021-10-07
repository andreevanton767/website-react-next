import { Service } from '@/enums/components';

import IntegrationImplementation from '@/assets/services-hero/integration-implementation.svg';
import AffiliateMarketing from '@/assets/services-hero/affiliate-marketing.svg';
import OnlineAdvertising from '@/assets/services-hero/online-advertising.svg';
import EmailMarketing from '@/assets/services-hero/email-marketing.svg';
import Personalization from '@/assets/services-hero/personalization-blog.svg';
import MarketingAutomation from '@/assets/services-hero/marketing-automation.svg';
import DataAnalytics from '@/assets/services-hero/data-analytics.svg';
import ConversionOptimization from '@/assets/services-hero/conversion-optimization.svg';

import PersonalizationLg from '@/assets/services-hero/personalization-mobile.svg';
import DataAnalyticsLg from '@/assets/services-hero/data-analytics-copy.svg';
import MarketingAutomationLg from '@/assets/services-hero/marketing-automation-mobile.svg';
import OnlineAdvertisingAlt from '@/assets/services-hero/online-advertising-alt.svg';

export const covers = {
  [Service.IntegrationImplementation]: <IntegrationImplementation />,

  [Service.AffiliateMarketing]: <AffiliateMarketing />,

  [Service.OnlineAdvertising]: <OnlineAdvertising />,

  [Service.EmailMarketing]: <EmailMarketing />,

  [Service.Personalization]: <Personalization />,

  [Service.MarketingAutomation]: <MarketingAutomation />,

  [Service.DataAnalytics]: <DataAnalytics />,

  [Service.ConversionOptimization]: <ConversionOptimization />,
};

export const coversLg = {
  [Service.IntegrationImplementation]: <IntegrationImplementation />,

  [Service.AffiliateMarketing]: <AffiliateMarketing />,

  [Service.OnlineAdvertising]: <OnlineAdvertisingAlt />,

  [Service.EmailMarketing]: <EmailMarketing />,

  [Service.Personalization]: <PersonalizationLg />,

  [Service.MarketingAutomation]: <MarketingAutomationLg />,

  [Service.DataAnalytics]: <DataAnalyticsLg />,

  [Service.ConversionOptimization]: <ConversionOptimization />,
};
