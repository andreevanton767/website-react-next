import React, { useEffect, useState } from 'react';
import {
  MotionConfig,
  AnimationFeature,
  ExitFeature,
  AnimatePresence,
  AnimateLayoutFeature,
} from 'framer-motion';

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
  });

  const cardsToShow = deck.slice(0, 3);

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <div className={className}>
        <AnimatePresence>
          {cardsToShow.map((card, index) => (
            <YServiceCard
              {...getMotionProps(index)}
              className={[...baseClasses, cardClasses[index]].join(' ')}
              key={`${card.title}-MD`}
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
  'left-0 bottom-0 z-20 top-0 right-26',
  'z-10 left-12 top-5 bottom-5 right-16',
  'left-20 top-10 bottom-10 right-8',
];

// colors for each card -> used for crossfade animation
const colors = ['#305eed', '#103d67', '#062d45'];

const motionProps = {
  initial: { x: -60, scale: 1.1, opacity: 0 },
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.1 },
  },
  exit: { x: 40, scale: 0.8, opacity: 0 },
  transition: { type: 'tween', ease: 'easeIn' },
};

export default CardDeck;
