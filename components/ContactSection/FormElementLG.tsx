import React from 'react';

import { FormField } from '@/enums/form';
import { InputElement, InputStyle, InputType } from '@/enums/components';

import YContactForm from '@/components/YContactForm';

interface InputField {
  label: string;
  placeholder: string;
  errorMessage?: string;
  info?: string;
}

interface SubmitHandler {
  (values: Record<string, string>): void;
}

interface FormElementProps {
  formTitle: string;
  formButtonText: string;
  fields: Record<FormField, InputField>;
  className?: string;
}

const FormElement: React.FC<
  FormElementProps & {
    onFormSubmit: SubmitHandler;
  }
> = ({ fields, onFormSubmit, formTitle, formButtonText, className }) => {
  // handles closing of modal on mobile on submit
  const handleSubmit: typeof onFormSubmit = (values) => {
    onFormSubmit(values);
  };

  const formFields = Object.keys(fields).reduce(
    (acc, key) => (
      (acc[key] = {
        ...fields[key],
        inputType: inputTypes[key],
        element:
          key == FormField.Comment ? InputElement.TextArea : InputElement.Input,
      }),
      acc
    ),
    {}
  ) as typeof fields;

  const formProps = {
    className,
    fields: formFields,
    onSubmit: handleSubmit,
    title: formTitle,
    style: InputStyle.Light,
    buttonText: formButtonText,
  };

  return <YContactForm {...formProps} />;
};

const inputTypes = {
  [FormField.Name]: InputType.Text,
  [FormField.Phone]: InputType.Tel,
  [FormField.Email]: InputType.Email,
  [FormField.Comment]: InputType.Text,
};

export default FormElement;
