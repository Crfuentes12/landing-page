// lib/validation.ts
import * as yup from 'yup';
import { ContactFormData } from '@/types';

// Contact form validation schema
const contactFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('cta.validation.required')
    .email('cta.validation.email')
    .max(255, 'cta.validation.maxLength'),
  message: yup
    .string()
    .required('cta.validation.required')
    .min(10, 'cta.validation.minLength')
    .max(5000, 'cta.validation.maxLength'),
});

// Custom form hook helpers
const validateField = async (
  schema: any, // Using any here because of the complex Yup types
  value: any
): Promise<string | undefined> => {
  try {
    await schema.validate(value);
    return undefined;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Invalid value';
  }
};

const validateForm = async<T extends Record<string, any>>(
  schema: yup.ObjectSchema<any>, 
  values: T
): Promise<Record<string, string | undefined>> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return {};
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.inner.reduce((errors: Record<string, string>, err: yup.ValidationError) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
        return errors;
      }, {} as Record<string, string>);
    }
    return { form: 'Invalid form values' };
  }
};

// Export schemas and validation helpers
export const schemas = {
  contactForm: {
    schema: contactFormSchema,
    validate: (values: ContactFormData) => validateForm(contactFormSchema, values),
    validateField: {
      // Use type assertions to avoid TypeScript errors
      email: (value: string) => validateField(contactFormSchema.fields.email as any, value),
      message: (value: string) => validateField(contactFormSchema.fields.message as any, value),
    },
  },
};