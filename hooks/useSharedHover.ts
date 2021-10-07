import { useRef, useState } from 'react';

interface SharedHoverHook {
  (defaultCard: number): {
    onHoverStart: (card: number) => void;
    onHoverEnd: () => void;
    hoveredCard: number;
  };
}

const useSharedHover: SharedHoverHook = (defaultCard) => {
  const [hoveredCard, setHoveredCard] = useState<number>(defaultCard);
  const timeout = useRef<any>();

  const onHoverStart = (card: number) => {
    if (timeout.current) clearTimeout(timeout.current);
    setHoveredCard(card);
  };

  const onHoverEnd = () => {
    timeout.current = setTimeout(() => {
      setHoveredCard(defaultCard);
    }, 100);
  };

  return { onHoverStart, onHoverEnd, hoveredCard };
};

export default useSharedHover;
