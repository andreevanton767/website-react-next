import YButton from './YButton';
import { ButtonShape, ButtonSize } from '@/enums/components';

export default {
  title: 'Button',
  component: YButton,
};

export const Default = (): JSX.Element => <YButton>Default YButton</YButton>;

export const Shadow = (): JSX.Element => {
  return (
    <div>
      <YButton>Without Shadow</YButton>
      <br />
      <br />
      <YButton shadow>With Shadow</YButton>
    </div>
  );
};

export const Sizes = (): JSX.Element => {
  return (
    <div>
      <YButton buttonSize={ButtonSize.XS}>XS Button</YButton>
      <br />
      <br />
      <YButton buttonSize={ButtonSize.SM}>SM Button</YButton>
      <br />
      <br />
      <YButton buttonSize={ButtonSize.MD}>MD Button</YButton>
      <br />
      <br />
      <YButton buttonSize={ButtonSize.LG}>LG Button</YButton>
    </div>
  );
};

export const Shapes = (): JSX.Element => {
  return (
    <div>
      <YButton shape={ButtonShape.Square}>Square Button</YButton>
      <br />
      <br />
      <YButton shape={ButtonShape.Round}>Round Button</YButton>
    </div>
  );
};
