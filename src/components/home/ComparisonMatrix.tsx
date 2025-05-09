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
import { XIcon, Check, CircleIcon } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

interface ComparisonItem {
  criteriaKey: string;
  gradient: string;
  ourService: {
    icon: 'check' | 'circle' | 'x';
    descriptionKey: string;
  };
  traditional: {
    icon: 'check' | 'circle' | 'x';
    descriptionKey: string;
  };
}

const getComparisonData = (): ComparisonItem[] => {
  return [
    {
      criteriaKey: "comparison.strategic.title",
      gradient: "from-blue-500/20 to-purple-500/20",
      ourService: {
        icon: 'check',
        descriptionKey: "comparison.strategic.our"
      },
      traditional: {
        icon: 'circle',
        descriptionKey: "comparison.strategic.traditional"
      }
    },
    {
      criteriaKey: "comparison.cost.title",
      gradient: "from-amber-500/20 to-yellow-500/20",
      ourService: {
        icon: 'check',
        descriptionKey: "comparison.cost.our"
      },
      traditional: {
        icon: 'circle',
        descriptionKey: "comparison.cost.traditional"
      }
    },
    {
      criteriaKey: "comparison.agility.title",
      gradient: "from-orange-500/20 to-red-500/20",
      ourService: {
        icon: 'check',
        descriptionKey: "comparison.agility.our"
      },
      traditional: {
        icon: 'circle',
        descriptionKey: "comparison.agility.traditional"
      }
    },
    {
      criteriaKey: "comparison.expertise.title",
      gradient: "from-emerald-500/20 to-teal-500/20",
      ourService: {
        icon: 'check',
        descriptionKey: "comparison.expertise.our"
      },
      traditional: {
        icon: 'circle',
        descriptionKey: "comparison.expertise.traditional"
      }
    },
    {
      criteriaKey: "comparison.scalability.title",
      gradient: "from-pink-500/20 to-rose-500/20",
      ourService: {
        icon: 'check',
        descriptionKey: "comparison.scalability.our"
      },
      traditional: {
        icon: 'x',
        descriptionKey: "comparison.scalability.traditional"
      }
    }
  ];
};

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
      className={`w-5 h-5 sm:w-6 sm:h-6 ${colors[type]}`}
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
  const { t } = useLanguage();
  const serviceTypes = ['ourService', 'traditional'] as const;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <td className="py-3 sm:py-4 px-2 sm:px-4 min-w-[100px] sm:min-w-0">
        <span className="font-medium text-sm sm:text-base text-primary/80">{t(item.criteriaKey)}</span>
      </td>
      
      {serviceTypes.map((service, idx) => (
        <td key={service} className={`relative ${idx === 0 ? 'bg-primary/5' : ''}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full h-full">
                <div className="py-3 sm:py-4 px-1 sm:px-3 h-full flex items-center justify-center">
                  <ServiceIcon 
                    type={item[service].icon}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[180px] sm:max-w-xs p-2 sm:p-3">
                <p className="text-xs sm:text-sm">{t(item[service].descriptionKey)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </td>
      ))}
    </motion.tr>
  );
};

const ComparisonMatrix = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const comparisonData = getComparisonData();

  return (
    <section className="py-8 sm:py-16 relative overflow-hidden" ref={sectionRef}>
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,rgba(66,133,244,0.1),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            {t('comparison.title')}
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('comparison.description')}
            <span className="block mt-2 text-xs italic">{t('comparison.hover')}</span>
          </p>
        </motion.div>

        <Card className="border-primary/20 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[280px]"> {/* Reduced minimum width for better mobile fit */}
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold text-muted-foreground w-1/3">
                      {t('comparison.criteria')}
                    </th>
                    <th className="py-3 sm:py-4 px-1 sm:px-3 w-1/3 relative bg-primary/5">
                      <div className="relative font-semibold text-primary text-center text-xs sm:text-base">
                        {t('comparison.our.service')}
                      </div>
                    </th>
                    <th className="py-3 sm:py-4 px-1 sm:px-3 font-semibold text-muted-foreground w-1/3 text-center text-xs sm:text-base">
                      {t('comparison.traditional')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <ComparisonRow
                      key={item.criteriaKey}
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