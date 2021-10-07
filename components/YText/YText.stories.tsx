import YText from './YText';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

export default {
  title: 'Body Text',
  component: YText,
};

type BodyFontSize =
  | FontSize.XXS
  | FontSize.XS
  | FontSize.SM
  | FontSize.MD
  | FontSize.LG;

type BodyFontWeight =
  | FontWeight.Regular
  | FontWeight.SemiBold
  | FontWeight.Bold
  | FontWeight.ExtraBold;

export const Default = (): JSX.Element => (
  <YText>Default body text styling</YText>
);

export const Sizes = (): JSX.Element => {
  const sizes = [
    FontSize.XXS,
    FontSize.XS,
    FontSize.SM,
    FontSize.MD,
    FontSize.LG,
  ];

  const sizeTitles = Object.keys(FontSize).filter(
    (_, index: number): boolean => {
      return Object.keys(sizes).includes(String(index));
    }
  );

  return (
    <div>
      {sizes.map((size: BodyFontSize, index: number) => (
        <>
          <YText fontSize={size}>{sizeTitles[index]} Heading</YText>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};

export const Weights = (): JSX.Element => {
  const filterMedium = (weight) => weight !== FontWeight.Medium;
  const weights = Object.values(FontWeight).filter(filterMedium);
  const weightTitles = Object.keys(FontWeight).filter(filterMedium);

  return (
    <div>
      {weights.map((weight: BodyFontWeight, index: number) => (
        <>
          <YText fontWeight={weight}>{weightTitles[index]} body text</YText>
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
          <YText lineHeight={lineHeight}>
            {lineHeightTitles[index]} body text
          </YText>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
