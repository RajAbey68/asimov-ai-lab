import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: 2 June 2026</p>

        <section className="space-y-6 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Who we are</h2>
            <p>
              Asimov AI is operated by Rajiv Abeysinghe trading as Antigravity Consulting,
              registered in England. Website: <a href="https://asimov-ai.org" className="text-accent hover:underline">asimov-ai.org</a>.
              Contact: <a href="mailto:info@asimov-ai.org" className="text-accent hover:underline">info@asimov-ai.org</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">What data we collect</h2>
            <p className="mb-2">When you use our services, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email address, and organisation (via consultation request forms)</li>
              <li>AI risk assessment responses and scores (via the assessment tool)</li>
              <li>Messages submitted through the chat widget</li>
              <li>Account data if you create a login (via Supabase Auth)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">How we use your data</h2>
            <p className="mb-2">We use your data to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide AI risk assessment and governance advisory services</li>
              <li>Generate your AI risk score and recommendations</li>
              <li>Communicate with you about your assessment or consultation</li>
              <li>Improve our frameworks and assessment methodology (anonymised and aggregated only)</li>
            </ul>
            <p className="mt-2">
              We do not sell your data, share it with third parties for marketing,
              or use it for purposes other than those stated above.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data processing</h2>
            <p>
              Assessment data and account information is stored securely via Supabase
              (hosted in the EU). Row-Level Security (RLS) is enabled on all database
              tables. Data in transit is encrypted via TLS 1.3.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">AI systems disclosure</h2>
            <p>
              Our website includes an AI-powered chat widget that may generate responses
              using large language models. These responses are not professional advice
              and are clearly labelled as AI-generated. Assessment scoring uses a
              deterministic rules-based system, not a generative AI model.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Lawful basis</h2>
            <p>
              Our lawful basis for processing your data is:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Legitimate interest</strong> (Article 6(1)(f) UK GDPR) — for consultation requests and general enquiries</li>
              <li><strong>Contract performance</strong> (Article 6(1)(b)) — for delivering assessment and audit services you have requested</li>
              <li><strong>Consent</strong> (Article 6(1)(a)) — for the AI chat widget, which you choose to engage with</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Your rights</h2>
            <p className="mb-2">Under UK GDPR you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Lodge a complaint with the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ico.org.uk</a>)</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email{" "}
              <a href="mailto:info@asimov-ai.org" className="text-accent hover:underline">info@asimov-ai.org</a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data retention</h2>
            <p>
              Assessment data is retained for the duration of the client relationship
              plus 6 years (consistent with professional services record-keeping obligations).
              Chat widget conversations are retained for 90 days then automatically purged.
              You may request earlier deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
            <p>
              This site uses functional cookies for authentication (Supabase session tokens).
              We do not use analytics cookies, advertising cookies, or third-party tracking scripts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-party processors</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Supabase</strong> (EU-hosted) — authentication and database</li>
              <li><strong>Vercel</strong> — website hosting and CDN</li>
              <li><strong>Google Fonts</strong> — font delivery (no personal data collected)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to this policy</h2>
            <p>
              We will update this page if our data practices change. The "last updated" date
              at the top reflects the most recent revision.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
