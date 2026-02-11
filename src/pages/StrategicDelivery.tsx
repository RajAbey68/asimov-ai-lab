import Navigation from "@/components/Navigation";
import BookConsultationSection from "@/components/BookConsultationSection";
import bmadFrameworkImg from "@/assets/bmad-framework-halo.png";

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


            {/* BMAD Framework Section */}
            <div className="bg-white py-16 px-6 border-y border-slate-200 mt-6">
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h2 className="text-slate-900 text-3xl font-medium font-display mb-4">The BMAD Operating Model</h2>
                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
                        Delivery ≠ just build. ASIMOV-AI integrates as the assurance spine running through the entire lifecycle, ensuring outcomes are legally defensible and strategically sound.
                    </p>
                </div>

                {/* Framework Infographic */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 p-2">
                        <img
                            src={bmadFrameworkImg}
                            alt="BMAD Framework Lifecycle: Discover, Shape, Deliver, Validate, Operate with Core Principles"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>
                </div>

                <div className="text-center mb-12">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Core Principles (The Inner Halo)</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Ethics", "Fairness", "Security", "Transparency", "Accountability"].map((principle) => (
                            <span key={principle} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold border border-slate-200">
                                {principle}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10 max-w-4xl mx-auto relative px-4">
                    <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-blue via-brand-blue/20 to-transparent"></div>

                    {[
                        {
                            phase: 'DISCOVER',
                            color: 'bg-emerald-500',
                            role: 'AI Risk Strategist',
                            goal: 'Clarify value, risk exposure, and operating model impact.',
                            responsibilities: ['Classify AI use case risk (EU AI Act)', 'Identify prohibited categories', 'Define accountability owners']
                        },
                        {
                            phase: 'SHAPE',
                            color: 'bg-blue-600',
                            role: 'AI Governance Architect',
                            goal: 'Translate business intent into architecture + delivery plan.',
                            responsibilities: ['Embed controls in architecture', 'Define human oversight model', 'Align to NIST / ISO standards']
                        },
                        {
                            phase: 'DELIVER',
                            color: 'bg-amber-500',
                            role: 'AI Assurance Partner',
                            goal: 'Build safely while maintaining delivery pace.',
                            responsibilities: ['Validate sprint outcomes', 'Monitor shadow AI usage', 'Support PO & Architecture decisions']
                        },
                        {
                            phase: 'VALIDATE',
                            color: 'bg-orange-600',
                            role: 'AI Risk Assurance Lead',
                            goal: 'Prove the solution is defensible, not just functional.',
                            responsibilities: ['Conduct readiness review', 'Verify human oversight', 'Assess auditability & evidence']
                        },
                        {
                            phase: 'OPERATE',
                            color: 'bg-purple-600',
                            role: 'AI Governance Steward',
                            goal: 'Ensure AI remains safe after deployment.',
                            responsibilities: ['Monitor drift in governance', 'Re-assess risk posture', 'Support incident response']
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex gap-8 relative z-10 group">
                            <div className={`mt-1 size-14 rounded-2xl ${item.color} flex flex-col items-center justify-center text-white shadow-lg ring-4 ring-white shrink-0 z-20`}>
                                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Phase</span>
                                <span className="text-lg font-bold font-display">{index + 1}</span>
                            </div>

                            <div className="flex flex-col pt-1 flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-brand-blue/20 hover:shadow-md transition-all">
                                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                                    <h3 className="text-slate-900 font-bold text-xl font-display">{item.phase}</h3>
                                    <span className="text-brand-blue font-semibold text-sm bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/10">
                                        Role: {item.role}
                                    </span>
                                </div>
                                <p className="text-slate-600 font-medium mb-4 italic">"{item.goal}"</p>

                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Responsibilities</p>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {item.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <span className={`mt-1.5 size-1.5 rounded-full ${item.color}`}></span>
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
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
