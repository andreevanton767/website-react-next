import { useState } from 'react';

import YCard from './YCard';
import YCardBasic from './YCardBasic';

const dummyProps = {
  description: 'Personalized suggestion',
  title: 'Cart Upsell',
};
export default {
  title: 'Card',
  component: YCard,
};

export const Default = (): JSX.Element => (
  <>
    <YCardBasic {...dummyProps} className="inline-block mx-8" icon="cart" />
    <YCardBasic
      {...dummyProps}
      className="inline-block"
      cardClasses="card-blue"
    />
  </>
);

export const HoverEffect = (): JSX.Element => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <YCard
        {...dummyProps}
        key="card1"
        className="inline-block mx-8"
        icon="cart"
        hovered={hovered == 0}
        onHover={() => setHovered(0)}
      />
      <YCard
        {...dummyProps}
        key="card2"
        className="inline-block"
        hovered={hovered == 1}
        onHover={() => setHovered(1)}
      />
    </>
  );
};

export const Colors = (): JSX.Element => (
  <div className="grid gap-8 grid-cols-10">
    <YCardBasic className="col-span-2" />
    <YCardBasic className="col-span-2" cardClasses="card-gray" />
    <YCardBasic className="col-span-2" cardClasses="card-blue" />
    <YCardBasic className="col-span-2" cardClasses="card-green" />
    <YCardBasic className="col-span-2" cardClasses="card-orange" />
  </div>
);

export const Transparent = (): JSX.Element => (
  <div className="grid gap-8 grid-cols-10">
    <YCardBasic className="col-span-2" cardClasses="card-white-transparent" />
    <YCardBasic className="col-span-2" cardClasses="card-gray-transparent" />
    <YCardBasic className="col-span-2" cardClasses="card-blue-transparent" />
    <YCardBasic className="col-span-2" cardClasses="card-green-transparent" />
    <YCardBasic className="col-span-2" cardClasses="card-orange-transparent" />
  </div>
);
