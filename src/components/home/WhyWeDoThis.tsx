//landing-page/src/components/home/WhyWeDoThis.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WhyWeDoThis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: "-100px" 
  });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="pt-24 pb-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 relative"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              Why We Do This
            </span>
          </motion.h2>
        </motion.div>

        {/* Bold Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
            We believe every bold idea deserves a chance.
          </h3>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Too many visionary founders struggle to bring their ideas to life, because they face 
              <span className="font-semibold text-foreground"> barriers that shouldn&apos;t exist</span>. 
              High costs due to unnecessary features and bad advice kill great concepts before they 
              even reach the market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              We&apos;ve seen it happen too many times. We know the frustration of having a groundbreaking 
              idea but being held back by unnecessary complexity. 
              <span className="font-semibold text-foreground"> That&apos;s why we&apos;re here—to break down these barriers.</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}