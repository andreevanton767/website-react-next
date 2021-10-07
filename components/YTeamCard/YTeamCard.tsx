import React, { useEffect, useState } from 'react';
import {
  m as motion,
  AnimationFeature,
  MotionConfig,
  AnimatePresence,
  ExitFeature,
  AnimateSharedLayout,
  AnimateLayoutFeature,
} from 'framer-motion';

import filterPosition from '@/libs/utils/filterPosition';

import useBreakpoint from '@/hooks/useBreakpoint';

import { ScreenSize } from '@/enums/screenSize';
import { FontSize, FontWeight } from '@/enums/font';

import YToggleRound from '@/components/YToggleRound';
import YText from '@/components/YText';
import YImage from '@/components/YImage';

export interface TeamMember {
  name: string;
  role: string;
  text: string;
  image: {
    filename: string;
    alt?: string;
  };
}

enum Segment {
  Image = 'image',
  Name = 'name',
  Role = 'role',
  Text = 'text',
}

const YTeamCard: React.FC<TeamMember & { className: string }> = ({
  name,
  role,
  text,
  image,
  className,
}) => {
  const [open, setOpen] = useState(false);

  // control mount animation of image
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  const { screenSize, screenReady } = useBreakpoint();

  const imageElement = screenReady && (screenSize != ScreenSize.SM || !open) && (
    <motion.div
      key={Segment.Image}
      layout
      {...getImageFadeProps(firstRender)}
      className={[
        'absolute rounded-full overflow-hidden',
        open
          ? 'top-5 left-5 w-20 h-20'
          : 'h-50 w-50 top-13.6 left-10 xs:left-12.5 xs:w-55 xs:h-55 md:top-13.6 md:left-16.1',
      ].join(' ')}
    >
      <YImage className="w-full h-full" {...image} width={220} height={220} />
    </motion.div>
  );

  const nameElement = (
    <motion.div
      layout
      key={Segment.Name}
      className={[
        'absolute',
        open ? 'top-6 left-6 lg:left-31 lg:top-8.5' : 'bottom-5 left-5',
      ].join(' ')}
    >
      <YText
        fontWeight={FontWeight.SemiBold}
        fontSize={open ? FontSize.LG : FontSize.MD}
        className={[
          'md:text-lg md:leading-9 md:font-serif',
          open ? 'text-lg text-white leading-9' : 'text-current',
        ].join(' ')}
        as="h2"
      >
        {name}
      </YText>
    </motion.div>
  );

  const roleElement = (
    <motion.div
      layout
      key={Segment.Role}
      className={[
        'absolute',
        open ? 'top-13 left-6 lg:top-15.5 lg:left-31' : 'top-4 right-4',
      ].join(' ')}
    >
      <YText className="text-gray-300">{role}</YText>
    </motion.div>
  );

  const textElement = open && (
    <motion.div
      key={Segment.Text}
      {...fadeInProps}
      className="absolute text-gray-300 left-6 right-6 top-22 md:left-5 md:right-5 md:top-30"
    >
      <YText as="p">{text}</YText>
    </motion.div>
  );

  const handleCardClick = () => {
    if (!open) setOpen(true);
  };

  const containerClassName = [
    filterPosition(containerClasses, className),
    open ? 'cursor-default' : 'cursor-pointer',
  ].join(' ');

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <div onClick={handleCardClick} className={containerClassName}>
        <AnimateSharedLayout>
          <AnimatePresence>
            {imageElement}
            {nameElement}
            {roleElement}
            {textElement}
            <YToggleRound
              open={open}
              className="absolute bottom-4 right-4"
              onClick={() => setOpen(!open)}
            />
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
    </MotionConfig>
  );
};

const containerClasses = [
  'bg-blue-200',
  'text-gray-400',
  'duration-200',
  'transition',
  'rounded-sm',
  'md:rounded',
  'border',
  'border-opacity-0',
  'border-blue-100',
  'hover:border-opacity-100',
  'hover:text-white',
];

// text / image fade
const getImageFadeProps = (initialRender: boolean) => {
  const initial = initialRender
    ? false
    : { ...fadeInProps.initial, scale: 0.8 };
  const animate = {
    ...fadeInProps.animate,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  };
  const exit = {
    ...fadeInProps.exit,
    scale: 0.6,
  };
  return { initial, animate, exit };
};

const fadeInProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default YTeamCard;
