//landing-page/src/components/home/Roadmap.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Zap, Route, Shield, CodeXml, Rocket, LucideIcon, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from 'framer-motion';
import { useLanguage } from "@/providers/language-provider";

interface FeatureCardProps {
  icon: React.ElementType;
  titleKey: string;
  descriptionKeyBase: string;
  gradient: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  titleKey, 
  descriptionKeyBase, 
  gradient, 
  delay
}) => {
  const { t } = useLanguage();
  
  // Obtener los textos de las partes de la descripción
  const part1 = t(`${descriptionKeyBase}.part1`);
  const part2 = t(`${descriptionKeyBase}.part2`);
  const part3 = t(`${descriptionKeyBase}.part3`);
  
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
            {part1 !== descriptionKeyBase + ".part1" ? part1 : ""}
            <strong className="font-semibold text-foreground">{part2}</strong>
            {part3}
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
    descriptionKeyBase: "roadmap.feature1.description",
    gradient: "from-[#4285F4] to-[#2B63D9]"
  },
  {
    icon: Zap,
    titleKey: "roadmap.feature2.title",
    descriptionKeyBase: "roadmap.feature2.description",
    gradient: "from-[#FF9800] to-[#F57C00]"
  },
  {
    icon: Shield,
    titleKey: "roadmap.feature3.title",
    descriptionKeyBase: "roadmap.feature3.description",
    gradient: "from-[#34A853] to-[#2E7D32]"
  }
];

interface RoadmapStep {
  id: number;
  icon: LucideIcon;
  titleKey: string;
  descriptionKeyBase: string;
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
    descriptionKeyBase: "roadmap.step1.description",
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
    descriptionKeyBase: "roadmap.step2.description",
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
    descriptionKeyBase: "roadmap.step3.description",
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
    descriptionKeyBase: "roadmap.step4.description",
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
    descriptionKeyBase: "roadmap.step5.description",
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
  isExpanded: boolean;
  isCompleted: boolean;
  onClick: () => void;
  toggleExpand: () => void;
  isMobile: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  step, 
  isActive, 
  isExpanded,
  isCompleted, 
  onClick,
  toggleExpand,
  isMobile
}) => {
  const Icon = step.icon;
  const { t } = useLanguage();
  
  const handleClick = () => {
    if (isMobile) {
      toggleExpand();
    } else {
      onClick();
    }
  };
  
  return (
    <div className="w-full">
      {isMobile ? (
        <button 
          className="flex items-center w-full px-4 py-3 group transition-all duration-300 
                    select-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none
                    [&:not(:focus-visible)]:ring-0 [&:not(:focus-visible)]:outline-none"
          onClick={handleClick}
          type="button"
        >
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
              relative z-10
              ${isExpanded ? `bg-gradient-to-br ${step.gradient} shadow-md` : 'bg-border/20'}
            `}
          >
            <Icon className={`h-6 w-6 ${isExpanded ? 'text-white' : 'text-muted-foreground'} 
              transition-transform duration-300`} />
          </div>
          <div className={`ml-4 transition-all duration-300 text-left flex-grow ${
            isExpanded ? 'opacity-100' : 'opacity-60'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{t('roadmap.step.label')} {step.id}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">{t(step.titleKey)}</h3>
          </div>
          <div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </button>
      ) : (
        <button 
          className="flex items-center w-full px-4 py-2 group transition-all duration-300
                    select-none focus:outline-none focus:ring-0"
          onClick={handleClick}
          type="button"
        >
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
              relative z-10 group-hover:shadow-md
              ${isActive ? `bg-gradient-to-br ${step.gradient} shadow-md` : 
                isCompleted ? 'bg-[#4285F4] opacity-50' : 'bg-border/20'
              }
            `}
          >
            <Icon className={`h-6 w-6 ${
              (isActive || isCompleted) ? 'text-white' : 'text-muted-foreground'
            } transition-transform duration-300`} />
          </div>
          <div className={`ml-4 transition-all duration-300 text-left flex-grow ${
            isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{t('roadmap.step.label')} {step.id}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">{t(step.titleKey)}</h3>
          </div>
        </button>
      )}
      
      {/* Mobile content (collapsible) */}
      {isMobile && isExpanded && (
        <div className="px-4 pb-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <StepContent step={step} />
        </div>
      )}
    </div>
  );
};

interface StepContentProps {
  step: RoadmapStep;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  const { t } = useLanguage();
  
  // Renderizar la descripción con partes en negrita
  const renderDescription = () => {
    if (step.id === 5) {
      // El paso 5 tiene 5 partes
      return (
        <>
          {t(`${step.descriptionKeyBase}.part1`)}
          <strong className="font-semibold text-foreground">{t(`${step.descriptionKeyBase}.part2`)}</strong>
          {t(`${step.descriptionKeyBase}.part3`)}
          <strong className="font-semibold text-foreground">{t(`${step.descriptionKeyBase}.part4`)}</strong>
          {t(`${step.descriptionKeyBase}.part5`)}
        </>
      );
    } else {
      // Los demás pasos tienen 3 partes
      return (
        <>
          {t(`${step.descriptionKeyBase}.part1`)}
          <strong className="font-semibold text-foreground">{t(`${step.descriptionKeyBase}.part2`)}</strong>
          {t(`${step.descriptionKeyBase}.part3`)}
        </>
      );
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground mb-4 font-medium lg:text-lg">
          {renderDescription()}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {step.features.map((feature, index) => (
            <Card key={index} className="border-[#4285F4]/10 bg-card/50 backdrop-blur-sm hover:shadow-sm transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2 lg:gap-3">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${step.gradient}`} />
                  <h4 className="font-medium text-sm lg:text-base">{t(feature.titleKey)}</h4>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground pl-4 lg:pl-5">
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
  // Track which steps are expanded on mobile
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const { t } = useLanguage();
  
  // Function to toggle expansion of a step on mobile
  const toggleExpand = (index: number) => {
    setExpandedSteps(prev => {
      // If the clicked item is already expanded, collapse it
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } 
      // Otherwise expand this item and collapse all others
      else {
        return [index];
      }
    });
  };
  
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
              descriptionKeyBase={feature.descriptionKeyBase}
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

        {/* Mobile view (accordion style) */}
        <div className="lg:hidden space-y-3 px-2">
          {roadmapSteps.map((step, index) => (
            <div 
              key={step.id} 
              className="border border-[#4285F4]/10 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm"
            >
              <StepIndicator
                step={step}
                isActive={activeStep === index}
                isExpanded={expandedSteps.includes(index)}
                isCompleted={index < activeStep}
                onClick={() => setActiveStep(index)}
                toggleExpand={() => toggleExpand(index)}
                isMobile={true}
              />
            </div>
          ))}
        </div>

        {/* Desktop view (original layout) */}
        <div className="hidden lg:grid grid-cols-[350px,1fr] gap-6">
          <div className="space-y-4">
            {roadmapSteps.map((step, index) => (
              <StepIndicator
                key={step.id}
                step={step}
                isActive={activeStep === index}
                isExpanded={false}
                isCompleted={index < activeStep}
                onClick={() => setActiveStep(index)}
                toggleExpand={() => {}}
                isMobile={false}
              />
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-[#4285F4]/5 to-transparent" />
            <div className="relative p-4">
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