import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Hammer, Settings, Users, AlertTriangle, Shield, Scale, Lock, Eye, CheckCircle, RefreshCw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Framework = () => {
  const phases = [
    {
      phase: "Design",
      icon: Lightbulb,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-600",
      focus: "Concept, scoping, requirements, data strategy, risk planning",
      risks: [
        "Problem framing bias – poorly defined objectives lead to harmful or discriminatory outcomes",
        "Lack of domain expertise – excluding legal, ethics, or sector specialists at the design stage",
        "Regulatory misalignment – not accounting for sector-specific or jurisdictional legal duties",
        "Data sourcing risks – using unlicensed, sensitive, or biased data sources",
        "IP risk – unclear ownership of training data or generated outputs",
        "Failure to perform impact assessments – missing DPIA, FRIA, etc."
      ],
      components: [
        "System specification",
        "Risk tiering/classification (e.g. per EU AI Act)",
        "Data governance strategy",
        "AI use case definition"
      ]
    },
    {
      phase: "Build",
      icon: Hammer,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-600",
      focus: "Model development, training, testing, and integration",
      risks: [
        "Bias and discrimination – introduced during model training or feature selection",
        "Security vulnerabilities – exposure to adversarial attacks or data poisoning",
        "Lack of explainability – models too opaque to audit or justify decisions",
        "Privacy violations – training on personally identifiable data without sufficient protections",
        "Overfitting/underfitting – impacting performance in real-world conditions"
      ],
      components: [
        "Machine learning pipelines",
        "Feature engineering",
        "Model selection and training",
        "Algorithm interpretability",
        "Security controls (e.g., differential privacy, adversarial testing)"
      ]
    },
    {
      phase: "Operate",
      icon: Settings,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-600",
      focus: "Deployment, monitoring, retraining, and support",
      risks: [
        "Model drift – performance degradation over time due to changing data",
        "Insufficient monitoring – lack of alerts for bias, failures, or anomalies",
        "Change management failure – deploying updates without testing or stakeholder review",
        "Automation bias – over-reliance on AI outputs without human oversight",
        "Non-compliance with updates to law – systems no longer align with evolving regulatory standards"
      ],
      components: [
        "Deployment pipelines",
        "Real-time monitoring tools",
        "Logging and audit trails",
        "Human-in-the-loop (HITL) controls",
        "Feedback loops for retraining"
      ]
    },
    {
      phase: "Usage",
      icon: Users,
      color: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      focus: "End-user interaction, consumption, and societal impact",
      risks: [
        "Misuse or abuse – system used in harmful or unintended ways",
        "Lack of transparency for users – failure to disclose AI use or provide recourse",
        "Trust erosion – users lose faith due to hallucinations or ethical breaches",
        "Accessibility and fairness – system creates unequal access or benefit"
      ],
      components: [
        "User interface / chatbot / decision support",
        "Documentation and disclosures",
        "Appeals and recourse mechanisms",
        "Usage analytics",
        "External communication (e.g. terms, consent)"
      ]
    }
  ];

  const frameworks = [
    { name: "EU AI Act", lifecycle: true, focus: "Legal/regulatory" },
    { name: "NIST AI RMF 1.0", lifecycle: true, focus: "Risk management" },
    { name: "ISO/IEC 42001", lifecycle: true, focus: "Organisational controls" },
    { name: "ISACA AI Assurance Toolkit", lifecycle: true, focus: "Audit & compliance" },
    { name: "OECD AI Principles", lifecycle: false, focus: "Policy/ethics focus" },
    { name: "MITRE ATLAS", lifecycle: true, focus: "Threat modelling" },
    { name: "IEEE 7000 series", lifecycle: false, focus: "Ethics and system design" },
    { name: "FAT ML Principles", lifecycle: true, focus: "Fairness, Accountability, Transparency" }
  ];

  const maturityLevels = [
    {
      level: "1 - Ad Hoc",
      design: "No formal risk assessment or governance process",
      build: "Minimal testing, no bias or security controls",
      operate: "No monitoring or drift detection",
      usage: "No user transparency or recourse mechanisms"
    },
    {
      level: "2 - Developing",
      design: "Basic impact assessments performed",
      build: "Some testing for bias and security vulnerabilities",
      operate: "Basic logging and monitoring in place",
      usage: "Users informed AI is being used"
    },
    {
      level: "3 - Defined",
      design: "Comprehensive DPIAs, FRIAs, and regulatory mapping",
      build: "Robust testing, explainability measures implemented",
      operate: "Real-time monitoring with alerting for drift and bias",
      usage: "Clear disclosures, documented appeals process"
    },
    {
      level: "4 - Optimized",
      design: "Proactive risk anticipation, domain experts embedded",
      build: "Continuous security testing, adversarial robustness",
      operate: "Automated retraining triggers, comprehensive audit trails",
      usage: "Full transparency, accessible recourse, continuous feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-medium">Lifecycle-Based AI Risk Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AI System Risk Framework</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A structured approach to managing AI risks across four critical lifecycle phases: Design, Build, Operate, and Usage
              </p>
            </div>

            {/* Lifecycle Visualization */}
            <div className="mb-16">
              <Card className="border-border bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">AI System Lifecycle</CardTitle>
                  <CardDescription className="text-center">
                    Risk management integrated across all phases with continuous feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="relative">
                      <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-2">1</div>
                          <CardTitle className="text-lg">Design</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Risk Tiering</p>
                          <p>• Impact Assessments</p>
                          <p>• Data Strategy</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div className="relative">
                      <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-2">2</div>
                          <CardTitle className="text-lg">Build</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Model Training</p>
                          <p>• Bias Testing</p>
                          <p>• Security Controls</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div className="relative">
                      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mb-2">3</div>
                          <CardTitle className="text-lg">Operate</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Monitoring</p>
                          <p>• Drift Detection</p>
                          <p>• HITL Controls</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div>
                      <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-orange-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mb-2">4</div>
                          <CardTitle className="text-lg">Usage</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• User Transparency</p>
                          <p>• Appeals Process</p>
                          <p>• Fairness Metrics</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 text-accent" />
                    <span>Continuous feedback loop enables iterative improvement across all phases</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Four Phase Model */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Four-Phase Risk Model</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Categorizing AI system risks into Design, Build, Operate, and Usage phases aligns with global frameworks including the EU AI Act, NIST AI RMF, and ISO/IEC 42001
              </p>
              
              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <Card key={index} className={`border-2 ${phase.borderColor} bg-gradient-to-br ${phase.color}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center flex-shrink-0 ${phase.iconColor}`}>
                          <phase.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl">{phase.phase} Phase</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              Phase {index + 1}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            <strong>Focus:</strong> {phase.focus}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="risks" className="border-border/50">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                              <span className="font-semibold">Risk Categories ({phase.risks.length})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 mt-2">
                              {phase.risks.map((risk, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                  <span className="text-destructive mt-1">•</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="components" className="border-border/50">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-primary" />
                              <span className="font-semibold">AI System Components ({phase.components.length})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 mt-2">
                              {phase.components.map((component, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{component}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Framework Alignment */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Framework Alignment</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                This lifecycle model aligns with and supports implementation of global AI standards and frameworks
              </p>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {frameworks.map((framework, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-all">
                        <div className="flex items-start gap-2 mb-2">
                          {framework.lifecycle ? (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 flex-shrink-0" />
                          )}
                          <div>
                            <h3 className="font-semibold text-sm mb-1">{framework.name}</h3>
                            <p className="text-xs text-muted-foreground">{framework.focus}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maturity Framework */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">AI Governance Maturity Framework</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Assess your organization's AI governance maturity across all lifecycle phases
              </p>
              
              <div className="space-y-4">
                {maturityLevels.map((level, index) => (
                  <Card key={index} className="border-border hover:border-accent/50 transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant={index === 3 ? "default" : "outline"}>
                          {level.level}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold text-sm">Design</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.design}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Hammer className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-sm">Build</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.build}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Settings className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-sm">Operate</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.operate}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-orange-600" />
                            <h4 className="font-semibold text-sm">Usage</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.usage}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Table */}
            <Card className="border-border bg-gradient-accent">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-accent-foreground">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-accent-foreground/20">
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Phase</th>
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Risk Focus</th>
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Key Tools/Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Design</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Framing, legality, data rights</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Impact assessments, governance plans</td>
                      </tr>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Build</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Bias, robustness, privacy</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Secure SDLC, adversarial testing</td>
                      </tr>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Operate</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Drift, monitoring, HITL</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Monitoring, logging, alerting</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-accent-foreground font-medium">Usage</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Misuse, trust, fairness</td>
                        <td className="py-3 px-4 text-accent-foreground/80">User disclosures, feedback, appeal processes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Framework;
