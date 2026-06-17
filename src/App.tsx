import { useState } from "react";
import { homepageCopy } from "./content/homepage";

export function App() {
  const [formData, setFormData] = useState<Record<string, string>>({
    full_name: "",
    job_title: "",
    organisation: "",
    sector: "",
    headcount: "",
    concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please consent to the privacy policy.");
      return;
    }
    setLoading(true);
    setError("");
    setRoadmap("");
    try {
      const response = await fetch(
        "https://qcawafyfaqjwolgczhap.supabase.co/functions/v1/lead-intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Form submission failed.");
      }
      setRoadmap(data.roadmap);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen font-sans bg-zinc-950 text-zinc-100 flex flex-col"
      style={{ backgroundColor: "var(--color-navy)", color: "var(--color-white)" }}
    >
      <header className="border-b border-white/5 sticky top-0 bg-zinc-950/80 backdrop-blur z-50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <a href="/" aria-label="ASIMOV AI — return to homepage">
            <span
              className="text-lg font-bold tracking-widest uppercase flex items-center gap-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-amber)" }}
            >
              <span className="material-symbols-outlined text-sm">security</span>
              ASIMOV AI
            </span>
          </a>
          <nav aria-label="Primary navigation">
            <ul className="flex gap-8 text-xs font-mono tracking-wider uppercase list-none m-0 p-0 items-center">
              <li>
                <a href="#audit" className="text-zinc-400 hover:text-white transition-colors">
                  The Audit
                </a>
              </li>
              <li>
                <a href="#principals" className="text-zinc-400 hover:text-white transition-colors">
                  Principals
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#diagnostic"
                  className="rounded px-4 py-2 text-xs font-bold transition-all border hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "var(--color-amber)",
                    color: "var(--color-navy)",
                    borderColor: "var(--color-amber)",
                  }}
                >
                  Book Assessment
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Alert Banner */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            CRITICAL DEADLINE ALERT: EU AI ACT (AUG 2026)
          </div>
        </div>

        {/* Hero */}
        <section aria-labelledby="hero-heading" className="mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest block mb-4"
                style={{ color: "var(--color-amber)" }}
              >
                ASIMOV AI · STRATEGIC ADVISORY & RISK TRIAGE
              </span>
              {homepageCopy.hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl font-light">
              {homepageCopy.hero.subhead}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#diagnostic"
                className="rounded px-6 py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: "var(--color-amber)", color: "var(--color-navy)" }}
              >
                {homepageCopy.hero.primaryCta.label}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                href="#audit"
                className="rounded px-6 py-3 text-sm font-semibold border border-white/10 text-zinc-300 hover:border-white/30 transition-colors"
              >
                {homepageCopy.hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </section>

        {/* Hooks / Friction Points */}
        <section className="bg-zinc-900/30 py-20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {homepageCopy.hooks.map((hook) => (
                <div
                  key={hook.id}
                  className="space-y-4 border border-white/5 p-6 rounded bg-zinc-900/20"
                >
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {hook.headline}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{hook.body}</p>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-amber)" }}
                  >
                    {hook.subhook}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The ASIMOV Audit Product */}
        <section id="audit" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/5">
          <div className="max-w-3xl mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.product.headline}
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed">{homepageCopy.product.subhead}</p>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
              {homepageCopy.product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homepageCopy.product.domains.map((dom) => (
              <div key={dom.id} className="border border-white/5 rounded p-6 bg-zinc-900/10">
                <h4
                  className="font-mono text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: "var(--color-amber)" }}
                >
                  {dom.label}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{dom.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outputs */}
        <section className="bg-zinc-900/30 py-20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="text-2xl md:text-3xl font-bold mb-12 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.outputs.headline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {homepageCopy.outputs.items.map((item) => (
                <div key={item.label} className="border border-white/5 rounded p-6 bg-zinc-900/10">
                  <h3 className="font-bold text-base mb-2 text-white">{item.label}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-zinc-500 italic">
              {homepageCopy.outputs.signedNote}
            </p>
          </div>
        </section>

        {/* Principals */}
        <section id="principals" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/5">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {homepageCopy.principals.headline}
          </h2>
          <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto text-sm leading-relaxed">
            {homepageCopy.principals.subhead}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {homepageCopy.principals.people.map((person) => (
              <div
                key={person.name}
                className="border border-white/5 rounded p-6 bg-zinc-900/20 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{person.name}</h3>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-wider mb-4"
                    style={{ color: "var(--color-amber)" }}
                  >
                    {person.role}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{person.credential}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-zinc-900/30 py-20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.pricing.headline}
            </h2>
            <p className="text-center text-zinc-500 mb-16 italic text-xs">
              {homepageCopy.pricing.signal}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {homepageCopy.pricing.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="border border-white/5 rounded p-6 bg-zinc-900/10 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">{tier.name}</h3>
                    <p className="text-xs font-mono text-zinc-500 mb-4">{tier.duration}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">{tier.description}</p>
                  </div>
                  <p
                    className="font-mono text-sm font-semibold"
                    style={{ color: "var(--color-amber)" }}
                  >
                    {tier.from}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagnostic Intake form */}
        <section className="mx-auto max-w-3xl px-6 py-20 border-t border-white/5" id="diagnostic">
          <div className="bg-zinc-900/40 border border-white/5 rounded p-8">
            <h2
              className="text-xl md:text-2xl font-bold mb-2 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.diagnostic.headline}
            </h2>
            <p className="text-zinc-400 text-center mb-8 text-sm leading-relaxed">
              {homepageCopy.diagnostic.body}
            </p>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-4 text-zinc-300">
              {homepageCopy.diagnostic.intakeLabel}
            </p>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded">
                    {error}
                  </div>
                )}
                {homepageCopy.diagnostic.intakeFields.map((f) => (
                  <div key={f.id} className="space-y-1 text-left">
                    <label
                      htmlFor={f.id}
                      className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1"
                    >
                      <span>&gt;</span> {f.label}
                    </label>
                    <input
                      type="text"
                      id={f.id}
                      required
                      value={formData[f.id] || ""}
                      onChange={handleInputChange}
                      placeholder={f.placeholder}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-green-400 font-mono transition-colors"
                    />
                  </div>
                ))}
                <div className="flex items-start gap-2 mt-4 text-left">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-green-400"
                  />
                  <label htmlFor="privacy-consent" className="text-xs text-zinc-400">
                    I consent to the processing of my data in accordance with the{" "}
                    <a href="/privacy" className="underline hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-center rounded py-3 text-xs font-bold font-mono uppercase tracking-wider transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-amber)", color: "var(--color-navy)" }}
                  >
                    {loading ? "Generating Roadmap..." : homepageCopy.diagnostic.cta.label}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-left">
                <div className="text-xs text-green-400 bg-green-950/20 border border-green-500/20 p-4 rounded font-mono">
                  ✓ Submission successful. Custom 90-Day Crawl-Walk-Run-Fly Roadmap generated.
                </div>
                <div className="border border-white/10 bg-zinc-950 p-6 rounded">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3 border-b border-white/5 pb-2">
                    GENERATED EXECUTIVE ANALYSIS
                  </span>
                  <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {roadmap}
                  </div>
                </div>
                <div className="text-center pt-4">
                  <a
                    href="https://skool.com/ghostwriter-tandem-6940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded px-8 py-3.5 text-xs font-bold font-mono uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "var(--color-amber)", color: "var(--color-navy)" }}
                  >
                    Join the Skool Community
                    <span className="material-symbols-outlined text-sm">login</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Cross-Referral */}
        <section className="border-t border-white/5 py-20 bg-zinc-900/10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.crossReferral.headline}
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed text-sm font-light">
              {homepageCopy.crossReferral.body}
            </p>
            <a
              href={homepageCopy.crossReferral.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/10 hover:border-white/30 px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider transition-colors text-white"
            >
              {homepageCopy.crossReferral.cta.label}
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
            <p className="text-xs text-zinc-500 mt-4 italic">
              {homepageCopy.crossReferral.neutralityNote}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <span>&copy; {new Date().getFullYear()} ASIMOV AI. All rights reserved.</span>
          <a
            href="https://ai-integ.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-mono uppercase tracking-wider text-[10px] font-bold"
            style={{ color: "var(--color-amber)" }}
          >
            Fulfillment Delivery Partner: AI Integrity (ai-integ.com)
          </a>
        </div>
      </footer>

      {/* Regulatory and legal disclaimer region */}
      <section
        aria-label="Regulatory and legal disclaimer"
        className="bg-zinc-950 border-t border-white/5 py-12"
      >
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs text-zinc-500 leading-relaxed max-w-4xl mx-auto">
            {homepageCopy.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
