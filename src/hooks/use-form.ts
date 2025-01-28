import { useState, useCallback, useEffect } from 'react';
import { ValidationFunction } from '@/lib/validation';

interface FormConfig<T> {
  initialValues: T;
  validationSchema?: ValidationFunction;
  onSubmit: (values: T) => void | Promise<void>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: FormConfig<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const validate = useCallback((values: T): Partial<Record<keyof T, string>> => {
    if (!validationSchema) return {};
    const errors = validationSchema(values);
    return errors as Partial<Record<keyof T, string>>;
  }, [validationSchema]);

  useEffect(() => {
    const errors = validate(formState.values);
    setFormState(prev => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0,
    }));
  }, [formState.values, validate]);

  const handleChange = useCallback((
    name: keyof T,
    value: unknown,
    shouldValidate: boolean = true
  ) => {
    setFormState(prev => {
      const newValues = { ...prev.values, [name]: value };
      const newState = {
        ...prev,
        values: newValues,
        touched: { ...prev.touched, [name]: true },
      };

      if (shouldValidate) {
        const errors = validate(newValues);
        return {
          ...newState,
          errors,
          isValid: Object.keys(errors).length === 0,
        };
      }

      return newState;
    });
  }, [validate]);

  const handleBlur = useCallback((name: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const errors = validate(formState.values);
    const isValid = Object.keys(errors).length === 0;

    setFormState(prev => ({
      ...prev,
      errors,
      touched: Object.keys(prev.values).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {} as Record<keyof T, boolean>),
      isValid,
    }));

    if (isValid) {
      setFormState(prev => ({ ...prev, isSubmitting: true }));
      try {
        await onSubmit(formState.values);
      } finally {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    }
  }, [formState.values, validate, onSubmit]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}