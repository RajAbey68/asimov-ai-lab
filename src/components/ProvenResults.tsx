import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Zap, Award, DollarSign, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

const leadershipOutcomes = [
  {
    icon: Shield,
    label: "Board-Level Clarity",
    description: "Translate technical AI risks into clear governance dashboards. Know exactly who is accountable for every AI decision."
  },
  {
    icon: Zap,
    label: "Reduced Regulatory Exposure",
    description: "We help organisations identify and understand their AI compliance obligations, supporting proactive risk management."
  },
  {
    icon: CheckCircle2,
    label: "Defensible Delivery Decisions",
    description: "Structured documentation to support your audit preparation and governance processes."
  },
  {
    icon: TrendingUp,
    label: "Continuous Assurance",
    description: "Ongoing advisory support to monitor governance posture as your AI systems evolve."
  },
  {
    icon: DollarSign,
    label: "Protect Intellectual Property",
    description: "Zero-data training policies ensure your proprietary knowledge never leaks into public foundational models."
  },
  {
    icon: Clock,
    label: "Accelerated Time-to-Trust",
    description: "Our structured frameworks are designed to help streamline your path to compliant AI deployment."
  }
];

const ProvenResults = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Strategic Value
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Leadership <span className="text-brand-blue">Outcomes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Moving beyond technical metrics to business-critical assurance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {leadershipOutcomes.map((outcome, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card hover:border-accent/50 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent group-hover:scale-110 transition-transform shadow-lg">
                    <outcome.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>

                <div className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {outcome.label}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {outcome.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strategic Advantage</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvenResults;
