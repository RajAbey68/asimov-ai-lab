import { useRef, useState } from "react";
import nickImg from "./assets/nick-lockett-enhanced.png";
import rajivImg from "./assets/rajiv-abeysinghe.png";
import sushilaImg from "./assets/sushila-nair-enhanced.png";
import { homepageCopy } from "./content/homepage";
import { getBannerText, getNextMilestone } from "./lib/euAiActTimeline";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_TIMEOUT_MS = 15_000;
const CONTACT_EMAIL = "advisory@asimov-ai.org";

export function App() {
  const [formData, setFormData] = useState<Record<string, string>>({
    full_name: "",
    job_title: "",
    organisation: "",
    email: "",
    sector: "",
    headcount: "",
    concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const inFlightRef = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot filled — a bot, not a person. Do nothing, quietly.
    if (honeypot) {
      return;
    }
    // A submit is already in flight — ignore the second click.
    if (inFlightRef.current) {
      return;
    }
    if (!consent) {
      setError("Please consent to the privacy policy.");
      return;
    }
    if (!EMAIL_PATTERN.test(formData.email)) {
      setError("That email doesn't look right — please check it.");
      return;
    }
    inFlightRef.current = true;
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const response = await fetch(
        "https://qcawafyfaqjwolgczhap.supabase.co/functions/v1/lead-intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Form submission failed.");
      }
      // Any generated analysis stays internal — it briefs the human call, it is never shown here.
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError(`Request timed out. Email us instead: ${CONTACT_EMAIL}`);
      } else {
        const message = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      }
    } finally {
      clearTimeout(timeoutId);
      inFlightRef.current = false;
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
          <nav aria-label="Primary navigation" className="flex items-center gap-4">
            <ul className="hidden md:flex gap-8 text-xs font-mono tracking-wider uppercase list-none m-0 p-0 items-center">
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
                <a href="#briefings" className="text-zinc-400 hover:text-white transition-colors">
                  Briefings
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/insights/" className="text-zinc-400 hover:text-white transition-colors">
                  Insights
                </a>
              </li>
              <li>
                <a
                  href="https://pqc.asimov-ai.org"
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Post-Quantum advisory hub"
                >
                  PQC
                </a>
              </li>
            </ul>
            <a
              href="#diagnostic"
              className="rounded px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all border hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "var(--color-amber)",
                color: "var(--color-navy)",
                borderColor: "var(--color-amber)",
              }}
            >
              Book Assessment
            </a>
            <details className="relative md:hidden">
              <summary className="cursor-pointer list-none text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 border border-white/10 rounded px-3 py-2">
                Menu
              </summary>
              <ul className="absolute right-0 mt-2 w-52 rounded border border-white/10 bg-zinc-950 p-4 flex flex-col gap-3 text-xs font-mono tracking-wider uppercase list-none m-0 z-50">
                <li>
                  <a href="#audit" className="text-zinc-400 hover:text-white transition-colors">
                    The Audit
                  </a>
                </li>
                <li>
                  <a
                    href="#principals"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Principals
                  </a>
                </li>
                <li>
                  <a href="#briefings" className="text-zinc-400 hover:text-white transition-colors">
                    Briefings
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/insights/" className="text-zinc-400 hover:text-white transition-colors">
                    Insights
                  </a>
                </li>
                <li>
                  <a
                    href="https://pqc.asimov-ai.org"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Post-Quantum advisory hub (mobile menu)"
                  >
                    PQC
                  </a>
                </li>
              </ul>
            </details>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Alert Banner — computed from the Art. 113 timeline, never hardcoded */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <p className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 m-0 rounded border border-white/10 bg-zinc-900/40 text-zinc-300 text-xs font-mono tracking-wide">
            {getBannerText(new Date())}
            <a
              href={
                (
                  getNextMilestone(new Date()) ?? {
                    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
                  }
                ).sourceUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline decoration-white/30 hover:text-white transition-colors"
            >
              Regulation (EU) 2024/1689
            </a>
          </p>
        </div>

        {/* Hero */}
        <section aria-labelledby="hero-heading" className="mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="max-w-4xl">
            <p
              className="text-xs font-mono font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-amber)" }}
            >
              ASIMOV AI · STANDING AI RISK COUNSEL
            </p>
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {homepageCopy.hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6 max-w-3xl">
              {homepageCopy.hero.retainerLine}
            </p>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-10 max-w-3xl font-light">
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
                  <p className="text-base text-zinc-400 leading-relaxed">{hook.body}</p>
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
            <p className="text-base text-zinc-400 mt-4 leading-relaxed">
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
                <p className="text-base text-zinc-400 leading-relaxed">{dom.description}</p>
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
                  <p className="text-base text-zinc-400 leading-relaxed">{item.description}</p>
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
          <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto text-base leading-relaxed">
            {homepageCopy.principals.subhead}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {homepageCopy.principals.people.map((person) => {
              const portrait =
                person.name === "Sushila Nair CISSP"
                  ? sushilaImg
                  : person.name === "Dr Nick Lockett"
                    ? nickImg
                    : rajivImg;
              return (
                <div
                  key={person.name}
                  className="border border-white/5 rounded p-6 bg-zinc-900/20 flex flex-col justify-between"
                >
                  <div>
                    {portrait && (
                      <div className="mb-6 flex justify-center">
                        <img
                          src={portrait}
                          alt={person.name}
                          className="w-32 h-32 rounded-full object-cover border-2 border-white/10"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-1 text-center">{person.name}</h3>
                    <p
                      className="text-xs font-mono font-semibold uppercase tracking-wider mb-4 text-center"
                      style={{ color: "var(--color-amber)" }}
                    >
                      {person.role}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{person.credential}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Videos & Briefings */}
        <section id="briefings" className="bg-zinc-900/30 py-20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Expert Briefings &amp; Training
            </h2>
            <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto text-sm leading-relaxed">
              Deep dives into AI security risks, board-level liability, and practical governance
              frameworks with our lead practitioners.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border border-white/5 rounded p-6 bg-zinc-900/20 flex flex-col gap-4">
                <div className="aspect-video w-full rounded overflow-hidden border border-white/10 bg-zinc-950">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/GEMKwXxqvec"
                    title="AI Risk for Leadership - Sushila Nair"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">AI Risk for Leadership</h3>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-amber)" }}
                  >
                    Sushila Nair CISSP
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Sushila Nair covers AI fundamentals with a focus on cyber security, IT audit,
                    and governance, addressing the critical disconnect between rapid AI adoption and
                    security protocols.
                  </p>
                </div>
              </div>

              <div className="border border-white/5 rounded p-6 bg-zinc-900/20 flex flex-col gap-4">
                <div className="aspect-video w-full rounded overflow-hidden border border-white/10 bg-zinc-950">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/5pZtNmQL9aY?rel=0&modestbranding=1&playsinline=1"
                    title="ISACA GWDC Insights - AI in the Crosshairs"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">AI in the Crosshairs</h3>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-amber)" }}
                  >
                    ISACA GWDC Insights
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    An in-depth briefing on systemic AI vulnerabilities, threat modeling for
                    professional services, and establishing a baseline for independent risk
                    auditing.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border border-white/5 rounded p-6 bg-zinc-900/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Post-Quantum Cryptography Advisory
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  NIST finalised the post-quantum standards in August 2024. Client files encrypted
                  today can be harvested now and decrypted later. Our dedicated hub covers what that
                  means for firms that hold privileged and confidential data.
                </p>
              </div>
              <a
                href="https://pqc.asimov-ai.org"
                className="inline-flex items-center gap-2 rounded border border-white/10 hover:border-white/30 px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider transition-colors text-white shrink-0"
              >
                Visit the Post-Quantum hub
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
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
                    <p className="text-base text-zinc-400 leading-relaxed mb-6">
                      {tier.description}
                    </p>
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
            <p className="text-zinc-400 text-center mb-8 text-base leading-relaxed">
              {homepageCopy.diagnostic.body}
            </p>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-4 text-zinc-300">
              {homepageCopy.diagnostic.intakeLabel}
            </p>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-sm text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded">
                    {error}
                  </div>
                )}
                {/* Honeypot — invisible to people, irresistible to bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                {homepageCopy.diagnostic.intakeFields.map((f) => (
                  <div key={f.id} className="space-y-1 text-left">
                    <label htmlFor={f.id} className="text-sm font-medium text-zinc-300">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      id={f.id}
                      required
                      value={formData[f.id] || ""}
                      onChange={handleInputChange}
                      placeholder={f.placeholder}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-4 py-2 text-base text-zinc-300 focus:outline-none focus:border-[var(--color-amber)] transition-colors"
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
                    className="mt-1 accent-[var(--color-amber)]"
                  />
                  <label htmlFor="privacy-consent" className="text-sm text-zinc-400">
                    I consent to the processing of my data in accordance with the{" "}
                    <a
                      href="/privacy.html"
                      className="underline hover:text-white transition-colors"
                    >
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
                    {loading ? "Sending..." : homepageCopy.diagnostic.cta.label}
                  </button>
                </div>
              </form>
            ) : (
              <output className="block text-base text-zinc-200 border border-white/10 bg-zinc-950 p-4 rounded">
                Received. Nick, Sushila or Raj will reply within one business day with three times
                for your 30-minute call.
              </output>
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
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed text-base font-light">
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
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <a
              href="https://www.lawsociety.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline transition-colors"
            >
              The Digital Law Firm — Law Society Publishing
            </a>
            <a
              href="https://ai-integ.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline transition-colors"
            >
              AI Integrity community — ai-integ.com
            </a>
            <a
              href="/privacy.html"
              className="hover:text-zinc-300 hover:underline transition-colors"
            >
              Privacy
            </a>
          </div>
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
