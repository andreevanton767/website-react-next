import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';

import { BreakPoint, ScreenSize } from '@/enums/screenSize';

import WaveMD from '@/assets/other/wave-md.svg';
import WaveSM from '@/assets/other/wave-sm.svg';

import waveAnimation from './waveAnimations.module.css';

const background = {
  [ScreenSize.SM]: <WaveSM />,
  [ScreenSize.MD]: <WaveMD />,
};

const Wave: React.FC = () => {
  const screenSize =
    useWindowWidth() < BreakPoint.MD ? ScreenSize.SM : ScreenSize.MD;

  return (
    <div
      className={[
        'absolute w-full bottom-20 md:top-0 md:h-full lg:bottom-0',
        screenSize == ScreenSize.SM ? waveAnimation.wave : waveAnimation.waveMD,
      ].join(' ')}
    >
      {background[screenSize]}
    </div>
  );
};

export default Wave;
