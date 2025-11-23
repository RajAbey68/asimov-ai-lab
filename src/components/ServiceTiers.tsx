import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Rocket, LifeBuoy, Check } from "lucide-react";

const ServiceTiers = () => {
  const services = [
    {
      icon: Shield,
      name: "AI Risk & Compliance",
      tagline: "Know your risks. Build your roadmap.",
      description: "Comprehensive assessment across EU AI Act, NIST AI RMF, ISO 42001, and custom frameworks. From initial inventory to board-ready reports.",
      capabilities: [
        "Multi-framework compliance assessment (EU AI Act, NIST, ISO 42001)",
        "AI system inventory & risk classification",
        "Gap analysis & control framework design",
        "Governance roadmaps & policy development",
        "Executive briefings & audit preparation",
        "Continuous monitoring & regulatory tracking"
      ],
      deliverables: [
        "Risk Assessment Report",
        "Compliance Roadmap",
        "Control Framework",
        "Board Presentation"
      ],
      cta: "Schedule Assessment",
      highlight: false,
      sectors: "FT500, Government, Healthcare, Financial Services"
    },
    {
      icon: Rocket,
      name: "AI Application Design & Delivery",
      tagline: "From strategy to production-ready systems.",
      description: "End-to-end AI application development with built-in compliance. We design, prototype, and deploy AI-powered solutions that work.",
      capabilities: [
        "Custom AI-powered web applications & dashboards",
        "Data pipeline design & automation",
        "LLM integration (ChatGPT, Claude, Gemini)",
        "No-code/low-code AI automations",
        "API development & system integration",
        "Deployment, testing & documentation"
      ],
      deliverables: [
        "Production Application",
        "Technical Documentation",
        "Training Materials",
        "Support Handover"
      ],
      cta: "Start Your Project",
      highlight: true,
      sectors: "Enterprises, Startups, Innovation Teams"
    },
    {
      icon: LifeBuoy,
      name: "AI Agents & Voice Assistants",
      tagline: "The new human-AI interface.",
      description: "Specialized design and deployment of conversational AI, voice interfaces, and multi-agent systems with enterprise-grade security.",
      capabilities: [
        "AI voice assistants (Bland AI, VAPI, SynthFlow)",
        "Branded AI personalities & copilots",
        "Multi-agent orchestration systems",
        "AI video & avatar automation (HeyGen, Runway)",
        "Customer service & sales automation",
        "Compliance-grade conversational AI"
      ],
      deliverables: [
        "Deployed AI Agent",
        "Integration Pack",
        "Safety Controls",
        "Performance Dashboard"
      ],
      cta: "Explore AI Agents",
      highlight: false,
      sectors: "Customer Service, Sales, Support Operations"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Boutique AI Consultancy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Three Core Service Lines
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you need compliance expertise, application delivery, or conversational AI—we combine strategic thinking with hands-on execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`relative ${
                service.highlight 
                  ? 'border-accent shadow-2xl scale-105 bg-accent/5' 
                  : 'border-border hover:border-accent/50'
              } transition-all hover:shadow-xl`}
            >
              {service.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Best for Measurable Outcomes
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-accent flex items-center justify-center shadow-md">
                  <service.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {service.tagline}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Core Capabilities</h4>
                  <ul className="space-y-2">
                    {service.capabilities.map((capability, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Key Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Typical Clients</h4>
                  <p className="text-xs text-muted-foreground">{service.sectors}</p>
                </div>

                <Button 
                  asChild 
                  className={`w-full mt-4 ${
                    service.highlight 
                      ? 'bg-accent hover:bg-accent/90' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  size="lg"
                >
                  <a href="#book-consultation">{service.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="bg-muted/50 border border-border/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Collaborative Approach</h3>
            <p className="text-sm text-muted-foreground">
              We work closely with your existing practices, internal subject matter experts, and external specialists to ensure seamless integration and knowledge transfer. Your team's expertise combined with our governance framework delivers sustainable, business-aligned outcomes.
            </p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3">Not sure which service fits your needs?</h3>
            <p className="text-muted-foreground mb-6">
              Book a free 30-minute consultation to discuss your AI strategy, compliance requirements, and implementation goals. We'll help you identify the right approach.
            </p>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <a href="#book-consultation">Schedule Free Consultation</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;
