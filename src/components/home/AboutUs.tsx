//landing-page/src/components/home/AboutUs.tsx
'use client';

import { useRef } from 'react';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/providers/language-provider";

interface HexCoordinate {
  q: number;
  r: number;
}

interface Skill {
  nameKey: string;
  id: number;
  coordinate: HexCoordinate;
  isEmpty?: boolean;
}

interface Founder {
  nameKey: string;
  titleKey: string;
  missionKey: string;
  imagePath: string;
  skills: Skill[];
  achievementKey: string;
}

class HexagonGrid {
  private size: number;
  private width: number;
  private height: number;

  constructor(size: number) {
    this.size = size;
    this.width = Math.sqrt(3) * size;
    this.height = 2 * size;
  }

  pointyHexCorner(center: { x: number; y: number }, i: number): { x: number; y: number } {
    const angleDeg = 60 * i - 30;
    const angleRad = (Math.PI / 180) * angleDeg;
    return {
      x: center.x + this.size * Math.cos(angleRad),
      y: center.y + this.size * Math.sin(angleRad)
    };
  }

  hexToPixel(hex: HexCoordinate): { x: number; y: number } {
    const x = this.width * (hex.q + hex.r/2);
    const y = this.height * (3/4) * hex.r;
    return { x, y };
  }

  getHexPoints(center: { x: number; y: number }): string {
    return Array.from({ length: 6 }, (_, i) => {
      const corner = this.pointyHexCorner(center, i);
      return `${corner.x},${corner.y}`;
    }).join(' ');
  }
}

const getFounders = (): Founder[] => {
  return [
    {
      nameKey: "about.robin.name",
      titleKey: "about.robin.title",
      missionKey: "about.robin.mission",
      imagePath: "/robin.jpg",
      skills: [
        { id: 1, nameKey: "about.robin.skill1", coordinate: { q: 0, r: 0 } },
        { id: 2, nameKey: "about.robin.skill2", coordinate: { q: 2, r: -1 } },
        { id: 3, nameKey: "about.robin.skill3", coordinate: { q: 1, r: -2 } },
        { id: 4, nameKey: "about.robin.skill4", coordinate: { q: 3, r: 0 } },
        { id: 5, nameKey: "about.robin.skill5", coordinate: { q: 4, r: -1 } },
        { id: 6, nameKey: "", coordinate: { q: 1, r: -1 }, isEmpty: true },
        { id: 7, nameKey: "", coordinate: { q: 2, r: -2 }, isEmpty: true },
        { id: 8, nameKey: "", coordinate: { q: 3, r: -2 }, isEmpty: true },
        { id: 9, nameKey: "", coordinate: { q: 4, r: -2 }, isEmpty: true },
        { id: 10, nameKey: "", coordinate: { q: 5, r: -1 }, isEmpty: true }
      ],
      achievementKey: "about.robin.achievement",
    },
    {
      nameKey: "about.chris.name",
      titleKey: "about.chris.title",
      missionKey: "about.chris.mission",
      imagePath: "/chris1.jpg",
      skills: [
        { id: 1, nameKey: "about.chris.skill1", coordinate: { q: 0, r: 0 } },
        { id: 2, nameKey: "about.chris.skill2", coordinate: { q: 1, r: -1 } },
        { id: 3, nameKey: "about.chris.skill3", coordinate: { q: 3, r: -1 } },
        { id: 4, nameKey: "about.chris.skill4", coordinate: { q: 2, r: -2 } },
        { id: 5, nameKey: "about.chris.skill5", coordinate: { q: 4, r: -2 } },
        { id: 6, nameKey: "", coordinate: { q: 2, r: 0 }, isEmpty: true },
        { id: 7, nameKey: "", coordinate: { q: 3, r: 0 }, isEmpty: true },
        { id: 8, nameKey: "", coordinate: { q: 4, r: -1 }, isEmpty: true },
        { id: 9, nameKey: "", coordinate: { q: 1, r: -2 }, isEmpty: true },
        { id: 10, nameKey: "", coordinate: { q: 3, r: -2 }, isEmpty: true }
      ],
      achievementKey: "about.chris.achievement",
    }
  ];
};

const HexagonSkillGrid = ({ skills, isInView }: { skills: Skill[]; isInView: boolean }) => {
  const { t } = useLanguage();
  // Tamaño base para hexágonos, más grande para dispositivos móviles
  const baseSize = 50;
  // Usar un hexágono con el tamaño base
  const hexGrid = new HexagonGrid(baseSize);
  const offsetX = 100;
  const offsetY = 200;

  return (
    <div className="relative w-full h-80 md:h-60">
      <svg 
        viewBox="0 0 500 300" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#4285F4" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="hexFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2B63D9" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="hexHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2B63D9" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {skills.map((skill, index) => {
          const pos = hexGrid.hexToPixel(skill.coordinate);
          if (skill.isEmpty) {
            return (
              <motion.polygon
                key={skill.id}
                points={hexGrid.getHexPoints({ x: pos.x + offsetX, y: pos.y + offsetY })}
                className="fill-[#4285F4]/[0.02] stroke-[#4285F4]/10"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            );
          }
          return (
            <motion.g
              key={skill.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.polygon
                points={hexGrid.getHexPoints({ x: pos.x + offsetX, y: pos.y + offsetY })}
                className="fill-[url(#hexFill)] stroke-[#4285F4]/30 transition-colors duration-300 hover:fill-[url(#hexHover)]"
                strokeWidth="1.5"
                whileHover={{ 
                  scale: 1.05,
                  filter: 'url(#glow)',
                  transition: { duration: 0.2 }
                }}
              />

              <foreignObject
                x={pos.x + offsetX - 55}
                y={pos.y + offsetY - 30}
                width="110"
                height="60"
                className="pointer-events-none"
              >
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm md:text-xs font-medium text-foreground text-center px-2">
                    {skill.nameKey ? t(skill.nameKey) : ""}
                  </p>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

const FounderCard = ({ founder, index }: { founder: Founder; index: number }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.3, duration: 0.8 }}
    >
      <Card className="border-[#4285F4]/10 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-6 md:mb-8">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-[#4285F4]/10 mb-4 md:mb-6">
              <Image
                src={founder.imagePath}
                alt={`${t(founder.nameKey)}'s profile`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 96px"
                priority
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">{t(founder.nameKey)}</h3>
              <p className="text-base md:text-lg text-muted-foreground">{t(founder.titleKey)}</p>
              <p className="text-xs md:text-sm text-[#4285F4] font-medium">{t(founder.achievementKey)}</p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-center">
              <HexagonSkillGrid skills={founder.skills} isInView={isInView} />
            </div>

            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm font-semibold text-[#4285F4] tracking-wide text-center">
                {t('about.mission.title')}
              </h4>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center">{t(founder.missionKey)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AboutUs = () => {
  const { t } = useLanguage();
  const founders = getFounders();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-24 relative overflow-hidden" id="about">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              {t('about.title')}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          {founders.map((founder, index) => (
            <FounderCard key={founder.nameKey} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;