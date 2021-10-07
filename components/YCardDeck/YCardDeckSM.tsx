import React, { useEffect, useState } from 'react';
import {
  MotionConfig,
  AnimationFeature,
  ExitFeature,
  AnimatePresence,
  AnimateLayoutFeature,
  DragFeature,
  MotionProps,
} from 'framer-motion';

import rotate from '@/libs/utils/rotate';

import YServiceCard, { Service } from '@/components/YServiceCard/YServiceCard';

interface Props {
  services: Service[];
  className?: string;
  active: string | null;
}

const CardDeck: React.FC<Props> = ({ services, className, active }) => {
  const [deck, setDeck] = useState(services);

  // controls card being selected outside the component i.e. from buttons
  useEffect(() => {
    if (active != null) {
      // get active service card
      const activeCard = deck.find((card) => card.title == active);

      // remove the card from the array
      const filteredDeck = deck.filter((card) => card.title != active);

      setDeck([activeCard, ...filteredDeck]);
    }
  }, [active]);

  // utilize drag and drop control
  const handleDragEnd: MotionProps['onDragEnd'] = (_, info) => {
    const offsetX = info.offset.x;
    if (offsetX > 100) {
      setDeck(rotate(deck));
    } else if (offsetX < -100) {
      setDeck(rotate(deck, true));
    }
  };

  const dragProps = {
    drag: true,
    onDragEnd: handleDragEnd,
    dragConstraints: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  const getMotionProps = (index: number) => ({
    initial: {
      ...motionProps.initial,
      backgroundColor: index == 0 ? colors[0] : colors[index - 1],
    },
    animate: {
      ...motionProps.animate,
      backgroundColor: colors[index],
    },
    exit: { ...motionProps.exit },
    ...dragProps,
  });

  const cardsToShow = deck.slice(0, 3);

  return (
    <MotionConfig
      features={[
        AnimationFeature,
        ExitFeature,
        AnimateLayoutFeature,
        DragFeature,
      ]}
    >
      <div className={className}>
        <AnimatePresence>
          {cardsToShow.map((card, index) => (
            <YServiceCard
              {...getMotionProps(index)}
              className={[...baseClasses, cardClasses[index]].join(' ')}
              key={`${card.title}-SM}`}
              {...card}
            />
          ))}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

/** options, utils and classNames */
const baseClasses = ['absolute', 'rounded'];

const cardClasses = [
  'left-0 top-10 bottom-0 right-0 z-20',
  'left-5 top-5 bottom-5 right-5 z-10',
  'left-10 top-0 bottom-10 right-10',
];

// colors for each card -> used for crossfade animation
const colors = ['#305eed', '#103d67', '#062d45'];

const motionProps = {
  initial: { y: 30, x: -30, opacity: 0 },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    y: -20,
    scale: 0.8,
    opacity: 0,
  },
};

export default CardDeck;
