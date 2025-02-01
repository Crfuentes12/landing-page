//landing-page/src/components/home/AboutUs.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Cpu } from "lucide-react";

const founders = [
  {
    name: "Robin",
    title: "Startup & Innovation Enthusiast",
    expertise: "Startup creation, business acceleration and strategic innovation",
    background: "Entrepreneur, startup advisor, and business thinker who knows how to balance product and market needs",
    mission: "Simplifying complex ideas into MVPs that just serve their purpose",
    icon: Rocket
  },
  {
    name: "Chris",
    title: "Developer & AI Master",
    expertise: "Scalable tech, lean-driven development and automation with AI agents",
    background: "Tech innovator with deep knowledge of AI, agents, and efficiency-driven development",
    mission: "Using AI to make MVPs faster, smarter, and more cost-effective",
    icon: Cpu
  }
];

const stats = [
  { value: "10+", label: "successful MVPs built" },
  { value: "12+", label: "years of experience" },
  { value: "∞", label: "startup accelerator expertise" }
];

const AboutUs = () => {
  return (
    <section className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We&apos;re Chris & Robin, two entrepreneurs, developers, and startup builders.
            We&apos;ve been exactly where you are right now, facing overpriced agencies,
            overcomplicated solutions and unnecessary roadblocks.
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4285F4]">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder) => {
            const Icon = founder.icon;
            return (
              <Card 
                key={founder.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-[#4285F4]/10"
              >
                <CardContent className="pt-6">
                  <div className="rounded-lg p-3 bg-[#4285F4]/5 w-fit mb-4 group-hover:bg-[#4285F4]/10 transition-colors">
                    <Icon className="h-6 w-6 text-[#4285F4]" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#4285F4]">{founder.name}</h3>
                      <p className="text-lg font-medium">{founder.title}</p>
                    </div>

                    <div className="bg-black/80 rounded-lg p-4">
                      <div className="flex gap-6">
                        {/* Profile Image Placeholder */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 rounded-lg bg-[#4285F4]/10 border-2 border-[#4285F4]/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src={founder.name === "Chris" ? "/chris.jpg" : "/robin.jpeg"}
                              alt={`${founder.name}'s profile`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                              priority
                            />
                          </div>
                        </div>

                        {/* Stats Section */}
                        <div className="flex-grow space-y-3">
                          <h4 className="text-sm font-mono text-[#4285F4] mb-4">SKILL STATS</h4>
                          {founder.name === "Robin" ? (
                            <>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Business Strategy</span>
                                  <span>95%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "95%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Innovation</span>
                                  <span>90%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "90%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Product Development</span>
                                  <span>85%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "85%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Market Analysis</span>
                                  <span>88%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "88%" }} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>AI Development</span>
                                  <span>92%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "92%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Tech Architecture</span>
                                  <span>88%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "88%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>Scalable Systems</span>
                                  <span>85%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "85%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-white/90">
                                  <span>MVP Development</span>
                                  <span>94%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#2B63D9] rounded-full" 
                                       style={{ width: "94%" }} />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#4285F4]">Mission</h4>
                      <p className="text-muted-foreground">{founder.mission}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-4">
            We&apos;re not just MVP-developers.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re problem-solvers, business thinkers and startup insiders.
            We believe in creating real value.
            If you have the vision, we have the roadmap to make it real!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;