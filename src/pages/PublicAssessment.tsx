import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
    ArrowLeft, ArrowRight, Sparkles, Lock,
    Shield, CheckCircle2, X, TrendingUp, AlertTriangle, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

// Define strict type for Control with "Consultative" fields
interface Control {
    id: number;
    control_name: string;
    category: string;
    section: string;
    risk_level: string;
    description: string;
    pragmatic_why: string;
}

export default function PublicAssessment() {
    const navigate = useNavigate();
    const { toast } = useToast();

    // App State
    const [loading, setLoading] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const [controls, setControls] = useState<Control[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Assessment State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        initializeSession();
    }, []);

    const initializeSession = async () => {
        const HARDCODED_CONTROLS: Control[] = [
            {
                id: 1, section: "Risk Framework",
                control_name: "How integrated is your current risk assessment with your core development lifecycle?",
                category: "Risk Management", risk_level: "High Risk",
                description: "Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks.",
                pragmatic_why: "Detailed documentation prevents costly retrofitting during external audit phases and reduces liability exposure."
            },
            {
                id: 2, section: "Compliance Ops",
                control_name: "How robust is your Conformity Assessment procedure?",
                category: "Compliance", risk_level: "High Risk",
                description: "Establish conformity assessment procedures for high-risk AI systems before market placement.",
                pragmatic_why: "Early conformity checks reduce time-to-market delays by approx. 30% in regulated sectors."
            },
            {
                id: 3, section: "Data Strategy",
                control_name: "To what extent are data governance frameworks automated?",
                category: "Data Protection", risk_level: "High Risk",
                description: "Implement data governance practices ensuring training data sets are relevant, representative, and free of errors.",
                pragmatic_why: "Clean data lineage is your primary defense against bias allegations and ensuring reproducible model behavior."
            },
            {
                id: 4, section: "Governance",
                control_name: "What level of Human Oversight is engineered into the system?",
                category: "Governance", risk_level: "High Risk",
                description: "Design high-risk AI systems with appropriate human oversight measures (human-in-the-loop).",
                pragmatic_why: "Effective human-in-the-loop is mandatory to avoid automated decision-making bans under GDPR and AI Act."
            },
            {
                id: 5, section: "Technical Reliability",
                control_name: "How frequently and strictly is Accuracy & Robustness tested?",
                category: "Technical", risk_level: "High Risk",
                description: "Ensure high-risk AI systems achieve an appropriate level of accuracy, robustness, and cybersecurity.",
                pragmatic_why: "Robust metrics prevent 'model drift' liability and ensure consistent performance in production."
            },
            {
                id: 6, section: "Transparency",
                control_name: "Is Record Keeping and Logging continuous and immutable?",
                category: "Transparency", risk_level: "High Risk",
                description: "Enable automatic recording of events ('logs') over the duration of the system's lifecycle.",
                pragmatic_why: "Immutable traceability is your legal safety net during incident investigations."
            },
            {
                id: 7, section: "Transparency",
                control_name: "How clearly are system limitations communicated to users?",
                category: "Transparency", risk_level: "High Risk",
                description: "Design high-risk AI systems to be sufficiently transparent to ensure users can interpret the output.",
                pragmatic_why: "Clear user disclosures significantly mitigate consumer protection lawsuits."
            },
            {
                id: 8, section: "Governance",
                control_name: "Is your Quality Management System (QMS) AI-specific?",
                category: "Governance", risk_level: "High Risk",
                description: "Put in place a quality management system that ensures compliance with the EU AI Act.",
                pragmatic_why: "An integrated QMS streamlines annual recertification cycles and reduces administrative overhead."
            },
            {
                id: 9, section: "Compliance Ops",
                control_name: "Do you have a definition for Post-Market Monitoring?",
                category: "Compliance", risk_level: "High Risk",
                description: "Establish and document a post-market monitoring system to collect and analyze performance data.",
                pragmatic_why: "Proactive monitoring catches compliance drift before regulators do."
            },
            {
                id: 10, section: "Compliance Ops",
                control_name: "Are Serious Incident protocol triggers automated?",
                category: "Compliance", risk_level: "High Risk",
                description: "Report any serious incident or malfunctioning of the AI system.",
                pragmatic_why: "Automated correction protocols prevent minor reliability bugs from becoming major regulatory fines."
            }
        ];

        setControls(HARDCODED_CONTROLS);

        try {
            const { data: sessionData } = await supabase
                .from("audit_sessions")
                .insert({
                    session_name: `Strategic Assessment - ${new Date().toLocaleDateString()}`,
                    framework_filter: "EU AI Act (2023)",
                    status: "in_progress",
                })
                .select()
                .single();
            if (sessionData) setSessionId(sessionData.id);
        } catch (err) {
            // silent fail for local demo
        }
        setLoading(false);
    };

    const handleAnswer = async (scoreVal: number) => {
        const control = controls[currentIndex];
        const newAnswers = { ...answers, [control.id]: scoreVal };
        setAnswers(newAnswers);

        if (sessionId) {
            const responseText = scoreVal >= 4 ? "Optimized" : scoreVal >= 3 ? "Defined" : "Ad-hoc";
            supabase.from("audit_responses").upsert({
                session_id: sessionId,
                control_id: control.id,
                response_score: scoreVal,
                response: responseText
            }).then(() => { });
        }

        setTimeout(() => {
            if (currentIndex < controls.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setCompleted(true);
            }
        }, 300);
    };

    const calculateScore = () => {
        const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
        const max = controls.length * 5;
        if (max === 0) return 0;
        return Math.round((total / max) * 100);
    };

    // Calculate per-section scores
    const calculateSectionScores = () => {
        const sections: Record<string, { total: number; count: number; max: number }> = {};
        controls.forEach(c => {
            if (!sections[c.section]) sections[c.section] = { total: 0, count: 0, max: 0 };
            sections[c.section].max += 5;
            sections[c.section].count += 1;
            if (answers[c.id] !== undefined) {
                sections[c.section].total += answers[c.id];
            }
        });
        return Object.entries(sections).map(([name, data]) => ({
            name,
            score: data.max > 0 ? Math.round((data.total / data.max) * 100) : 0,
            count: data.count,
        }));
    };

    // Find weakest sections
    const getWeakestAreas = () => {
        return calculateSectionScores()
            .sort((a, b) => a.score - b.score)
            .slice(0, 3);
    };

    const navBack = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // 1. WELCOME SCREEN — Premium cover
    // ═══════════════════════════════════════════
    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-slate-800 relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 z-50 rounded-full"
                    onClick={() => navigate('/')}
                >
                    <X className="w-6 h-6" />
                </Button>

                <Card className="max-w-md w-full border border-slate-200 shadow-xl bg-white overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-brand-blue text-white p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <Shield className="w-6 h-6 text-blue-200 mb-4" />
                            <h1 className="text-2xl md:text-3xl font-display font-medium leading-tight mb-2">Strategic AI Risk Score</h1>
                            <p className="text-sm text-blue-200">Confidential preliminary assessment</p>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-brand-blue" /> Executive Briefing
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Evaluate your AI governance maturity across <b>10 Critical Control Points</b> aligned to the EU AI Act.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                                10 questions
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-300" />
                                ~5 minutes
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-200" />
                                Confidential
                            </span>
                        </div>

                        <Button onClick={() => setHasStarted(true)} className="w-full h-12 text-base bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-brand-blue/15">
                            Begin Assessment <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // 2. RESULTS SCREEN — Executive Briefing
    // ═══════════════════════════════════════════
    if (completed) {
        const score = calculateScore();
        const sectionScores = calculateSectionScores();
        const weakest = getWeakestAreas();
        const band = score > 80 ? 'Strategic' : score > 60 ? 'Developing' : score > 40 ? 'Foundational' : 'High Risk';
        const bandColor = score > 80 ? 'text-green-700 bg-green-50' : score > 60 ? 'text-blue-700 bg-blue-50' : score > 40 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';

        return (
            <div className="min-h-screen bg-white py-8 px-4 font-sans text-slate-800 relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 z-50"
                    onClick={() => navigate('/')}
                >
                    <X className="w-6 h-6" />
                </Button>

                <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                    {/* Header */}
                    <div className="text-center pb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                            <Shield className="w-3.5 h-3.5 text-brand-blue" />
                            <span className="text-[10px] font-bold text-brand-blue tracking-widest uppercase">Executive Report</span>
                        </div>
                        <h1 className="text-3xl font-display text-slate-900">AI Governance Maturity</h1>
                    </div>

                    {/* Score Card */}
                    <Card className="border border-slate-200 shadow-lg bg-white p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Score Circle */}
                            <div className="relative w-36 h-36 shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="72" cy="72" r="62" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                    <circle cx="72" cy="72" r="62" stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray={2 * Math.PI * 62}
                                        strokeDashoffset={2 * Math.PI * 62 * (1 - score / 100)}
                                        className="text-brand-blue"
                                        strokeLinecap="round"
                                        style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-slate-900">{score}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">out of 100</span>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="text-center md:text-left flex-1 space-y-3">
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${bandColor}`}>
                                    Maturity Level: {band}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {score > 80
                                        ? "Your organisation demonstrates strong AI governance maturity. Focus on continuous improvement and advanced compliance automation."
                                        : score > 60
                                        ? "Your AI governance foundations are developing. Key gaps remain in compliance operations and risk integration that expose regulatory risk."
                                        : score > 40
                                        ? "Significant governance gaps exist. Your organisation needs structured remediation to meet EU AI Act requirements and reduce liability exposure."
                                        : "Critical governance deficiencies identified. Immediate action is required to prevent regulatory non-compliance, data breaches, and uncontrolled AI risk."
                                    }
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Pillar Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-brand-blue" />
                            Pillar Breakdown
                        </h2>
                        <div className="space-y-4">
                            {sectionScores.map((section, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-700 font-medium">{section.name}</span>
                                        <span className={`font-bold ${section.score >= 70 ? 'text-brand-blue' : section.score >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {section.score}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${section.score >= 70 ? 'bg-brand-blue' : section.score >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                                            style={{ width: `${section.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Top Risks — Weakest Areas */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Priority Risk Areas
                        </h2>
                        <div className="space-y-3">
                            {weakest.map((area, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                                    <span className="text-xs font-bold text-amber-700 bg-amber-100 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">{area.name}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Score: {area.score}% — {area.score < 40 ? "Requires immediate remediation" : "Needs structured improvement"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Recommended Next Steps */}
                    <Card className="border border-blue-100 shadow-sm bg-blue-50/30 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-brand-blue" />
                            Recommended Next Steps
                        </h2>
                        <ul className="space-y-3">
                            {[
                                "Commission a full 30-point AI Readiness Audit with domain-specific controls",
                                "Engage an advisory session to map your compliance gaps to EU AI Act articles",
                                "Establish a governance remediation roadmap with measurable milestones"
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* CTAs */}
                    <div className="space-y-3 pt-2">
                        <Link to="/assessment-info#request-form" className="block">
                            <Button className="w-full h-12 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-base shadow-lg shadow-brand-blue/15">
                                Book Advisory Session
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-blue"
                                onClick={() => window.location.reload()}
                            >
                                Retake Assessment
                            </Button>
                            <Button
                                variant="outline"
                                className="border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-blue"
                                onClick={() => navigate('/')}
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="text-center pt-4 pb-8">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
                            Confidential · Asimov AI Governance Assessment
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // 3. QUESTION SCREEN — One-per-screen
    // ═══════════════════════════════════════════
    const currentControl = controls[currentIndex];

    const answerOptions = [
        {
            val: 5,
            label: "Fully Integrated",
            desc: "Automated, documented, and enforced across all systems.",
        },
        {
            val: 3,
            label: "Partial Oversight",
            desc: "Manual processes in place, but not consistently applied.",
        },
        {
            val: 1,
            label: "Ad-hoc",
            desc: "No formal process; individuals operate independently.",
        }
    ];

    const progressPercent = ((currentIndex + 1) / controls.length) * 100;

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 pb-20">

            {/* STICKY HEADER with Progress */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="h-1.5 w-full bg-slate-100">
                    <div
                        className="h-full bg-brand-blue transition-all duration-500 ease-out rounded-r-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-[150px]">
                            {currentControl.section}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                            {currentIndex + 1} / {controls.length}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 -mr-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full"
                            onClick={() => navigate('/')}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-grow px-4 py-8 max-w-lg mx-auto w-full flex flex-col">

                {/* Question */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="text-xl md:text-2xl font-display text-slate-900 leading-snug mb-3">
                        {currentControl.control_name}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {currentControl.description}
                    </p>
                </div>

                {/* Answer Cards */}
                <div className="space-y-3">
                    {answerOptions.map((opt) => {
                        const isSelected = answers[currentControl.id] === opt.val;
                        return (
                            <button
                                key={opt.val}
                                onClick={() => handleAnswer(opt.val)}
                                className={`
                                    w-full text-left group relative p-5 rounded-xl border-2 transition-all duration-200 active:scale-[0.98]
                                    ${isSelected
                                        ? "border-brand-blue bg-blue-50/50 shadow-sm"
                                        : "border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:bg-blue-50/20"
                                    }
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`text-sm font-bold ${isSelected ? "text-brand-blue" : "text-slate-800"}`}>
                                        {opt.label}
                                    </h3>
                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-blue" />}
                                </div>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                            </button>
                        )
                    })}
                </div>

                {/* Consultant's Note */}
                <div className="mt-10 pt-4 border-t border-dashed border-slate-200">
                    <div className="flex gap-2">
                        <Sparkles className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                            <span className="font-bold text-brand-blue not-italic mr-1">Consultant:</span>
                            "{currentControl.pragmatic_why}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 z-40">
                <div className="max-w-lg mx-auto flex justify-between items-center">
                    <Button variant="ghost" size="sm" onClick={navBack} disabled={currentIndex === 0} className="text-slate-400 hover:text-slate-900 h-8 px-2 text-xs">
                        <ArrowLeft className="w-3 h-3 mr-1" /> Back
                    </Button>
                    <div className="text-[10px] text-slate-300 font-medium uppercase tracking-widest">
                        Confidential
                    </div>
                </div>
            </div>
        </div>
    );
}
