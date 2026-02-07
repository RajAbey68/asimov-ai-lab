import Navigation from "@/components/Navigation";
import BookConsultationSection from "@/components/BookConsultationSection";

const StrategicDelivery = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-off-white group/design-root overflow-x-hidden font-sans text-slate-900 pt-[72px]">
            <Navigation />

            <div className="px-0">
                {/* Hero Section */}
                <div
                    className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[320px] relative border-b border-slate-200"
                    style={{
                        backgroundImage: 'linear-gradient(0deg, rgba(248, 249, 251, 1) 5%, rgba(248, 249, 251, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9W6DNx_-Ct-Mf6vQqaR7ScIAkXPCUqY5thA72KuCRpxof4NhnLb7dTh-lYpqNHlz93iWlnvsN_aYbXj_X0zoAhPlz8bmQ4nwrlw1MFEWmcEjhowUdpOeCEpjfznekFaiWJscylTmlShhxe88wSMR5yrtlZW_rUVHqvF3D9Mk6oIGF9kAlSKtPY0pD9p-zpY02zjz6h-yB5f5Hhq95gCv943IjI0MPRjhpdt_IuE_DR22iLm_GPzO88H0sY2egVsDmY5wjUIyg_VQ")'
                    }}
                >
                    <div className="flex flex-col p-6 gap-3">
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] w-8 bg-brand-blue"></div>
                            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.2em]">High-Value Delivery</span>
                        </div>
                        <h1 className="text-slate-900 tracking-tight text-4xl font-medium leading-[1.1] font-display">Strategic <br />Delivery</h1>
                        <p className="text-slate-600 text-base font-normal leading-relaxed max-w-[280px]">
                            Bridging the authority of professional counsel with the speed of technical execution.
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 pt-10">
                <h2 className="text-slate-900 tracking-tight text-2xl font-medium font-display">Service Pillars</h2>
                <div className="h-1 w-12 bg-brand-blue mt-2 rounded-full"></div>
            </div>

            {/* Service Pillars Grid */}
            <div className="grid grid-cols-1 gap-4 p-6">
                {[
                    { icon: 'gavel', title: 'Agile Counsel', desc: 'Elite advisory services focusing on risk mitigation and high-level strategy.' },
                    { icon: 'bolt', title: 'Pragmatic Delivery', desc: 'Rapid prototyping and development of functional technical assets.' },
                    { icon: 'groups', title: 'Internal Counsel', desc: 'Aligning internal stakeholders with execution-ready technical roadmaps.' },
                    { icon: 'verified', title: 'Outcome Orientation', desc: 'Focusing strictly on measurable business impact and final results.' }
                ].map((item, index) => (
                    <div key={index} className="flex flex-row items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all">
                        <div className="text-brand-blue bg-brand-blue/5 size-12 shrink-0 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 text-lg font-bold font-display">{item.title}</h3>
                            <p className="text-slate-500 text-sm font-normal leading-snug">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Methodology Section */}
            <div className="bg-white py-12 px-6 border-y border-slate-200 mt-6">
                <div className="mb-10">
                    <h2 className="text-slate-900 text-2xl font-medium font-display">Our Methodology</h2>
                    <p className="text-slate-500 text-sm mt-2 font-light">A rigorous framework for accelerated transformation.</p>
                </div>
                <div className="flex flex-col gap-10 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-blue to-brand-blue/5 opacity-20"></div>

                    {[
                        { step: '1', title: 'Strategic Alignment', desc: 'Defining core objectives and legal-grade risk assessments.' },
                        { step: '2', title: 'Rapid Prototyping', desc: 'Deploying functional RAD models to test hypotheses in real-world scenarios.' },
                        { step: '3', title: 'Iterative Build', desc: 'Continuous delivery cycles that refine performance while maintaining integrity.' }
                    ].map((item, index) => (
                        <div key={index} className="flex gap-6 relative z-10">
                            <div className="size-[22px] rounded-full bg-brand-blue flex items-center justify-center text-white ring-8 ring-brand-blue/10 shrink-0">
                                <span className="text-[9px] font-bold">{item.step}</span>
                            </div>
                            <div className="flex flex-col -mt-1">
                                <h3 className="text-slate-900 font-bold text-base font-display">{item.title}</h3>
                                <p className="text-slate-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Final Step (Different Color) */}
                    <div className="flex gap-6 relative z-10">
                        <div className="size-[22px] rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="text-[9px] font-bold">4</span>
                        </div>
                        <div className="flex flex-col -mt-1">
                            <h3 className="text-slate-900 font-bold text-base font-display">Outcome Verification</h3>
                            <p className="text-slate-400 text-sm mt-1 leading-relaxed">Final validation against KPIs and seamless infrastructure integration.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <BookConsultationSection />

            {/* Footer Spacer */}
            <div className="h-10 bg-off-white border-t border-slate-100"></div>
        </div>
    );
};

export default StrategicDelivery;
