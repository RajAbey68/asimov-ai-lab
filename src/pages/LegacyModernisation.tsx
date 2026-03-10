import { motion } from "framer-motion";
import {
    ArrowRight, Shield, Activity, RefreshCw, Layers, Database,
    Network, Code2, CheckCircle, Zap, Cpu, ServerCog, Lock, PlayCircle, BarChart, CheckSquare
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const LegacyModernisation = () => {
    const pillars = [
        {
            icon: <Code2 className="w-8 h-8 text-blue-400" />,
            title: "Translation Layer",
            subtitle: "Business Intent → AI-Driven Delivery",
            content: "AI tools generate code fast — but enterprises struggle to translate business change, regulation, and operational risk into safe automation. We define what should be automated, align AI output with governance, and prevent 'AI spaghetti'."
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-400" />,
            title: "Assurance & Governance",
            subtitle: "The New Differentiator",
            content: "As AI IDEs accelerate change, risk multiplies. We provide continuous assurance frameworks, AI governance, auditability, and operational resilience to ensure trust in AI-generated systems."
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-amber-400" />,
            title: "Legacy Modernisation",
            subtitle: "Without Big-Bang Rebuilds",
            content: "AI IDEs allow partial rewrites and adapters. We offer AI-assisted legacy mapping, API abstraction strategies, and hybrid roadmaps to keep your core stable while evolving edges."
        },
        {
            icon: <Network className="w-8 h-8 text-purple-400" />,
            title: "Ecosystem Orchestration",
            subtitle: "A New High-Value Space",
            content: "Enterprises need orchestration across AI agents, APIs, RPA, and business workflows. We act as automation architects and operational change strategists, enabling development teams to scale safely."
        },
        {
            icon: <Zap className="w-8 h-8 text-rose-400" />,
            title: "Change Velocity Management",
            subtitle: "Maintaining Control",
            content: "The biggest enterprise fear isn't cost — it's loss of control over change speed. We deliver release assurance, cross-system impact modelling, and continuous compliance automation."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-blue/30 overflow-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full filter blur-[128px] animate-blob" />
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full filter blur-[128px] animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full filter blur-[128px] animate-blob animation-delay-4000" />
                    <div
                        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-sm font-medium tracking-wide text-brand-blue">The BMAD Execution Engine</span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-tight text-slate-900">
                            Orchestrate. Govern. <br className="hidden md:block" />
                            <span className="text-brand-blue">
                                Execute.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            <strong className="text-slate-900">The UTS Toolkit powered by the BMAD Method.</strong><br /><br />
                            Modern AI delivery fails when architecture, governance, and execution are disconnected. At Asimov-AI, we combine three complementary layers to move organisations beyond experimentation into repeatable, accountable delivery.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Link to="/#book-consultation">
                                <Button size="lg" className="bg-brand-blue hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-105">
                                    Discover Our Framework
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* The Triple Layer Model */}
            <section className="py-24 relative z-10 section-alt border-y border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">The Triple Layer Model</h2>
                        <p className="text-lg text-slate-600">
                            Together, these layers turn AI from an assistant into an orchestrated delivery capability.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "UTS — The Maps",
                                description: "Deep ecosystem discovery, legacy insight, and operational context. We identify where risk, complexity, and opportunity truly exist across platforms, APIs, and workflows.",
                                icon: <Network className="w-10 h-10 text-brand-blue" />
                            },
                            {
                                title: "PlatformX — The Tracks",
                                description: "Architectural guardrails that ensure automation, QA, and business execution operate within governance, compliance, and enterprise standards.",
                                icon: <Shield className="w-10 h-10 text-emerald-400" />
                            },
                            {
                                title: "BMAD — The Engine",
                                description: "The Breakthrough Method for Agile AI-Driven Development provides the agentic workflow that executes change with discipline, traceability, and speed.",
                                icon: <Cpu className="w-10 h-10 text-amber-400" />
                            }
                        ].map((layer, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
                            >
                                <div className="h-full rounded-xl bg-white p-8 border border-slate-200 shadow-lg flex flex-col items-center text-center">
                                    <div className="mb-6 p-4 bg-blue-50 inline-block rounded-2xl">
                                        {layer.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-slate-900">{layer.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{layer.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How BMAD Powers Execution */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">How BMAD Powers Execution</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            The BMAD Method transforms AI from ad-hoc "vibe coding" into structured, spec-driven engineering.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <Card className="h-full bg-white border-slate-200 shadow-sm hover:border-brand-blue/50 hover:shadow-md transition-all">
                                <CardHeader>
                                    <div className="mb-4"><Code2 className="w-10 h-10 text-brand-blue" /></div>
                                    <CardTitle className="text-2xl text-slate-900">Spec-Driven Development</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-slate-600">
                                    <p className="font-medium text-slate-800">Code follows intent — not the other way around.</p>
                                    <p>Before implementation begins, AI personas collaborate to create a single source of truth (PRD.md, ARCHITECTURE.md, and versioned decision trails).</p>
                                    <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                                        <strong>Outcome:</strong> Less rework, fewer surprises, and audit-ready delivery.
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <Card className="h-full bg-white border-slate-200 shadow-sm hover:border-brand-blue/50 hover:shadow-md transition-all">
                                <CardHeader>
                                    <div className="mb-4"><Layers className="w-10 h-10 text-purple-400" /></div>
                                    <CardTitle className="text-2xl text-slate-900">Agent-as-Code Personas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-slate-600">
                                    <p>Instead of one generic AI assistant, BMAD deploys specialised roles:</p>
                                    <ul className="space-y-3 mt-4">
                                        <li className="flex gap-2 items-start"><span className="text-purple-400 font-bold">•</span><span><strong>Analyst:</strong> Identifies risks & legacy constraints</span></li>
                                        <li className="flex gap-2 items-start"><span className="text-purple-400 font-bold">•</span><span><strong>Architect:</strong> Defines system structure & APIs</span></li>
                                        <li className="flex gap-2 items-start"><span className="text-purple-400 font-bold">•</span><span><strong>Developer:</strong> Delivers verifiable outcomes</span></li>
                                        <li className="flex gap-2 items-start"><span className="text-purple-400 font-bold">•</span><span><strong>QA Agent:</strong> Validates every change</span></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <Card className="h-full bg-white border-slate-200 shadow-sm hover:border-brand-blue/50 hover:shadow-md transition-all">
                                <CardHeader>
                                    <div className="mb-4"><Database className="w-10 h-10 text-amber-400" /></div>
                                    <CardTitle className="text-2xl text-slate-900">Solving AI Context Loss</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-slate-600">
                                    <p>Standard AI development struggles with "inter-session amnesia." BMAD introduces Context Engineering using sharded story files.</p>
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-sm mt-4">
                                        Only the exact context needed is loaded for each task. This enables incremental modernisation of 100k+ line monolithic systems.
                                    </div>
                                    <ul className="space-y-2 mt-4 text-sm">
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Reduced token waste</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Lower hallucination risk</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The BMAD Workflow inside PlatformX */}
            <section className="py-24 relative z-10 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The BMAD Workflow inside PlatformX</h2>
                        <p className="text-xl text-slate-400">A structured path from discovery to continuous validation.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Analyse", desc: "UTS discovery maps complexity and identifies transformation pathways.", icon: <BarChart /> },
                            { step: "02", title: "Design", desc: "BMAD Analyst, PM, and Architect create the PlatformX blueprint.", icon: <Layers /> },
                            { step: "03", title: "Execute", desc: "Agentic workflows deliver structured implementation through agile sprints.", icon: <PlayCircle /> },
                            { step: "04", title: "Verify", desc: "QA agents validate outcomes continuously within governed PlatformX environments.", icon: <CheckSquare /> },
                        ].map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-6 rounded-2xl bg-blue-50 border border-blue-100 hover:border-brand-blue/50 hover:shadow-md transition-all text-center flex flex-col items-center"
                            >
                                <div className="text-4xl font-black text-white/5 absolute top-4 right-4">{phase.step}</div>
                                <div className="p-4 bg-brand-blue/10 text-brand-blue rounded-full mb-4">
                                    {phase.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
                                <p className="text-sm text-slate-400">{phase.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why BMAD + PlatformX? Comparison Table */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why BMAD + PlatformX?</h2>
                    <p className="text-center text-slate-400 mb-10 max-w-2xl mx-auto">
                        Traditional AI development often relies on intuition and experimentation. Our approach delivers structure and accountability.
                    </p>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-blue-50">
                                    <th className="p-6 text-lg font-semibold text-slate-800 w-1/4">Capability</th>
                                    <th className="p-6 text-lg font-semibold text-slate-500 w-3/8">Standard AI (Vibe Coding)</th>
                                    <th className="p-6 text-lg font-semibold text-brand-blue w-3/8">BMAD + PlatformX</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { aspect: "Structure", old: "Unstructured prompts", new: "Agile multi-agent workflows" },
                                    { aspect: "Context", old: "Limited session memory", new: "Persistent spec-driven context" },
                                    { aspect: "Governance", old: "Manual oversight", new: "Built-in architectural guardrails" },
                                    { aspect: "Trust", old: "Experimental output", new: "Audit-ready traceability" },
                                    { aspect: "Efficiency", old: "High token usage", new: "Sharded context optimisation" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-6 font-medium text-slate-800">{row.aspect}</td>
                                        <td className="p-6 text-slate-500">{row.old}</td>
                                        <td className="p-6 text-emerald-600 font-medium flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                            {row.new}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* The Honest Proposition (Pillars woven in) */}
            <section className="py-24 relative z-10 section-alt border-y border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">The Honest Proposition</h2>
                        <p className="text-lg text-slate-400">
                            AI consultancies must evolve from coders to translation and governance layers. Here is where the new value sits.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent ${index === 3 ? 'lg:col-span-1 lg:col-start-2' : ''} ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                            >
                                <div className="h-full rounded-xl bg-white p-8 border border-slate-200 hover:border-brand-blue/30 hover:shadow-lg transition-all shadow-sm">
                                    <div className="mb-6 p-4 bg-blue-50 inline-block rounded-2xl">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900">{pillar.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {pillar.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Outcome */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-3xl bg-gradient-to-br from-brand-blue/20 to-emerald-500/10 border border-white/10 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10">The Outcome</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 relative z-10">
                            By combining PlatformX governance with the BMAD execution model, organisations gain:
                        </p>

                        <ul className="text-left max-w-md mx-auto space-y-4 mb-10 relative z-10 text-lg">
                            <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" /> <span className="text-white">Predictable delivery across complex ecosystems</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" /> <span className="text-white">Reusable automation assets from QA to operations</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" /> <span className="text-white">Faster transformation without sacrificing control</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" /> <span className="text-white">AI workflows that align with enterprise governance</span></li>
                        </ul>

                        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm inline-block relative z-10">
                            <p className="font-medium text-brand-blue text-xl">This is not automation for its own sake.</p>
                            <p className="text-slate-400 mt-2">It is structured, agentic execution designed for regulated and high-complexity environments.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LegacyModernisation;
