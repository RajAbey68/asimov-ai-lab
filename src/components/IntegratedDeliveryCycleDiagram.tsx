import { Shield, Target, Lightbulb, Rocket, CheckCircle2, GitBranch, FileText, Users } from "lucide-react";

const IntegratedDeliveryCycleDiagram = () => {
  const phases = [
    {
      asimov: "OBSERVE",
      bmad: "Discovery",
      icon: Target,
      activities: ["System Inventory", "Stakeholder Interviews", "Risk Identification", "Context Gathering"],
      governance: "Risk Register Created",
      color: "from-blue-900 to-blue-800"
    },
    {
      asimov: "ORIENT",
      bmad: "Planning",
      icon: Lightbulb,
      activities: ["Risk Assessment", "Framework Alignment", "Agentic Planning", "Story File Creation"],
      governance: "Compliance Mapping",
      color: "from-blue-800 to-blue-700"
    },
    {
      asimov: "DECIDE",
      bmad: "Solutioning",
      icon: GitBranch,
      activities: ["Architecture Design", "Control Selection", "Risk Mitigation", "Technical Planning"],
      governance: "Control Framework Approved",
      color: "from-blue-700 to-blue-600"
    },
    {
      asimov: "SPRINT",
      bmad: "Implementation",
      icon: Rocket,
      activities: ["Context-Engineered Dev", "Control Implementation", "Testing & Validation", "Documentation"],
      governance: "Audit Evidence Generated",
      color: "from-blue-600 to-primary"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-foreground">Integrated Delivery Cycle</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Asimov-AI governance and BMAD tactical development working in continuous, iterative cycles
        </p>
      </div>

      {/* Main Cycle Container */}
      <div className="relative">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-accent/20 border-4 border-accent rounded-full w-40 h-40 flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-2 text-accent" />
              <p className="font-bold text-sm text-foreground">Continuous</p>
              <p className="font-bold text-sm text-foreground">Governance</p>
            </div>
          </div>
        </div>

        {/* Phase Cards in Circle */}
        <div className="relative h-[800px]">
          {phases.map((phase, index) => {
            const angle = (index * 90) - 45; // Position at 45°, 135°, 225°, 315°
            const radius = 300;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            const Icon = phase.icon;

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className="w-64 group">
                  {/* Phase Card */}
                  <div className={`bg-gradient-to-br ${phase.color} p-6 rounded-lg shadow-xl border-2 border-primary/30 hover:border-accent transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                      <div className="text-right">
                        <div className="text-xs text-accent font-semibold mb-1">Asimov-AI</div>
                        <h4 className="text-2xl font-bold text-white">{phase.asimov}</h4>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs text-accent font-semibold mb-1">BMAD Phase</div>
                      <p className="text-lg font-semibold text-white">{phase.bmad}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      {phase.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/90">{activity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Governance Checkpoint */}
                    <div className="bg-accent/20 border border-accent rounded p-3 mt-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-accent">Governance Checkpoint</div>
                          <div className="text-sm font-medium text-white">{phase.governance}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next phase */}
                  {index < phases.length - 1 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
                      <div className="text-accent text-4xl">→</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Iteration Arrow back to start */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="bg-accent text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>ITERATE & REPEAT</span>
          </div>
          <div className="mt-2 text-accent text-4xl animate-bounce">↻</div>
        </div>
      </div>

      {/* Key Benefits Below */}
      <div className="mt-24 grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h4 className="font-bold mb-2 text-foreground">Continuous Compliance</h4>
          <p className="text-sm text-muted-foreground">Governance checkpoints embedded at every phase</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <FileText className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h4 className="font-bold mb-2 text-foreground">Audit-Ready Documentation</h4>
          <p className="text-sm text-muted-foreground">Evidence generated automatically throughout delivery</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <GitBranch className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h4 className="font-bold mb-2 text-foreground">Adaptive & Iterative</h4>
          <p className="text-sm text-muted-foreground">Flexible cycles respond to emerging risks and requirements</p>
        </div>
      </div>
    </div>
  );
};

export default IntegratedDeliveryCycleDiagram;
