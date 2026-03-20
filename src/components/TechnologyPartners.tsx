import { ExternalLink } from "lucide-react";

const partners = [
  {
    name: "UTS Global",
    product: "PlatformX (XpediteQA.ai)",
    description: "AI Test Automation — Scriptless, Self-Healing, Enterprise-Grade",
    url: "https://www.uts-global.com",
    role: "Technology Assurance Partner",
  },
];

const TechnologyPartners = () => {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest shrink-0">
            Technology &amp; Assurance Partners
          </span>
          <div className="h-8 w-px bg-slate-200 hidden md:block" />
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-slate-200 bg-white hover:border-accent/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 group-hover:text-accent transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {partner.product}
                  </span>
                  <span className="text-xs text-accent font-medium mt-0.5">
                    {partner.role}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4 max-w-xl mx-auto">
          Asimov AI governs the risk framework. Our partners automate the verification.
        </p>
      </div>
    </section>
  );
};

export default TechnologyPartners;
