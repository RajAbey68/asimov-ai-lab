import { ArrowRight, Search, PencilRuler, Rocket, CheckCircle2, SlidersHorizontal } from "lucide-react";

interface StageProps {
    number: string;
    title: string;
    icon: any;
    desc: string;
    isLast?: boolean;
}

const Stage = ({ number, title, icon: Icon, desc, isLast }: StageProps) => (
    <div className="flex-1 relative group">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-bold flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-colors">
                {number}
            </div>
            <div className="h-0.5 flex-1 bg-slate-100 group-hover:bg-blue-50 transition-colors">
                {!isLast && <div className="w-full h-full bg-slate-200" />}
            </div>
        </div>

        <div className="pr-4">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold">
                <Icon className="w-4 h-4 text-brand-blue" />
                <h3 className="uppercase tracking-wider text-sm">{title}</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    </div>
);

const MBADLifecycle = () => {
    return (
        <section className="py-16 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 md:gap-4 overflow-x-auto pb-4 md:pb-0">
                    <Stage
                        number="01"
                        title="Discover"
                        icon={Search}
                        desc="Risk mapping & regulatory scoping."
                    />
                    <Stage
                        number="02"
                        title="Shape"
                        icon={PencilRuler}
                        desc="Control design & red-teaming."
                    />
                    <Stage
                        number="03"
                        title="Deliver"
                        icon={Rocket}
                        desc="Agile build with guardrails."
                    />
                    <Stage
                        number="04"
                        title="Validate"
                        icon={CheckCircle2}
                        desc="Audit report & assurance."
                    />
                    <Stage
                        number="05"
                        title="Operate"
                        icon={SlidersHorizontal}
                        desc="Continuous monitoring & handover."
                        isLast={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default MBADLifecycle;
