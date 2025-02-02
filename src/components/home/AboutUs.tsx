//landing-page/src/components/home/AboutUs.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Cpu } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

const stats = [
  { value: "10+", labelKey: "about.stats.mvps" },
  { value: "12+", labelKey: "about.stats.experience" },
  { value: "∞", labelKey: "about.stats.expertise" }
];

const AboutUs = () => {
  const { t } = useLanguage();

  const founders = [
    {
      nameKey: "about.founders.robin.name",
      titleKey: "about.founders.robin.title",
      missionKey: "about.founders.robin.mission",
      icon: Rocket,
      skills: [
        { nameKey: "about.founders.robin.skill.business", value: 95 },
        { nameKey: "about.founders.robin.skill.innovation", value: 90 },
        { nameKey: "about.founders.robin.skill.product", value: 85 },
        { nameKey: "about.founders.robin.skill.market", value: 88 }
      ]
    },
    {
      nameKey: "about.founders.chris.name",
      titleKey: "about.founders.chris.title",
      missionKey: "about.founders.chris.mission",
      icon: Cpu,
      skills: [
        { nameKey: "about.founders.chris.skill.ai", value: 92 },
        { nameKey: "about.founders.chris.skill.architecture", value: 88 },
        { nameKey: "about.founders.chris.skill.systems", value: 85 },
        { nameKey: "about.founders.chris.skill.mvp", value: 94 }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4285F4]">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder) => {
            const Icon = founder.icon;
            const founderName = t(founder.nameKey);
            
            return (
              <Card 
                key={founderName}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-[#4285F4]/10"
              >
                <CardContent className="pt-6">
                  <div className="rounded-lg p-3 bg-[#4285F4]/5 w-fit mb-4 group-hover:bg-[#4285F4]/10 transition-colors">
                    <Icon className="h-6 w-6 text-[#4285F4]" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#4285F4]">{founderName}</h3>
                      <p className="text-lg font-medium">{t(founder.titleKey)}</p>
                    </div>

                    <div className="bg-black/80 rounded-lg p-4">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 rounded-lg bg-[#4285F4]/10 border-2 border-[#4285F4]/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src={founderName === "Chris" ? "/chris.jpg" : "/robin.jpeg"}
                              alt={`${founderName}'s profile`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                              priority
                            />
                          </div>
                        </div>

                        <div className="flex-grow space-y-3">
                          <h4 className="text-sm font-mono text-[#4285F4] mb-4">{t('about.skills.title')}</h4>
                          {founder.skills.map((skill) => (
                            <div key={skill.nameKey} className="space-y-1">
                              <div className="flex justify-between text-xs text-white/90">
                                <span>{t(skill.nameKey)}</span>
                                <span>{skill.value}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                  style={{ width: `${skill.value}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#4285F4]">Mission</h4>
                      <p className="text-muted-foreground">{t(founder.missionKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-4">
            {t('about.footer.title')}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('about.footer.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;