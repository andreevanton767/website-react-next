import SubscribeSection from './SubscribeSection';

import { SubscriptionStyle } from '@/enums/components';

export default {
  title: 'Subscribe Section',
  component: SubscribeSection,
};

const props = {
  title: 'Subscribe to our newsletter',
  description:
    'Best personalization case studies and posts on ecommerce topics',
  buttonText: 'Contact us',
};

export const Default = (): JSX.Element => <SubscribeSection {...props} />;

export const Types = (): JSX.Element => (
  <section className="bg-white py-20">
    <SubscribeSection {...props} />
    <br />
    <SubscribeSection type={SubscriptionStyle.BlogHome} {...props} />
  </section>
);
