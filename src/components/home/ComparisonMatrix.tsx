//landing-page/src/components/home/ComparisonMatrix.tsx
"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { XIcon, AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface ComparisonItem {
  criteria: string;
  ourService: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
    summary?: string;
  };
  noCode: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
    summary?: string;
  };
  traditional: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
    summary?: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    criteria: "Speed & Focus",
    ourService: {
      status: 'positive',
      text: "Weeks to MVP, strictly essential scope",
      summary: "Fast & focused"
    },
    noCode: {
      status: 'warning',
      text: "Quick launch but limited features",
      summary: "Quick but limited"
    },
    traditional: {
      status: 'negative',
      text: "Slower due to big teams",
      summary: "Slow process"
    }
  },
  {
    criteria: "Cost & Payment",
    ourService: {
      status: 'positive',
      text: "Lean pricing, adapted to your needs",
      summary: "Flexible pricing"
    },
    noCode: {
      status: 'warning',
      text: "Subscription-based, minimal customization",
      summary: "Fixed subscriptions"
    },
    traditional: {
      status: 'negative',
      text: "High costs, less flexibility",
      summary: "High costs"
    }
  },
  {
    criteria: "Tech, AI & Scalability",
    ourService: {
      status: 'positive',
      text: "AI-driven, built to scale",
      summary: "AI-powered scaling"
    },
    noCode: {
      status: 'negative',
      text: "Restricted by platform limitations",
      summary: "Limited tech"
    },
    traditional: {
      status: 'warning',
      text: "Generally robust but expensive",
      summary: "Costly scaling"
    }
  },
  {
    criteria: "Business Understanding",
    ourService: {
      status: 'positive',
      text: "Deep startup expertise, lean approach",
      summary: "Startup experts"
    },
    noCode: {
      status: 'negative',
      text: "Minimal strategic support",
      summary: "Basic support"
    },
    traditional: {
      status: 'warning',
      text: "Only traditional business understanding",
      summary: "Traditional only"
    }
  },
  {
    criteria: "Ongoing Support",
    ourService: {
      status: 'positive',
      text: "Flexible post-launch support",
      summary: "Flexible support"
    },
    noCode: {
      status: 'negative',
      text: "Limited or pay-as-you-go",
      summary: "Limited help"
    },
    traditional: {
      status: 'warning',
      text: "Pricey maintenance packages",
      summary: "Expensive support"
    }
  }
];

const StatusIcon = ({ status }: { status: 'negative' | 'warning' | 'positive' }) => {
  const icons = {
    negative: XIcon,
    warning: AlertTriangle,
    positive: CheckCircle2
  };
  
  const colors = {
    negative: "text-red-500",
    warning: "text-amber-500",
    positive: "text-emerald-500"
  };

  const backgrounds = {
    negative: "bg-red-50",
    warning: "bg-amber-50",
    positive: "bg-emerald-50"
  };
  
  const Icon = icons[status];
  
  return (
    <div className={`rounded-full p-1.5 ${backgrounds[status]}`}>
      <Icon className={`w-4 h-4 ${colors[status]}`} />
    </div>
  );
};

const ComparisonRow = ({ 
  item, 
  index, 
  isInView,
  isMobile
}: { 
  item: ComparisonItem; 
  index: number;
  isInView: boolean;
  isMobile: boolean;
}) => {
  const serviceTypes = ['ourService', 'noCode', 'traditional'] as const;

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="mb-6 last:mb-0"
      >
        <div className="font-medium mb-2">{item.criteria}</div>
        <div className="space-y-3">
          {serviceTypes.map((service) => (
            <div 
              key={service}
              className={`flex items-center justify-between p-3 rounded-lg ${
                service === 'ourService' 
                  ? 'bg-primary/5 shadow-sm' 
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <StatusIcon status={item[service].status} />
                <span className={`text-sm ${
                  service === 'ourService' 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {item[service].summary}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="grid grid-cols-4 gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center">
        <span className="font-medium">{item.criteria}</span>
      </div>
      
      {serviceTypes.map((service) => (
        <div 
          key={service} 
          className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
            service === 'ourService' 
              ? 'bg-primary/5 hover:bg-primary/10 transform hover:scale-105' 
              : 'hover:bg-muted/50'
          }`}
        >
          <StatusIcon status={item[service].status} />
          <span className={`text-sm ${
            service === 'ourService' 
              ? 'text-primary font-medium' 
              : 'text-muted-foreground'
          }`}>
            {item[service].text}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

const ComparisonMatrix = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Choose Your Perfect Fit
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare approaches and find the best solution for your MVP development needs
          </p>
        </motion.div>

        <Card className="border-primary/20 bg-card/95 backdrop-blur-sm shadow-xl ring-1 ring-primary/10">
          <div className="p-6">
            {!isMobile && (
              <div className="grid grid-cols-4 gap-4 pb-6 mb-6 border-b border-primary/10">
                <div className="font-semibold text-muted-foreground">Criteria</div>
                <div className="relative">
                  <div className="font-semibold text-primary flex items-center gap-2">
                    Our MVP Service
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary/10 rounded-full blur-xl" />
                </div>
                <div className="font-semibold text-muted-foreground">No-Code Tools</div>
                <div className="font-semibold text-muted-foreground">Traditional Agency</div>
              </div>
            )}

            {isMobile && (
              <div className="flex justify-between items-center pb-6 mb-6 border-b border-primary/10">
                <div className="font-semibold text-primary flex items-center gap-2">
                  Compare Solutions
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
            )}

            <div className={isMobile ? "space-y-6" : "divide-y divide-border/50"}>
              {comparisonData.map((item, index) => (
                <ComparisonRow
                  key={item.criteria}
                  item={item}
                  index={index}
                  isInView={isInView}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonMatrix;