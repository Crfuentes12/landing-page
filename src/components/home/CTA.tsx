
//landing-page/src/components/home/CTA.tsx
"use client";

import { useForm } from "@/hooks/use-form";
import { schemas } from "@/lib/validation";
import { useModal } from "@/providers/modal-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Mail, 
  Rocket,
  Linkedin,
  MessageCircle
} from "lucide-react";

type ContactFormData = {
  email: string;
  message: string;
};

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:hello@company.com",
    label: "Email",
    color: "text-[#4285F4] hover:text-[#2B63D9]"
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/your-company",
    label: "LinkedIn",
    color: "text-[#0A66C2] hover:text-[#084482]"
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/your-number",
    label: "WhatsApp",
    color: "text-[#25D366] hover:text-[#128C7E]"
  }
];

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
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#2B63D9] bg-clip-text text-transparent">
                Ready to Build the Next Big Thing? Let&apos;s Talk!
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Start now. The <span className="font-semibold text-foreground">right MVP</span> at 
                the <span className="font-semibold text-foreground">right price</span>—nothing more, 
                nothing less. We&apos;re just a <span className="font-semibold text-foreground">tap away</span>.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Connect via:
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-background border border-border rounded-full hover:border-primary/50 transition-colors">
                      <link.icon className={`w-5 h-5 ${link.color} transition-colors`} />
                    </div>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-8 shadow-lg border border-[#4285F4]/10">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full group bg-[#4285F4] hover:bg-[#2B63D9] text-white" 
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