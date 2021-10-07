import { useState, useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

import { BreakPoint, ScreenSize } from '@/enums/screenSize';

interface BreakPointHook {
  (extendScreensizes?: ScreenSize[]): {
    screenSize: ScreenSize;
    screenReady: boolean;
  };
}

/**
 *
 * @param extendScreensizes extend required screen sizes (default is ScreenSize.SM and ScreenSize.LG)
 * @returns object containing screenSize (a current screenSize) and screenReady (boolean set when screenSize is processed, on mount)
 */
const useBreakpoint: BreakPointHook = (extendScreensizes) => {
  const requiredScreenSizes = extendScreensizes || [
    ScreenSize.SM,
    ScreenSize.LG,
  ];

  const downSortedScreenSizes = [...requiredScreenSizes].sort(
    (a, b) =>
      Number(BreakPoint[b.toUpperCase()]) - Number(BreakPoint[a.toUpperCase()])
  );

  const screenWidth = useWindowWidth();

  const screenSize = findBreakpoint(screenWidth, downSortedScreenSizes);

  const [screenReady, setScreenReady] = useState(false);

  // set ready when screen size is determined, for sensitive content i.e. Background grid
  useEffect(() => {
    if (screenWidth && !screenReady) {
      setScreenReady(true);
    }
  }, [screenWidth]);

  return { screenSize, screenReady };
};

/**
 * Determine screen size by iterating through breakpoints
 * Needs to go decending
 * @param screenSizes
 */
const findBreakpoint = (screenWidth: number, screenSizes: ScreenSize[]) =>
  screenSizes.find(
    (scrSize, index) =>
      index == screenSizes.length - 1 ||
      Number(BreakPoint[scrSize.toUpperCase()]) <= screenWidth
  );

export default useBreakpoint;
