import DataPulse from './DataPulse';

import { props } from './storiesData';

export default {
  title: 'Data Pulse',
  component: DataPulse,
};

export const Default = (): JSX.Element => <DataPulse {...props} />;
