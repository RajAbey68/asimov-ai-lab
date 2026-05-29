import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    ExternalLink,
    Shield,
    Scale,
    Calculator,
    CheckCircle2,
    Clock,
    Users,
    FileText,
    AlertTriangle,
    TrendingUp,
    Lock,
    BookOpen,
    Zap,
    Building2,
    Star,
} from "lucide-react";

// ─── Service packages ────────────────────────────────────────────────────────

const packages = [
    {
        tier: "01",
        name: "AI Readiness Audit",
        tagline: "Know your exposure before your regulator does.",
        duration: "2–3 weeks",
        price: "From £4,500",
        icon: Shield,
        colour: "bg-slate-900",
        deliverables: [
            "251-control compliance audit (EU AI Act · NIST AI RMF · ISO 42001 · GDPR)",
            "Risk heatmap prioritised by SRA / ICAEW obligation",
            "Evidence gap report with remediation backlog",
            "Executive briefing deck for partners or board",
        ],
        suitable: "Firms that have adopted AI tools but have never formally assessed the risk.",
    },
    {
        tier: "02",
        name: "AI Governance Advisory",
        tagline: "Build the guardrails. Keep the efficiency gains.",
        duration: "6–8 weeks",
        price: "From £12,000",
        icon: Scale,
        colour: "bg-brand-blue",
        deliverables: [
            "AI Policy & Acceptable Use framework (SRA / FRC / ICAEW aligned)",
            "Client data handling protocol for LLM tools",
            "Staff training programme (3 x 90-minute sessions)",
            "Incident response playbook for AI failures",
            "Implementation roadmap with sprint backlog",
        ],
        suitable: "Firms formalising AI adoption ahead of the EU AI Act August 2026 deadline.",
        highlight: true,
    },
    {
        tier: "03",
        name: "AI Integration & Transform",
        tagline: "From governance framework to live, auditable AI workflows.",
        duration: "3–6 months",
        price: "From £28,000",
        icon: Zap,
        colour: "bg-slate-800",
        deliverables: [
            "End-to-end AI workflow design and build",
            "Secure document review and drafting pipeline",
            "Time-recording and billing automation",
            "Ongoing compliance monitoring dashboard",
            "Quarterly governance reviews for 12 months",
        ],
        suitable: "Firms ready to operationalise AI across fee-earner workflows with full audit trail.",
    },
];

// ─── Problem cards ────────────────────────────────────────────────────────────

const problems = [
    {
        icon: Lock,
        title: "Client confidentiality at risk",
        desc: "Fee-earners pasting privileged documents into public LLMs. No policy, no audit trail, no awareness of where the data goes.",
    },
    {
        icon: AlertTriangle,
        title: "Regulatory exposure mounting",
        desc: "SRA, FCA, ICAEW, ACCA, FRC, and the ICO are all sharpening AI guidance. The EU AI Act applies from August 2026. Firms without documented controls face conduct risk across multiple regulators simultaneously.",
    },
    {
        icon: FileText,
        title: "Hallucinated advice",
        desc: "AI-generated legal opinions and financial calculations that look authoritative but contain material errors. Professional indemnity claims are coming.",
    },
    {
        icon: Calculator,
        title: "Efficiency gains evaporating",
        desc: "Tools bought, licences unused, workflows half-implemented. No structured approach means cost without benefit.",
    },
];

// ─── Credentials ─────────────────────────────────────────────────────────────

const credentials = [
    { label: "251", sub: "AI governance controls mapped to SRA / ICAEW obligations" },
    { label: "5", sub: "regulatory frameworks: EU AI Act, NIST AI RMF, ISO 42001, GDPR, SCF" },
    { label: "12", sub: "chapters of The Digital Law Firm — the definitive practitioner guide (Law Society Publishing, 2026)" },
    { label: "3", sub: "live deployment templates for SRA-regulated firms" },
];

// ─── Team credentials ─────────────────────────────────────────────────────────

const team = [
    {
        name: "Rajiv Abeysinghe",
        role: "AI Strategy & Governance",
        note: "AWS Solutions Architect · Enterprise RPA/AI · EU AI Act adviser",
    },
    {
        name: "Nick Lockett",
        role: "Legal Technology Governance",
        note: "Solicitor · Legal tech practitioner · Governance frameworks",
    },
    {
        name: "Darren Sylvester",
        role: "Practice Management",
        note: "Law firm operations · AI workflow design · Change management",
    },
    {
        name: "Sushila Nair",
        role: "Cybersecurity & Standards",
        note: "CISSP · Independent Cybersecurity Adviser · ISO 42001",
    },
    {
        name: "Chamath Perera",
        role: "AI Law, Authorship & IP",
        note: "Collaborator — intellectual property and AI authorship frameworks",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AIIntegrationServices = () => {
    const navigate = useNavigate();

    const handleAssessment = () => navigate("/assessment-info");

    const goToAiInteg = () => {
        window.open("https://ai-integ.com", "_blank", "noopener,noreferrer");
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-off-white group/design-root overflow-x-hidden font-sans text-slate-900 pt-[72px]">
            <SEO
                title="AI Integration for Legal & Accounting Firms — Asimov AI"
                description="Practical AI governance and integration services for medium-sized law firms and accounting practices. Audit, advisory, and full transformation programmes aligned to SRA, ICAEW, and EU AI Act requirements."
                keywords="AI integration law firm, AI governance accounting, SRA AI compliance, ICAEW AI policy, EU AI Act professional services, legal AI audit"
                canonical="/services/ai-integration-professional-services"
            />
            <Navigation />

            {/* ════════════════════════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════════════════════════ */}
            <section className="relative bg-slate-900 min-h-[520px] flex items-end overflow-hidden">
                {/* Grid texture */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                {/* Blue accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue" />

                <div className="container mx-auto px-6 py-20 relative z-10 max-w-5xl">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-[1px] w-8 bg-brand-blue" />
                        <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                            Professional Services AI
                        </span>
                    </div>

                    <h1 className="text-white tracking-tight text-4xl md:text-6xl font-medium leading-[1.05] font-display mb-6">
                        AI that works for<br />
                        your firm.<br />
                        <span className="text-brand-blue">Not against it.</span>
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10">
                        Practical governance, safe integration, and measurable efficiency gains
                        for law firms and accounting practices — without the regulatory risk.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-8 rounded-full shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 gap-2"
                            onClick={goToAiInteg}
                        >
                            Explore ai-integ.com
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 rounded-full gap-2"
                            onClick={handleAssessment}
                        >
                            Take the AI Readiness Assessment
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Proof strip */}
                    <div className="flex flex-wrap gap-6 mt-12 pt-10 border-t border-white/10">
                        {["EU AI Act aligned", "SRA · FCA · ICO · ICAEW · ACCA · FRC", "ISO 42001 certified approach", "Law Society Publishing 2026"].map((label) => (
                            <div key={label} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                PROBLEMS WE SOLVE
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-20 px-6 border-b border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                The Problem
                            </span>
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Four things keeping managing partners awake
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl">
                            AI tools are already inside your firm. The question is whether they are
                            being used safely, legally, and in a way that survives a regulator's scrutiny.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {problems.map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-slate-50 hover:border-brand-blue/30 hover:shadow-md transition-all">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-brand-blue" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold text-base mb-1">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SERVICE PACKAGES
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-off-white py-20 px-6 border-b border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                What We Deliver
                            </span>
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Three engagement types.<br />One continuous journey.
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl">
                            Start with an audit to understand your exposure. Move to advisory when
                            you are ready to build policy. Commission transformation when you want
                            AI working inside your workflows.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.tier}
                                className={`rounded-2xl overflow-hidden border flex flex-col ${pkg.highlight
                                    ? "border-brand-blue shadow-xl shadow-brand-blue/10"
                                    : "border-slate-200 shadow-sm"
                                    }`}
                            >
                                {/* Card header */}
                                <div className={`${pkg.colour} p-6 text-white`}>
                                    {pkg.highlight && (
                                        <Badge className="bg-white/20 text-white border-white/30 text-[10px] mb-3 font-bold tracking-wider">
                                            Most popular
                                        </Badge>
                                    )}
                                    <div className="text-white/40 text-xs font-mono mb-2">
                                        {pkg.tier}
                                    </div>
                                    <pkg.icon className="w-7 h-7 mb-3 text-white/80" />
                                    <h3 className="text-xl font-semibold font-display leading-tight mb-1">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-white/70 text-sm">{pkg.tagline}</p>
                                </div>

                                {/* Card body */}
                                <div className="bg-white flex-1 p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            {pkg.duration}
                                        </span>
                                        <span className="font-semibold text-slate-900">{pkg.price}</span>
                                    </div>

                                    <div className="border-t border-slate-100 pt-4 space-y-2.5">
                                        {pkg.deliverables.map((d, i) => (
                                            <div key={i} className="flex gap-2 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-600 leading-snug">{d}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <p className="text-slate-400 text-xs italic leading-relaxed">
                                            {pkg.suitable}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-slate-400 text-sm mt-8">
                        Prices exclude VAT. All engagements include a scoping call at no charge.
                    </p>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                CREDENTIALS STRIP
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-slate-900 py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {credentials.map((c, i) => (
                            <div key={i} className="text-center">
                                <div className="text-brand-blue text-4xl font-bold font-display mb-2">
                                    {c.label}
                                </div>
                                <p className="text-slate-400 text-sm leading-snug">{c.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                WHY US — CAPABILITIES GRID
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-20 px-6 border-b border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Why This Group
                            </span>
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Legal authority.<br />Technical execution.<br />Published expertise.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {[
                            {
                                icon: BookOpen,
                                title: "The Digital Law Firm",
                                desc: "The group is co-authoring the definitive 12-chapter practitioner guide on AI in legal practice, published by Law Society Publishing (2026). The frameworks we advise on are the same ones documented in the book.",
                            },
                            {
                                icon: Shield,
                                title: "251-Control Audit Platform",
                                desc: "We built and operate the ASIMOV AI Governance Audit Tool — an enterprise platform used to assess AI systems against EU AI Act, NIST AI RMF, ISO 42001, and GDPR in a single workflow.",
                            },
                            {
                                icon: Scale,
                                title: "SRA-Specific Deployment Templates",
                                desc: "Off-the-shelf governance templates calibrated to SRA Outcomes, FRC Ethical Standards, and ICAEW guidelines — not generic frameworks retrofitted to professional services.",
                            },
                            {
                                icon: TrendingUp,
                                title: "Implementation, Not Just Reports",
                                desc: "We do not write risk reports and leave. Every engagement ends with a sprint backlog, assigned owners, and measurable remediation milestones tracked to completion.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-xl border border-slate-100 hover:border-brand-blue/20 hover:shadow-md transition-all">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue/8 border border-brand-blue/10 flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold text-base mb-2">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Team */}
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-blue" />
                            <span className="text-slate-700 font-semibold text-sm">The team</span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {team.map((member, i) => (
                                <div key={i} className="flex items-start gap-4 px-6 py-4">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                        <span className="text-brand-blue font-bold text-sm">
                                            {member.name.split(" ").map((n) => n[0]).join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-slate-900 font-semibold text-sm">{member.name}</div>
                                        <div className="text-brand-blue text-xs font-medium mb-0.5">{member.role}</div>
                                        <div className="text-slate-400 text-xs">{member.note}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                SECTOR CALLOUT — LEGAL & ACCOUNTING
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-off-white py-20 px-6 border-b border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Sector Focus
                            </span>
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Built for firms of 10–250 people
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl">
                            Large enough to have AI tools in active use. Small enough that no one
                            has yet been appointed to govern them.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Legal */}
                        <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
                            <div className="bg-slate-800 px-6 py-5 flex items-center gap-3">
                                <Scale className="w-6 h-6 text-brand-blue" />
                                <h3 className="text-white font-semibold text-lg">Law Firms &amp; Chambers</h3>
                            </div>
                            <CardContent className="p-6 space-y-3">
                                {[
                                    "SRA Code of Conduct alignment — Outcomes 8.5 and 8.6",
                                    "Legal professional privilege protection for AI-processed documents",
                                    "Hallucination risk controls for research and drafting workflows",
                                    "Client-facing AI disclosure and transparency policies",
                                    "Precedent bank AI training — data ownership and copyright",
                                    "Document review pipeline governance",
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-600">{item}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Accounting */}
                        <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
                            <div className="bg-slate-800 px-6 py-5 flex items-center gap-3">
                                <Calculator className="w-6 h-6 text-brand-blue" />
                                <h3 className="text-white font-semibold text-lg">Accounting &amp; Advisory Practices</h3>
                            </div>
                            <CardContent className="p-6 space-y-3">
                                {[
                                    "ICAEW Code of Ethics — AI use and professional scepticism",
                                    "FRC Ethical Standard alignment for audit AI tools",
                                    "Client financial data protection in AI workflows",
                                    "AI-assisted tax and advisory output validation procedures",
                                    "Model risk management for predictive financial tools",
                                    "ISQM 1 quality management integration for AI processes",
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-600">{item}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                REGULATORY LANDSCAPE
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-slate-900 py-20 px-6 border-b border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Regulatory Landscape
                            </span>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl font-medium font-display mb-4">
                            Every regulator watching your AI.
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Professional services firms answer to more oversight bodies than any
                            other sector. Our governance framework maps to all of them.
                        </p>
                    </div>

                    {/* All-firms band */}
                    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-4 h-4 text-brand-blue" />
                            <span className="text-white text-sm font-semibold uppercase tracking-wider">All Professional Services Firms</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { code: "ICO", full: "Information Commissioner's Office", basis: "UK GDPR · Data Protection Act 2018 · Article 22 automated decisions" },
                                { code: "EU AI Act", full: "Artificial Intelligence Act", basis: "High-risk AI obligations · Transparency requirements · Aug 2026 main provisions" },
                                { code: "HMRC MLR", full: "Money Laundering Regulations 2017", basis: "AML supervision for firms not supervised by a professional body regulator" },
                            ].map((r) => (
                                <div key={r.code} className="rounded-lg bg-slate-900/70 border border-slate-700 px-4 py-3">
                                    <div className="text-brand-blue font-bold text-sm mb-0.5">{r.code}</div>
                                    <div className="text-white text-xs font-medium mb-1">{r.full}</div>
                                    <div className="text-slate-400 text-[11px] leading-snug">{r.basis}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Two-column sector split */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Law */}
                        <div className="rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden">
                            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-700 bg-slate-800">
                                <Scale className="w-4 h-4 text-brand-blue" />
                                <span className="text-white text-sm font-semibold">Law Firms &amp; Chambers</span>
                            </div>
                            <div className="p-5 space-y-3">
                                {[
                                    { code: "SRA", full: "Solicitors Regulation Authority", basis: "Code of Conduct · Outcomes 8.5 &amp; 8.6 · AML supervision for solicitor firms" },
                                    { code: "FCA", full: "Financial Conduct Authority", basis: "AML oversight · Financial promotions · Regulated activities in some practice areas" },
                                    { code: "LSB", full: "Legal Services Board", basis: "Oversight regulator for all approved legal services regulators" },
                                    { code: "BSB", full: "Bar Standards Board", basis: "Regulation of barristers and chambers · Professional standards" },
                                ].map((r) => (
                                    <div key={r.code} className="flex gap-3 rounded-lg bg-slate-900/70 border border-slate-700 px-4 py-3">
                                        <div className="flex-shrink-0 w-12 text-brand-blue font-bold text-sm pt-0.5">{r.code}</div>
                                        <div>
                                            <div className="text-white text-xs font-medium mb-0.5">{r.full}</div>
                                            <div className="text-slate-400 text-[11px] leading-snug" dangerouslySetInnerHTML={{ __html: r.basis }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Accounting */}
                        <div className="rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden">
                            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-700 bg-slate-800">
                                <Calculator className="w-4 h-4 text-brand-blue" />
                                <span className="text-white text-sm font-semibold">Accounting &amp; Advisory Practices</span>
                            </div>
                            <div className="p-5 space-y-3">
                                {[
                                    { code: "ICAEW", full: "Institute of Chartered Accountants in England and Wales", basis: "Code of Ethics · AML supervision · Professional standards for chartered accountants" },
                                    { code: "ACCA", full: "Association of Chartered Certified Accountants", basis: "Code of Ethics · AML supervision · Professional standards for certified accountants" },
                                    { code: "FRC", full: "Financial Reporting Council", basis: "Audit quality · ISQM 1 quality management · Ethical Standard for auditors" },
                                    { code: "FCA", full: "Financial Conduct Authority", basis: "Investment advice · Regulated financial activities · Consumer Duty obligations" },
                                ].map((r) => (
                                    <div key={r.code} className="flex gap-3 rounded-lg bg-slate-900/70 border border-slate-700 px-4 py-3">
                                        <div className="flex-shrink-0 w-12 text-brand-blue font-bold text-sm pt-0.5">{r.code}</div>
                                        <div>
                                            <div className="text-white text-xs font-medium mb-0.5">{r.full}</div>
                                            <div className="text-slate-400 text-[11px] leading-snug">{r.basis}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm mt-6 text-center">
                        Our 251-control audit maps each AI system to the specific obligations above — not a generic framework, but a regulator-by-regulator evidence trail.
                    </p>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                CTA — AI-INTEG.COM
            ════════════════════════════════════════════════════════════════ */}
            <section className="bg-brand-blue py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-white/40" />
                        <span className="text-white/70 font-bold text-[10px] uppercase tracking-[0.2em]">
                            Our integration platform
                        </span>
                        <div className="h-[1px] w-8 bg-white/40" />
                    </div>

                    <h2 className="text-white text-3xl md:text-5xl font-medium font-display leading-tight mb-6">
                        Ready to integrate AI<br />
                        into your practice?
                    </h2>

                    <p className="text-blue-100 text-lg leading-relaxed max-w-xl mx-auto mb-10">
                        <strong className="text-white font-semibold">ai-integ.com</strong> is our dedicated platform
                        for professional services AI integration — tools, templates, and managed
                        implementation support for legal and accounting firms.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-brand-blue hover:bg-blue-50 font-semibold px-10 rounded-full shadow-lg transition-all hover:scale-105 gap-2"
                            onClick={goToAiInteg}
                        >
                            Visit ai-integ.com
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 rounded-full gap-2"
                            onClick={handleAssessment}
                        >
                            Start with a free assessment
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <p className="text-blue-200/70 text-sm mt-8">
                        No commitment required. Scoping calls are complimentary.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AIIntegrationServices;
