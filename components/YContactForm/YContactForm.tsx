import React from 'react';

import {
  InputStyle,
  InputElement,
  ToggleType,
  InputType,
} from '@/enums/components';
import { FormField } from '@/enums/form';
import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize } from '@/enums/font';

import useBreakpoint from '@/hooks/useBreakpoint';
import useValidate from '@/hooks/useValidate';

import YFormElement from '@/components/YFormElement';
import YButton from '@/components/YButton';
import YHeading from '@/components/YHeading';
import YMenuToggle from '@/components/YMenuToggle';

import styles from './YContactForm.module.css';

import filterPosition from '@/libs/utils/filterPosition';

interface InputField {
  label: string;
  placeholder: string;
  errorMessage?: string;
  info?: string;
  inputType?: InputType;
  element?: InputElement;
}

interface Props {
  title: string;
  fields: Record<string, InputField>;
  onSubmit: (values: Record<string, string>) => any;
  buttonText: string;
  className?: string;
  style?: InputStyle;
  onClose?: () => void;
}

const YContactForm: React.FC<Props> = ({
  onSubmit,
  buttonText,
  className,
  style = InputStyle.Light,
  title,
  fields,
  onClose,
}) => {
  const { screenSize } = useBreakpoint([
    ScreenSize.SM,
    ScreenSize.MD,
    ScreenSize.LG,
  ]);

  const fieldNames = Object.keys(fields);

  const {
    handleChange,
    handleSubmit,
    disabled,
    validationErrors,
    formValues,
  } = useValidate(fieldNames, onSubmit, validationRegex);

  // form title displayed on mobile
  const heading = screenSize != ScreenSize.LG && (
    <YHeading
      fontSize={FontSize.XL}
      lineHeight={FontLineHeight.Relaxed}
      className="text-white"
      as="h2"
    >
      {title}
    </YHeading>
  );

  // menu toggle on small screen
  const toggle = screenSize != ScreenSize.LG && (
    <YMenuToggle
      onClick={() => onClose()}
      open={false}
      className="absolute top-5 right-5 transform scale-125 rotate-45 cursor-pointer"
      type={ToggleType.Plus}
    />
  );

  // form inner container with input fields
  const formElements = (
    <div className={formInnerClasses.join(' ')}>
      {fieldNames.map((field) => {
        const formField = fields[field];
        return (
          <YFormElement
            key={field}
            className={getFieldClasses(formField.element, screenSize)}
            onChange={(value) => handleChange(value, field)}
            value={formValues[field]}
            {...formField}
            error={validationErrors[field]}
            style={style}
          />
        );
      })}
    </div>
  );

  // fade overlay above button on mobile
  const fade = screenSize != ScreenSize.LG && (
    <div
      className={['absolute bottom-22.5 h-15 w-full', styles.fade].join(' ')}
    />
  );

  // submit button
  const button = (
    <YButton
      className="absolute bottom-8 w-full lg:static lg:w-43.6 lg:mt-3"
      type="submit"
      isDisabled={disabled}
      shadow
    >
      {buttonText}
    </YButton>
  );

  return (
    <div
      className={filterPosition(
        [...containerClasses, ...color[style]],
        className
      )}
    >
      {toggle}
      <form onSubmit={handleSubmit} className={formClasses.join(' ')}>
        {heading}
        {formElements}
        {fade}
        {button}
      </form>
    </div>
  );
};

// outer container
const containerClasses = ['lg:px-15', 'lg:py-12', 'lg:rounded-lg'];

// form element
const formClasses = [
  'absolute',
  'top-10',
  'left-10',
  'right-10',
  'bottom-8',
  'z-top',
  'max-w-xl',
  'mx-auto',
  'lg:max-w-none',
  'lg:mx-0',
  'lg:static',
  'lg:w-full',
];

// inner form -> input fields container (to enable scrolling)
const formInnerClasses = [
  'absolute',
  'overflow-auto',
  'no-scrollbar',
  'top-15',
  'w-full',
  'bottom-22.5',
  'lg:static',
];

const color = {
  [InputStyle.Light]: ['bg-white'],
  [InputStyle.Dark]: ['bg-blue-200'],
};

const getFieldClasses = (type: InputElement, screenSize: ScreenSize) =>
  [
    'mb-5',
    screenSize == ScreenSize.LG && type == InputElement.TextArea
      ? 'w-73.6'
      : 'w-full',
  ].join(' ');

const validationRegex = {
  [FormField.Name]: /(.|\s)*\S(.|\s)*/,
  [FormField.Email]: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  [FormField.Phone]: /[0-9]+/,
};
export default YContactForm;
