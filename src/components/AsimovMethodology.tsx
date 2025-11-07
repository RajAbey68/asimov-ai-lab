import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const AsimovMethodology = () => {
  const phases = [
    {
      phase: "A — Audit",
      objective: "Identify AI assets, risks, and exposure.",
      outcome: "System registry, gap analysis"
    },
    {
      phase: "S — Secure",
      objective: "Define ethical, legal, and technical controls.",
      outcome: "Governance baseline"
    },
    {
      phase: "I — Implement",
      objective: "Deploy AI products responsibly.",
      outcome: "Documented build & review"
    },
    {
      phase: "M — Measure",
      objective: "Quantify bias, accuracy, performance, ROI.",
      outcome: "AI risk dashboard"
    },
    {
      phase: "O — Operate",
      objective: "Maintain lifecycle oversight & retraining.",
      outcome: "Continuous assurance"
    },
    {
      phase: "V — Validate",
      objective: "Evidence alignment with AI Act & ISO 42001.",
      outcome: "External audit readiness"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The ASIMOV-AI Model
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Audit, Secure, Implement, Measure, Operate, Validate — a systematic approach to responsible AI deployment
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((item, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.phase}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.objective}</p>
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {item.outcome}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-accent/50 bg-gradient-to-br from-background to-muted/30">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Professional but Creative. Enterprise Trust with Experimentation.
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our methodology mirrors Morningside AI's clarity and credibility — showing the future, not the fear. 
                  We balance compliance-grade governance with real-world innovation velocity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AsimovMethodology;