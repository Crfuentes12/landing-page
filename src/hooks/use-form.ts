// hooks/use-form.ts
import { useState, useCallback } from 'react';

interface ValidationSchema<T> {
  schema: any;
  validate: (values: T) => Promise<Record<string, string | undefined>>;
  validateField: {
    [K in keyof T]?: (value: T[K]) => Promise<string | undefined>;
  };
}

interface UseFormProps<T extends Record<string, any>> {
  initialValues: T;
  validationSchema?: ValidationSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validate the entire form
  const validateForm = useCallback(async () => {
    if (!validationSchema) {
      setIsValid(true);
      return {};
    }
    
    try {
      const newErrors = await validationSchema.validate(values);
      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
      return newErrors;
    } catch (error) {
      console.error('Form validation error:', error);
      setIsValid(false);
      return { form: 'Validation error' };
    }
  }, [values, validationSchema]);

  // Validate a single field
  const validateField = useCallback(async (field: keyof T) => {
    if (!validationSchema || !validationSchema.validateField[field]) {
      return;
    }

    try {
      const error = await validationSchema.validateField[field]!(values[field]);
      setErrors(prev => ({ ...prev, [field]: error }));
    } catch (error) {
      console.error(`Field validation error (${String(field)}):`, error);
      setErrors(prev => ({ 
        ...prev, 
        [field]: 'Validation error' 
      }));
    }
  }, [values, validationSchema]);

  // Handle field change
  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle field blur (run validation)
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  }, [validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );

    const formErrors = await validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    isValid
  };
}