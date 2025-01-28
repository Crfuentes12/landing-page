
//landing-page/src/components/home/CTA.tsx
"use client";

import { useForm } from "@/hooks/use-form";
import { schemas } from "@/lib/validation";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

type ContactFormData = Record<string, unknown> & {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const CTA = () => {
  const { openModal } = useModal();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm<ContactFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    },
    validationSchema: schemas.contactForm,
    onSubmit: async (values) => {
      // Here you would typically send the form data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      openModal(
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Thank you for reaching out!</h3>
          <p className="text-muted-foreground">
            We&apos;ll get back to you at {values.email} within 24 hours.
          </p>
        </div>
      );
    }
  });

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary/5" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss how we can help your business grow. Schedule a free consultation 
              with our experts and get started on your digital transformation journey.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary">
                  contact@example.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-8 shadow-lg border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50
                      ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-input'}
                    `}
                    placeholder="John"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50
                      ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-input'}
                    `}
                    placeholder="Doe"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50
                    ${touched.email && errors.email ? 'border-red-500' : 'border-input'}
                  `}
                  placeholder="john@example.com"
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50
                    ${touched.message && errors.message ? 'border-red-500' : 'border-input'}
                  `}
                  placeholder="Tell us about your project..."
                />
                {touched.message && errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button className="w-full group" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;