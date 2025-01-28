// src/lib/validation.ts
interface ValidationRule {
    test: (value: any, formValues?: Record<string, any>) => boolean;
    message: string;
  }
  
  export type ValidationFunction = (values: Record<string, any>) => Record<string, string>;
  
  export interface ValidationSchema {
    [key: string]: ValidationRule[];
  }
  
  export const createValidationSchema = (schema: ValidationSchema): ValidationFunction => {
    return (values: Record<string, any>) => {
      const errors: Record<string, string> = {};
  
      Object.entries(schema).forEach(([field, rules]) => {
        const value = values[field];
  
        for (const rule of rules) {
          if (!rule.test(value, values)) {
            errors[field] = rule.message;
            break;
          }
        }
      });
  
      return errors;
    };
  };
  
  // Common validation rules
  export const rules = {
    required: {
      test: (value: any) => value !== undefined && value !== null && value !== '',
      message: 'This field is required'
    },
    email: {
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    },
    phone: {
      test: (value: string) => /^\+?[\d\s-]{10,}$/.test(value),
      message: 'Please enter a valid phone number'
    },
    minLength: (length: number): ValidationRule => ({
      test: (value: string) => value.length >= length,
      message: `Must be at least ${length} characters`
    }),
    maxLength: (length: number): ValidationRule => ({
      test: (value: string) => value.length <= length,
      message: `Must be no more than ${length} characters`
    }),
    password: {
      test: (value: string) => 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
      message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    },
    match: (fieldToMatch: string, fieldName: string): ValidationRule => ({
      test: (value: string, formValues?: Record<string, any>) => 
        formValues ? value === formValues[fieldToMatch] : false,
      message: `Must match ${fieldName}`
    })
  };
  
  // Common validation schemas
  export const schemas = {
    contactForm: createValidationSchema({
      firstName: [rules.required],
      lastName: [rules.required],
      email: [rules.required, rules.email],
      phone: [rules.phone],
      message: [rules.required, rules.minLength(10)]
    }),
    loginForm: createValidationSchema({
      email: [rules.required, rules.email],
      password: [rules.required, rules.password]
    }),
    registrationForm: createValidationSchema({
      firstName: [rules.required],
      lastName: [rules.required],
      email: [rules.required, rules.email],
      password: [rules.required, rules.password],
      confirmPassword: [
        rules.required,
        rules.match('password', 'password')
      ]
    }),
    profileForm: createValidationSchema({
      username: [rules.required],
      email: [rules.required, rules.email],
      bio: [rules.maxLength(500)]
    }),
    pricingForm: createValidationSchema({
      email: [rules.required, rules.email],
      company: [rules.required],
      employees: [rules.required]
    })
  };