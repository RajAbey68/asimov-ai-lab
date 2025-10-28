import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, FileCheck, Users, Layers, Sparkles } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "AI Risk Assessment",
      description: "Comprehensive evaluation of AI systems to identify vulnerabilities, compliance gaps, and operational risks before deployment.",
      features: ["Regulatory Compliance", "Security Analysis", "Bias Detection", "Impact Assessment"]
    },
    {
      icon: Rocket,
      title: "AI Project Delivery",
      description: "End-to-end execution of AI initiatives from strategy to deployment, ensuring quality, speed, and alignment with business goals.",
      features: ["Strategy Development", "Model Development", "Integration Services", "Performance Optimization"]
    },
    {
      icon: FileCheck,
      title: "Rapid Assessment",
      description: "Quick turnaround risk evaluation for time-sensitive projects, delivering actionable insights in days, not weeks.",
      features: ["Fast Analysis", "Priority Scoring", "Immediate Recommendations", "Compliance Checking"]
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Access to seasoned AI professionals who provide strategic guidance and technical expertise throughout your AI journey.",
      features: ["Technical Advisory", "Best Practices", "Architecture Review", "Team Training"]
    },
    {
      icon: Layers,
      title: "Integration Support",
      description: "Seamless integration of AI solutions into your existing infrastructure with minimal disruption and maximum efficiency.",
      features: ["API Integration", "Legacy System Support", "Cloud Migration", "Workflow Automation"]
    },
    {
      icon: Sparkles,
      title: "Continuous Monitoring",
      description: "Ongoing surveillance of deployed AI systems to ensure sustained performance, security, and compliance over time.",
      features: ["Real-time Monitoring", "Drift Detection", "Performance Metrics", "Alert Management"]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={servicesBg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your organization's unique needs and challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
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

export default Services;
