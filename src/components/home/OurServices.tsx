// src/components/home/OurServices.tsx
"use client";

import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { 
  Target, 
  Zap, 
  Clock, 
  Shield, 
  Rocket,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

const services = [
  {
    icon: Target,
    title: "services.idea.title",
    description: "services.idea.description",
    gradient: "from-[#4285F4] to-[#2B63D9]"
  },
  {
    icon: Zap,
    title: "services.consultancy.title",
    description: "services.consultancy.description",
    gradient: "from-[#34A853] to-[#2E7D32]"
  },
  {
    icon: Clock,
    title: "services.scoping.title",
    description: "services.scoping.description",
    gradient: "from-[#FBBC05] to-[#F57C00]"
  },
  {
    icon: Shield,
    title: "services.development.title",
    description: "services.development.description",
    gradient: "from-[#EA4335] to-[#C62828]"
  },
  {
    icon: Rocket,
    title: "services.launch.title",
    description: "services.launch.description",
    gradient: "from-[#9C27B0] to-[#6A1B9A]"
  },
  {
    icon: Brain,
    title: "services.ai.title",
    description: "services.ai.description",
    gradient: "from-[#00BCD4] to-[#0097A7]"
  }
];

const OurServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isVisible = useIntersectionObserver({
    ref: sectionRef,
    options: { threshold: 0.1 },
    freezeOnceVisible: true
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-[#4285F4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
                {t('services.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div 
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`transform transition-all duration-500 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-[#4285F4]/10">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-[#4285F4] transition-colors duration-300">
                        {t(service.title)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(service.description)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;