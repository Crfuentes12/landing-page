//landing-page/src/components/home/Pricing.tsx
// src/components/home/Pricing.tsx
"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useModal } from "@/providers/modal-provider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useForm } from '@/hooks/use-form';
import { schemas } from '@/lib/validation';

interface PlanDetails {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingFormData {
  email: string;
  company: string;
  employees: string;
}

const plans: PlanDetails[] = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 39 },
    description: "Perfect for small businesses just getting started",
    features: [
      "Up to 5 team members",
      "Basic analytics",
      "24/7 support",
      "1 project",
      "Basic reporting"
    ]
  },
  {
    name: "Professional",
    price: { monthly: 99, annual: 89 },
    description: "Ideal for growing businesses and teams",
    features: [
      "Up to 20 team members",
      "Advanced analytics",
      "Priority support",
      "10 projects",
      "Custom reporting",
      "API access",
      "Team collaboration"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: { monthly: 199, annual: 179 },
    description: "Advanced features for large organizations",
    features: [
      "Unlimited team members",
      "Enterprise analytics",
      "Dedicated support",
      "Unlimited projects",
      "Custom solutions",
      "Advanced security",
      "SLA guarantee",
      "Custom integrations"
    ]
  }
];

const PricingModal = ({ plan, onClose }: { plan: PlanDetails; onClose: () => void }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm<PricingFormData>({
    initialValues: {
      email: '',
      company: '',
      employees: ''
    },
    validationSchema: schemas.pricingForm,
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onClose();
      console.log('Subscription values:', { plan, ...values });
    }
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Get Started with {plan.name}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Work Email</label>
          <input
            type="email"
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-3 py-2 border rounded-md ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <input
            type="text"
            value={values.company}
            onChange={e => handleChange('company', e.target.value)}
            onBlur={() => handleBlur('company')}
            className={`w-full px-3 py-2 border rounded-md ${
              touched.company && errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.company && errors.company && (
            <p className="text-sm text-red-500">{errors.company}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Employees</label>
          <select
            value={values.employees}
            onChange={e => handleChange('employees', e.target.value)}
            onBlur={() => handleBlur('employees')}
            className={`w-full px-3 py-2 border rounded-md ${
              touched.employees && errors.employees ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201+">201+</option>
          </select>
          {touched.employees && errors.employees && (
            <p className="text-sm text-red-500">{errors.employees}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useLocalStorage('pricing-billing-period', false);
  const { openModal } = useModal();

  const handlePlanSelection = (plan: PlanDetails) => {
    openModal(
      <PricingModal 
        plan={plan} 
        onClose={() => openModal(null)} 
      />
    );
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs. All plans include our core features.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs text-primary">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              
              <CardHeader>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePlanSelection(plan)}
                >
                  Get Started with {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All prices are in USD and exclude applicable taxes. 
            Need a custom plan? <a href="#contact" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;