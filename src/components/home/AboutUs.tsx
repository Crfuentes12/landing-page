//landing-page/src/components/home/AboutUs.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Modern Technology",
    description: "We use cutting-edge technology to build scalable solutions that grow with your business."
  },
  {
    icon: Shield,
    title: "Secure By Design",
    description: "Security is built into every layer of our development process, ensuring your data stays protected."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Performance is key. We optimize every solution to deliver the fastest possible experience."
  },
  {
    icon: Users,
    title: "Team of Experts",
    description: "Our experienced team brings diverse skills and deep expertise to every project."
  }
];

const AboutUs = () => {
  return (
    <section className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a team of passionate professionals dedicated to delivering cutting-edge digital solutions
            that help businesses thrive in the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="rounded-lg p-3 bg-primary/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;