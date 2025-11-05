import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, Cog, Map, Rocket, Brain, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AIAgentConsultancy = () => {
  const consultancyServices = [
    {
      icon: Map,
      title: "AI Opportunity Mapping",
      description: "Comprehensive discovery process to identify high-impact AI agent use cases across your organization.",
      benefits: [
        "Business process analysis",
        "ROI assessment & prioritization",
        "Technology stack evaluation",
        "Risk-opportunity matrix"
      ],
      deliverables: "Strategic AI roadmap with prioritized initiatives"
    },
    {
      icon: GraduationCap,
      title: "Team Upskilling & Enablement",
      description: "Transform your workforce into AI-ready teams through hands-on training and mentorship programs.",
      benefits: [
        "Executive AI literacy workshops",
        "Technical team bootcamps",
        "Prompt engineering training",
        "AI governance certification"
      ],
      deliverables: "Certified AI-ready teams with practical skills"
    },
    {
      icon: Cog,
      title: "Custom AI Agent Solutions",
      description: "Bespoke AI agent development tailored to your specific business processes and requirements.",
      benefits: [
        "Autonomous workflow automation",
        "Multi-agent orchestration",
        "Enterprise integration",
        "Continuous optimization"
      ],
      deliverables: "Production-ready AI agents with full support"
    },
    {
      icon: Rocket,
      title: "AI-First Transformation",
      description: "End-to-end organizational transformation to embed AI capabilities at the core of your operations.",
      benefits: [
        "Culture & change management",
        "Operating model redesign",
        "Technology architecture",
        "Performance measurement"
      ],
      deliverables: "Fully transformed AI-first organization"
    }
  ];

  const packages = [
    {
      name: "Discovery Sprint",
      duration: "2-4 weeks",
      description: "Rapid assessment to identify immediate AI opportunities",
      included: ["Opportunity mapping", "Quick wins identification", "Pilot project scoping"],
      price: "From £15,000"
    },
    {
      name: "Foundation Program",
      duration: "3 months",
      description: "Comprehensive readiness program for AI adoption",
      included: ["Full opportunity mapping", "Team training", "2 pilot AI agents", "Integration support"],
      price: "From £50,000",
      popular: true
    },
    {
      name: "Transformation Partnership",
      duration: "6-12 months",
      description: "Strategic partnership for complete AI-first evolution",
      included: ["All Foundation services", "Custom AI solutions", "Continuous optimization", "Executive advisory"],
      price: "Custom pricing"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Agent Consultancy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Agent Turnkey Projects
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transform your organization into an AI-first enterprise with our proven consultancy framework. 
            From opportunity discovery to full-scale deployment, we guide you through every step of your AI journey.
          </p>
        </div>

        {/* Consultancy Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {consultancyServices.map((service, index) => (
            <Card key={index} className="border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-accent">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Deliverable: {service.deliverables}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Turnkey Packages */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Turnkey Engagement Packages</h3>
            <p className="text-muted-foreground">
              Choose the right level of support for your AI transformation journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`border-border hover:shadow-xl transition-all ${
                  pkg.popular ? 'border-accent/50 ring-2 ring-accent/20 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-accent text-accent-foreground text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base">
                    {pkg.duration}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Includes:</h4>
                      <ul className="space-y-2">
                        {pkg.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-2xl font-bold mb-4">{pkg.price}</p>
                      <Button 
                        className="w-full group"
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Become an AI-First Organization?
              </h3>
              <p className="text-muted-foreground mb-6">
                Schedule a consultation with our AI transformation experts to discuss your unique requirements and create a tailored roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIAgentConsultancy;
