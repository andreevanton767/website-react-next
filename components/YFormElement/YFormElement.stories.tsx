import YFormElement from './YFormElement';

import { InputElement, InputStyle } from '@/enums/components';

export default {
  title: 'Form Element',
  component: YFormElement,
};

export const Default = (): JSX.Element => (
  <YFormElement label="Label" placeholder="Placeholder" />
);

export const Styles = (): JSX.Element => (
  <>
    <YFormElement className="mb-4" label="Light" placeholder="Placeholder" />
    <YFormElement
      label="Dark"
      placeholder="Placeholder"
      style={InputStyle.Dark}
    />
  </>
);

export const Types = (): JSX.Element => (
  <>
    <YFormElement className="mb-4" label="Input" placeholder="Placeholder" />
    <YFormElement
      label="TextArea"
      placeholder="Placeholder"
      element={InputElement.TextArea}
    />
  </>
);

export const Messages = (): JSX.Element => (
  <>
    <YFormElement label="Label" info="Info message" placeholder="Placeholder" />
    <YFormElement
      label="Label"
      error
      errorMessage="Error message"
      placeholder="Placeholder"
    />
  </>
);
