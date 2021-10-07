import YContactForm from './YContactForm';

import { InputStyle, InputType } from '@/enums/components';
import { BreakPoint, ScreenSize } from '@/enums/screenSize';

import { useWindowWidth } from '@react-hook/window-size';

export default {
  title: 'Contact Form',
  component: YContactForm,
};

const fields = {
  name: {
    label: 'Name',
    placeholder: 'Your name',
    errorMessage: 'this field is required',
  },
  email: {
    label: 'Email',
    placeholder: 'Email',
    errorMessage: 'please enter valid email adress',
  },
  phoneNumber: {
    label: 'Phone number',
    placeholder: 'Your phone number',
    errorMessage: 'please enter a valid phone number',
  },
  comment: {
    label: 'Comment (optional)',
    placeholder: 'Comment',
  },
};

const props = {
  fields,
  onSubmit: (values: any) => alert(values.name),
  buttonText: 'Submit',
  title: 'Contact Us',
};

export const Default = (): JSX.Element => {
  const screenSize =
    useWindowWidth() < BreakPoint.MD ? ScreenSize.SM : ScreenSize.MD;

  return (
    <YContactForm
      className="fixed top-0 left-0 right-0 bottom-50 md:relative md:w-110"
      style={screenSize == ScreenSize.SM ? InputStyle.Dark : InputStyle.Light}
      {...props}
    />
  );
};
