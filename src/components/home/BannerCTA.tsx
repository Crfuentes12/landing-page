// src/components/home/BannerCTA.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";

const BannerCTA = () => {
  const { t } = useLanguage();
  const bannerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { 
    currentTarget: { 
      getBoundingClientRect: () => DOMRect;
    }; 
    clientX: number; 
    clientY: number; 
  }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('#contact');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={bannerRef}
      className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-primary/90">
            {t('banner.title')}
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('banner.description')}
          </p>

          {/* CTA Button */}
          <Button 
            onClick={scrollToCTA}
            size="lg" 
            className="group relative px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              {t('banner.button')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent transform -translate-x-16 -translate-y-16 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent transform translate-x-16 translate-y-16 rounded-full blur-2xl" />
    </div>
  );
};

export default BannerCTA;