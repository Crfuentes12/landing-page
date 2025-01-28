// src/components/home/WhyUs.tsx
"use client";

import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Award, Clock, Users, Shield, Zap, HeartHandshake } from "lucide-react";

interface ReasonProps {
  icon: typeof Award;
  title: string;
  description: string;
}

const reasons: ReasonProps[] = [
  {
    icon: Award,
    title: "Industry Excellence",
    description: "Award-winning solutions backed by years of experience and expertise in digital transformation."
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality. We understand time is crucial for your business."
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "A team of passionate experts committed to your success, available 24/7 for support."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security measures to protect your data and ensure compliance."
  },
  {
    icon: Zap,
    title: "Cutting-edge Tech",
    description: "Latest technologies and best practices to keep you ahead of the competition."
  },
  {
    icon: HeartHandshake,
    title: "Client Success",
    description: "Your success is our success. We're invested in long-term partnerships."
  }
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    ref: sectionRef,
    options: { threshold: 0.1 }
  });

  return (
    <section className="py-20 px-6 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine industry expertise with cutting-edge technology to deliver 
            exceptional results for our clients.
          </p>
        </div>

        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={reason.title}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="rounded-lg p-3 bg-primary/5 w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: '500+' },
              { label: 'Happy Clients', value: '200+' },
              { label: 'Team Members', value: '50+' },
              { label: 'Years Experience', value: '10+' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;