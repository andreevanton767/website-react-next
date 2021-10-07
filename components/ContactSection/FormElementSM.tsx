import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';

import { FormField } from '@/enums/form';
import { InputElement, InputStyle, InputType } from '@/enums/components';

import YContactForm from '@/components/YContactForm';
import ExpandableRegion from '@/components/AnimateComponents/YExpandableRegion';
import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';

export interface InputField {
  label: string;
  placeholder: string;
  errorMessage?: string;
  info?: string;
}

export interface SubmitHandler {
  (values: Record<string, string>): void;
}

export interface FormElementProps {
  formTitle: string;
  formButtonText: string;
  fields: Record<FormField, InputField>;
  className?: string;
}

const FormElement: React.FC<
  FormElementProps & {
    openForm?: boolean;
    setOpenForm?: (open: boolean) => void;
    onFormSubmit: SubmitHandler;
  }
> = ({
  fields,
  formTitle,
  formButtonText,
  openForm,
  onFormSubmit,
  setOpenForm,
  className,
}) => {
  // handles closing of modal on mobile on submit
  const handleSubmit: typeof onFormSubmit = (values) => {
    setOpenForm(false);
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
    fields: formFields,
    onSubmit: handleSubmit,
    onClose: () => setOpenForm(false),
    title: formTitle,
    style: InputStyle.Dark,
    buttonText: formButtonText,
    className,
  };

  return (
    <AnimateSharedLayout>
      <ExpandableRegion
        className="fixed top-0 left-0 right-0 bottom-0 whitespace-normal z-50"
        open={openForm}
      >
        <YAnimateItem layout className="h-full w-full">
          <YContactForm
            {...formProps}
            onClose={() => setOpenForm(false)}
            className="h-full w-full"
          />
        </YAnimateItem>
      </ExpandableRegion>
    </AnimateSharedLayout>
  );
};

const inputTypes = {
  [FormField.Name]: InputType.Text,
  [FormField.Phone]: InputType.Tel,
  [FormField.Email]: InputType.Email,
  [FormField.Comment]: InputType.Text,
};

export default FormElement;
