import OurServices from './OurServices';

import { props } from './storiesData';

export default {
  title: 'Our Services',
  component: OurServices,
};

export const Default = (): JSX.Element => <OurServices {...props} />;
