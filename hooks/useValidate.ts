import React, { useEffect, useState } from 'react';

interface ValidateHook {
  (
    fields: string[],
    onSubmit: (values: Record<string, any>) => any,
    validationRegex?: Record<string, RegExp>
  ): {
    handleChange: (value: string, field: string) => void;
    handleSubmit: (e: React.SyntheticEvent) => void;
    disabled: boolean;
    validationErrors: Record<string, boolean>;
    formValues: Record<string, string>;
  };
}

/**
 * Used to validate form on submit, with addition of negating any errors from invalid submit on change
 * All form states are kept inside the hook and returned through reference
 * @param fields field names
 * @param onSubmit onSubmit function passed to form
 * @returns handleChange, handleSubmit, disabled (disables form), formValues, validationErrors
 */
const useValidate: ValidateHook = (fields, onSubmit, validationRegex) => {
  // create form values object
  const [formValues, setFormValues] = useState(objectFromKeysArray(fields, ''));

  // create validation errors state object
  const [errors, setErrors] = useState(objectFromKeysArray(fields, false));

  // if there is an validation error in one of the fields, the submitting is disabled
  const disabled = Object.values(errors).includes(true);

  /**
   * This sets validate to true, triggering validation useEffect block to pass
   * @param e prevents default (refreshing on form submit)
   */
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValidate(true);
  };

  /**
   * Validates each entry in formValues, sets eventual changes to errors state object,
   * sets submit true triggering the submit useEffect block
   */
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (validate) {
      let safeErrors = { ...errors };
      for (let field in formValues) {
        safeErrors[field] = !validateField(
          formValues[field],
          field,
          validationRegex
        );
      }
      setErrors(safeErrors), setValidate(false);
      setSubmit(true);
    }
  }, [validate]);

  /**
   * After validation block passes through and sets errors state object,
   * submit block checks that there are no errors present and fires onSubmit function with formValues
   */
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit && !disabled) {
      onSubmit(formValues);
    }
    setSubmit(false);
  }, [submit]);

  /**
   * Used to update each field onChange,
   * with addition to correcting validation errors from failed submit attempt
   * @param value new value for field
   * @param field field name
   */
  const handleChange = (value: string, field: string) => {
    setFormValues({ ...formValues, [field]: value });
    // if error is displayed, check for correction
    if (disabled) {
      const validated = validateField(value, field, validationRegex);
      if (validated) setErrors({ ...errors, [field]: false });
    }
  };

  return {
    handleChange,
    handleSubmit,
    disabled,
    validationErrors: errors,
    formValues,
  };
};

/**
 * Tests value against provided RegExp
 * if no validation is provided for field, it automatically passes
 * @param value current field value
 * @param field current field name
 * @param validationRegex regex for test
 * @returns validated (boolean)
 */
const validateField = (
  value: string,
  field: string,
  validationRegex?: Record<string, RegExp>
) =>
  Boolean(validationRegex) && Boolean(validationRegex[field])
    ? validationRegex[field].test(value)
    : true;

// local utils

/**
 * Helper function, creates object with keys from passed array and fills each with initial value
 * @param keys array
 * @param initialValue for each property
 * @returns {[keys0]: initialValue, [keys1]:initialValue ...}
 */
const objectFromKeysArray = (
  keys: string[],
  initialValue: any
): Record<string, any> =>
  keys.reduce((acc, curr) => ((acc[curr] = initialValue), acc), {});

export default useValidate;
