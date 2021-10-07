import YHeading from '@/components/YHeading/YHeading';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

export default {
  title: 'Heading',
  component: YHeading,
};

export const Default = (): JSX.Element => (
  <YHeading>Default Heading Styling</YHeading>
);

export const Sizes = (): JSX.Element => {
  const sizes = Object.values(FontSize);
  const sizeTitles = Object.keys(FontSize);

  return (
    <div>
      {sizes.map((size: FontSize, index: number) => (
        <>
          <YHeading fontSize={size}>{sizeTitles[index]} Heading</YHeading>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};

export const Weights = (): JSX.Element => {
  const weights = Object.values(FontWeight);
  const weightTitles = Object.keys(FontWeight);

  return (
    <div>
      {weights.map((weight: FontWeight, index: number) => (
        <>
          <YHeading fontWeight={weight}>{weightTitles[index]} Heading</YHeading>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};

export const LineHeights = (): JSX.Element => {
  const lineHeights = Object.values(FontLineHeight);
  const lineHeightTitles = Object.keys(FontLineHeight);

  return (
    <div>
      {lineHeights.map((lineHeight: FontLineHeight, index: number) => (
        <>
          <YHeading lineHeight={lineHeight}>
            {lineHeightTitles[index]} Heading
          </YHeading>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
