import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Zap, Award, DollarSign, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

const goals = [
  {
    icon: TrendingUp,
    label: "Accelerate Compliance",
    description: "We aim to streamline your assessment cycles through structured evidence mapping and clear frameworks"
  },
  {
    icon: Shield,
    label: "Strengthen Audit Readiness",
    description: "Our goal is to help you build robust controls and privacy frameworks that stand up to scrutiny"
  },
  {
    icon: Zap,
    label: "Reduce Technical Debt",
    description: "We work to identify and eliminate complexity through strategic refactoring and governance integration"
  },
  {
    icon: DollarSign,
    label: "Optimize Resources",
    description: "We aim to help you deploy AI efficiently, avoiding costly compliance mistakes and rework"
  },
  {
    icon: Clock,
    label: "Speed to Production",
    description: "Our focus is reducing the gap between proof-of-concept and compliant production deployment"
  },
  {
    icon: Award,
    label: "Deliver with Confidence",
    description: "We strive to ensure your AI projects launch on schedule with governance built in from day one"
  }
];

const ProvenResults = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Our Commitments
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What We{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Aim to Achieve
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Clear goals that guide our work with organizations across finance, healthcare, and the public sector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {goals.map((goal, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card hover:border-accent/50 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent group-hover:scale-110 transition-transform shadow-lg">
                    <goal.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                
                <div className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {goal.label}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {goal.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Goal-driven approach</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-gradient-subtle">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Our Approach
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We help organizations align with established frameworks including{" "}
                <span className="font-semibold text-foreground">EU AI Act</span>,{" "}
                <span className="font-semibold text-foreground">NIST AI RMF</span>,{" "}
                <span className="font-semibold text-foreground">ISO/IEC 42001</span>, and{" "}
                <span className="font-semibold text-foreground">GDPR</span>. Our goal is to make AI governance 
                practical and integrated into your existing workflows—not a compliance burden bolted on afterward.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProvenResults;
