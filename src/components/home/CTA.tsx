//landing-page/src/components/home/CTA.tsx
"use client";

import { useState } from "react";
import { useForm } from "@/hooks/use-form";
import { schemas } from "@/lib/validation";
import { useModal } from "@/providers/modal-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, AlertCircle, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Alert, AlertDescription } from "@/components/ui/alert";

type ContactFormData = {
  email: string;
  message: string;
};

interface SocialLink {
  icon: IconDefinition | React.ComponentType;
  href: string;
  labelKey: string;
  hoverColor: string;
  isLucide?: boolean;
}

const CTA = () => {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const socialLinks: SocialLink[] = [
    {
      icon: Mail,
      href: "mailto:your-email@example.com",
      labelKey: "cta.email",
      hoverColor: "hover:text-[#2B63D9]",
      isLucide: true
    },
    {
      icon: faLinkedin,
      href: "https://linkedin.com/company/your-company",
      labelKey: "cta.linkedin",
      hoverColor: "hover:text-[#0A66C2]"
    }
  ];

  async function submitContactForm(data: ContactFormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit form');
    }

    return response.json();
  }
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<ContactFormData>({
    initialValues: {
      email: '',
      message: ''
    },
    validationSchema: schemas.contactForm,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        await submitContactForm(values);
        
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

        // Reset form values
        handleChange('email', '');
        handleChange('message', '');
      } catch (error) {
        setSubmitError(
          error instanceof Error 
            ? error.message 
            : 'Failed to submit form. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-primary/5 dark:bg-primary/[0.02]" id="contact">
      {/* Background Pattern */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#2B63D9] dark:from-[#5C9FFF] dark:to-[#3B7DFF] bg-clip-text text-transparent leading-tight">
                {t('cta.title')}
              </h2>
              <p 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('cta.description') }}
              />
            </div>
            
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 duration-200"
                >
                  {link.isLucide ? (
                    <Mail className={`w-8 h-8 text-muted-foreground ${link.hoverColor} dark:text-muted-foreground dark:hover:text-white transition-colors duration-200`} />
                  ) : (
                    <FontAwesomeIcon 
                      icon={link.icon as IconDefinition} 
                      className={`w-8 h-8 text-muted-foreground ${link.hoverColor} dark:text-muted-foreground dark:hover:text-white transition-colors duration-200`}
                      size="2x"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-background dark:bg-gray-900 rounded-lg p-8 shadow-lg border border-[#4285F4]/10 dark:border-white/5">
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground dark:text-gray-200">
                  {t('cta.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-2 bg-background dark:bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50 dark:focus:ring-[#5C9FFF]/50 text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-gray-400
                    ${touched.email && errors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-input dark:border-gray-700'}
                  `}
                  placeholder={t('cta.form.email.placeholder')}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500 dark:text-red-400">{t(errors.email)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground dark:text-gray-200">
                  {t('cta.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-2 bg-background dark:bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50 dark:focus:ring-[#5C9FFF]/50 text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-gray-400
                    ${touched.message && errors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-input dark:border-gray-700'}
                  `}
                  placeholder={t('cta.form.message.placeholder')}
                />
                {touched.message && errors.message && (
                  <p className="text-sm text-red-500 dark:text-red-400">{t(errors.message)}</p>
                )}
              </div>

              <Button 
                className="w-full group bg-[#4285F4] hover:bg-[#2B63D9] dark:bg-[#5C9FFF] dark:hover:bg-[#3B7DFF] text-white" 
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