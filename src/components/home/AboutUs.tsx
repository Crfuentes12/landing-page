//landing-page/src/components/home/AboutUs.tsx
'use client';

import { useRef } from 'react';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

interface Skill {
  name: string;
  value: number;
}

interface SocialLink {
  icon: React.ElementType;
  url: string;
  label: string;
}

interface Founder {
  name: string;
  title: string;
  mission: string;
  imagePath: string;
  skills: Skill[];
  keyAchievement: string;
  socialLinks: SocialLink[];
}

const founders: Founder[] = [
  {
    name: "Robin",
    title: "Startup & Innovation Lead",
    mission: "Transforming complex ideas into focused, market-ready MVPs",
    imagePath: "/robin.jpeg",
    skills: [
      { name: "Business Strategy", value: 95 },
      { name: "Product Development", value: 90 },
      { name: "Market Analysis", value: 88 }
    ],
    keyAchievement: "10+ Successful MVPs launched",
    socialLinks: [
      { icon: Github, url: "#", label: "GitHub" },
      { icon: Linkedin, url: "#", label: "LinkedIn" },
      { icon: Twitter, url: "#", label: "Twitter" }
    ]
  },
  {
    name: "Chris",
    title: "Tech Architecture & AI Lead",
    mission: "Building scalable foundations for tomorrow's innovations",
    imagePath: "/chris.jpg",
    skills: [
      { name: "System Architecture", value: 92 },
      { name: "AI Development", value: 88 },
      { name: "MVP Engineering", value: 94 }
    ],
    keyAchievement: "12+ Years of Tech Experience",
    socialLinks: [
      { icon: Github, url: "#", label: "GitHub" },
      { icon: Linkedin, url: "#", label: "LinkedIn" },
      { icon: Globe, url: "#", label: "Portfolio" }
    ]
  }
];

const SkillBar = ({ skill, delay, isInView }: { skill: Skill; delay: number; isInView: boolean }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-muted-foreground">{skill.value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
          transition={{ delay, duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-primary relative"
        />
      </div>
    </div>
  );
};

const FounderCard = ({ founder, index }: { founder: Founder; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.3, duration: 0.8 }}
    >
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{founder.name}</h3>
              <p className="text-lg text-muted-foreground">{founder.title}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl bg-card p-6 border border-border">
              <div className="flex gap-6 items-start">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={founder.imagePath}
                    alt={`${founder.name}'s profile`}
                    fill
                    className="object-cover"
                    sizes="96px"
                    priority
                  />
                </div>
                <div className="flex-grow space-y-4">
                  <h4 className="text-sm font-semibold text-primary tracking-wide">
                    KEY ACHIEVEMENT
                  </h4>
                  <p className="text-foreground font-medium">
                    {founder.keyAchievement}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-primary tracking-wide">
                EXPERTISE
              </h4>
              <div className="space-y-4">
                {founder.skills.map((skill, idx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={index * 0.2 + idx * 0.1}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-primary tracking-wide">
                MISSION
              </h4>
              <p className="text-muted-foreground leading-relaxed">{founder.mission}</p>
            </div>

            <div className="flex justify-center gap-4">
              {founder.socialLinks.map((link) => {
                const SocialIcon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <SocialIcon className="h-5 w-5 text-secondary-foreground" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" id="about">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Who We Are
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We combine deep technical expertise with startup experience to transform your vision into reality. Our focus is on building MVPs that matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;