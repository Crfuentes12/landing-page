//landing-page/src/components/home/Hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useScroll } from "@/providers/scroll-provider";
import HeroChat from './HeroChat';

interface Stat {
  label: string;
  value: string;
  accent: string;
}

const stats: Stat[] = [
  { label: 'MVPs builded', value: '10+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'Years of Experience', value: '8+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'happy clients', value: '15+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'Team size', value: '2', accent: 'from-[#4285F4] to-[#2B63D9]' }
];

const Hero = () => {
  const { scrollToSection } = useScroll();

  return (
    <section className="relative min-h-screen flex flex-col justify-start md:justify-center items-center px-4 md:px-6 pt-16 md:pt-0 pb-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-px">
          {Array.from({ length: 72 }).map((_, i) => (
            <div 
              key={i}
              className="bg-[#4285F4] transition-opacity duration-1000"
              style={{
                opacity: Math.random() * 0.9,
                transitionDelay: `${Math.random() * 2000}ms`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left side - Main content */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-[#4285F4]">Fast. Smart.</span>
              <span>Your MVP Done Right.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Launch your Software MVP in 6 weeks and save 30% of development costs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-[#4285F4] hover:bg-[#2B63D9] text-white group transition-all duration-300 text-base md:text-lg py-4 md:py-6 w-full sm:w-auto"
              onClick={() => scrollToSection('pricing')}
            >
              Get Your Price Estimation
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10 transition-all duration-300 text-base md:text-lg py-4 md:py-6 w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </div>

          {/* Stats in a single row with horizontal scroll on mobile */}
          <div className="w-full overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-4 md:gap-8 min-w-max md:min-w-0 md:justify-between">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center flex-1">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1 whitespace-nowrap">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Chat simulation with fixed height */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="h-[450px] md:h-[500px]"> {/* Fixed height container */}
            <HeroChat />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={() => scrollToSection('why-we-do-this')}
        className="absolute bottom-6 md:bottom-10 animate-bounce z-10 transform transition-transform duration-800 hover:scale-110"
        aria-label="Scroll to Our Mission section"
      >
        <ArrowDown className="h-6 w-6 md:h-8 md:w-8 text-[#4285F4]" />
      </button>

      {/* Custom animations styles */}
      <style jsx global>{`
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;