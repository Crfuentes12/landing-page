//landing-page/src/components/home/Roadmap.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Zap, Route, Shield, CodeXml, Rocket, LucideIcon, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay
}) => {
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
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const features = [
  {
    icon: Target,
    title: "Vision First Approach",
    description: "We understand that every great product starts with a visionary idea. Our focus is on preserving your vision while making it market-ready.",
    gradient: "from-[#4285F4] to-[#2B63D9]"
  },
  {
    icon: Zap,
    title: "Efficient Development",
    description: "No unnecessary complexity. We build exactly what you need to validate your idea and enter the market confidently.",
    gradient: "from-[#FF9800] to-[#F57C00]"
  },
  {
    icon: Shield,
    title: "Future-Proof Foundation",
    description: "While we focus on MVP essentials, we ensure your foundation is solid and scalable for future growth.",
    gradient: "from-[#34A853] to-[#2E7D32]"
  }
];

interface RoadmapStep {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  features: {
    title: string;
    description: string;
  }[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    icon: Target,
    title: "Idea Analysis",
    description: "We dive into your vision to understand your needs and analyze your market.",
    gradient: "from-[#4285F4] to-[#2B63D9]",
    features: [
      {
        title: "Industry Insights",
        description: "Looking at market trends and industry dynamics to build the best MVP for you"
      },
      {
        title: "User Needs Assessment",
        description: "Deep dive into your potential users' needs and pain points"
      },
      {
        title: "Competitive Analysis",
        description: "Understanding your market position and competitive advantages"
      },
      {
        title: "Opportunity Validation",
        description: "Validating your idea's market fit and potential"
      }
    ]
  },
  {
    id: 2,
    icon: Zap,
    title: "Smart Consultancy",
    description: "We trim the excess and focus on what truly matters for your MVP success",
    gradient: "from-[#34A853] to-[#2E7D32]",
    features: [
      {
        title: "Feature Analysis",
        description: "Identifying and prioritizing essential MVP features"
      },
      {
        title: "Tech Architecture",
        description: "Designing the optimal technical foundation for your MVP"
      },
      {
        title: "Resource Planning",
        description: "Strategic allocation of resources for maximum efficiency"
      },
      {
        title: "Risk Mitigation",
        description: "Identifying and addressing potential challenges early"
      }
    ]
  },
  {
    id: 3,
    icon: Route,
    title: "Scoping & Roadmap",
    description: "We define clear project limits, timeline and key deliverables to ensure efficient development.",
    gradient: "from-[#FBBC05] to-[#F57C00]",
    features: [
      {
        title: "Timeline Definition",
        description: "Creating a clear, achievable development schedule"
      },
      {
        title: "Milestone Planning",
        description: "Setting specific, measurable project milestones"
      },
      {
        title: "Project Scope",
        description: "Giving you clear expectations"
      },
      {
        title: "Deliverable Mapping",
        description: "Defining clear, actionable project deliverables"
      }
    ]
  },
  {
    id: 4,
    icon: CodeXml,
    title: "Development",
    description: "Transparent progress with close collaboration and regular updates",
    gradient: "from-[#EA4335] to-[#C62828]",
    features: [
      {
        title: "Agile Process",
        description: "Flexible, iterative development approach"
      },
      {
        title: "Quality Focus",
        description: "Rigorous testing and quality assurance"
      },
      {
        title: "Progress Monitoring",
        description: "Regular updates and progress tracking"
      },
      {
        title: "Collaborative Development",
        description: "Close partnership throughout the build process"
      }
    ]
  },
  {
    id: 5,
    icon: Rocket,
    title: "Launch & Support",
    description: "Your MVP, ready to hit the market with ongoing support and guidance",
    gradient: "from-[#9C27B0] to-[#6A1B9A]",
    features: [
      {
        title: "Launch Strategy",
        description: "Comprehensive deployment and launch planning"
      },
      {
        title: "Performance Optimization",
        description: "Ensuring optimal MVP performance"
      },
      {
        title: "User Feedback",
        description: "Implementing feedback collection systems"
      },
      {
        title: "Ongoing Support",
        description: "Continued guidance and technical support"
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
        <h3 className="font-semibold">{step.title}</h3>
      </div>
    </button>
  );
};

interface StepContentProps {
  step: RoadmapStep;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-lg text-muted-foreground mb-8 font-bold">{step.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {step.features.map((feature, index) => (
            <Card key={index} className="border-[#4285F4]/10 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${step.gradient}`} />
                  <h4 className="font-medium">{feature.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-5">
                  {feature.description}
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
  
  return (
    <section className="py-24 relative overflow-hidden">
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
              How We Make It Happen
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={0.2 + index * 0.2}
            />
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              Roadmap to your MVP
            </span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our structured approach to turning your vision into reality, ensures that every step moves us closer to your successful MVP launch.
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