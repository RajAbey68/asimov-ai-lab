import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Zap, Award, DollarSign, Clock } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "2×",
    label: "Faster Compliance",
    description: "Assessment cycles accelerated through structured evidence mapping"
  },
  {
    icon: Shield,
    value: "35%",
    label: "Audit Improvement",
    description: "Higher audit scores via bias controls and privacy frameworks"
  },
  {
    icon: Zap,
    value: "40%",
    label: "Technical Debt Cut",
    description: "Reduced through strategic application refactoring"
  },
  {
    icon: DollarSign,
    value: "20%",
    label: "Cost Reduction",
    description: "Infrastructure costs cut through modernization"
  },
  {
    icon: Clock,
    value: "25%",
    label: "Faster Delivery",
    description: "Proof-of-concept to production cycles accelerated"
  },
  {
    icon: Award,
    value: "98%",
    label: "On-Time Delivery",
    description: "Cross-functional teams achieving delivery excellence"
  }
];

const ProvenResults = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Measurable Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven Results Across{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              27 Years
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real outcomes achieved across financial services, healthcare, and public sector organisations—from compliance acceleration to operational excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent mb-6 group-hover:scale-110 transition-transform">
                  <metric.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-accent bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-xl font-semibold mb-3">
                  {metric.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-gradient-subtle">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                The ASIMOV-AI Difference
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our governance framework aligns with <span className="font-semibold text-foreground">EU AI Act</span>, 
                <span className="font-semibold text-foreground"> NIST AI RMF</span>, 
                <span className="font-semibold text-foreground"> ISO/IEC 42001</span>, and 
                <span className="font-semibold text-foreground"> GDPR</span>—adopted as a reference model for AI readiness maturity by organisations across finance, healthcare, and the public sector.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProvenResults;
