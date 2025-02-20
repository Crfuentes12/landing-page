//landing-page/src/components/home/ComparisonMatrix.tsx
"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { XIcon, Check, Sparkles, CircleIcon } from "lucide-react";

interface ComparisonItem {
  criteria: string;
  gradient: string;
  ourService: {
    icon: 'check' | 'circle' | 'x';
    description: string;
  };
  traditional: {
    icon: 'check' | 'circle' | 'x';
    description: string;
  };
  noCode: {
    icon: 'check' | 'circle' | 'x';
    description: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    criteria: "Strategic Planning",
    gradient: "from-blue-500/20 to-purple-500/20",
    ourService: {
      icon: 'check',
      description: "Comprehensive strategic planning with focus on key business objectives"
    },
    traditional: {
      icon: 'circle',
      description: "Standard project planning approach"
    },
    noCode: {
      icon: 'circle',
      description: "Basic planning capabilities"
    }
  },
  {
    criteria: "Cost Efficiency",
    gradient: "from-amber-500/20 to-yellow-500/20",
    ourService: {
      icon: 'check',
      description: "Optimized pricing structure with maximum value delivery"
    },
    traditional: {
      icon: 'circle',
      description: "Traditional pricing models with overhead"
    },
    noCode: {
      icon: 'circle',
      description: "Subscription-based pricing with limitations"
    }
  },
  {
    criteria: "Development Agility",
    gradient: "from-orange-500/20 to-red-500/20",
    ourService: {
      icon: 'check',
      description: "Rapid, flexible development with continuous adaptation"
    },
    traditional: {
      icon: 'circle',
      description: "Structured but slower development process"
    },
    noCode: {
      icon: 'x',
      description: "Limited development capabilities"
    }
  },
  {
    criteria: "Technical Expertise",
    gradient: "from-emerald-500/20 to-teal-500/20",
    ourService: {
      icon: 'check',
      description: "Cutting-edge technical solutions with AI integration"
    },
    traditional: {
      icon: 'circle',
      description: "Strong technical capabilities but higher costs"
    },
    noCode: {
      icon: 'x',
      description: "Restricted to platform capabilities"
    }
  },
  {
    criteria: "Scalability",
    gradient: "from-pink-500/20 to-rose-500/20",
    ourService: {
      icon: 'check',
      description: "Built for growth with future-proof architecture"
    },
    traditional: {
      icon: 'x',
      description: "Complex and costly scaling process"
    },
    noCode: {
      icon: 'x',
      description: "Platform limitations affect scalability"
    }
  }
];

const ServiceIcon = ({ type }: { type: 'check' | 'circle' | 'x' }) => {
  const icons = {
    check: Check,
    circle: CircleIcon,
    x: XIcon
  };
  
  const colors = {
    check: "text-emerald-500",
    circle: "text-gray-300",
    x: "text-gray-300"
  };
  
  const Icon = icons[type];
  
  return (
    <Icon 
      className={`w-6 h-6 sm:w-8 sm:h-8 ${colors[type]}`}
      strokeWidth={2}
    />
  );
};

const ComparisonRow = ({ 
  item, 
  index,
  isInView
}: { 
  item: ComparisonItem; 
  index: number;
  isInView: boolean;
}) => {
  const serviceTypes = ['ourService', 'traditional', 'noCode'] as const;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <td className="py-4 sm:py-6 px-3 sm:px-6 min-w-[120px] sm:min-w-0">
        <span className="font-medium text-base sm:text-lg text-primary/80">{item.criteria}</span>
      </td>
      
      {serviceTypes.map((service, idx) => (
        <td key={service} className={`relative ${idx === 0 ? 'bg-primary/5' : ''}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full h-full">
                <div className="py-4 sm:py-6 px-2 sm:px-4 h-full flex items-center justify-center">
                  <ServiceIcon 
                    type={item[service].icon}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px] sm:max-w-xs p-3">
                <p className="text-sm">{item[service].description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </td>
      ))}
    </motion.tr>
  );
};

const ComparisonMatrix = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-12 sm:py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,rgba(66,133,244,0.1),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Choose Your Perfect Fit
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare approaches and find the best solution for your MVP development needs.
            <span className="block mt-2 text-xs sm:text-sm italic">Hover over any icon for a deeper explanation</span>
          </p>
        </motion.div>

        <Card className="border-primary/20 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]"> {/* Minimum width to prevent squishing */}
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="py-4 sm:py-6 px-3 sm:px-6 text-left font-semibold text-muted-foreground w-1/4">
                      Criteria
                    </th>
                    <th className="py-4 sm:py-6 px-2 sm:px-4 w-1/4 relative bg-primary/5">
                      <div className="relative font-semibold text-primary flex items-center justify-center gap-2 text-sm sm:text-base">
                        Our MVP Service
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                    </th>
                    <th className="py-4 sm:py-6 px-2 sm:px-4 font-semibold text-muted-foreground w-1/4 text-sm sm:text-base">
                      Traditional Agency
                    </th>
                    <th className="py-4 sm:py-6 px-2 sm:px-4 font-semibold text-muted-foreground w-1/4 text-sm sm:text-base">
                      No-Code Tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <ComparisonRow
                      key={item.criteria}
                      item={item}
                      index={index}
                      isInView={isInView}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonMatrix;