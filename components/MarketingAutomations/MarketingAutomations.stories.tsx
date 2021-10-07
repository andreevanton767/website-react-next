import MarketingAutomations from './MarketingAutomations';

import { actions, partners } from './storiesData';

export default {
  title: 'Marketing Automations',
  component: MarketingAutomations,
};

const props = {
  title: 'Marketing Automations',
  description:
    "Join over 20,000 businesses that use Segment's software and API to collect, clean and control their customer data.",
  partnersLabel: 'Proud to be official partners with',
  partners,
  actions,
} as Parameters<typeof MarketingAutomations>[0];

export const Default = (): JSX.Element => <MarketingAutomations {...props} />;
