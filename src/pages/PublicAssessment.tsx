import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface Control {
    id: number;
    control_name: string;
    category: string;
    risk_level: string;
    description: string;
}

const PublicAssessment = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [controls, setControls] = useState<Control[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // controlId -> score
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        initializeSession();
    }, []);

    const initializeSession = async () => {
        // 1. Use Hardcoded Controls (Guaranteed to work)
        const HARDCODED_CONTROLS = [
            {
                id: "ctrl_1",
                control_name: "AI System Risk Assessment Documentation",
                category: "Risk Management",
                risk_level: "High Risk",
                description: "Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks, evaluation of risk probability and severity, and mitigation measures throughout the AI system lifecycle per EU AI Act Article 9."
            },
            {
                id: "ctrl_2",
                control_name: "Conformity Assessment Process",
                category: "Compliance",
                risk_level: "High Risk",
                description: "Establish conformity assessment procedures for high-risk AI systems before market placement, including technical documentation, quality management system, and post-market monitoring plan per EU AI Act Article 43."
            },
            {
                id: "ctrl_3",
                control_name: "Data Governance Framework",
                category: "Data Protection",
                risk_level: "High Risk",
                description: "Implement data governance practices ensuring training, validation and testing data sets are relevant, representative, free of errors and complete per EU AI Act Article 10."
            },
            {
                id: "ctrl_4",
                control_name: "Human Oversight Measures",
                category: "Governance",
                risk_level: "High Risk",
                description: "Design high-risk AI systems with appropriate human oversight measures including human-in-the-loop, human-on-the-loop, or human-in-command per EU AI Act Article 14."
            },
            {
                id: "ctrl_5",
                control_name: "Accuracy and Robustness Testing",
                category: "Technical",
                risk_level: "High Risk",
                description: "Ensure high-risk AI systems achieve an appropriate level of accuracy, robustness, and cybersecurity, and perform consistently in those respects throughout their lifecycle per EU AI Act Article 15."
            },
            {
                id: "ctrl_6",
                control_name: "Record Keeping and Logging",
                category: "Transparency",
                risk_level: "High Risk",
                description: "Enable automatic recording of events ('logs') over the duration of the system's lifecycle to ensure traceability of the system's functioning per EU AI Act Article 12."
            },
            {
                id: "ctrl_7",
                control_name: "Transparency and User Information",
                category: "Transparency",
                risk_level: "High Risk",
                description: "Design high-risk AI systems to be sufficiently transparent to ensure that users can interpret the system's output and use it appropriately per EU AI Act Article 13."
            },
            {
                id: "ctrl_8",
                control_name: "Quality Management System",
                category: "Governance",
                risk_level: "High Risk",
                description: "Put in place a quality management system that ensures compliance with the EU AI Act per Article 17."
            },
            {
                id: "ctrl_9",
                control_name: "Post-Market Monitoring",
                category: "Compliance",
                risk_level: "High Risk",
                description: "Establish and document a post-market monitoring system to collect and analyze data on the performance of high-risk AI systems per EU AI Act Article 61."
            },
            {
                id: "ctrl_10",
                control_name: "Reporting Serious Incidents",
                category: "Compliance",
                risk_level: "High Risk",
                description: "Report any serious incident or malfunctioning of the AI system which constitutes a breach of obligations under Union law intended to protect fundamental rights to the market surveillance authorities per EU AI Act Article 62."
            }
        ];

        console.log("Using hardcoded controls for reliability.");
        setControls(HARDCODED_CONTROLS);
        // End of hardcoded controls section

        // 2. Create Anonymous Session (if allowed by DB)
        try {
            const { data: sessionData, error } = await supabase
                .from("audit_sessions")
                .insert({
                    session_name: `Public Screening - ${new Date().toLocaleDateString()}`,
                    framework_filter: "EU AI Act (2023)",
                    status: "in_progress",
                    // user_id is omitted/null for anonymous
                })
                .select()
                .single();

            if (error) {
                console.warn("Could not create anonymous session (RLS policy might block it). Running in local mode.", error);
            } else if (sessionData) {
                setSessionId(sessionData.id);
                console.log("Anonymous session created:", sessionData.id);
            }
        } catch (err) {
            console.warn("Session creation failed", err);
        }

        setLoading(false);
    };

    const handleAnswer = async (scoreVal: number) => {
        const currentControl = controls[currentIndex];

        // Update local state
        setAnswers(prev => ({
            ...prev,
            [currentControl.id]: scoreVal
        }));

        // Save to DB if we have a session
        if (sessionId) {
            const responseText = scoreVal >= 4 ? "Fully Implemented" : scoreVal >= 3 ? "Partially Implemented" : "Not Implemented";

            const { error } = await supabase.from("audit_responses").upsert({
                session_id: sessionId,
                control_id: currentControl.id,
                response_score: scoreVal,
                response: responseText
            });

            if (error) {
                console.error("Failed to save response:", error);
            }
        }

        // Move to next
        handleNext();
    };

    const handleNext = () => {
        if (currentIndex < controls.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishAssessment();
        }
    };

    const finishAssessment = async () => {
        setCompleted(true);
        if (sessionId) {
            // Mark session as completed
            await supabase
                .from("audit_sessions")
                .update({ status: "completed", completed_at: new Date().toISOString() })
                .eq("id", sessionId);
        }
    };

    const calculateScore = () => {
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
        const maxScore = controls.length * 5;
        return Math.round((totalScore / maxScore) * 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Handle case where no controls are found (e.g. empty database or RLS block)
    if (!controls || controls.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="max-w-md w-full text-center p-6 border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                        <CardTitle className="text-xl">Assessment Unavailable</CardTitle>
                        <CardDescription>Could not load assessment questions from the database.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground mb-4">
                            Possible reasons:
                            <ul className="list-disc text-left pl-6 mt-2 space-y-1">
                                <li>Database connection issue</li>
                                <li>RLS Policy blocking access (check Browser Console)</li>
                                <li>Database is empty (did you run the setup script?)</li>
                            </ul>
                        </div>
                        <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
                        <Button onClick={() => navigate("/")} variant="ghost" className="ml-2">Go Home</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (completed) {
        const score = calculateScore();
        let riskLevel = "Low";
        let riskColor = "text-green-600";
        if (score < 50) { riskLevel = "Critical"; riskColor = "text-red-600"; }
        else if (score < 80) { riskLevel = "Moderate"; riskColor = "text-orange-600"; }

        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <Navigation />
                <div className="container max-w-3xl mx-auto px-4 py-24">
                    <Card className="text-center p-8 shadow-xl bg-card border-accent/20">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                            <CardTitle className="text-3xl mb-2">Preliminary Screening Complete</CardTitle>
                            <CardDescription>Based on {controls.length} high-risk factors</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="p-6 bg-background rounded-xl border shadow-sm">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">Compliance Maturity</p>
                                <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
                                <div className={`text-xl font-medium ${riskColor} flex items-center justify-center gap-2`}>
                                    {riskLevel === "Critical" && <div className="w-3 h-3 rounded-full bg-red-600" />}
                                    {riskLevel === "Moderate" && <div className="w-3 h-3 rounded-full bg-orange-600" />}
                                    {riskLevel} Risk Profile
                                </div>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-lg text-left space-y-4 border border-primary/10">
                                <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
                                    <Lock className="w-5 h-5" />
                                    Detailed Analysis Locked
                                </h3>
                                <p className="text-muted-foreground">
                                    You have completed the public screener. The full assessment includes 251+ controls,
                                    evidence management, and AI-generated remediation plans.
                                </p>
                                <div className="grid gap-3 pt-4">
                                    <Button size="lg" className="w-full text-lg shadow-md" onClick={() => navigate("/assessment-info#request-form")}>
                                        Request Full Audit Consultation
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Your session ID: <span className="font-mono">{sessionId || "Local"}</span> (Save this for reference)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const currentControl = controls[currentIndex];
    const progress = ((currentIndex + 1) / controls.length) * 100;
    const currentAnswer = answers[currentControl.id];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <Navigation />
            <TooltipProvider delayDuration={200}>
                <div className="container max-w-5xl mx-auto px-4 py-24">
                    <div className="mb-8 max-w-3xl mx-auto">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" />Exit Screener
                        </Button>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-3xl font-bold">Public Risk Screener</h1>
                            <Badge variant="secondary" className="border-primary/20 text-primary">High Risk Only</Badge>
                        </div>
                        <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground text-right">Question {currentIndex + 1} of {controls.length}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="md:col-span-2 space-y-6">
                            <Card className="h-full border-l-4 border-l-primary shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl leading-relaxed">{currentControl.control_name}</CardTitle>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-none">
                                            {currentControl.risk_level}
                                        </Badge>
                                        <Badge variant="outline">{currentControl.category}</Badge>
                                    </div>
                                    <CardDescription className="text-base mt-4 leading-relaxed text-foreground/80">
                                        {currentControl.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium text-sm">
                                        <Sparkles className="w-4 h-4" />
                                        Why this matters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        This is a critical high-risk control for EU AI Act compliance. Regulators prioritize evidence for this category during audits.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-1">
                            <Card className="sticky top-24 shadow-md border-primary/10">
                                <CardHeader className="pb-3 border-b"><CardTitle className="text-lg">Your Implementation</CardTitle></CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="grid gap-2">
                                        {[
                                            { val: 5, label: "Fully Optimized", desc: "Documented & Tested" },
                                            { val: 4, label: "Well Managed", desc: "Minor gaps only" },
                                            { val: 3, label: "Defined", desc: "Basic process exists" },
                                            { val: 2, label: "Ad-hoc", desc: "Significant gaps" },
                                            { val: 1, label: "Not Implemented", desc: "No controls" }
                                        ].map((option) => (
                                            <button
                                                key={option.val}
                                                onClick={() => handleAnswer(option.val)}
                                                className={`
                                    relative flex items-center p-3 rounded-lg border text-left transition-all hover:shadow-md
                                    ${currentAnswer === option.val
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                        : "border-border hover:border-primary/50 bg-card"}
                                `}
                                            >
                                                <div className={`
                                    flex items-center justify-center w-8 h-8 rounded-full border mr-3 text-sm font-semibold
                                    ${currentAnswer === option.val ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}
                                `}>
                                                    {option.val}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">{option.label}</div>
                                                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                                                </div>
                                                {currentAnswer === option.val && <CheckCircle2 className="w-5 h-5 text-primary absolute right-3" />}
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </div>
    );
};

export default PublicAssessment;
