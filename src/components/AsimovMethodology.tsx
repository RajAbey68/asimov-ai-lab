import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, FileText, GitBranch, Target, Shield, ArrowRight } from "lucide-react";

const AsimovMethodology = () => {
  const phases = [
    {
      phase: "A — Audit",
      objective: "Identify AI assets, risks, and exposure.",
      outcome: "System registry, gap analysis"
    },
    {
      phase: "S — Secure",
      objective: "Define ethical, legal, and technical controls.",
      outcome: "Governance baseline"
    },
    {
      phase: "I — Implement",
      objective: "Deploy AI products responsibly.",
      outcome: "Documented build & review"
    },
    {
      phase: "M — Measure",
      objective: "Quantify bias, accuracy, performance, ROI.",
      outcome: "AI risk dashboard"
    },
    {
      phase: "O — Operate",
      objective: "Maintain lifecycle oversight & retraining.",
      outcome: "Continuous assurance"
    },
    {
      phase: "V — Validate",
      objective: "Evidence alignment with AI Act & ISO 42001.",
      outcome: "External audit readiness"
    }
  ];

  const deliveryWorkflow = [
    {
      icon: Users,
      phase: "Discovery & Planning",
      description: "Structured requirements gathering with stakeholder alignment",
      deliverables: ["Project Brief", "Risk Assessment Matrix", "Compliance Requirements Document"],
      roles: ["Compliance Analyst", "Technical Architect", "Business Stakeholder"]
    },
    {
      icon: FileText,
      phase: "Documentation & Specification",
      description: "Comprehensive AI governance documentation with traceability",
      deliverables: ["AI Governance Framework", "Policy Documents", "Control Specifications"],
      roles: ["Policy Designer", "Legal Advisor", "Technical Writer"]
    },
    {
      icon: GitBranch,
      phase: "Iterative Implementation",
      description: "Phased deployment with continuous validation and feedback",
      deliverables: ["Control Implementation", "Training Materials", "Process Documentation"],
      roles: ["Implementation Lead", "Change Manager", "Training Coordinator"]
    },
    {
      icon: Target,
      phase: "Validation & Quality Assurance",
      description: "Evidence-based verification against regulatory requirements",
      deliverables: ["Audit Trail", "Compliance Reports", "Test Results"],
      roles: ["QA Engineer", "Compliance Auditor", "Risk Manager"]
    }
  ];

  const keyPrinciples = [
    {
      icon: Shield,
      title: "Context Persistence",
      description: "All decisions, requirements, and implementations maintain full traceability from business need to technical control."
    },
    {
      icon: FileText,
      title: "Documentation-Driven",
      description: "Comprehensive documentation serves as the single source of truth, enabling consistent execution across teams and timelines."
    },
    {
      icon: GitBranch,
      title: "Iterative & Verifiable",
      description: "Small, verifiable units of work with continuous validation prevent scope creep and ensure predictable outcomes."
    },
    {
      icon: Users,
      title: "Role-Based Expertise",
      description: "Specialized roles with clear responsibilities ensure appropriate expertise is applied at each stage of delivery."
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The ASIMOV-AI Model
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Audit, Secure, Implement, Measure, Operate, Validate — a systematic approach to responsible AI deployment
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((item, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.phase}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.objective}</p>
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {item.outcome}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>

        {/* Delivery Workflow Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Structured Delivery Method
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A deterministic, phase-gated approach that transforms AI governance from ambiguous best practices into actionable, auditable implementation
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {deliveryWorkflow.map((workflow, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4 md:flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                        <workflow.icon className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-accent">Phase {index + 1}</span>
                          {index < deliveryWorkflow.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                          )}
                        </div>
                        <h3 className="font-bold text-xl mb-2">{workflow.phase}</h3>
                        <p className="text-muted-foreground mb-4">{workflow.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Key Deliverables:</h4>
                            <div className="flex flex-wrap gap-2">
                              {workflow.deliverables.map((deliverable, i) => (
                                <span key={i} className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Roles Involved:</h4>
                            <div className="flex flex-wrap gap-2">
                              {workflow.roles.map((role, i) => (
                                <span key={i} className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Principles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Core Delivery Principles</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {keyPrinciples.map((principle, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <principle.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">{principle.title}</h4>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Determinism Statement */}
          <Card className="mt-12 border-accent/50 bg-gradient-to-br from-background via-muted/20 to-accent/5">
            <CardContent className="pt-8 pb-8">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Why Structure Creates Determinism
                </h3>
                <p className="text-muted-foreground mb-6">
                  Unlike ad-hoc consulting approaches that rely on individual expertise and intuition, our structured methodology creates predictable, repeatable outcomes through:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-accent">Process Over Improvisation</h4>
                    <p className="text-sm text-muted-foreground">Success doesn't depend on which consultant you get—our defined phases guide every engagement consistently.</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-accent">Persistent Context</h4>
                    <p className="text-sm text-muted-foreground">Documentation serves as a living knowledge base, enabling seamless handoffs and long-term maintenance.</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-accent">Verifiable Units</h4>
                    <p className="text-sm text-muted-foreground">Each deliverable is small, focused, and independently verifiable—preventing scope creep and hidden work.</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-accent">Audit-Ready Traceability</h4>
                    <p className="text-sm text-muted-foreground">Every control can be traced back to its regulatory requirement and business justification.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AsimovMethodology;