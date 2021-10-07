import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  m as motion,
  MotionConfig,
  AnimationFeature,
  ExitFeature,
  AnimatePresence,
} from 'framer-motion';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import useBreakpoint from '@/hooks/useBreakpoint';

import { ArticlesFrame, ReviewsFrame } from './PersonalizationFrameLG';

import YButtonGroup from '@/components/YButtonGroup/YButtonGroup';
import YHeading from '@/components/YHeading';
import YText from '@/components/YText';

type FrameWithButtons<F extends ArticlesFrame | ReviewsFrame> = F & {
  buttonSM: string;
  buttonMD: string;
};

type Frames = [
  FrameWithButtons<ReviewsFrame>,
  FrameWithButtons<ArticlesFrame>,
  FrameWithButtons<ArticlesFrame>
];

interface Props {
  title: string;
  description: string;
  frames: Frames;
}

const Wave = dynamic(
  () => {
    return import('./Wave');
  },
  { ssr: false }
);

const BenefitsOfPersonalization: React.FC<Props> = ({
  title,
  description,
  frames,
}) => {
  const { screenSize, screenReady } = useBreakpoint([
    ScreenSize.SM,
    ScreenSize.MD,
    ScreenSize.LG,
  ]);

  const [activeFrame, setActiveFrame] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const handleFrameChange = (index: number) => setActiveFrame(index);

  const motionProps = {
    initial: firstRender ? false : { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.2 },
    key: activeFrame,
  };

  const PersonalizationFrame = useMemo(
    () =>
      dynamic(
        () =>
          screenSize == ScreenSize.LG
            ? import('./PersonalizationFrameLG')
            : import('./PersonalizationFrameSM'),
        { ssr: false }
      ),
    [screenSize]
  );

  const getButtonsToShow = (frames: Frames, screenSize: ScreenSize) =>
    frames.map(({ buttonSM, buttonMD }) =>
      screenSize == ScreenSize.SM || !buttonMD ? buttonSM : buttonMD
    );

  const buttonsToShow =
    screenSize == ScreenSize.SM
      ? getButtonsToShow(frames, ScreenSize.SM)
      : getButtonsToShow(frames, ScreenSize.MD);

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature]}>
      <section className="relative z-10 w-full overflow-hidden pb-20 lg:pb-0 md:border-b border-soft">
        <Wave />
        <div className="container pt-10 pb-70 lg:pt-30 lg:px-0 sm:h-250">
          <div className="w-full text-center lg:px-0 lg:text-left z-10">
            <YHeading
              fontSize={FontSize.XL}
              fontWeight={FontWeight.ExtraBold}
              className="text-white relative mb-3 md:text-3xl md:font-bold md:leading-18 md:w-82.5 md:mx-auto lg:mx-0"
              as="h1"
            >
              {title}
            </YHeading>
            <YText
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="relative text-gray-300 mb-10 md:text-base md:leading-11 md:w-138.6 md:mx-auto lg:mx-0"
              as="p"
            >
              {description}
            </YText>
            {screenReady && (
              <YButtonGroup
                onChange={handleFrameChange}
                className="z-10 mb-7.5 lg:transform lg:-translate-x-1/2 lg:left-1/2 lg:absolute lg:bottom-35"
                buttons={buttonsToShow}
              />
            )}
          </div>
          <AnimatePresence exitBeforeEnter>
            <motion.div {...motionProps}>
              {!firstRender && (
                <PersonalizationFrame
                  frames={frames}
                  activeFrame={activeFrame}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
};

export default BenefitsOfPersonalization;
