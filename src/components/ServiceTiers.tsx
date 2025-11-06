import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Rocket, LifeBuoy, Check } from "lucide-react";

const ServiceTiers = () => {
  const tiers = [
    {
      icon: Shield,
      name: "Asimov Assess™",
      tagline: "Know Your Risk. Build Your Roadmap.",
      description: "Multi-framework assessment across EU AI Act, NIST, ISO 42001, PCI-DSS and more—with actionable roadmaps.",
      features: [
        "Multi-framework compliance assessment",
        "EU AI Act, NIST AI RMF, ISO 42001",
        "PCI-DSS, SOC 2, custom frameworks",
        "Gap analysis & risk classification",
        "Sprint-based implementation roadmap",
        "Expert consultation & strategic planning"
      ],
      cta: "Start Assessment",
      highlight: false
    },
    {
      icon: Rocket,
      name: "Asimov Comply™",
      tagline: "From Requirements to Reality.",
      description: "Agile, demand-based delivery—turning your compliance roadmap into deployed AI systems.",
      features: [
        "Demand-based sprint planning",
        "Agile development & integration",
        "Compliance documentation production",
        "Testing & validation protocols",
        "Deployment & launch execution",
        "Roadmap tracking & reporting"
      ],
      cta: "Get Started",
      highlight: true
    },
    {
      icon: LifeBuoy,
      name: "Asimov Shield™",
      tagline: "Stay Compliant. Stay Competitive.",
      description: "Continuous monitoring and adaptive compliance management as regulations evolve.",
      features: [
        "Real-time compliance monitoring",
        "Regulatory change alerts",
        "Quarterly compliance reviews",
        "Documentation updates",
        "Incident response support",
        "Advisory retainer access"
      ],
      cta: "Learn More",
      highlight: false
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Complete AI Compliance Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Assess against any framework. Execute with agile roadmaps. Maintain compliance continuously—
            all tailored to your industry and risk profile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative ${
                tier.highlight 
                  ? 'border-accent shadow-xl scale-105' 
                  : 'border-border hover:border-accent/50'
              } transition-all`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-accent flex items-center justify-center">
                  <tier.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {tier.tagline}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className={`w-full ${
                    tier.highlight 
                      ? 'bg-accent hover:bg-accent/90' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  size="lg"
                >
                  <a href="#book-consultation">{tier.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which service you need? Book a free consultation to discuss your requirements.
          </p>
          <Button asChild variant="outline" size="lg">
            <a href="#book-consultation">Schedule Free Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;
