import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: 2 June 2026</p>

        <section className="space-y-6 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">About Asimov AI</h2>
            <p>
              Asimov AI (asimov-ai.org) is an AI governance consultancy providing
              risk assessment, audit, and advisory services. It is operated by
              Rajiv Abeysinghe trading as Antigravity Consulting, registered in England.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Services</h2>
            <p>
              Asimov AI provides AI risk assessments, governance audits using the
              251-control ASIMOV framework, EU AI Act compliance gap analysis,
              and advisory services. Our online tools include a free AI risk scoring
              tool and an AI-powered chat widget.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Not professional advice</h2>
            <p>
              The content on this website, including AI risk scores, framework outputs,
              chat widget responses, and educational materials, is informational and
              educational. <strong>It does not constitute legal, regulatory, financial,
              or professional advice.</strong> The content is designed to inform your
              own professional judgement, not to replace it. You remain responsible
              for your own regulatory compliance decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">AI-generated content</h2>
            <p>
              Our chat widget uses large language models to generate responses.
              These responses are clearly labelled as AI-generated and are not
              reviewed by a human before delivery. They should not be relied upon
              as professional advice. For formal governance advice, request a
              consultation with a named team member.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Assessment methodology</h2>
            <p>
              The AI risk scoring tool uses a rules-based scoring methodology
              derived from the ASIMOV 251-control framework (COBIT/NIST-aligned).
              It is a screening tool, not a formal audit. A formal audit requires
              a named assessor, evidence collection, and Four-Eyes sign-off under
              our quality assurance process.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Regulatory references</h2>
            <p>
              Where we reference the EU AI Act, NIST AI RMF, ISO 42001, SRA, FCA,
              ICO, or other regulatory bodies and standards, we do so for informational
              purposes. Regulatory positions change. We review our references quarterly
              but cannot guarantee they reflect the latest position. Always verify
              with the relevant body directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Intellectual property</h2>
            <p>
              The ASIMOV 251-control audit framework, Three Lines of Defence model
              adaptation, Crawl-Walk-Run-Fly maturity model, and all associated
              content are the intellectual property of Asimov AI / Antigravity
              Consulting. Clients receive a licence to use assessment outputs
              within their own organisation but may not redistribute, resell,
              or republish the framework methodology.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Relationship with AI Integrity</h2>
            <p>
              Asimov AI and AI Integrity (ai-integ.com) are part of the same ecosystem.
              Asimov AI provides formal governance audits. AI Integrity provides a
              community-led implementation platform for SME professional services firms.
              A referral between the two does not create any obligation to purchase services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Escalation and complaints</h2>
            <p>
              If you have concerns about any assessment output, AI-generated content,
              or advisory recommendation, contact{" "}
              <a href="mailto:info@asimov-ai.org" className="text-accent hover:underline">info@asimov-ai.org</a>{" "}
              with the subject line "Escalation". Rajiv Abeysinghe is the named
              accountable person for all complaints and will respond within 5 working days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Asimov AI accepts no liability
              for any loss arising from reliance on the content of this website,
              AI risk scores, chat widget responses, or assessment outputs. This includes
              but is not limited to regulatory penalties, client claims, or business
              losses arising from AI governance decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:info@asimov-ai.org" className="text-accent hover:underline">info@asimov-ai.org</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
