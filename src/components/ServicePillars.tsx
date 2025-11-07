import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Cpu, Mic } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";
import riskAssessmentImg from "@/assets/risk-assessment-ai.png";
import projectDeliveryImg from "@/assets/project-delivery.jpg";
import aiLifecycleImg from "@/assets/ai-ml-lifecycle.png";
import voiceAgentImg from "@/assets/voice-agent-ai.png";

const ServicePillars = () => {
  const pillars = [
    {
      icon: Shield,
      title: "AI Risk & Readiness Assessment",
      tagline: "Before you build, know your risks.",
      description: "We evaluate your organization's AI maturity, governance, and exposure under frameworks such as EU AI Act, ISO/IEC 42001, NIST AI RMF, COBIT 2019, and GDPR.",
      deliverables: [
        "AI System Inventory & Classification",
        "Risk Heatmaps & Readiness Reports",
        "Governance Roadmaps and Control Frameworks",
        "Executive Briefings for Board & CISO"
      ],
      image: riskAssessmentImg
    },
    {
      icon: Target,
      title: "AI Strategy & Implementation Planning",
      tagline: "From compliance to capability.",
      description: "We translate business ambition into practical AI strategy, identifying high-impact, low-risk opportunities and establishing robust governance models.",
      deliverables: [
        "High-impact AI opportunity identification",
        "Internal AI governance & human oversight models",
        "Procurement and vendor risk frameworks",
        "Responsible AI operating model definition",
        "EU AI Act conformity assessment preparation"
      ],
      image: aiLifecycleImg
    },
    {
      icon: Cpu,
      title: "Build AI Applications & AI Agents",
      tagline: "Where strategy becomes reality.",
      description: "Hands-on design, prototyping, and deployment of AI-powered solutions. We combine compliance-grade governance with real-world build capabilities.",
      deliverables: [
        "AI-powered web apps and dashboards",
        "Custom AI agents and copilots",
        "No-code and low-code automations",
        "ChatGPT, Claude, and Gemini integrations",
        "AI-driven data pipelines and workflow systems"
      ],
      image: projectDeliveryImg
    },
    {
      icon: Mic,
      title: "Voice, Vision & Multi-Agent Systems",
      tagline: "The new human interface.",
      description: "Specializing in cutting-edge AI interfaces that enable organizations to launch branded AI personalities and automated advisory tools without compromising governance.",
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
                <div className="absolute bottom-4 left-4 w-14 h-14 rounded-lg bg-gradient-accent flex items-center justify-center shadow-lg">
                  <pillar.icon className="w-7 h-7 text-accent-foreground" />
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