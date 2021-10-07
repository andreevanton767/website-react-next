import React from 'react';

import { ScreenSize } from '@/enums/screenSize';

import useBreakpoint from '@/hooks/useBreakpoint';

import DialogSM from '@/assets/other/reviews-dialog-sm.svg';
import DialogMD from '@/assets/other/reviews-dialog-md.svg';

const ReviewsDynamicSection = (): JSX.Element => {
  const { screenSize } = useBreakpoint();

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      {screenSize == ScreenSize.LG ? <DialogMD /> : <DialogSM />}
    </div>
  );
};

export default ReviewsDynamicSection;
