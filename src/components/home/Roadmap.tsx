//landing-page/src/components/home/Roadmap.tsx
import { Card } from "@/components/ui/card";

const roadmapSteps = [
  {
    phase: "Phase 1",
    title: "Discovery & Planning",
    description: "We begin with a thorough analysis of your needs and develop a comprehensive project plan.",
    items: [
      "Requirements gathering",
      "Technical assessment",
      "Architecture planning",
      "Timeline definition"
    ],
    status: "completed"
  },
  {
    phase: "Phase 2",
    title: "Design & Development",
    description: "Our team works on creating the perfect solution tailored to your needs.",
    items: [
      "UI/UX design",
      "Frontend development",
      "Backend implementation",
      "Quality assurance"
    ],
    status: "current"
  },
  {
    phase: "Phase 3",
    title: "Testing & Optimization",
    description: "Rigorous testing and optimization to ensure everything works perfectly.",
    items: [
      "Performance testing",
      "Security audits",
      "User acceptance testing",
      "Optimization"
    ],
    status: "upcoming"
  },
  {
    phase: "Phase 4",
    title: "Launch & Support",
    description: "Successful deployment and ongoing support to ensure continued success.",
    items: [
      "Deployment preparation",
      "Launch execution",
      "Monitoring setup",
      "Continuous support"
    ],
    status: "upcoming"
  }
];

const Roadmap = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Roadmap</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven process ensures successful project delivery through carefully planned phases.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {roadmapSteps.map((step, index) => (
              <div
                key={step.phase}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <Card className={`p-6 relative ${
                    step.status === 'completed' ? 'border-primary/50' :
                    step.status === 'current' ? 'border-primary shadow-lg' : ''
                  }`}>
                    <div className="absolute top-6 -left-3 h-6 w-6 rounded-full bg-background border-2 border-primary hidden md:block" />
                    <span className="text-sm text-primary font-medium">{step.phase}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="w-full md:w-0 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;