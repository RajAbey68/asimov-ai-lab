import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">EU AI Act • NIST • ISO/IEC 42001 Compliance</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Is Your AI System a<br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Ticking Regulatory Time Bomb?
            </span>
          </h1>

          <div className="space-y-6 text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            <p className="font-medium">Ask yourself:</p>
            <ul className="space-y-3 text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-accent text-2xl">→</span>
                <span><strong>Why</strong> should your board care about AI risk <em>right now?</em></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-2xl">→</span>
                <span><strong>What risks</strong> could shut down your AI project tomorrow?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-2xl">→</span>
                <span><strong>What consequences</strong> could you face personally?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-2xl">→</span>
                <span><strong>Who</strong> in your organization needs to act—and when?</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <p className="text-lg text-primary-foreground/80 mb-6">
              The answers depend on <strong>your role</strong>. Find your risk profile below.
            </p>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#risk-profiles">
                Find Your Risk Profile <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {[
              { icon: Shield, title: "Risk Assessment", desc: "Identify and mitigate AI risks" },
              { icon: Zap, title: "Rapid Deployment", desc: "Fast-track your AI initiatives" },
              { icon: Shield, title: "Expert Delivery", desc: "End-to-end project execution" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-card/10 backdrop-blur-sm border border-border/20 hover:border-accent/30 transition-all">
                <item.icon className="w-8 h-8 text-accent mb-3 mx-auto" />
                <h3 className="font-semibold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-primary-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
