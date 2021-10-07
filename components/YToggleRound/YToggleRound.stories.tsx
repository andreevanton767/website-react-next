import { useState } from 'react';
import YToggleRound from './YToggleRound';

export default {
  title: 'Round Toggle',
  component: YToggleRound,
};

export const Default = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return <YToggleRound open={open} onClick={() => setOpen(!open)} />;
};
