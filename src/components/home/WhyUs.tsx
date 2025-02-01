// src/components/home/WhyUs.tsx
"use client";

import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Rocket, Zap, Target, ArrowRight, Clock, Shield, Sparkles } from "lucide-react";

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    ref: sectionRef,
    options: { threshold: 0.1 },
    freezeOnceVisible: true
  });

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-accent/5">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234285F4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="relative z-10">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9] mb-6">
              Why We Do This
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              We believe every bold idea deserves a chance.
            </p>
          </div>

          {/* Core Message */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div 
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Card className="h-full bg-black/80 border-[#4285F4]/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-6">The Problem We&apos;re Solving</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Too many visionary founders struggle to bring their ideas to life, because they face barriers that shouldn&apos;t exist. High costs due to unnecessary features and bad advice kill great concepts before they even reach the market.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/70">
                      <ArrowRight className="h-5 w-5 text-[#4285F4]" />
                      <span>Overpriced agencies</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <ArrowRight className="h-5 w-5 text-[#4285F4]" />
                      <span>Overcomplicated solutions</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <ArrowRight className="h-5 w-5 text-[#4285F4]" />
                      <span>Unnecessary roadblocks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div 
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Card className="h-full bg-[#4285F4] border-none">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Our Solution</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    We break down these barriers by making personalized MVP development simple, smart, and accessible. We understand businesses and build solutions that make sense.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="h-5 w-5" />
                      <span>Focus on what truly matters</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="h-5 w-5" />
                      <span>Make MVPs accessible</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="h-5 w-5" />
                      <span>Combine tech, AI, and startup expertise</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Process Steps */}
          <div 
            ref={sectionRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              {
                icon: Target,
                title: "Idea Analysis",
                description: "We dive into your vision to understand your needs"
              },
              {
                icon: Zap,
                title: "Smart Consultancy",
                description: "We trim the excess and focus on what truly matters"
              },
              {
                icon: Clock,
                title: "Scoping & Roadmap",
                description: "Clear project limits, timeline and key deliverables"
              },
              {
                icon: Shield,
                title: "Development",
                description: "Transparent progress with close collaboration"
              },
              {
                icon: Rocket,
                title: "Launch & Support",
                description: "Your MVP, ready to hit the market with ongoing support"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`transform transition-all duration-500 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-[#4285F4]/10">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#2B63D9] flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
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

export default WhyUs;