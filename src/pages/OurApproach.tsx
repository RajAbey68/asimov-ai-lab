import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Users, Scale, FileCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OurApproach = () => {
    return (
        <div className="min-h-screen bg-off-white text-slate-900 font-sans">
            <SEO
                title="Our Approach - Asimov AI"
                description="We combine legal authority with technical execution to operationalise AI governance. Certified ethical frameworks meeting EU AI Act & NIST standards."
            />
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-white text-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50/50 pointer-events-none"></div>
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-medium mb-6 tracking-tight text-slate-900">
                        Governance with <span className="text-brand-blue">Teeth</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        We don't just write reports. We build the guardrails that allow you to deploy AI at speed, safely.
                        Bridging the gap between legal counsel and engineering reality.
                    </p>
                </div>
            </section>

            {/* Core Principles */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ethical Commitments</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our work is grounded in internationally recognised standards, ensuring your AI is not just compliant, but fundamentally robust.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Shield,
                                title: "Safety First",
                                desc: "We prioritise human safety and systemic resilience above all else, aligning with the EU AI Act's risk-based approach."
                            },
                            {
                                icon: Scale,
                                title: "Fairness & Justice",
                                desc: "Our bias audits go beyond basic metrics, examining datasets for historical inequities and representational harm."
                            },
                            {
                                icon: Lock,
                                title: "Privacy by Design",
                                desc: "We integrate GDPR and ISO 42001 controls directly into your MLOps pipeline, not as an afterthought."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-brand-blue">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Visual */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm">How We Work</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">The "Sandwich" Model</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Most consultancies are either strictly legal (slow, non-technical) or strictly engineering (fast, risky).
                            We operate in the middle.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold shrink-0">1</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Legal Authority</h3>
                                    <p className="text-slate-600">We interpret complex regulations (EU AI Act, NYC 144) into concrete technical requirements.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold shrink-0">2</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Technical Execution</h3>
                                    <p className="text-slate-600">We build the actual guardrails, evals, and RAG pipelines using Python, LangChain, and Azure/AWS.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold shrink-0">3</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Operational Handover</h3>
                                    <p className="text-slate-600">We train your internal teams to maintain governance controls without expensive external dependency.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-400 uppercase mb-6">Standard Engagement Timeline</h4>
                            <div className="space-y-6 border-l-2 border-slate-100 pl-6 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-green-500 border-4 border-white"></div>
                                    <p className="font-bold text-slate-800">Week 1-2: Discovery</p>
                                    <p className="text-sm text-slate-500">Risk mapping & regulatory scoping</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-blue border-4 border-white"></div>
                                    <p className="font-bold text-slate-800">Week 3-6: Shape & Build</p>
                                    <p className="text-sm text-slate-500">Control design, red-teaming, & policy drafting</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-400 border-4 border-white"></div>
                                    <p className="font-bold text-slate-800">Week 7-8: Validate & Handover</p>
                                    <p className="text-sm text-slate-500">Audit report, training, & board presentation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-brand-blue text-white text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">Ready to Operationalise Trust?</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Stop guessing about compliance. Start building with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-brand-blue hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold" asChild>
                            <Link to="/#book-consultation">Request a Consultation</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto" asChild>
                            <Link to="/team">Meet the Team</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurApproach;
