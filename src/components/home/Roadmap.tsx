//landing-page/src/components/home/Roadmap.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LightbulbIcon, Code2Icon, RocketIcon } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Idea Analysis & Smart Consultancy",
    description: "We dive deep into your vision and trim the excess to focus on what truly matters.",
    icon: LightbulbIcon,
    details: [
      "Understanding your business vision",
      "Identifying core features",
      "Market analysis",
      "Technical feasibility assessment"
    ]
  },
  {
    id: 2,
    title: "Development & Collaboration",
    description: "Weekly meetings ensure transparent progress and close collaboration throughout the build.",
    icon: Code2Icon,
    details: [
      "Clear project scope",
      "Defined timeline",
      "Key deliverables",
      "Weekly progress updates"
    ]
  },
  {
    id: 3,
    title: "Launch & Beyond",
    description: "Your MVP hits the market with our continued support for scaling success.",
    icon: RocketIcon,
    details: [
      "Pre-launch testing",
      "Market deployment",
      "Performance monitoring",
      "Growth support options"
    ]
  }
];

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const pauseDuration = 8000; // Duration to pause when user interacts (8 seconds)
  const pauseTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const startAutoPlay = () => {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev % 3) + 1);
      }, 5000);
    };

    if (!isPaused) {
      startAutoPlay();
    }

    return () => {
      if (interval) clearInterval(interval);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [isPaused]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, pauseDuration);
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }),
    // Add a default key for type safety
    initial: {},
    animate: {},
  };

  const CurrentIcon = roadmapSteps[activeStep - 1].icon;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] to-[#2B63D9] bg-clip-text text-transparent">
            How We Make It Happen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A clear path from vision to reality, focusing only on what truly matters.
          </p>
        </div>

        <div className="relative">
          {/* Step Indicators */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute h-1 bg-border top-1/2 left-0 right-0 -translate-y-1/2 z-0" />
            <div className="absolute h-1 bg-[#4285F4] top-1/2 left-0 -translate-y-1/2 z-1 transition-all duration-500"
              style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
            />
            
            {roadmapSteps.map((step) => (
              <Button
                key={step.id}
                variant="ghost"
                className={`relative z-10 h-16 w-16 rounded-full border-2 p-0 transition-all duration-300 ${
                  step.id === activeStep
                    ? 'border-[#4285F4] bg-white dark:bg-background'
                    : step.id < activeStep
                    ? 'border-[#4285F4] bg-white dark:bg-background'
                    : 'border-border bg-white dark:bg-background'
                }`}
                onClick={() => {
                  setActiveStep(step.id);
                  handleInteraction();
                }}
              >
                {step.id < activeStep ? (
                  <CheckCircle2 className="h-6 w-6 text-[#4285F4]" />
                ) : (
                  <step.icon className={`h-6 w-6 ${
                    step.id === activeStep ? 'text-[#4285F4]' : 'text-muted-foreground'
                  }`} />
                )}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence initial={false} custom={activeStep}>
              <motion.div
                key={activeStep}
                custom={activeStep}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
                onHoverStart={handleInteraction}
              >
                <Card className="p-8 bg-gradient-to-br from-background to-background/80 border border-[#4285F4]/20">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] to-[#2B63D9] bg-clip-text text-transparent">
                        {roadmapSteps[activeStep - 1].title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {roadmapSteps[activeStep - 1].description}
                      </p>
                      <ul className="space-y-4">
                        {roadmapSteps[activeStep - 1].details.map((detail, index) => (
                          <motion.li
                            key={detail}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-2 w-2 rounded-full bg-[#4285F4]" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CurrentIcon className="h-48 w-48 text-[#4285F4] opacity-20" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setActiveStep((prev) => (prev === 1 ? 3 : prev - 1));
                handleInteraction();
              }}
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10"
            >
              Previous Step
            </Button>
            <Button
              onClick={() => {
                setActiveStep((prev) => (prev % 3) + 1);
                handleInteraction();
              }}
              className="bg-[#4285F4] hover:bg-[#2B63D9] text-white"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;