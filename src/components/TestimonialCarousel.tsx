import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Users, FileCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const engagementHighlights = [
  {
    icon: Shield,
    title: "Barrister-Led Governance",
    description: "AI governance frameworks designed with input from Dr Nick Lockett, a dual-qualified barrister and solicitor specialising in AI law and regulatory compliance."
  },
  {
    icon: FileCheck,
    title: "Structured Methodology",
    description: "The ASIMOV model (Audit, Secure, Implement, Measure, Operate, Validate) provides a systematic, repeatable approach to responsible AI deployment."
  },
  {
    icon: Users,
    title: "Professional Services Focus",
    description: "Purpose-built for mid-tier law firms and regulated organisations navigating AI governance obligations."
  },
  {
    icon: Zap,
    title: "Aligned with Leading Frameworks",
    description: "Our assessments are structured around the EU AI Act, NIST AI RMF, ISO/IEC 42001, and BSI guidance."
  }
];

const TestimonialCarousel = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Why Asimov AI
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Expert-Led AI{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Governance
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Structured AI governance advisory for professional services firms, led by a team that combines legal expertise with technical rigour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {engagementHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg hover:border-accent/50 transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-accent shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{highlight.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="inline-block border-accent/30 bg-accent/5 backdrop-blur">
            <CardContent className="p-8">
              <p className="text-lg font-medium mb-4">
                Ready to understand your AI governance obligations?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/free-assessment">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    Take the Free AI Risk Score
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/#book-consultation">
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
