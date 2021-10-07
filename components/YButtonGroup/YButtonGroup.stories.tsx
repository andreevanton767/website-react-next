import YButtonGroup from './YButtonGroup';

export default {
  title: 'Button Group',
  component: YButtonGroup,
};

const buttons = ['Websites & Apps', 'Social Ads', 'Email Marketing'];

export const Default = (): JSX.Element => <YButtonGroup buttons={buttons} />;
