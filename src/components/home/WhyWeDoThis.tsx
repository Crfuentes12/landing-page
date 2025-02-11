//landing-page/src/components/home/WhyWeDoThis.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Target, Zap, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  isInView: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay, 
  isInView 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-[#4285F4]/10">
        <CardContent className="p-8">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} 
            flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 group-hover:text-[#4285F4] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const features = [
  {
    icon: Target,
    title: "Vision First Approach",
    description: "We understand that every great product starts with a visionary idea. Our focus is on preserving your vision while making it market-ready.",
    gradient: "from-[#4285F4] to-[#2B63D9]"
  },
  {
    icon: Zap,
    title: "Efficient Development",
    description: "No unnecessary complexity. We build exactly what you need to validate your idea and enter the market confidently.",
    gradient: "from-[#34A853] to-[#2E7D32]"
  },
  {
    icon: Shield,
    title: "Future-Proof Foundation",
    description: "While we focus on MVP essentials, we ensure your foundation is solid and scalable for future growth.",
    gradient: "from-[#EA4335] to-[#C62828]"
  }
];

export default function WhyWeDoThis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const highlightVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
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
        style={{ opacity, y }}
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
              <span className="font-semibold text-foreground"> barriers that shouldn't exist</span>. 
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
              <span className="font-semibold text-foreground"> That's why we&apos;re here—to break down these barriers.</span>
            </p>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={0.8 + index * 0.2}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] blur-3xl -z-10"
        />
      </motion.div>
    </section>
  );
}