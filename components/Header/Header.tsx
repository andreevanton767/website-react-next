import React, { useMemo } from 'react';
import {
  AnimateLayoutFeature,
  AnimationFeature,
  ExitFeature,
  MotionConfig,
} from 'framer-motion';

import useBreakpoint from '@/hooks/useBreakpoint';

import { ScreenSize } from '@/enums/screenSize';
import dynamic from 'next/dynamic';

import { HeaderProps } from './HeaderSM';

const Header: React.FC<HeaderProps> = (props) => {
  const { screenSize, screenReady } = useBreakpoint();
  const Content = useMemo(
    () =>
      dynamic(
        () =>
          screenSize == ScreenSize.LG
            ? import('./HeaderLG')
            : import('./HeaderSM'),
        { ssr: false }
      ),
    [screenSize]
  );

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      {screenReady && <Content {...props} />}
    </MotionConfig>
  );
};

export default Header;
