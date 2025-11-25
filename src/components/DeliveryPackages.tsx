import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, Lightbulb, Package, Scale, CheckCircle2, FileCheck, Shield, FileText, TestTube, Activity } from "lucide-react";

const DeliveryPackages = () => {
  const deliveryFrameworks = [
    {
      icon: Lightbulb,
      name: "AI Ideation & Discovery Workshop",
      description: "Structured brainstorming and discovery sessions to identify high-value AI opportunities aligned with business strategy and risk appetite.",
      activities: ["Risk Mapping (Standards-Aligned)", "Control Implementation (Framework-Based)"],
      deliverables: [
        "Opportunity Register with Risk Classification",
        "Business Case Templates",
        "Feasibility Assessment",
        "Initial Compliance Checklist"
      ],
      duration: "1-2 weeks"
    },
    {
      icon: GitBranch,
      name: "AI CI/CD Pipeline Design",
      description: "End-to-end design and implementation of continuous integration and deployment pipelines for AI/LLM systems with security and governance controls built-in.",
      activities: ["Test-Driven Validation", "Continuous Monitoring (Governance-Integrated)"],
      deliverables: [
        "Pipeline Architecture Blueprint",
        "Automated Testing Framework",
        "Model Registry Integration",
        "Deployment Playbooks",
        "Rollback Procedures"
      ],
      duration: "3-4 weeks"
    },
    {
      icon: TestTube,
      name: "AI QA & Testing Framework",
      description: "Comprehensive quality assurance framework for AI agents and LLMs, including bias testing, performance validation, and adversarial robustness checks.",
      activities: ["Test-Driven Validation", "Audit Preparation (Compliance-Ready)"],
      deliverables: [
        "Test Strategy Document",
        "Automated Test Suites",
        "Bias Detection Reports",
        "Performance Benchmarks",
        "Validation Dashboards"
      ],
      duration: "2-3 weeks"
    }
  ];

  const turnkeyProjects = [
    {
      icon: Package,
      name: "Turnkey AI Application Delivery",
      description: "Complete end-to-end delivery of production-ready AI applications, from requirements gathering through deployment and handover, with full documentation and training.",
      scope: "Custom AI web apps, dashboards, automation workflows, and integration projects",
      activities: ["Documentation (Traceable)", "Test-Driven Validation", "Audit Preparation (Compliance-Ready)"],
      includes: [
        "Requirements Analysis & Design",
        "Full-Stack Development",
        "Testing & Quality Assurance",
        "Deployment & Infrastructure Setup",
        "User Training & Documentation",
        "Post-Launch Support (90 days)"
      ],
      timeline: "8-16 weeks depending on scope"
    },
    {
      icon: Activity,
      name: "Turnkey AI Agent Ecosystem",
      description: "Fully managed deployment of multi-agent AI systems including voice assistants, customer service bots, and orchestrated agent workflows.",
      scope: "Voice AI, conversational agents, multi-agent orchestration, branded AI personalities",
      activities: ["Control Implementation (Framework-Based)", "Continuous Monitoring (Governance-Integrated)"],
      includes: [
        "Agent Design & Personality Development",
        "Voice/Text Interface Implementation",
        "Integration with Existing Systems",
        "Safety & Compliance Controls",
        "Performance Monitoring Dashboard",
        "Ongoing Optimization (6 months)"
      ],
      timeline: "10-14 weeks depending on complexity"
    }
  ];

  const legalPackages = [
    {
      icon: Scale,
      name: "AI Contract Review & Negotiation",
      description: "Expert legal review of AI vendor contracts, SaaS agreements, and data processing agreements to identify liability gaps and compliance risks.",
      activities: ["Risk Mapping (Standards-Aligned)", "Documentation (Traceable)"],
      deliverables: [
        "Contract Risk Assessment Report",
        "Clause-by-Clause Analysis",
        "Negotiation Recommendations",
        "Liability & Indemnity Review",
        "GDPR/EU AI Act Compliance Check"
      ],
      turnaround: "5-7 business days per contract"
    },
    {
      icon: FileCheck,
      name: "AI Policy & Governance Documentation",
      description: "Development of board-level AI policies, acceptable use policies, and governance documentation compliant with regulatory requirements.",
      activities: ["Control Implementation (Framework-Based)", "Audit Preparation (Compliance-Ready)"],
      deliverables: [
        "AI Governance Policy",
        "Acceptable Use Policy",
        "Data Protection Procedures",
        "Incident Response Plans",
        "Board-Ready Policy Pack"
      ],
      turnaround: "3-4 weeks"
    },
    {
      icon: FileText,
      name: "Intellectual Property Strategy",
      description: "Comprehensive IP strategy for AI systems including patent landscaping, trade secret protection, and open-source license compliance.",
      activities: ["Risk Mapping (Standards-Aligned)", "Documentation (Traceable)"],
      deliverables: [
        "IP Landscape Analysis",
        "Patent Filing Strategy",
        "Open Source Compliance Audit",
        "Trade Secret Protection Plan",
        "Licensing Recommendations"
      ],
      turnaround: "4-6 weeks"
    }
  ];

  const trustActivities = [
    { name: "Risk Mapping (Standards-Aligned)", icon: Shield },
    { name: "Control Implementation (Framework-Based)", icon: CheckCircle2 },
    { name: "Audit Preparation (Compliance-Ready)", icon: FileCheck },
    { name: "Documentation (Traceable)", icon: FileText },
    { name: "Test-Driven Validation", icon: TestTube },
    { name: "Continuous Monitoring (Governance-Integrated)", icon: Activity }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Execution & Delivery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work Packages & Delivery Frameworks
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Structured, outcome-focused packages designed for fast execution with governance built-in from day one
          </p>
        </div>

        {/* Trust Activities Badge Section */}
        <div className="mb-16 bg-muted/30 border border-border/50 rounded-xl p-8">
          <h3 className="text-center text-lg font-semibold mb-6">Embedded Governance Activities</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {trustActivities.map((activity, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm font-medium flex items-center gap-2">
                <activity.icon className="w-4 h-4" />
                {activity.name}
              </Badge>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
            Every work package includes these governance activities integrated throughout the delivery cycle, ensuring compliance-ready outcomes without post-hoc retrofitting.
          </p>
        </div>

        {/* Delivery Frameworks */}
        <div className="mb-20">
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-3">Delivery Frameworks</h3>
            <p className="text-muted-foreground text-lg">
              Ideation, brainstorming, CI/CD, and QA design tailored for AI, LLMs, and AI Agents
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {deliveryFrameworks.map((framework, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                    <framework.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{framework.name}</CardTitle>
                  <CardDescription>{framework.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Governance Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {framework.activities.map((activity, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Key Deliverables</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {framework.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Timeline:</span> {framework.duration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Turnkey Projects */}
        <div className="mb-20">
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-3">Turnkey Projects</h3>
            <p className="text-muted-foreground text-lg">
              Complete end-to-end delivery with full handover, training, and post-launch support
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {turnkeyProjects.map((project, index) => (
              <Card key={index} className="border-accent/30 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                    <project.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{project.name}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                  <p className="text-sm text-muted-foreground italic mt-2">
                    <span className="font-semibold text-foreground">Scope:</span> {project.scope}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Governance Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.activities.map((activity, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Includes</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {project.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Timeline:</span> {project.timeline}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legal Packages */}
        <div className="mb-16">
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-3">Legal Packages</h3>
            <p className="text-muted-foreground text-lg">
              Expert legal support for AI contracts, policies, and intellectual property strategy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {legalPackages.map((pkg, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <pkg.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Governance Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.activities.map((activity, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Deliverables</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {pkg.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Turnaround:</span> {pkg.turnaround}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 border border-accent/20 rounded-xl p-10">
          <h3 className="text-2xl font-bold mb-3">Ready to start execution?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a consultation to discuss which work packages align with your current priorities, timelines, and risk profile. We'll help you build a pragmatic delivery roadmap.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="#book-consultation">Schedule Work Package Discussion</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPackages;