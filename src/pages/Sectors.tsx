import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Heart, Scale, Factory, AlertTriangle, Shield, CheckCircle2 } from "lucide-react";
import sectorFinancial from "@/assets/sector-financial.jpg";
import sectorMedical from "@/assets/sector-medical.jpg";
import sectorLegal from "@/assets/sector-legal.jpg";
import sectorManufacturing from "@/assets/sector-manufacturing.jpg";
import sectorAiRoom from "@/assets/sector-ai-room.jpg";

const Sectors = () => {
  const sectors = [
    {
      icon: Building2,
      name: "Financial Services",
      tagline: "Protect Client Trust & Meet Regulatory Requirements",
      image: sectorFinancial,
      risks: [
        "Client financial data breaches",
        "Regulatory fines and compliance failures",
        "Loss of client trust and reputation damage",
        "AI-driven trading or advisory algorithm failures",
      ],
      solutions: [
        "AI risk assessments aligned with financial regulations (GDPR, PCI-DSS, DORA)",
        "Data governance frameworks for sensitive financial information",
        "Model validation and explainability for AI-driven decisions",
        "Incident response planning for data breaches",
      ],
      frameworks: ["ISO 27001", "PCI-DSS", "GDPR", "DORA", "MiFID II"],
    },
    {
      icon: Heart,
      name: "Healthcare & Medical",
      tagline: "Ensure HIPAA Compliance & Patient Safety",
      image: sectorMedical,
      risks: [
        "Patient PHI exposure and HIPAA violations",
        "Medical AI diagnostic errors affecting patient outcomes",
        "Regulatory penalties and criminal liability",
        "Trust erosion with patients and partners",
      ],
      solutions: [
        "HIPAA-compliant AI risk assessments",
        "Clinical AI validation and safety protocols",
        "Privacy-preserving AI implementation strategies",
        "Medical device AI compliance (FDA, MDR)",
      ],
      frameworks: ["HIPAA", "FDA 21 CFR Part 11", "ISO 13485", "EU MDR", "GDPR"],
    },
    {
      icon: Scale,
      name: "Legal Services",
      tagline: "Safeguard Privilege & Client Confidentiality",
      image: sectorLegal,
      risks: [
        "Attorney-client privilege compromised by AI systems",
        "Criminal exposure from confidential data leaks",
        "Professional liability and malpractice claims",
        "AI-assisted legal research producing incorrect precedents",
      ],
      solutions: [
        "Privileged information protection frameworks for AI",
        "Legal AI tool evaluation and risk assessment",
        "Data residency and sovereignty compliance",
        "AI ethics alignment with professional conduct rules",
      ],
      frameworks: ["ABA Model Rules", "GDPR", "ISO 27001", "SOC 2", "Legal Privilege Laws"],
    },
    {
      icon: Factory,
      name: "Manufacturing",
      tagline: "Secure IP & Operational Technology",
      image: sectorManufacturing,
      risks: [
        "Production data leaks to competitors",
        "Trade secret theft through AI systems",
        "Supply chain AI vulnerabilities",
        "Quality control AI failures causing product defects",
      ],
      solutions: [
        "Industrial AI risk assessments for OT/IT convergence",
        "IP protection strategies for AI-driven R&D",
        "Supply chain AI security frameworks",
        "Quality management system integration with AI controls",
      ],
      frameworks: ["ISO 9001", "ISO 27001", "IATF 16949", "IEC 62443", "NIS2"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sectorAiRoom})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              Sector-Specific AI Risk Management
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Tailored AI Compliance for SMEs
            </h1>
            <p className="text-xl text-muted-foreground">
              Industry-specific AI risk management designed for small to medium enterprises 
              facing sector-specific regulatory and operational challenges
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {sectors.map((sector, index) => (
              <Card key={sector.name} className="overflow-hidden border-border hover:border-accent/50 transition-all">
                <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-[400px] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <img 
                      src={sector.image} 
                      alt={`${sector.name} crisis scenario`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                          <sector.icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{sector.name}</CardTitle>
                          <CardDescription className="text-base">{sector.tagline}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                      {/* Risks */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                          <h3 className="font-semibold text-lg">Critical Risks</h3>
                        </div>
                        <ul className="space-y-2">
                          {sector.risks.map((risk, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-destructive mt-1">•</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-accent" />
                          <h3 className="font-semibold text-lg">Our Solutions</h3>
                        </div>
                        <ul className="space-y-2">
                          {sector.solutions.map((solution, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Frameworks */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Relevant Frameworks</h4>
                        <div className="flex flex-wrap gap-2">
                          {sector.frameworks.map((framework) => (
                            <Badge key={framework} variant="outline" className="text-xs">
                              {framework}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full sm:w-auto">
                        Request Sector Assessment
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't See Your Sector?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We work with organizations across all industries. Contact us to discuss 
            your specific sector requirements and how we can tailor our AI risk management approach.
          </p>
          <Button size="lg" className="gap-2">
            Schedule a Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sectors;
