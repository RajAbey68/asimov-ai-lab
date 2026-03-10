import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import methodologyDiagram from "@/assets/methodology-diagram.png";
import assessmentFlow from "@/assets/assessment-flow.png";
import frameworkAlignment from "@/assets/framework-alignment.png";

const MethodologySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
            Our Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-slate-900">
            The Asimov-AI Governance Framework
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We evaluate AI systems across six risk domains using established governance
            frameworks — not theoretical models. Grounded in the EU AI Act, NIST AI RMF,
            ISO/IEC 42001, COBIT, and BSI guidance.
          </p>
        </div>

        {/* Three Visual Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Governance Radar */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={methodologyDiagram}
              alt="Asimov-AI Governance Radar showing six risk domains: Legal, Regulatory, Ethical, Reputational, IP, and Security"
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Six Risk Domains
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Legal, regulatory, ethical, reputational, IP, and security risk — assessed
              against EU AI Act, NIST, ISO 42001, and BSI standards.
            </p>
          </div>

          {/* Assessment Journey */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={assessmentFlow}
              alt="Assessment journey from 5-minute diagnostic to implementation roadmap"
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              From Assessment to Action
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A structured pathway: free diagnostic → risk score → executive summary →
              advisory session → implementation roadmap.
            </p>
          </div>

          {/* Framework Alignment */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={frameworkAlignment}
              alt="Asimov-AI methodology aligned with EU AI Act, NIST AI RMF, ISO 42001, and COBIT"
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Standards Alignment
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Grounded in established governance frameworks including EU AI Act, NIST,
              ISO 42001, COBIT, and BSI — not theoretical models.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/framework">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-blue-50 font-semibold text-base px-8 py-6"
            >
              Explore the Full Framework
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
