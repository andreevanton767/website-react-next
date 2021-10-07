import React from 'react';

import YCardBasic from '@/components/YCard/YCardBasic';

interface Props {
  cards: Parameters<typeof YCardBasic>[0][];
  className?: string;
}

const YCardStack: React.FC<Props> = ({ cards, className }) => {
  // create mutable copy
  const safeCards = [...cards];
  let currentCard = safeCards.shift();

  const additionalClasses = ['absolute', 'left-5', 'bottom-5'];

  currentCard = {
    ...currentCard,
    className: [currentCard.className, ...additionalClasses, className].join(
      ' '
    ),
  };

  return (
    <YCardBasic {...currentCard}>
      {safeCards.length > 0 && <YCardStack cards={safeCards} />}
    </YCardBasic>
  );
};

export default YCardStack;
