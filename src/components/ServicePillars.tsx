import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Cpu, Mic } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";
import riskAssessmentImg from "@/assets/risk-assessment-ai.png";
import projectDeliveryImg from "@/assets/project-delivery.jpg";
import aiLifecycleImg from "@/assets/ai-ml-lifecycle.png";
import voiceAgentImg from "@/assets/voice-agent-ai.png";
import complianceIcon from "@/assets/service-compliance.png";
import mlopsIcon from "@/assets/service-mlops.png";
import governanceIcon from "@/assets/service-governance.png";

const ServicePillars = () => {
  const pillars = [
    {
      icon: Shield,
      iconImg: complianceIcon,
      title: "Regulatory Compliance Pillars",
      tagline: "Achieving EU AI Act Readiness and GDPR Compliant systems",
      description: "Comprehensive risk mapping across legal, ethical, and operational domains. We evaluate your organisation's AI maturity and exposure under EU AI Act, ISO/IEC 42001, NIST AI RMF, COBIT 2019, and GDPR—delivering board-ready compliance roadmaps.",
      deliverables: [
        "AI System Inventory & Risk Classification",
        "EU AI Act Conformity Assessment Preparation",
        "GDPR Data Protection Impact Assessments",
        "Risk Heatmaps & Governance Roadmaps",
        "Executive Briefings for Board & CISO"
      ],
      image: riskAssessmentImg
    },
    {
      icon: Target,
      iconImg: governanceIcon,
      title: "Governance & Audit Deliverables",
      tagline: "Implementing controls for clear board oversight",
      description: "Structured governance frameworks based on NIST AI RMF and COBIT 2019. We establish board-level oversight mechanisms, control registers, and audit-ready documentation that withstand regulatory scrutiny and demonstrate accountability.",
      deliverables: [
        "NIST AI RMF Control Implementation",
        "COBIT 2019 AI Governance Framework",
        "Board-Level AI Risk Reporting Dashboard",
        "Internal Audit & Assurance Programs",
        "Third-Party Vendor Risk Management"
      ],
      image: aiLifecycleImg
    },
    {
      icon: Cpu,
      iconImg: mlopsIcon,
      title: "MLOps Security Modules",
      tagline: "Hardening CI/CD pipelines with threat-informed audits",
      description: "Security-first approach to AI operations. We conduct audits informed by OWASP Top 10 for LLMs and threat modeling using MITRE ATLAS framework, ensuring your AI deployment pipelines are resilient against adversarial attacks and supply chain vulnerabilities.",
      deliverables: [
        "CI/CD Pipeline Security Audits",
        "OWASP AI Security Risk Assessment",
        "MITRE ATLAS Threat Modeling",
        "Model Registry & Artifact Validation",
        "Supply Chain Security Controls"
      ],
      image: projectDeliveryImg
    },
    {
      icon: Mic,
      title: "Voice, Vision & Multi-Agent Systems",
      tagline: "The new human interface.",
      description: "Specialising in cutting-edge AI interfaces that enable organisations to launch branded AI personalities and automated advisory tools without compromising governance.",
      deliverables: [
        "AI voice interfaces (Bland AI, SynthFlow, VAPI)",
        "AI video and avatar automation (HeyGen, Runway)",
        "Multi-agent ecosystems for marketing & analytics",
        "GPT-based and Relevance AI agent clusters",
        "Branded AI personalities with security controls"
      ],
      image: voiceAgentImg
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={servicesBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/85 to-background/75" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Pillars</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four integrated capabilities — from risk assessment to reality deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card key={index} className="border-border hover:border-accent/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={`${pillar.title} - ${pillar.tagline}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4 w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-lg p-2">
                  {pillar.iconImg ? (
                    <img src={pillar.iconImg} alt={pillar.title} className="w-full h-full object-contain" />
                  ) : (
                    <pillar.icon className="w-7 h-7 text-primary" />
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{pillar.title}</CardTitle>
                <CardDescription className="text-base font-semibold text-foreground">
                  {pillar.tagline}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {pillar.description}
                </p>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-3 text-foreground">Key Deliverables:</h4>
                <ul className="space-y-2">
                  {pillar.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;