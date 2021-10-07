import React, { useMemo } from 'react';

import style from './BackgroundGrid.module.css';

import useBreakpoint from '@/hooks/useBreakpoint';
import useSharedHover from '@/hooks/useSharedHover';

import YCard from '@/components/YCard';
import YImage from '@/components/YImage';

import Gridlines from '@/assets/other/HomeTopGridlineLG.svg';

export interface Card {
  icon?: string;
  title: string;
  link?: string;
  description: string;
}

interface Props {
  cards: Card[];
}

const BackgroundGrid: React.FC<Props> = ({ cards }) => {
  // screen size section
  const { screenReady } = useBreakpoint();

  const cardsForDisplay = rearrangeForDesktop(cards);

  // shared hover control section
  const { onHoverStart, onHoverEnd, hoveredCard } = useSharedHover(2);

  // calculates absolute coordinates for interactive cards
  const cardCoordinates = useMemo(() => {
    const baseStyles = {
      height: 246,
      width: 206,
    };
    // top increment for each row
    const topIncrement = baseStyles.height;
    // left increment for each card (column)
    const leftIncrement = baseStyles.width;

    // top left of the box, the cards appear in
    const startingPoint = {
      top: baseStyles.height * 2,
      left: baseStyles.width,
    };

    return cardsForDisplay.map((_, index) =>
      [0, 4].includes(index)
        ? {
            ...baseStyles,
            // first and last card, positioned in middle column
            top: startingPoint.top + (index == 4 && topIncrement * 2),
            left: startingPoint.left + leftIncrement,
          }
        : {
            ...baseStyles,
            // middle row cards, positioned throught the row in order they appear in
            top: startingPoint.top + topIncrement,
            left:
              startingPoint.left + Math.floor((index - 1) % 3) * leftIncrement,
          }
    );
  }, []);

  // add interactive cards to the grid
  const interactiveCards = cardsForDisplay.map((card, index) => (
    <div
      key={`card-${index}`}
      className="absolute"
      style={cardCoordinates[index]}
    >
      <YCard
        className={cardBaseClasses}
        cardClasses="ml-4"
        {...card}
        hovered={hoveredCard == index}
        onHoverStart={() => onHoverStart(index)}
        onHoverEnd={() => onHoverEnd()}
      />
    </div>
  ));

  // return grid
  return screenReady ? (
    <>
      <div className="absolute top-6.5 left-1.5">
        <Gridlines />
      </div>

      {interactiveCards}
    </>
  ) : null;
};

const cardBaseClasses =
  'relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';

// rearrange cards from props for desktop size display
// 0, 1, 2, 3, 4 => 1, 3, 4, 2, 0
const rearrangeForDesktop = (cards: Card[]) => {
  const safeCards = [...cards];
  const middle = safeCards.splice(2, 1);
  const first = safeCards.shift();
  return safeCards.concat([...middle, first]);
};

export default BackgroundGrid;
