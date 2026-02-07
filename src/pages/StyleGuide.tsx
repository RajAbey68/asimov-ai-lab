import React from 'react';

const StyleGuide = () => {
    return (
        <div className="min-h-screen bg-off-white font-sans text-slate-900 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-widest uppercase font-display text-slate-900 text-right">Asimov AI</h1>
                        <p className="text-xs text-slate-500 tracking-wide">DESIGN SYSTEM v1.0 (LIGHT)</p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-xs font-medium text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        SOPHISTICATED SPEED
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

                {/* 1. Brand Philosophy */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-slate-300"></span>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">01. Core Philosophy</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h3 className="text-4xl font-display font-medium leading-tight mb-4 text-slate-900">
                                Bridging <span className="text-brand-blue">Strategic Counsel</span> & <span className="text-brand-blue">Rapid Delivery</span>.
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                The brand identity balances the stability and authority of a McKinsey-style consultancy with the speed and pragmatism of an agile RAD shop.
                                We call this density "Sophisticated Speed."
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-600">balance</span>
                                </div>
                                <div>
                                    <h4 className="font-bold font-display text-slate-900">The Tension</h4>
                                    <p className="text-sm text-slate-500">Trusted Advisor vs. Agile Builder</p>
                                </div>
                            </div>
                            <div className="h-px bg-slate-100"></div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-brand-blue">speed</span>
                                </div>
                                <div>
                                    <h4 className="font-bold font-display text-slate-900">The Outcome</h4>
                                    <p className="text-sm text-slate-500">High-value intellectual partnership + Functional assets.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Typography */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-slate-300"></span>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">02. Typography</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4 p-6 border border-slate-200 rounded-xl bg-white">
                            <span className="text-xs font-bold text-slate-400 tracking-wider">HEADINGS (SERIF)</span>
                            <h1 className="text-5xl font-display text-slate-900">Aa</h1>
                            <p className="font-display text-2xl text-slate-500">Playfair Display</p>
                            <div className="space-y-2 pt-4">
                                <p className="font-display text-4xl text-slate-900">Strategic Delivery</p>
                                <p className="font-display text-3xl text-slate-900">Strategic Delivery</p>
                                <p className="font-display text-2xl text-slate-900">Strategic Delivery</p>
                            </div>
                        </div>
                        <div className="space-y-4 p-6 border border-slate-200 rounded-xl bg-white">
                            <span className="text-xs font-bold text-slate-400 tracking-wider">BODY (SANS-SERIF)</span>
                            <h1 className="text-5xl font-sans text-slate-900">Aa</h1>
                            <p className="font-sans text-2xl text-slate-500">Inter</p>
                            <div className="space-y-4 pt-4">
                                <p className="font-sans text-base text-slate-600 leading-relaxed">
                                    Use Inter for all body copy, UI elements, and technical data. It provides legibility and a modern, "tech-forward" feel that balances the traditional serif headings.
                                </p>
                                <p className="font-sans text-sm text-slate-500">
                                    Example of small caption text used for metadata or secondary information.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Color Palette */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-slate-300"></span>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">03. Color Palette</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <div className="h-24 w-full bg-brand-blue rounded-lg shadow-sm"></div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                                <span className="font-mono text-xs text-slate-900">brand-blue</span>
                                <span className="font-mono text-xs text-slate-400">#0052FF</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-24 w-full bg-[#135bec] rounded-lg shadow-sm"></div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                                <span className="font-mono text-xs text-slate-900">primary</span>
                                <span className="font-mono text-xs text-slate-400">#135BEC</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-24 w-full bg-off-white border border-slate-200 rounded-lg shadow-sm"></div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                                <span className="font-mono text-xs text-slate-900">off-white</span>
                                <span className="font-mono text-xs text-slate-400">#F8F9FB</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-24 w-full bg-slate-100 border border-slate-200 rounded-lg shadow-sm"></div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                                <span className="font-mono text-xs text-slate-900">neutral</span>
                                <span className="font-mono text-xs text-slate-400">#F1F5F9</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. UI Components */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-slate-300"></span>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">04. UI Components</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Buttons */}
                        <div className="space-y-6 p-8 border border-slate-200 rounded-xl bg-white">
                            <h3 className="font-bold font-display text-lg text-slate-900">Buttons</h3>
                            <div className="space-y-4">
                                <button className="w-full bg-brand-blue text-white font-bold py-4 rounded-lg text-sm tracking-widest uppercase shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Primary Action
                                </button>
                                <button className="w-full bg-white border border-slate-200 text-slate-900 font-bold py-4 rounded-lg text-sm tracking-widest uppercase hover:bg-slate-50 transition-colors">
                                    Secondary Action
                                </button>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="space-y-6 p-8 border border-slate-200 rounded-xl bg-off-white">
                            <h3 className="font-bold font-display text-lg text-slate-900">Cards</h3>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="text-brand-blue bg-brand-blue/5 size-10 shrink-0 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined">gavel</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-display text-slate-900">Standard Card</h4>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Clean white background, subtle border, and soft shadow. Used for features and lists.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default StyleGuide;
