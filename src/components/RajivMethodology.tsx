import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, FileText, Layers, ListTodo, Code2, Rocket, Notebook, ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const RajivMethodology = () => {
    const steps = [
        {
            id: "01",
            title: "Ideation",
            subtitle: "The Spark",
            icon: Lightbulb,
            description: "Unconstrained creative exploration. We capture raw ideas, market gaps, and innovative concepts using generative brainstorming sessions.",
            notebookRole: "NotebookLM acts as our creative partner, synthesizing brainstorming notes into coherent concept documents and identifying potential blockers early.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20"
        },
        {
            id: "02",
            title: "BRD / PRS",
            subtitle: "Definition",
            icon: FileText,
            description: "Formalizing requirements. We translate concepts into rigorous Business Requirement Documents (BRD) and Product Requirement Specifications (PRS).",
            notebookRole: "We feed raw concepts into NotebookLM to auto-draft comprehensive BRDs, ensuring no requirement is ambiguous or contradictory.",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "03",
            title: "Epic Definition",
            subtitle: "Structuring",
            icon: Layers,
            description: "Grouping requirements into substantial, valuable bodies of work (Epics) that deliver tangible business value upon completion.",
            notebookRole: "NotebookLM analyzes the PRS to suggest logical Epic groupings and dependencies, creating a structured roadmap automatically.",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            id: "04",
            title: "User Stories",
            subtitle: "Granularity",
            icon: ListTodo,
            description: "Breaking down Epics into small, estimable User Stories with clear acceptance criteria and 'Definition of Done'.",
            notebookRole: "Using the context of Epics, NotebookLM generates detailed user stories with Gherkin-syntax acceptance criteria ready for development.",
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20"
        },
        {
            id: "05",
            title: "TDD",
            subtitle: "Test First",
            icon: Code2,
            description: "Test-Driven Development. We write failing tests based on acceptance criteria before writing a single line of implementation code.",
            notebookRole: "NotebookLM reviews our User Stories and generates corresponding test cases and test scripts, ensuring 100% coverage of requirements.",
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            id: "06",
            title: "MBAD Delivery",
            subtitle: "Execution",
            icon: Rocket,
            description: "Model-Based Application Delivery. The final execution framework where code meets infrastructure, ensuring rapid, reliable deployment.",
            notebookRole: "Our cognitive engine monitors the delivery pipeline, comparing built artifacts against original defining models for total alignment.",
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background flourishes */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-accent text-accent">Our Core Methodology</Badge>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">MBAD</span> Delivery Pathway
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A deterministic, AI-enhanced journey from raw idea to deployed reality.
                        We integrate <span className="font-semibold text-foreground">Test Driven Development (TDD)</span> with our proprietary <span className="font-semibold text-foreground">Model Based Application Delivery (MBAD)</span> framework.
                    </p>
                </div>

                {/* NotebookLM Integration Banner */}
                <div className="max-w-5xl mx-auto mb-20">
                    <Card className="border-accent bg-gradient-to-r from-accent/10 via-background to-accent/5 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Notebook className="w-64 h-64 text-accent" />
                        </div>
                        <CardContent className="p-8 md:p-12 relative z-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center shadow-lg shrink-0 border border-accent/20">
                                    <BrainCircuit className="w-10 h-10 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold">Powered by NotebookLM</h3>
                                        <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">Cognitive Core</Badge>
                                    </div>
                                    <p className="text-lg text-muted-foreground mb-6">
                                        We don't just "use" AI—we embed <strong>Google NotebookLM</strong> as the cognitive substrate of our delivery lifecycle.
                                        It bridges the gap between stages, translating human intent (Ideation) into machine precision (TDD) with zero loss of context.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button onClick={() => window.open('https://notebooklm.google.com/notebook/960f1b5d-6ae4-4c97-b21c-ddfa3d0ee582', '_blank')} className="gap-2 shadow-lg hover:shadow-accent/25 transition-all">
                                            <Sparkles className="w-4 h-4" /> Open Our Research Notebook
                                        </Button>
                                        <Button variant="outline" onClick={() => window.open('/resources', '_self')} className="gap-2">
                                            View Methodology Resources <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Flow Steps */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative">
                                {/* Connecting Arrow for Desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-[2px] bg-border z-0 transform translate-x-0 group-hover:bg-accent transition-colors" />
                                )}

                                <Card className={`h-full border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden`}>
                                    <div className={`absolute top-0 left-0 w-1 h-full ${step.bg.replace('/10', '')}`} />

                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-14 h-14 rounded-xl ${step.bg} flex items-center justify-center border ${step.border}`}>
                                                <step.icon className={`w-7 h-7 ${step.color}`} />
                                            </div>
                                            <span className="text-4xl font-black text-muted/20 select-none font-mono">
                                                {step.id}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl mb-1">{step.title}</CardTitle>
                                        <CardDescription className="font-medium text-foreground/80">{step.subtitle}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>

                                        <div className="pt-4 mt-4 border-t border-dashed border-border/60">
                                            <div className="flex items-start gap-3">
                                                <Notebook className="w-4 h-4 text-accent shrink-0 mt-1" />
                                                <p className="text-xs text-muted-foreground">
                                                    <strong className="text-accent">NotebookLM Action:</strong> {step.notebookRole}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Statement */}
                <div className="mt-20 text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Why This Matters</h3>
                    <p className="text-muted-foreground">
                        Most projects fail in the translation between layers. By locking our process from <span className="font-semibold text-foreground">Idea</span> to <span className="font-semibold text-foreground">MBAD</span> using NotebookLM as the persistent context layer, we ensure that the software built is exactly the software imagined.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RajivMethodology;
