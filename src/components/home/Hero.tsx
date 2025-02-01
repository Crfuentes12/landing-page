"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useScroll } from "@/providers/scroll-provider";
import { useTheme } from "@/providers/theme-provider";

const stats = [
  { label: 'MVPs Built', value: '10+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'Years Experience', value: '12+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'Happy Clients', value: '50+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'Team Size', value: '2', accent: 'from-[#4285F4] to-[#2B63D9]' }
];

const typingTexts = [
  "The MVP You Need",
  "No More, No Less!",
  "Fast, Smart, Affordable",
  "Launch in Weeks"
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const { scrollToSection } = useScroll();
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);

    const text = typingTexts[typingIndex];
    let currentIndex = 0;
    let currentText = '';
    
    const typeText = () => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setTypingText(currentText);
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }, 2000);
      }
    };

    if (isTyping) {
      typeText();
    }
  }, [typingIndex, isTyping]);

  const handleGetEstimate = () => {
    scrollToSection('pricing');
  };

  const gradientOverlay = theme === 'dark' 
    ? 'from-background via-background/80 to-[#4285F4]/10'
    : 'from-background to-[#4285F4]/10';

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234285F4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientOverlay}`} />

      <div className="flex flex-col items-center justify-center h-full">
        {/* Main content section */}
        <div className={`relative space-y-6 max-w-4xl mx-auto transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="w-full max-w-3xl mx-auto bg-black/90 rounded-lg p-4 shadow-lg border border-[#4285F4]/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-left">
              <span className="text-[#4285F4]">$ mvp</span>
              <span className="text-white/70"> init --project</span>
              <div className="relative h-[4.5rem] md:h-[6rem] lg:h-[7rem] overflow-hidden">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-2 whitespace-pre-line absolute">
                  <span className="text-[#4285F4]">&gt;</span> {typingText}
                  <span className="inline-block w-3 h-8 md:h-12 lg:h-14 bg-[#4285F4] ml-1 animate-blink"></span>
                </h1>
              </div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From business idea to launch, we build only what matters—fast, smart, and affordable.
            We get it. You're not just any entrepreneur - you're the next big thing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              size="lg" 
              className="bg-[#4285F4] hover:bg-[#2B63D9] text-white group"
              onClick={handleGetEstimate}
            >
              Get your MVP estimate now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats section - Fixed position at bottom */}
        <div className="absolute bottom-24 left-0 right-0 w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`transform transition-all duration-700 delay-${index * 200} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ArrowDown className="h-6 w-6 text-[#4285F4]" />
      </button>
    </section>
  );
};

export default Hero;