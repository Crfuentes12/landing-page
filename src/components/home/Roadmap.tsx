//landing-page/src/components/home/Roadmap.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Zap, Route, Shield, CodeXml, Rocket, LucideIcon, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';
import { useLanguage } from "@/providers/language-provider";

interface FeatureCardProps {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  gradient: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  titleKey, 
  descriptionKey, 
  gradient, 
  delay
}) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-[#4285F4]/10">
        <CardContent className="p-8">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} 
            flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 group-hover:text-[#4285F4] transition-colors duration-300">
            {t(titleKey)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t(descriptionKey)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const features = [
  {
    icon: Target,
    titleKey: "roadmap.feature1.title",
    descriptionKey: "roadmap.feature1.description",
    gradient: "from-[#4285F4] to-[#2B63D9]"
  },
  {
    icon: Zap,
    titleKey: "roadmap.feature2.title",
    descriptionKey: "roadmap.feature2.description",
    gradient: "from-[#FF9800] to-[#F57C00]"
  },
  {
    icon: Shield,
    titleKey: "roadmap.feature3.title",
    descriptionKey: "roadmap.feature3.description",
    gradient: "from-[#34A853] to-[#2E7D32]"
  }
];

interface RoadmapStep {
  id: number;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  gradient: string;
  features: {
    titleKey: string;
    descriptionKey: string;
  }[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    icon: Target,
    titleKey: "roadmap.step1.title",
    descriptionKey: "roadmap.step1.description",
    gradient: "from-[#4285F4] to-[#2B63D9]",
    features: [
      {
        titleKey: "roadmap.step1.feature1.title",
        descriptionKey: "roadmap.step1.feature1.description"
      },
      {
        titleKey: "roadmap.step1.feature2.title",
        descriptionKey: "roadmap.step1.feature2.description"
      },
      {
        titleKey: "roadmap.step1.feature3.title",
        descriptionKey: "roadmap.step1.feature3.description"
      },
      {
        titleKey: "roadmap.step1.feature4.title",
        descriptionKey: "roadmap.step1.feature4.description"
      }
    ]
  },
  {
    id: 2,
    icon: Zap,
    titleKey: "roadmap.step2.title",
    descriptionKey: "roadmap.step2.description",
    gradient: "from-[#34A853] to-[#2E7D32]",
    features: [
      {
        titleKey: "roadmap.step2.feature1.title",
        descriptionKey: "roadmap.step2.feature1.description"
      },
      {
        titleKey: "roadmap.step2.feature2.title",
        descriptionKey: "roadmap.step2.feature2.description"
      },
      {
        titleKey: "roadmap.step2.feature3.title",
        descriptionKey: "roadmap.step2.feature3.description"
      },
      {
        titleKey: "roadmap.step2.feature4.title",
        descriptionKey: "roadmap.step2.feature4.description"
      }
    ]
  },
  {
    id: 3,
    icon: Route,
    titleKey: "roadmap.step3.title",
    descriptionKey: "roadmap.step3.description",
    gradient: "from-[#FBBC05] to-[#F57C00]",
    features: [
      {
        titleKey: "roadmap.step3.feature1.title",
        descriptionKey: "roadmap.step3.feature1.description"
      },
      {
        titleKey: "roadmap.step3.feature2.title",
        descriptionKey: "roadmap.step3.feature2.description"
      },
      {
        titleKey: "roadmap.step3.feature3.title",
        descriptionKey: "roadmap.step3.feature3.description"
      },
      {
        titleKey: "roadmap.step3.feature4.title",
        descriptionKey: "roadmap.step3.feature4.description"
      }
    ]
  },
  {
    id: 4,
    icon: CodeXml,
    titleKey: "roadmap.step4.title",
    descriptionKey: "roadmap.step4.description",
    gradient: "from-[#EA4335] to-[#C62828]",
    features: [
      {
        titleKey: "roadmap.step4.feature1.title",
        descriptionKey: "roadmap.step4.feature1.description"
      },
      {
        titleKey: "roadmap.step4.feature2.title",
        descriptionKey: "roadmap.step4.feature2.description"
      },
      {
        titleKey: "roadmap.step4.feature3.title",
        descriptionKey: "roadmap.step4.feature3.description"
      },
      {
        titleKey: "roadmap.step4.feature4.title",
        descriptionKey: "roadmap.step4.feature4.description"
      }
    ]
  },
  {
    id: 5,
    icon: Rocket,
    titleKey: "roadmap.step5.title",
    descriptionKey: "roadmap.step5.description",
    gradient: "from-[#9C27B0] to-[#6A1B9A]",
    features: [
      {
        titleKey: "roadmap.step5.feature1.title",
        descriptionKey: "roadmap.step5.feature1.description"
      },
      {
        titleKey: "roadmap.step5.feature2.title",
        descriptionKey: "roadmap.step5.feature2.description"
      },
      {
        titleKey: "roadmap.step5.feature3.title",
        descriptionKey: "roadmap.step5.feature3.description"
      },
      {
        titleKey: "roadmap.step5.feature4.title",
        descriptionKey: "roadmap.step5.feature4.description"
      }
    ]
  }
];

interface StepIndicatorProps {
  step: RoadmapStep;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  step, 
  isActive, 
  isCompleted, 
  onClick 
}) => {
  const Icon = step.icon;
  const { t } = useLanguage();
  
  return (
    <button 
      className="flex items-center w-full group hover:scale-105 transition-all duration-300 
                select-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none
                [&:not(:focus-visible)]:ring-0 [&:not(:focus-visible)]:outline-none"
      onClick={onClick}
      type="button"
    >
      <div
        className={`
          w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
          group-hover:shadow-lg group-hover:scale-105 relative z-10
          ${isActive 
            ? `bg-gradient-to-br ${step.gradient} shadow-lg scale-110` 
            : isCompleted
              ? 'bg-[#4285F4] opacity-50 group-hover:opacity-75'
              : 'bg-border/30 group-hover:bg-border/50'
          }
        `}
      >
        <Icon className={`h-8 w-8 ${isActive || isCompleted ? 'text-white' : 'text-muted-foreground'} 
          group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <div className={`ml-4 transition-all duration-300 text-left ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Step {step.id}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">{t(step.titleKey)}</h3>
      </div>
    </button>
  );
};

interface StepContentProps {
  step: RoadmapStep;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div>
        <p className="text-lg text-muted-foreground mb-8 font-bold">{t(step.descriptionKey)}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {step.features.map((feature, index) => (
            <Card key={index} className="border-[#4285F4]/10 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${step.gradient}`} />
                  <h4 className="font-medium">{t(feature.titleKey)}</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-5">
                  {t(feature.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { t } = useLanguage();
  
  return (
    <section className="py-24 relative overflow-hidden" id="roadmap">
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              {t('roadmap.title')}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.titleKey}
              icon={feature.icon}
              titleKey={feature.titleKey}
              descriptionKey={feature.descriptionKey}
              gradient={feature.gradient}
              delay={0.2 + index * 0.2}
            />
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              {t('roadmap.features.title')}
            </span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('roadmap.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12">
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <StepIndicator
                key={step.id}
                step={step}
                isActive={activeStep === index}
                isCompleted={index < activeStep}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-[#4285F4]/5 to-transparent" />
            <div className="relative">
              {roadmapSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`transition-all duration-500 ${
                    activeStep === index 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  {activeStep === index && <StepContent step={step} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;