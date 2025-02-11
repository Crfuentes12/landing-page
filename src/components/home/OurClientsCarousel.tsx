'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/providers/theme-provider';

type Logo = {
  id: number;
  src: string;
  alt: string;
};

const LOGOS: Logo[] = [
  { id: 1, src: '/logos/client1.png', alt: 'Client 1' },
  { id: 2, src: '/logos/client2.png', alt: 'Client 2' },
  { id: 3, src: '/logos/client3.png', alt: 'Client 3' },
  { id: 4, src: '/logos/client4.png', alt: 'Client 4' },
  { id: 5, src: '/logos/client5.png', alt: 'Client 5' },
  { id: 6, src: '/logos/client6.png', alt: 'Client 6' },
];

const OurClientsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window?.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 3) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Create a triple-length array of logos for seamless scrolling
  const extendedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  const gradientStyle = {
    background: isDark 
      ? 'linear-gradient(to right, hsl(var(--background)), transparent)' 
      : 'linear-gradient(to right, hsl(var(--background)), transparent)'
  };

  const reversedGradientStyle = {
    background: isDark 
      ? 'linear-gradient(to left, hsl(var(--background)), transparent)' 
      : 'linear-gradient(to left, hsl(var(--background)), transparent)'
  };

  return (
    <section className="relative w-full overflow-hidden bg-background py-12">
      {/* Left fade gradient */}
      <div 
        className="absolute left-0 top-0 z-10 h-full w-32"
        style={gradientStyle}
        aria-hidden="true"
      />

      {/* Right fade gradient */}
      <div 
        className="absolute right-0 top-0 z-10 h-full w-32"
        style={reversedGradientStyle}
        aria-hidden="true"
      />

      {/* Scrolling container */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          pointerEvents: 'none'
        }}
        role="region"
        aria-label="Our Clients Carousel"
      >
        <div className="flex min-w-full gap-16 px-8">
          {extendedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="relative h-24 w-48 flex-shrink-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="192px"
                className={`
                  object-contain transition-all duration-300
                  ${isDark ? [
                    'brightness-0 invert opacity-70',
                    'filter-gpu transform-gpu'
                  ].join(' ') : [
                    'opacity-80',
                    'transform-gpu'
                  ].join(' ')}
                `}
                priority={index < 6}
                loading={index < 6 ? 'eager' : 'lazy'}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClientsCarousel;