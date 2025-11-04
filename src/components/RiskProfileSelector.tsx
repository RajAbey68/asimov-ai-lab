import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Scale, Target, Code, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const riskProfiles = [
  {
    id: "executive",
    icon: Shield,
    title: "C-Suite / Board Members",
    subtitle: "Strategic & Governance Risk",
    badge: "Leadership",
    whyYou: "You're accountable for organizational AI governance and face personal liability under emerging regulations.",
    risks: [
      "Non-compliance fines up to €35M or 7% global revenue (EU AI Act)",
      "Board-level liability for AI system failures",
      "Reputational damage from AI incidents",
      "Strategic misalignment with regulatory landscape"
    ],
    consequences: "Directors can face personal prosecution. Insurance may not cover AI-related claims. Share price impact from public AI failures.",
    whoActs: "Board, CEO, CFO, General Counsel, Chief Risk Officer",
    assessment: "Strategic AI Governance Review",
    assessmentDesc: "Board-level briefing on AI risk exposure, regulatory obligations, and governance framework requirements."
  },
  {
    id: "technical",
    icon: Code,
    title: "CIO / CTO / Tech Leaders",
    subtitle: "Implementation & Security Risk",
    badge: "Technical",
    whyYou: "You're responsible for deploying compliant AI systems while managing technical debt and security vulnerabilities.",
    risks: [
      "Security breaches in AI systems exposing sensitive data",
      "Technical non-compliance blocking product launches",
      "Integration failures with existing infrastructure",
      "Resource drain from reactive compliance retrofitting"
    ],
    consequences: "Project delays. Budget overruns. Security incidents. Team burnout. Loss of competitive advantage.",
    whoActs: "CTO, CIO, CISO, VP Engineering, IT Director",
    assessment: "Technical Risk & Security Assessment",
    assessmentDesc: "Deep-dive into AI system architecture, security controls, data flows, and technical compliance requirements."
  },
  {
    id: "compliance",
    icon: Scale,
    title: "Compliance / Legal Officers",
    subtitle: "Regulatory & Audit Risk",
    badge: "Legal",
    whyYou: "You must ensure AI systems meet complex, evolving regulations while preparing for regulatory scrutiny and audits.",
    risks: [
      "Regulatory enforcement actions and penalties",
      "Failed audits requiring costly remediation",
      "Cross-border compliance conflicts (EU, US, UK)",
      "Inadequate documentation for regulatory defense"
    ],
    consequences: "Enforcement actions. Failed audits. Legal costs. Operational shutdowns. Export restrictions.",
    whoActs: "Chief Compliance Officer, General Counsel, Data Protection Officer, Risk Manager",
    assessment: "Regulatory Compliance & Audit Readiness Review",
    assessmentDesc: "Gap analysis against EU AI Act, NIST AI RMF, ISO 42001, with audit-ready documentation framework."
  },
  {
    id: "product",
    icon: Target,
    title: "Product / Business Leaders",
    subtitle: "Operational & Market Risk",
    badge: "Business",
    whyYou: "You need to deliver AI features that drive revenue while avoiding customer harm and market setbacks.",
    risks: [
      "AI system errors damaging customer trust",
      "Product launch delays due to compliance issues",
      "Competitive disadvantage from over-cautious approach",
      "Customer churn from AI-related incidents"
    ],
    consequences: "Lost revenue. Customer attrition. Market share erosion. Brand damage. Delayed launches.",
    whoActs: "CPO, VP Product, Business Unit Leaders, Commercial Director",
    assessment: "Product Risk & Market Readiness Assessment",
    assessmentDesc: "Evaluate AI product risks, customer impact scenarios, market compliance requirements, and go-to-market strategy."
  },
  {
    id: "engineering",
    icon: AlertTriangle,
    title: "AI/ML Engineering Teams",
    subtitle: "Model & Performance Risk",
    badge: "Engineering",
    whyYou: "You build AI systems that must perform reliably while meeting technical compliance requirements you may not fully understand.",
    risks: [
      "Model bias creating discriminatory outcomes",
      "Performance degradation in production",
      "Inadequate testing for edge cases",
      "Documentation gaps blocking deployment"
    ],
    consequences: "Production incidents. Rework cycles. Compliance blockers. Ethical failures. Technical debt.",
    whoActs: "AI/ML Engineers, Data Scientists, ML Ops, QA Teams",
    assessment: "Technical Validation & Model Risk Assessment",
    assessmentDesc: "Hands-on evaluation of model performance, bias detection, testing coverage, and technical documentation."
  }
];

const RiskProfileSelector = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="outline" className="mb-4">Find Your Risk Profile</Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Who Should Be Concerned About AI Risk?
          </h2>
          <p className="text-xl text-muted-foreground">
            Different roles face different AI risks. Understanding YOUR specific exposure is the first step to protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {riskProfiles.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedProfile === profile.id;
            
            return (
              <Card 
                key={profile.id}
                className={`cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 ${
                  isSelected ? 'border-accent shadow-xl ring-2 ring-accent/20' : ''
                }`}
                onClick={() => setSelectedProfile(isSelected ? null : profile.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <Badge variant="secondary">{profile.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{profile.title}</CardTitle>
                  <CardDescription className="font-medium">{profile.subtitle}</CardDescription>
                </CardHeader>
                
                {isSelected && (
                  <CardContent className="space-y-6 pt-0">
                    <div>
                      <h4 className="font-semibold text-sm text-accent mb-2">Why You?</h4>
                      <p className="text-sm text-muted-foreground">{profile.whyYou}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-accent mb-2">Your Key Risks:</h4>
                      <ul className="space-y-2">
                        {profile.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-accent mb-2">Consequences of Inaction:</h4>
                      <p className="text-sm text-destructive/90">{profile.consequences}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-accent mb-2">Who Needs to Act:</h4>
                      <p className="text-sm text-muted-foreground">{profile.whoActs}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-2">Recommended Assessment:</h4>
                      <p className="font-medium text-sm mb-1">{profile.assessment}</p>
                      <p className="text-xs text-muted-foreground mb-4">{profile.assessmentDesc}</p>
                      
                      <Button asChild className="w-full" size="lg">
                        <Link to="/assessment">
                          Request This Assessment <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {!selectedProfile && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Not sure which applies to you? Click any role above to see specific risks and recommended assessments.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/assessment">
                Or Request a General Risk Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RiskProfileSelector;
