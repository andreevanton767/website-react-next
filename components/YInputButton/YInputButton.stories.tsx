import YInputButton from './YInputButton';

import { InputButtonSize, InputButtonStyle } from '@/enums/components';

export default {
  title: 'Input Button',
  component: YInputButton,
};

export const Default = (): JSX.Element => <YInputButton />;

export const Styles = (): JSX.Element => (
  <>
    <YInputButton />
    <br />
    <YInputButton
      inputStyle={InputButtonStyle.BlogGreen}
      size={InputButtonSize.LG}
    />
    <br />
    <YInputButton
      inputStyle={InputButtonStyle.BlogBlack}
      size={InputButtonSize.LG}
    />
  </>
);
