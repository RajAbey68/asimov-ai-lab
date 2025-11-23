import { Card, CardContent } from "@/components/ui/card";
import { Eye, Compass, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const MethodologyFlowDiagram = () => {
  const steps = [
    {
      icon: Eye,
      phase: "Observe",
      title: "Discovery & Understanding",
      description: "What AI systems exist? What risks are present?",
      activities: [
        "AI system inventory",
        "Stakeholder interviews",
        "Risk identification",
        "Current state assessment"
      ],
      color: "from-blue-500/20 to-blue-600/20",
      iconBg: "bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Compass,
      phase: "Orient",
      title: "Analysis & Framework",
      description: "Which frameworks apply? What controls are needed?",
      activities: [
        "Regulatory mapping",
        "Framework alignment",
        "Gap analysis",
        "Control identification"
      ],
      color: "from-purple-500/20 to-purple-600/20",
      iconBg: "bg-purple-500/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Lightbulb,
      phase: "Decide",
      title: "Joint Decision Making",
      description: "What are priorities? What outcomes matter?",
      activities: [
        "Priority agreement",
        "Business benefits defined",
        "Risk acceptance decisions",
        "Resource allocation"
      ],
      color: "from-amber-500/20 to-amber-600/20",
      iconBg: "bg-amber-500/20",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: Rocket,
      phase: "Sprint",
      title: "Design, Deliver, Operate",
      description: "Build controls. Deploy solutions. Monitor outcomes.",
      activities: [
        "Control design & build",
        "Documentation creation",
        "Implementation delivery",
        "Operational monitoring"
      ],
      color: "from-green-500/20 to-green-600/20",
      iconBg: "bg-green-500/20",
      textColor: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Our Process: Observe → Orient → Decide → Sprint
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A collaborative, iterative methodology that combines discovery, analysis, joint decision-making, and delivery
          </p>
        </div>

        {/* Desktop Flow View */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 via-amber-500/30 to-green-500/30 z-0" 
                 style={{ top: "5rem" }} 
                 aria-hidden="true" />
            
            <div className="grid grid-cols-4 gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className={`border-border hover:border-accent/50 transition-all hover:shadow-lg bg-gradient-to-br ${step.color}`}>
                    <CardContent className="pt-6 pb-6">
                      {/* Icon */}
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${step.iconBg} flex items-center justify-center`}>
                        <step.icon className={`w-10 h-10 ${step.textColor}`} />
                      </div>

                      {/* Phase Badge */}
                      <div className="text-center mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step.iconBg} ${step.textColor}`}>
                          {step.phase}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-center mb-2">{step.title}</h4>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground text-center mb-4 italic">
                        {step.description}
                      </p>

                      {/* Activities */}
                      <ul className="space-y-2">
                        {step.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <div className={`w-1 h-1 rounded-full ${step.iconBg} shrink-0 mt-1.5`} />
                            <span className="text-muted-foreground">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Arrow between cards */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-20 -right-4 z-20 transform translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-accent" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical View */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className={`border-border bg-gradient-to-br ${step.color}`}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0`}>
                      <step.icon className={`w-8 h-8 ${step.textColor}`} />
                    </div>

                    <div className="flex-1">
                      {/* Phase Badge */}
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${step.iconBg} ${step.textColor}`}>
                        {step.phase}
                      </span>

                      {/* Title */}
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        {step.description}
                      </p>

                      {/* Activities */}
                      <ul className="space-y-2">
                        {step.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full ${step.iconBg} shrink-0 mt-2`} />
                            <span className="text-muted-foreground">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow between cards (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-6 h-6 text-accent rotate-90" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Iteration Note */}
        <Card className="mt-12 max-w-4xl mx-auto border-accent/50 bg-gradient-to-br from-accent/5 to-background">
          <CardContent className="pt-6 pb-6 text-center">
            <h4 className="text-xl font-bold mb-3">Continuous Iteration</h4>
            <p className="text-muted-foreground leading-relaxed">
              This isn't a waterfall process. We cycle through these phases in focused sprints, refining our understanding 
              and implementation with each iteration. Early wins build confidence, while continuous validation ensures we stay aligned 
              with your business goals and regulatory requirements.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MethodologyFlowDiagram;
