//landing-page/src/components/home/Roadmap.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Zap, Clock, Shield, Rocket, LucideIcon, ChevronRight } from "lucide-react";

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
    description: "We dive into your vision to understand your needs and validate your market opportunity",
    gradient: "from-[#4285F4] to-[#2B63D9]",
    features: [
      {
        title: "Market Research",
        description: "Comprehensive analysis of your target market and competition"
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
    icon: Clock,
    title: "Scoping & Roadmap",
    description: "Clear project limits, timeline and key deliverables to ensure efficient development",
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
        title: "Resource Allocation",
        description: "Optimizing team and resource distribution"
      },
      {
        title: "Deliverable Mapping",
        description: "Defining clear, actionable project deliverables"
      }
    ]
  },
  {
    id: 4,
    icon: Shield,
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
    <div 
      className="flex items-center group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div
        className={`
          w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
          ${isActive 
            ? `bg-gradient-to-br ${step.gradient} shadow-lg scale-110` 
            : isCompleted
              ? 'bg-[#4285F4] opacity-50'
              : 'bg-border/30'
          }
        `}
      >
        <Icon className={`h-8 w-8 ${isActive || isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
      </div>
      <div className={`ml-4 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Step {step.id}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">{step.title}</h3>
      </div>
    </div>
  );
};

interface StepContentProps {
  step: RoadmapStep;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-lg text-muted-foreground mb-8">{step.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {step.features.map((feature, index) => (
            <Card key={index} className="border-[#4285F4]/10 bg-card/50 backdrop-blur-sm">
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              Our Development Roadmap
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A structured approach to turning your vision into reality, ensuring every step moves us closer to your successful MVP launch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12">
          {/* Step Indicators */}
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

          {/* Step Content */}
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