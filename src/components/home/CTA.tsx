
//landing-page/src/components/home/CTA.tsx
"use client";

import { useForm } from "@/hooks/use-form";
import { schemas } from "@/lib/validation";
import { useModal } from "@/providers/modal-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, Rocket } from "lucide-react";

type ContactFormData = Record<string, unknown> & {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const CTA = () => {
  const { t } = useLanguage();
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      openModal(
        <div className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Rocket className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {t('cta.success.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('cta.success.message').replace('{email}', values.email)}
          </p>
        </div>
      );
    }
  });

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#4285F4] to-[#2B63D9] bg-clip-text text-transparent">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('cta.subtitle')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#4285F4]" />
                <a href={`mailto:${t('cta.contact.email')}`} className="text-muted-foreground hover:text-[#4285F4] transition-colors">
                  {t('cta.contact.email')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#4285F4]" />
                <a href={`tel:${t('cta.contact.phone')}`} className="text-muted-foreground hover:text-[#4285F4] transition-colors">
                  {t('cta.contact.phone')}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-8 shadow-lg border border-[#4285F4]/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {t('cta.form.firstName')}
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50
                      ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-input'}
                    `}
                    placeholder={t('cta.form.firstName.placeholder')}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-sm text-red-500">{t(errors.firstName)}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {t('cta.form.lastName')}
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50
                      ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-input'}
                    `}
                    placeholder={t('cta.form.lastName.placeholder')}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-sm text-red-500">{t(errors.lastName)}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('cta.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50
                    ${touched.email && errors.email ? 'border-red-500' : 'border-input'}
                  `}
                  placeholder={t('cta.form.email.placeholder')}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500">{t(errors.email)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('cta.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50
                    ${touched.message && errors.message ? 'border-red-500' : 'border-input'}
                  `}
                  placeholder={t('cta.form.message.placeholder')}
                />
                {touched.message && errors.message && (
                  <p className="text-sm text-red-500">{t(errors.message)}</p>
                )}
              </div>

              <Button 
                className="w-full group bg-[#4285F4] hover:bg-[#2B63D9]" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? t('cta.form.button.sending') : t('cta.form.button.send')}
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