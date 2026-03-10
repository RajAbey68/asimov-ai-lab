import { Shield, Lock, Server, FileKey, CheckCircle } from "lucide-react";

const DataSovereignty = () => {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-block">
                            <span className="text-brand-blue font-bold tracking-wider uppercase bg-brand-blue/10 px-4 py-2 rounded-full border border-brand-blue/20 text-sm">
                                Security Architecture
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            Technical Sovereignty & <br />
                            <span className="text-brand-blue">Audit-Ready Logistics</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed">
                            We don't just "wrap" APIs. We architect sovereign loops where your data never trains public models.
                        </p>

                        <div className="space-y-6 pt-4">
                            {[
                                {
                                    icon: Server,
                                    title: "On-Premise / Private Cloud Options",
                                    desc: "Deploy LLMs within your existing VPC (AWS/Azure/GCP) to ensure data never leaves your perimeter."
                                },
                                {
                                    icon: FileKey,
                                    title: "Zero-Data Training Policy",
                                    desc: "Contractual and technical guarantees that your inputs/outputs are excluded from foundational model training."
                                },
                                {
                                    icon: Shield,
                                    title: "Cryptographic Provenance",
                                    desc: "Immutable logs for every AI decision, creating a forensic audit trail for regulatory inquiries."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 bg-slate-800 p-3 rounded-lg h-fit border border-slate-700">
                                        <item.icon className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Visual representation of secure architecture */}
                        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-purple-500" />

                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                    <span className="font-mono text-sm text-slate-400">System Status</span>
                                    <span className="flex items-center text-green-400 text-sm font-bold gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        SECURE
                                    </span>
                                </div>

                                <div className="space-y-4 font-mono text-sm">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-brand-blue" />
                                        <span>PII Redaction Layer: <span className="text-green-400">Active</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-brand-blue" />
                                        <span>Model Gateway: <span className="text-green-400">Private Endpoint</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-brand-blue" />
                                        <span>Audit Logging: <span className="text-green-400">Enforced (SHA-256)</span></span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-700">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Compliance Standards Detected</p>
                                    <div className="flex flex-wrap gap-3">
                                        {["SOC2 Type II", "ISO 27001", "EU AI Act High-Risk", "HIPAA"].map((badge, j) => (
                                            <span key={j} className="px-3 py-1 bg-slate-900 border border-slate-600 rounded text-xs text-slate-300">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abstract connection lines decoration */}
                        <svg className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 text-slate-800 opacity-50" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DataSovereignty;
