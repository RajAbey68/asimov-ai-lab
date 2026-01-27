import { ArrowRight, Shield, Brain, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              <Shield className="h-4 w-4 mr-2" />
              EU AI Act Compliance Experts
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Navigate AI with{" "}
              <span className="text-accent">Confidence</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-primary-foreground/80 max-w-xl">
              Expert AI risk assessment and governance services to help your organization 
              implement AI responsibly and comply with emerging regulations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center rounded-md border-2 border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Stats/Features Cards */}
          <div className="grid gap-4">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-accent p-3">
                  <Brain className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Risk Assessment</h3>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    Comprehensive evaluation of your AI systems against global regulatory frameworks
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-accent p-3">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Governance Framework</h3>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    Build robust AI governance structures aligned with EU AI Act requirements
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-accent p-3">
                  <FileCheck className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Compliance Certification</h3>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    Documentation and evidence packages for regulatory audits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
