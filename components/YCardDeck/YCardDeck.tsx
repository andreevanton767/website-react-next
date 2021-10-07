import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { ScreenSize } from '@/enums/screenSize';

import { Service } from '@/components/YServiceCard/YServiceCard';

import useBreakpoint from '@/hooks/useBreakpoint';

interface Props {
  services: Service[];
  className?: string;
  active: string | null;
}

const CardDeck: React.FC<Props> = (props) => {
  const { screenSize, screenReady } = useBreakpoint();

  const CardDeckForScreen = useMemo(
    () =>
      dynamic(
        () =>
          screenSize == ScreenSize.LG
            ? import('./YCardDeckLG')
            : import('./YCardDeckSM'),
        {
          ssr: false,
        }
      ),
    [screenSize]
  );

  return screenReady ? <CardDeckForScreen {...props} /> : null;
};

export default CardDeck;
