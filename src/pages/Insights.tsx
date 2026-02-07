import Navigation from "@/components/Navigation";
import BookConsultationSection from "@/components/BookConsultationSection";

const Insights = () => {
    return (
        <div className="min-h-screen bg-off-white font-sans text-slate-900 pb-20 pt-[72px]">
            <Navigation />

            {/* Featured Article (Hero) */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-brand-blue"></span>
                            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase">Latest Perspective</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-medium leading-tight text-slate-900">
                            The Liability of Speed: Risk in the Age of Agentic AI
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            How enterprise organizations can balance the velocity of autonomous agents with the rigor of legal compliance. A framework for 2026.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <button className="bg-slate-900 text-white px-6 py-3 rounded-md text-sm font-bold tracking-wide uppercase hover:bg-slate-800 transition-colors">
                                Read Whitepaper
                            </button>
                            <span className="text-slate-500 text-sm">5 min read</span>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[400px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        {/* Abstract/Technical Illustration Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300">article</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-4 border-t border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">R</div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Rajiv Abey</p>
                                    <p className="text-xs text-slate-500">Chief Architect & Counsel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-display font-medium text-slate-900 text-right">Strategic Counsel</h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">All</span>
                        <span className="px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-medium border border-slate-100 hover:border-slate-300 cursor-pointer">Regulatory</span>
                        <span className="px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-medium border border-slate-100 hover:border-slate-300 cursor-pointer">Technical</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="h-48 bg-slate-100 relative">
                            <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase border border-slate-200 text-slate-600">
                                Framework
                            </div>
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-display font-medium leading-snug group-hover:text-brand-blue transition-colors">
                                The "Human-in-the-Loop" Fallacy
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Why manual oversight scales poorly with agentic workflows, and how to implement "Constitutional AI" guardrails instead.
                            </p>
                            <div className="pt-4 flex items-center text-brand-blue font-bold text-xs tracking-wide uppercase">
                                Read Analysis <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="h-48 bg-slate-100 relative">
                            <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase border border-slate-200 text-slate-600">
                                Case Study
                            </div>
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-display font-medium leading-snug group-hover:text-brand-blue transition-colors">
                                De-risking the Deployment Pipeline
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                A look at how we reduced liability exposure by 60% for a Fintech client using our RAD delivery model.
                            </p>
                            <div className="pt-4 flex items-center text-brand-blue font-bold text-xs tracking-wide uppercase">
                                View Case Study <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="h-48 bg-slate-100 relative">
                            <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase border border-slate-200 text-slate-600">
                                Opinion
                            </div>
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-display font-medium leading-snug group-hover:text-brand-blue transition-colors">
                                When to Consult vs. When to Build
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Navigating the 'Buy, Build, or Advise' decision matrix in a rapidly changing LLM landscape.
                            </p>
                            <div className="pt-4 flex items-center text-brand-blue font-bold text-xs tracking-wide uppercase">
                                Read Opinion <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter / Lead Gen replaced with Functional CTA */}
            <BookConsultationSection />

            <div className="h-10 bg-off-white"></div>
        </div>
    );
};

export default Insights;
