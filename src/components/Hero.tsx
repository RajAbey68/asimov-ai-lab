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
            AI Regulation Keeping You
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              Up At Night?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
            Navigate AI compliance confidently with expert risk assessment. We help you meet regulatory requirements while maintaining operational agility.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg shadow-lg">
              <Link to="/assessment">
                Get Your Free Risk Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/framework">
                View Framework
              </Link>
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
