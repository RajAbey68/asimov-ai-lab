import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Shield,
    Scale,
    Building2,
    FileText,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Lock,
    Eye,
    BookOpen,
    Calculator,
    Landmark,
    PenTool,
    Layers,
    Clock,
    Users,
    Target,
    Briefcase,
} from "lucide-react";
import sectorLegal from "@/assets/sector-legal.jpg";

const ProfessionalServices = () => {
    const navigate = useNavigate();

    const handleAssessment = () => {
        navigate("/assessment-info");
    };

    const handleBookConsultation = () => {
        navigate("/#book-consultation");
        setTimeout(() => {
            const element = document.getElementById("book-consultation");
            element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-off-white group/design-root overflow-x-hidden font-sans text-slate-900 pt-[72px]">
            <SEO
                title="AI Governance for Professional Services - Asimov AI"
                description="Helping law firms, chambers, accountants and architects adopt AI safely while protecting client confidentiality and professional obligations."
                keywords="AI Governance, Professional Services, Law Firm AI, Accountancy AI, EU AI Act, NIST AI RMF, ISO 42001, AI Risk Assessment"
                canonical="/sectors/professional-services-ai-governance"
            />
            <Navigation />

            {/* ================================================================ */}
            {/* SECTION 1 — HERO                                                 */}
            {/* ================================================================ */}
            <section className="relative overflow-hidden min-h-[480px] flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${sectorLegal})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95" />
                </div>

                <div className="container mx-auto px-6 py-16 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Sector Focus
                            </span>
                        </div>

                        <h1 className="text-white tracking-tight text-4xl md:text-5xl font-medium leading-[1.1] font-display mb-4">
                            AI Governance for
                            <br />
                            Professional Services
                        </h1>

                        <p className="text-slate-300 text-lg font-normal leading-relaxed max-w-xl mb-8">
                            Helping law firms, chambers, accountants and architects adopt AI
                            safely while protecting client confidentiality and professional
                            obligations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-8 rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:scale-105 gap-2"
                                onClick={handleAssessment}
                            >
                                Take the AI Readiness Assessment
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 rounded-full gap-2"
                                onClick={handleBookConsultation}
                            >
                                Book an AI Risk Consultation
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 2 — WHY AI GOVERNANCE MATTERS                            */}
            {/* ================================================================ */}
            <section className="bg-white py-20 px-6 border-b border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                The Challenge
                            </span>
                            <div className="h-[1px] w-8 bg-brand-blue" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Why Professional Firms Need AI Governance
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Unmanaged AI adoption creates legal liability, regulatory exposure,
                            and reputational risk. Professional firms face unique obligations
                            that demand a governance-first approach.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Lock,
                                title: "Client Confidentiality",
                                desc: "AI tools processing privileged communications or sensitive client data risk breaching legal professional privilege and fiduciary duties.",
                            },
                            {
                                icon: AlertTriangle,
                                title: "Regulatory Exposure",
                                desc: "Professional bodies (SRA, BSB, ICAEW, ARB) impose strict conduct rules. AI misuse may trigger disciplinary proceedings.",
                            },
                            {
                                icon: Scale,
                                title: "AI Hallucinations in Advice",
                                desc: "Large language models generate plausible but incorrect outputs. In professional advice, this creates negligence and malpractice liability.",
                            },
                            {
                                icon: FileText,
                                title: "Data Governance",
                                desc: "Client records, financial data, and case files require clear data classification, retention policies, and access controls before AI processing.",
                            },
                            {
                                icon: Eye,
                                title: "Auditability",
                                desc: "Professional indemnity insurers and regulators increasingly require evidence trails for AI-assisted decisions and outputs.",
                            },
                            {
                                icon: Shield,
                                title: "Professional Negligence",
                                desc: "Reliance on AI-generated legal, financial, or technical advice without human oversight may constitute professional negligence.",
                            },
                        ].map((risk, index) => (
                            <Card
                                key={index}
                                className="border-slate-200 hover:border-brand-blue/30 hover:shadow-md transition-all bg-white"
                            >
                                <CardContent className="p-6">
                                    <div className="text-brand-blue bg-brand-blue/5 size-12 rounded-full flex items-center justify-center mb-4">
                                        <risk.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-slate-900 text-lg font-bold font-display mb-2">
                                        {risk.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {risk.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-10 bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
                        <p className="text-slate-600 text-base">
                            <span className="font-semibold text-slate-900">
                                Asimov AI
                            </span>{" "}
                            is a governance-first AI advisory practice. We help professional
                            firms adopt AI with confidence — not by avoiding it, but by
                            managing it properly.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 2b — DESIGNED FOR PROFESSIONAL SERVICES FIRMS             */}
            {/* ================================================================ */}
            <section className="bg-blue-50 py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border border-blue-100 rounded-2xl p-8 md:p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-brand-blue/10 size-12 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-brand-blue" />
                            </div>
                            <h2 className="text-slate-900 text-2xl md:text-3xl font-medium font-display">
                                Designed for Professional Services Firms
                            </h2>
                        </div>

                        <p className="text-slate-500 text-base mb-6">
                            Suitable for:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                            {[
                                "Solicitors",
                                "Law firms",
                                "Barristers' chambers",
                                "Accountancy firms",
                                "Architects",
                                "Specialist consultancies",
                            ].map((firm) => (
                                <div
                                    key={firm}
                                    className="flex items-center gap-2 text-slate-700 text-sm"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                                    <span>{firm}</span>
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-slate-200 mb-6" />

                        <p className="text-slate-600 text-base leading-relaxed">
                            Professional firms face unique AI risks due to confidentiality
                            and regulatory obligations. The Asimov AI framework is
                            specifically designed for these environments.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 3 — AI USE CASES IN PROFESSIONAL SERVICES                */}
            {/* ================================================================ */}
            <section className="bg-slate-50 py-20 px-6 border-b border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Applications
                            </span>
                            <div className="h-[1px] w-8 bg-brand-blue" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            AI Use Cases in Professional Services
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            AI is already transforming how professional firms work. The
                            question is not whether to adopt — but how to adopt safely.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Landmark,
                                title: "Law Firms & Chambers",
                                colour: "bg-blue-600",
                                items: [
                                    "Legal research assistance",
                                    "Case summarisation",
                                    "Contract drafting",
                                    "Due diligence review",
                                ],
                            },
                            {
                                icon: Calculator,
                                title: "Accountancy Firms",
                                colour: "bg-emerald-600",
                                items: [
                                    "Tax analysis support",
                                    "Financial document processing",
                                    "Client reporting automation",
                                    "Compliance monitoring",
                                ],
                            },
                            {
                                icon: PenTool,
                                title: "Architects & Consultants",
                                colour: "bg-amber-600",
                                items: [
                                    "Proposal drafting",
                                    "Planning documentation",
                                    "Regulatory submission support",
                                    "Knowledge management",
                                ],
                            },
                        ].map((vertical, index) => (
                            <Card
                                key={index}
                                className="border-slate-200 hover:shadow-lg transition-all overflow-hidden bg-white"
                            >
                                <div
                                    className={`${vertical.colour} h-1.5 w-full`}
                                />
                                <CardContent className="p-6">
                                    <div
                                        className={`${vertical.colour} text-white size-12 rounded-xl flex items-center justify-center mb-5`}
                                    >
                                        <vertical.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-slate-900 text-xl font-bold font-display mb-4">
                                        {vertical.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {vertical.items.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-slate-600 text-sm"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 4 — THE ASIMOV AI GOVERNANCE APPROACH                    */}
            {/* ================================================================ */}
            <section className="bg-white py-20 px-6 border-b border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Our Approach
                            </span>
                            <div className="h-[1px] w-8 bg-brand-blue" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Structured AI Governance Frameworks
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            We apply internationally recognised standards to ensure your AI
                            adoption is compliant, defensible, and aligned with professional
                            obligations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "EU AI Act",
                                subtitle: "European Regulation",
                                desc: "Risk classification of AI systems, conformity assessment, and mandatory governance requirements for high-risk applications in regulated professions.",
                                badges: ["Risk Classification", "Conformity Assessment", "Transparency"],
                            },
                            {
                                title: "NIST AI RMF",
                                subtitle: "US Framework",
                                desc: "Comprehensive risk management lifecycle covering AI system governance, mapping, measurement, and management of risks throughout deployment.",
                                badges: ["Govern", "Map", "Measure", "Manage"],
                            },
                            {
                                title: "ISO/IEC 42001",
                                subtitle: "International Standard",
                                desc: "AI Management System standard providing a structured approach to establishing, implementing, and improving AI governance within organisations.",
                                badges: ["AI Management System", "Certification Ready"],
                            },
                            {
                                title: "COBIT Governance",
                                subtitle: "IT Governance",
                                desc: "Enterprise governance framework ensuring AI initiatives align with business objectives and meet internal control, risk, and compliance requirements.",
                                badges: ["Alignment", "Controls", "Risk Management"],
                            },
                        ].map((framework, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all"
                            >
                                <div className="text-brand-blue bg-brand-blue/5 size-14 shrink-0 rounded-2xl flex items-center justify-center">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-slate-900 text-lg font-bold font-display">
                                            {framework.title}
                                        </h3>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {framework.subtitle}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {framework.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {framework.badges.map((badge) => (
                                            <Badge
                                                key={badge}
                                                variant="outline"
                                                className="text-xs font-medium"
                                            >
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 5 — PROFESSIONAL SERVICES AI OPERATING MODEL             */}
            {/* ================================================================ */}
            <section className="bg-slate-50 py-20 px-6 border-b border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Operating Model
                            </span>
                            <div className="h-[1px] w-8 bg-brand-blue" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            Professional Services AI Operating Model
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            A structured, five-layer model for integrating AI into
                            professional practice — from foundational context through to
                            innovation.
                        </p>
                    </div>

                    {/* Five-Layer Diagram */}
                    <div className="flex flex-col gap-0 relative max-w-2xl mx-auto">
                        {/* Connecting line */}
                        <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-brand-blue via-brand-blue/40 to-purple-500" />

                        {[
                            {
                                layer: 1,
                                title: "Context",
                                desc: "Firm structure, policies, practice areas, regulatory environment.",
                                colour: "bg-blue-600",
                                icon: Building2,
                            },
                            {
                                layer: 2,
                                title: "Data",
                                desc: "Client records, documents, financial data, case files.",
                                colour: "bg-emerald-600",
                                icon: FileText,
                            },
                            {
                                layer: 3,
                                title: "Intelligence",
                                desc: "Meetings, communications, operational insight, knowledge base.",
                                colour: "bg-amber-500",
                                icon: BookOpen,
                            },
                            {
                                layer: 4,
                                title: "Automation",
                                desc: "Document preparation, research assistance, compliance checks.",
                                colour: "bg-orange-600",
                                icon: Layers,
                            },
                            {
                                layer: 5,
                                title: "Innovation",
                                desc: "New services, productivity gains, competitive differentiation.",
                                colour: "bg-purple-600",
                                icon: ArrowRight,
                            },
                        ].map((item) => (
                            <div key={item.layer} className="flex gap-6 relative z-10 mb-6">
                                <div
                                    className={`mt-1 size-14 rounded-2xl ${item.colour} flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white shrink-0 z-20`}
                                >
                                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">
                                        Layer
                                    </span>
                                    <span className="text-lg font-bold font-display">
                                        {item.layer}
                                    </span>
                                </div>

                                <div className="flex-1 bg-white rounded-xl p-5 border border-slate-200 hover:border-brand-blue/20 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <item.icon className="w-5 h-5 text-slate-400" />
                                        <h3 className="text-slate-900 font-bold text-lg font-display">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 6 — THE AI GOVERNANCE ACCELERATOR                        */}
            {/* ================================================================ */}
            <section className="bg-white py-20 px-6 border-b border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-[1px] w-8 bg-brand-blue" />
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">
                                Programme
                            </span>
                            <div className="h-[1px] w-8 bg-brand-blue" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-4xl font-medium font-display mb-4">
                            The AI Governance Accelerator
                        </h2>
                        <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-6">
                            A 6-Week Programme for Professional Firms
                        </p>
                    </div>

                    {/* Priestley-style intro copy */}
                    <div className="max-w-2xl mx-auto text-center mb-14">
                        <p className="text-slate-600 text-lg leading-relaxed mb-4">
                            Most law firms, accountants and architects are already
                            experimenting with AI tools.
                        </p>
                        <p className="text-slate-900 text-lg font-semibold leading-relaxed mb-4">
                            The risk is not that AI exists.
                            <br />
                            The risk is using AI without governance.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            The Asimov AI Governance Accelerator helps professional firms
                            adopt AI safely while protecting client confidentiality and
                            professional obligations.
                        </p>
                        <p className="text-slate-900 text-base font-medium mt-4">
                            In six weeks we help you move from AI curiosity to controlled
                            AI capability.
                        </p>
                    </div>

                    {/* Weekly Timeline */}
                    <div className="flex flex-col gap-0 relative max-w-3xl mx-auto">
                        {/* Connecting line */}
                        <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-brand-blue via-brand-blue/40 to-emerald-500" />

                        {[
                            {
                                week: "Week 1",
                                title: "AI Risk Discovery",
                                desc: "We identify where AI is already being used across the firm and where risk may exist.",
                                items: [
                                    "Tools currently in use",
                                    "Confidential data exposure",
                                    "Document workflows",
                                    "Client communication processes",
                                ],
                                outcome: "A clear view of AI risks and opportunities across the firm.",
                                icon: Eye,
                                colour: "bg-blue-600",
                            },
                            {
                                week: "Weeks 2–3",
                                title: "Governance Framework",
                                desc: "We implement a practical governance framework tailored to professional firms.",
                                items: [
                                    "AI usage policy",
                                    "Data confidentiality rules",
                                    "Risk register",
                                    "Approved tool guidelines",
                                ],
                                frameworks: [
                                    "NIST AI Risk Management Framework",
                                    "ISO/IEC 42001",
                                    "EU AI Act readiness",
                                ],
                                outcome: "A clear governance structure for responsible AI use.",
                                icon: Shield,
                                colour: "bg-emerald-600",
                            },
                            {
                                week: "Weeks 4–5",
                                title: "Safe AI Pilot",
                                desc: "We introduce controlled AI tools to improve productivity while maintaining professional standards.",
                                items: [
                                    "Document summarisation",
                                    "Research assistance",
                                    "Proposal drafting",
                                    "Knowledge management",
                                ],
                                outcome: "Practical AI workflows operating within defined governance rules.",
                                icon: Layers,
                                colour: "bg-amber-500",
                            },
                            {
                                week: "Week 6",
                                title: "Operational Model",
                                desc: "We establish how AI will be managed across the firm going forward.",
                                items: [
                                    "Monitoring and reporting",
                                    "Governance oversight",
                                    "Operational guidelines",
                                ],
                                outcome: "A sustainable AI Operating Model for the firm.",
                                icon: Target,
                                colour: "bg-purple-600",
                            },
                        ].map((phase, index) => (
                            <div key={index} className="flex gap-6 relative z-10 mb-6">
                                <div
                                    className={`mt-1 size-14 rounded-2xl ${phase.colour} flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white shrink-0 z-20`}
                                >
                                    <phase.icon className="w-6 h-6" />
                                </div>

                                <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200 hover:border-brand-blue/20 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                                            {phase.week}
                                        </span>
                                    </div>
                                    <h3 className="text-slate-900 font-bold text-xl font-display mb-2">
                                        {phase.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                        {phase.desc}
                                    </p>

                                    <p className="text-slate-600 text-sm font-medium mb-2">We review:</p>
                                    <ul className="space-y-1.5 mb-4">
                                        {phase.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {(phase as any).frameworks && (
                                        <div className="mb-4">
                                            <p className="text-slate-600 text-sm font-medium mb-2">
                                                Frameworks aligned to recognised standards:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {(phase as any).frameworks.map((fw: string) => (
                                                    <Badge
                                                        key={fw}
                                                        variant="outline"
                                                        className="text-xs font-medium"
                                                    >
                                                        {fw}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                                        <p className="text-emerald-800 text-sm">
                                            <span className="font-bold">Outcome:</span>{" "}
                                            {phase.outcome}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary bar */}
                    <div className="mt-10 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
                        <div>
                            <p className="text-slate-900 font-semibold font-display text-lg">
                                6 weeks to controlled AI capability
                            </p>
                            <p className="text-slate-500 text-sm">
                                Tailored to your firm's size, practice areas, and
                                regulatory environment.
                            </p>
                        </div>
                        <Button
                            className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-8 rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:scale-105 gap-2 whitespace-nowrap"
                            onClick={handleAssessment}
                        >
                            Start Your Assessment
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SECTION 7 — PRIESTLEY-STYLE ASSESSMENT CTA                       */}
            {/* ================================================================ */}
            <section className="bg-brand-blue py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="h-[1px] w-8 bg-white/40" />
                        <span className="text-white/80 font-bold text-[10px] uppercase tracking-[0.2em]">
                            Get Started
                        </span>
                        <div className="h-[1px] w-8 bg-white/40" />
                    </div>

                    <h2 className="text-white text-3xl md:text-4xl font-medium font-display mb-6">
                        Start with the AI Readiness Assessment
                    </h2>

                    <p className="text-blue-100 text-lg leading-relaxed mb-4">
                        Before firms adopt AI tools, they need to understand their risk
                        exposure.
                    </p>

                    <p className="text-blue-200 text-base leading-relaxed mb-8">
                        Our AI Readiness Assessment takes approximately 10 minutes and
                        provides an initial view of AI usage risk, governance maturity,
                        and opportunity areas.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <Button
                            size="lg"
                            className="bg-white text-brand-blue hover:bg-blue-50 font-semibold px-10 rounded-full shadow-lg transition-all hover:scale-105 gap-2"
                            onClick={handleAssessment}
                        >
                            Take the AI Assessment
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <p className="text-blue-200 text-sm">
                        Or{" "}
                        <button
                            className="text-white hover:underline font-medium"
                            onClick={handleBookConsultation}
                        >
                            speak to our team
                        </button>
                        {" "}to discuss the AI Governance Accelerator.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProfessionalServices;
