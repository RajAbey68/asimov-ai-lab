import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
    ArrowLeft, ArrowRight, Sparkles, Lock, AlertTriangle,
    Info, Shield, Zap, Database, CheckCircle2, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Define strict type for Control with new "Consultative" fields
interface Control {
    id: number;
    control_name: string; // The Question Headline
    category: string;
    section: string; // "Risk Framework", "Operational", etc.
    risk_level: string;
    description: string;
    pragmatic_why: string; // The "Contextual Help"
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
        // 1. HARDCODED CONTROLS (Enriched with Consultancy Content)
        const HARDCODED_CONTROLS: Control[] = [
            {
                id: 1,
                section: "Risk Framework",
                control_name: "How integrated is your current risk assessment with your core development lifecycle?",
                category: "Risk Management",
                risk_level: "High Risk",
                description: "Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks.",
                pragmatic_why: "Detailed documentation prevents costly retrofitting during external audit phases and reduces liability exposure."
            },
            {
                id: 2,
                section: "Compliance Ops",
                control_name: "How robust is your Conformity Assessment procedure?",
                category: "Compliance",
                risk_level: "High Risk",
                description: "Establish conformity assessment procedures for high-risk AI systems before market placement.",
                pragmatic_why: "Early conformity checks reduce time-to-market delays by approx. 30% in regulated sectors."
            },
            {
                id: 3,
                section: "Data Strategy",
                control_name: "To what extent are data governance frameworks automated?",
                category: "Data Protection",
                risk_level: "High Risk",
                description: "Implement data governance practices ensuring training data sets are relevant, representative, and free of errors.",
                pragmatic_why: "Clean data lineage is your primary defense against bias allegations and ensuring reproducible model behavior."
            },
            {
                id: 4,
                section: "Governance",
                control_name: "What level of Human Oversight is engineered into the system?",
                category: "Governance",
                risk_level: "High Risk",
                description: "Design high-risk AI systems with appropriate human oversight measures (human-in-the-loop).",
                pragmatic_why: "Effective human-in-the-loop is mandatory to avoid automated decision-making bans under GDPR and AI Act."
            },
            {
                id: 5,
                section: "Technical Reliability",
                control_name: "How frequently and strictly is Accuracy & Robustness tested?",
                category: "Technical",
                risk_level: "High Risk",
                description: "Ensure high-risk AI systems achieve an appropriate level of accuracy, robustness, and cybersecurity.",
                pragmatic_why: "Robust metrics prevent 'model drift' liability and ensure consistent performance in production."
            },
            {
                id: 6,
                section: "Transparency",
                control_name: "Is Record Keeping and Logging continuous and immutable?",
                category: "Transparency",
                risk_level: "High Risk",
                description: "Enable automatic recording of events ('logs') over the duration of the system's lifecycle.",
                pragmatic_why: "Immutable traceability is your legal safety net during incident investigations."
            },
            {
                id: 7,
                section: "Transparency",
                control_name: "How clearly are system limitations communicated to users?",
                category: "Transparency",
                risk_level: "High Risk",
                description: "Design high-risk AI systems to be sufficiently transparent to ensure users can interpret the output.",
                pragmatic_why: "Clear user disclosures significantly mitigate consumer protection lawsuits."
            },
            {
                id: 8,
                section: "Governance",
                control_name: "Is your Quality Management System (QMS) AI-specific?",
                category: "Governance",
                risk_level: "High Risk",
                description: "Put in place a quality management system that ensures compliance with the EU AI Act.",
                pragmatic_why: "An integrated QMS streamlines annual recertification cycles and reduces administrative overhead."
            },
            {
                id: 9,
                section: "Compliance Ops",
                control_name: "Do you have a definition for Post-Market Monitoring?",
                category: "Compliance",
                risk_level: "High Risk",
                description: "Establish and document a post-market monitoring system to collect and analyze performance data.",
                pragmatic_why: "Proactive monitoring catches compliance drift before regulators do."
            },
            {
                id: 10,
                section: "Compliance Ops",
                control_name: "Are Serious Incident protocol triggers automated?",
                category: "Compliance",
                risk_level: "High Risk",
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

        // Persist to DB if possible
        if (sessionId) {
            const responseText = scoreVal >= 4 ? "Optimized" : scoreVal >= 3 ? "Defined" : "Ad-hoc";
            supabase.from("audit_responses").upsert({
                session_id: sessionId,
                control_id: control.id,
                response_score: scoreVal,
                response: responseText
            }).then(() => { });
        }

        // Delay slightly for visual feedback then move next
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

    const navBack = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // --- 1. WELCOME SCREEN ("The Cover") ---
    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800 relative">
                {/* Back to Home - Absolute Top Right */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 z-50 rounded-full bg-white/50 backdrop-blur-sm"
                    onClick={() => navigate('/')}
                >
                    <X className="w-6 h-6" />
                </Button>

                <Card className="max-w-md w-full border-none shadow-xl bg-white overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-slate-900 text-white p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 opacity-50 z-0"></div>
                        <div className="relative z-10">
                            <Sparkles className="w-6 h-6 text-blue-400 mb-4" />
                            <h1 className="text-2xl md:text-3xl font-serif font-medium leading-tight mb-2">Strategic AI Audit</h1>
                            <p className="text-sm text-slate-300">Confidential preliminary assessment.</p>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-blue-700" /> Executive Briefing
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Evaluate your organization's readiness against the <b>10 Critical Control Points</b> of the EU AI Act.
                            </p>
                        </div>

                        <Button onClick={() => setHasStarted(true)} className="w-full h-12 text-base bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-900/10">
                            Begin Assessment <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // --- 2. RESULTS SCREEN ("Executive Report") ---
    if (completed) {
        const score = calculateScore();
        return (
            <div className="min-h-screen bg-zinc-50 py-8 px-4 font-sans text-slate-800 relative">
                {/* Back to Home - Results Screen */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 z-50"
                    onClick={() => navigate('/')}
                >
                    <X className="w-6 h-6" />
                </Button>

                <div className="max-w-xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                    {/* Header */}
                    <div className="text-center pb-2">
                        <p className="text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-1">Executive Report</p>
                        <h1 className="text-2xl font-serif text-slate-900">Strategic Results</h1>
                    </div>

                    {/* Score Card */}
                    <Card className="border-none shadow-lg bg-white p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 56}
                                    strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)}
                                    className="text-blue-600"
                                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-slate-900">{score}%</span>
                                <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Maturity</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide w-fit mx-auto mb-3">
                            Level: {score > 80 ? 'Strategic' : score > 50 ? 'Developing' : 'High Risk'}
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="text-center pt-4 space-y-2">
                        <Button className="w-full bg-slate-900 text-white" onClick={() => window.location.href = "mailto:info@asimov-ai.org"}>
                            Download Full Briefing
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                                Restart
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- 3. QUESTION SCREEN ("Mobile First Interview") ---
    const currentControl = controls[currentIndex];

    const answerOptions = [
        {
            val: 5,
            label: "Fully Integrated",
            desc: "Automated, documented, enforced.",
            tip: "Reduces hallucination risk by ~40%."
        },
        {
            val: 3,
            label: "Partial Oversight",
            desc: "Manual oversight required.",
            tip: "Bottleneck risk."
        },
        {
            val: 1,
            label: "Ad-hoc",
            desc: "Independent use.",
            tip: "High privacy/IP risk."
        }
    ];

    const progressPercent = ((currentIndex + 1) / controls.length) * 100;

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans text-slate-900 pb-20">

            {/* STICKY HEADER with Progress + CLOSE BUTTON */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="h-1.5 w-full bg-zinc-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate max-w-[150px]">
                            {currentControl.section}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
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

            <div className="flex-grow px-4 py-6 max-w-lg mx-auto w-full flex flex-col">

                {/* Question */}
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="text-xl md:text-2xl font-serif text-slate-900 leading-snug mb-3">
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
                                    w-full text-left group relative p-4 rounded-lg border transition-all duration-200 active:scale-[0.98]
                                    ${isSelected
                                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                                        : "border-slate-200 bg-white shadow-sm hover:border-blue-300"
                                    }
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`text-sm font-bold ${isSelected ? "text-blue-800" : "text-slate-800"}`}>
                                        {opt.label}
                                    </h3>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                                </div>

                                <p className="text-xs text-slate-500 mb-2">{opt.desc}</p>
                            </button>
                        )
                    })}
                </div>

                {/* Consultant's Note */}
                <div className="mt-8 pt-4 border-t border-dashed border-slate-200">
                    <div className="flex gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                            <span className="font-bold text-blue-700 not-italic mr-1">Consultant:</span>
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
