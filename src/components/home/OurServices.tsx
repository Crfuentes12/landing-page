//landing-page/src/components/home/OurServices.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Code, Globe, Megaphone, BarChart, Smartphone, Database } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and best practices.",
    features: ["React & Next.js", "Performance Optimization", "Responsive Design"]
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Improve your visibility and ranking in search engine results.",
    features: ["Keyword Research", "Technical SEO", "Content Strategy"]
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Reach your target audience through effective digital marketing strategies.",
    features: ["Social Media", "Email Marketing", "PPC Campaigns"]
  },
  {
    icon: BarChart,
    title: "Analytics & Insights",
    description: "Data-driven decisions with comprehensive analytics and reporting.",
    features: ["Custom Dashboards", "User Behavior", "Conversion Tracking"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["React Native", "Native APIs", "App Store Optimization"]
  },
  {
    icon: Database,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions.",
    features: ["AWS & Azure", "Docker", "CI/CD Pipeline"]
  }
];

const OurServices = () => {
  return (
    <section className="py-20 px-6 bg-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the modern world.
            From development to marketing, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service,) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="rounded-lg p-3 bg-primary/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;