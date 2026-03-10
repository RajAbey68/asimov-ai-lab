import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent z-0" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          {/* Left Column — Copy */}
          <div className="space-y-8">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <Shield className="w-4 h-4 text-brand-blue" />
              <span className="text-brand-blue text-sm font-semibold tracking-wide uppercase">
                AI Risk Assessment &amp; Governance
              </span>
            </div>

            {/* Headline — Priestley-style clarity */}
            <h1
              id="hero-heading"
              className="text-4xl lg:text-5xl xl:text-6xl font-display font-medium leading-[1.15] text-slate-900"
            >
              AI Risk Assessment for{" "}
              <span className="text-brand-blue">Professional Services</span>{" "}
              &amp; Regulated Organisations
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              Identify legal, regulatory and operational risks in your AI systems.
              Board-ready governance in 6 weeks.
            </p>

            {/* Trust bullets */}
            <ul className="space-y-3 text-left">
              {[
                "EU AI Act readiness assessment",
                "Governance & risk scoring",
                "Board-ready assessment report"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 text-base">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/free-assessment">
                <Button
                  size="lg"
                  className="bg-brand-blue text-white hover:bg-blue-600 font-semibold text-base px-8 py-6 shadow-lg shadow-brand-blue/15 w-full sm:w-auto"
                >
                  Take the 5-Minute AI Risk Score
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/#book-consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:border-brand-blue hover:text-brand-blue font-semibold text-base px-8 py-6 w-full sm:w-auto"
                >
                  Book Leadership Briefing
                </Button>
              </Link>
            </div>

            {/* Standards alignment — subtle trust strip */}
            <div className="pt-4">
              <p className="text-sm text-slate-400 font-medium">
                Aligned with{" "}
                <span className="text-slate-600 font-semibold">EU AI Act</span>{" · "}
                <span className="text-slate-600 font-semibold">NIST AI RMF</span>{" · "}
                <span className="text-slate-600 font-semibold">ISO/IEC 42001</span>
              </p>
            </div>
          </div>

          {/* Right Column — Visual */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-8 shadow-sm">
              {/* Assessment Preview Card */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">AI Risk Score</h3>
                    <p className="text-sm text-slate-500">Strategic diagnostic</p>
                  </div>
                </div>
                
                {/* Simulated score visualization */}
                <div className="space-y-4">
                  {[
                    { label: "Regulatory Readiness", pct: 72, color: "bg-brand-blue" },
                    { label: "Data Governance", pct: 45, color: "bg-blue-400" },
                    { label: "Ethical Alignment", pct: 88, color: "bg-brand-blue" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">{item.label}</span>
                        <span className="text-slate-900 font-bold">{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-blue-100">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Sample output · 10 questions · ~5 minutes
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

export default Hero;
