import { Card, CardContent } from "@/components/ui/card";
import { Eye, Compass, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const MethodologyFlowDiagram = () => {
  const steps = [
    {
      icon: Eye,
      phase: "Observe",
      title: "Discovery & Understanding",
      description: "What AI systems exist? What risks are present? Include business strategy leveraging AI Business Analysis.",
      activities: [
        "AI system inventory",
        "Stakeholder interviews",
        "Identify domain experts",
        "Risk identification"
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
            Our Iterative Process: Observe → Orient → Decide → Sprint → 
            <span className="text-accent"> Repeat</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A collaborative, <span className="font-semibold text-foreground">cyclical methodology</span> that continuously combines discovery, analysis, joint decision-making, and delivery
          </p>
        </div>

        {/* Desktop Flow View */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="relative">
            {/* Forward Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 via-amber-500/30 to-green-500/30 z-0" 
                 style={{ top: "5rem" }} 
                 aria-hidden="true" />
            
            {/* Return Arrow - Curved line from Sprint back to Observe */}
            <svg className="absolute w-full h-32 -bottom-16 left-0 z-0 pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id="returnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--accent) / 0.3)" />
                  <stop offset="50%" stopColor="hsl(var(--accent) / 0.4)" />
                  <stop offset="100%" stopColor="hsl(var(--accent) / 0.3)" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--accent))" />
                </marker>
              </defs>
              <path 
                d="M 85% 10 Q 50% 100, 15% 10" 
                stroke="url(#returnGradient)" 
                strokeWidth="2" 
                fill="none" 
                markerEnd="url(#arrowhead)"
                strokeDasharray="8,4"
                className="animate-[dash_20s_linear_infinite]"
                style={{
                  strokeDasharray: '8 4',
                  animation: 'dash 20s linear infinite'
                }}
              />
            </svg>

            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -100;
                }
              }
            `}</style>
            
            <div className="grid grid-cols-4 gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card className={`border-border hover:border-accent/50 transition-all hover:shadow-lg hover-scale bg-gradient-to-br ${step.color}`}>
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

        {/* Iteration Cycle Indicator - Enhanced Prominence */}
        <div className="mt-20 mb-12 text-center">
          <div className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-4 border-accent rounded-2xl shadow-2xl hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse shadow-lg">
              <ArrowRight className="w-7 h-7 text-accent-foreground rotate-180" />
            </div>
            <span className="text-3xl font-black text-accent tracking-wide">Continuous Iteration Cycle</span>
            <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse shadow-lg">
              <ArrowRight className="w-7 h-7 text-accent-foreground" />
            </div>
          </div>
        </div>

        {/* Iteration Note */}
        <Card className="max-w-4xl mx-auto border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-background shadow-lg">
          <CardContent className="pt-6 pb-6 text-center">
            <h4 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
              <span className="text-3xl">🔄</span>
              We Work in Cycles, Not Waterfalls
            </h4>
            <p className="text-muted-foreground leading-relaxed text-lg">
              After each <span className="font-semibold text-accent">Sprint</span>, we return to <span className="font-semibold text-accent">Observe</span> with new insights. 
              Each iteration refines our understanding, strengthens controls, and delivers measurable outcomes. 
              Early wins build confidence, continuous validation keeps you compliant, and regular cycles ensure 
              we adapt as your AI systems and regulations evolve.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-accent font-semibold">
              <span>Sprint Duration:</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full">2-4 weeks</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MethodologyFlowDiagram;
