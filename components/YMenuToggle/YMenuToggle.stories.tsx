import React, { useState } from 'react';

import YMenuToggle from './YMenuToggle';

import { ToggleType } from '@/enums/components';

export const Default = (): JSX.Element => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="relative flex items-center h-6">
      <YMenuToggle
        open={open1}
        className="mr-5"
        onClick={() => setOpen1(!open1)}
      />
      <YMenuToggle
        className="mr-5"
        type={ToggleType.Plus}
        open={open2}
        onClick={() => setOpen2(!open2)}
      />
    </div>
  );
};
