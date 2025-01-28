//landing-page/src/components/home/Hero.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useScroll } from "@/providers/scroll-provider";
import { useTheme } from "@/providers/theme-provider";

const stats = [
  { label: 'Happy Clients', value: '500+', accent: 'from-blue-500 to-purple-500' },
  { label: 'Projects Completed', value: '1000+', accent: 'from-green-500 to-emerald-500' },
  { label: 'Team Members', value: '50+', accent: 'from-orange-500 to-red-500' },
  { label: 'Years Experience', value: '10+', accent: 'from-pink-500 to-rose-500' }
];

const typingTexts = [
  "Transform Your Digital Presence",
  "Build Amazing Experiences",
  "Scale Your Business",
  "Innovate with Technology"
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

  const handleLearnMore = () => {
    scrollToSection('about');
  };

  const gradientOverlay = theme === 'dark' 
    ? 'from-background via-background/80 to-accent/20'
    : 'from-background to-accent/20';

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientOverlay}`} />

      <div className={`relative space-y-6 max-w-4xl mx-auto transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {typingText}
          <span className="animate-blink">|</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert digital solutions tailored for your business growth. We help ambitious companies 
          scale through innovative technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
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

      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </button>
    </section>
  );
};

export default Hero;