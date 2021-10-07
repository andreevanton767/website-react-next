import YCardStack from './YCardStack';

export default {
  title: 'Card Stack',
  component: YCardStack,
};

const cards = [
  { cardClasses: 'card-gray' },
  { cardClasses: 'card-gray' },
  { cardClasses: 'card-blue' },
];

export const Default = (): JSX.Element => (
  <div className="w-100 h-100 border border-primary relative">
    <YCardStack cards={cards} className="left-12.5" />
  </div>
);

export const Skew = (): JSX.Element => (
  <div
    style={{ transform: 'matrix(0.64, -0.37, 0.62, 0.39, 0, 0)' }}
    className="w-100 h-100 border border-primary "
  >
    <YCardStack cards={cards} className="left-12.5" />
  </div>
);
