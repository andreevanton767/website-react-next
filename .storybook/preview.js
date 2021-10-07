import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import Layout from './Layout';
import { withNextRouter } from 'storybook-addon-next-router';

addDecorator(withPerformance);
addDecorator((storyFn) => <Layout>{storyFn()}</Layout>);

addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
