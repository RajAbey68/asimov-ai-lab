import trustBadges from "@/assets/trust-badges.png";

const TrustBar = () => {
    return (
        <div className="w-full bg-slate-50 border-b border-slate-200 py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                    Aligned With Global Standards
                </span>
                <div className="h-8 md:h-10 w-px bg-slate-200 hidden md:block"></div>
                <img
                    src={trustBadges}
                    alt="EU AI Act Aligned - NIST AI RMF - ISO 42001"
                    className="h-12 md:h-14 w-auto grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                />
            </div>
        </div>
    );
};

export default TrustBar;
