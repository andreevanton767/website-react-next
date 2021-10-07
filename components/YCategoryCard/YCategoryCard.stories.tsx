import YCategoryCard from './YCategoryCard';

import {
  BlogCategorySize,
  BlogCategoryStyle,
  Service,
} from '@/enums/components';

export default {
  title: 'Category Card',
  component: YCategoryCard,
};

export const post = {
  title: 'Nunc vitae neque volutpat magna',
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus faucibus velit id consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra',
  createdAt: new Date(Date.now()).toString(),
};

const latestPosts = {
  buttonText: 'Read now',
  posts: Array(3)
    .fill(post)
    .map((post, index) => ({ ...post, id: index })),
};

export const cardProps = {
  category: Service.MarketingAutomation,
  buttonSm: 'See Posts',
  description:
    'Customers want to be attracted, to know that brand cares about them and has taken the time to do the necessary research.',
  topic: 'TOPIC',
  latestPosts,
} as Parameters<typeof YCategoryCard>[0];

export const SizeSm = (): JSX.Element => (
  <section className="shadow-blog-sm lg:shadow-blog-lg bg-white grid grid-cols-1 lg:grid-cols-2 gap-5">
    <YCategoryCard {...cardProps} category={Service.AffiliateMarketing} />
    <YCategoryCard {...cardProps} category={Service.ConversionOptimization} />
    <YCategoryCard
      {...cardProps}
      category={Service.EmailMarketing}
      className="shadow-blog-sm lg:shadow-blog-lg lg:col-span-2"
    />
    <YCategoryCard {...cardProps} category={Service.DataAnalytics} />
    <YCategoryCard
      {...cardProps}
      category={Service.IntegrationImplementation}
    />
    <YCategoryCard
      {...cardProps}
      category={Service.MarketingAutomation}
      className="shadow-blog-sm lg:shadow-blog-lg lg:col-span-2"
    />
    <YCategoryCard {...cardProps} category={Service.OnlineAdvertising} />
    <YCategoryCard {...cardProps} category={Service.Personalization} />
  </section>
);

export const SizeMd = (): JSX.Element => (
  <section className="shadow-blog-sm lg:shadow-blog-lg bg-white grid grid-cols-1 lg:grid-cols-2 gap-5">
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.AffiliateMarketing}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.ConversionOptimization}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.DataAnalytics}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.EmailMarketing}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.IntegrationImplementation}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.MarketingAutomation}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.OnlineAdvertising}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.Personalization}
    />
  </section>
);

export const SizeLg = (): JSX.Element => (
  <section className="shadow-blog-sm lg:shadow-blog-lg bg-white">
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.AffiliateMarketing}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.ConversionOptimization}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.DataAnalytics}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.EmailMarketing}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.IntegrationImplementation}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.MarketingAutomation}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.OnlineAdvertising}
    />
    <br />
    <YCategoryCard
      {...{ ...cardProps, buttonLg: 'All Posts' }}
      size={BlogCategorySize.LG}
      className="shadow-blog-sm lg:shadow-blog-lg max-w-7xl mx-auto"
      category={Service.Personalization}
    />
  </section>
);

export const Styles = (): JSX.Element => (
  <section className="shadow-blog-sm lg:shadow-blog-lg bg-white grid grid-cols-1 lg:grid-cols-2 gap-5">
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      category={Service.AffiliateMarketing}
    />
    <YCategoryCard
      {...cardProps}
      size={BlogCategorySize.MD}
      cardStyle={BlogCategoryStyle.Dark}
      category={Service.AffiliateMarketing}
    />
  </section>
);
