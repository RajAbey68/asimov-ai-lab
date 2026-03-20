import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Shield, Zap, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import servicesBg from "@/assets/services-bg.jpg";
import riskAssessmentImg from "@/assets/risk-assessment-ai.png";
import projectDeliveryImg from "@/assets/project-delivery.jpg";
import aiLifecycleImg from "@/assets/ai-ml-lifecycle.png";
import complianceIcon from "@/assets/service-compliance.png";
import mlopsIcon from "@/assets/service-mlops.png";
import governanceIcon from "@/assets/service-governance.png";

const ServicePillars = () => {
  const pillars = [
    {
      icon: Shield,
      iconImg: complianceIcon,
      title: "Step 1: The Audit",
      link: "/assessment-info",
      tagline: "\"Ghost in the Machine\"",
      description: "70% of Enterprise AI fails due to 'Hallucination Risk'. See how our audit isolates your proprietary data from public model errors. We identify security gaps before you deploy.",
      deliverables: [
        "30-Point AI Readiness Risk Assessment",
        "Proprietary Data Isolation Strategy",
        "Hallucination Risk Stress-Testing",
        "EU AI Act & NIST Gap Analysis",
        "Board-Level Risk Report"
      ],
      image: riskAssessmentImg
    },
    {
      icon: Zap,
      iconImg: mlopsIcon,
      title: "Step 2: The Prototype",
      link: "/strategic-delivery",
      tagline: "\"Cognitive Clarity\"",
      description: "Stop building chat-bots. Build a Digital Intelligence Agency. See a prototype of your company’s 'Collective Brain' in 14 days. We bridge the gap between 'interesting tech' and de-risked business outcome.",
      deliverables: [
        "14-Day Rapid Prototype Build",
        "RAG Pipeline with Guardrails",
        "Voice/Agentic Interface Demo",
        "Efficiency ROI Calculation",
        "Technical Feasibility Validation"
      ],
      image: projectDeliveryImg
    },
    {
      icon: Database,
      iconImg: governanceIcon,
      title: "Step 3: Enterprise Scale",
      link: "/strategic-delivery",
      tagline: "Technical Sovereignty",
      description: "Verifiable Knowledge Graphs & Cryptographic Provenance. Structured documentation to support your audit preparation with human-in-the-loop oversight and zero-data training policies.",
      deliverables: [
        "Verifiable Knowledge Graph Architecture",
        "Cryptographic Provenance Logging",
        "Human-in-the-Loop Oversight Models",
        "Zero-Data Training Policy Implementation",
        "Automated Regression & AI Model Testing (UTS PlatformX)",
        "Ongoing Governance Advisory"
      ],
      image: aiLifecycleImg
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={servicesBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/85 to-background/75" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              The Framework
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Audit & Delivery Framework</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From "Ghost in the Machine" risks to Enterprise Scale. A structured path to operationalising AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card key={index} className="flex flex-col border-border hover:border-accent/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="relative h-56 overflow-hidden shrink-0">
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
                <CardTitle className="text-2xl mb-1">{pillar.title}</CardTitle>
                <CardDescription className="text-lg font-bold text-accent">
                  {pillar.tagline}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {pillar.description}
                </p>
              </CardHeader>
              <CardContent className="grow">
                <h4 className="font-semibold text-sm mb-3 text-foreground uppercase tracking-wide opacity-80">Deliverables:</h4>
                <ul className="space-y-2">
                  {pillar.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild className="w-full group/btn" variant="outline">
                  <Link to={pillar.link}>
                    Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;