import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-governance-network.jpg";
import HeroChatEmbed from "./HeroChatEmbed";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface HeroMedia {
  id: number;
  media_type: string;
  file_path: string;
}

const Hero = () => {
  const [heroMedia, setHeroMedia] = useState<HeroMedia | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [isFrameworksOpen, setIsFrameworksOpen] = useState(false);

  useEffect(() => {
    fetchHeroMedia();
  }, []);

  const fetchHeroMedia = async () => {
    const { data } = await supabase
      .from("hero_media")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .maybeSingle();

    if (data) {
      setHeroMedia(data);
      const { data: urlData } = supabase.storage
        .from("hero-media")
        .getPublicUrl(data.file_path);
      setMediaUrl(urlData.publicUrl);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        {heroMedia && mediaUrl ? (
          heroMedia.media_type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${mediaUrl})` }}
            />
          )
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto" role="main">
          <div className="space-y-8">
            {/* Mission Statement */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-accent text-sm font-semibold tracking-wider uppercase bg-accent/10 px-4 py-2 rounded-full">
                  AI Governance & Compliance
                </span>
              </div>
              
              <h1 
                id="hero-heading"
                className="text-4xl lg:text-6xl font-bold leading-tight text-white"
              >
                Make AI Governance{" "}
                <span className="text-accent">Practical</span>{" "}
                Not a Burden
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                We help organisations align with established frameworks including{" "}
                <span className="font-semibold text-accent">EU AI Act</span>,{" "}
                <span className="font-semibold text-accent">NIST AI RMF</span>,{" "}
                <span className="font-semibold text-accent">ISO/IEC 42001</span>, and{" "}
                <span className="font-semibold text-accent">GDPR</span>.
              </p>

              <p className="text-lg text-white/80 leading-relaxed border-l-4 border-accent pl-6 italic">
                Our goal is to make AI governance practical and integrated into your existing workflows—not a compliance burden bolted on afterward.
              </p>
            </div>

            {/* What We Solve */}
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-bold text-white">What We Solve</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <p className="text-white/90">Navigate complex regulatory requirements without slowing down innovation</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <p className="text-white/90">Build audit-ready documentation and controls that satisfy board oversight</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <p className="text-white/90">Implement governance that scales with your AI systems—from prototype to production</p>
                </div>
              </div>
            </div>

            {/* Core Delivery Activities */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-white">Core Delivery Activities</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Risk Mapping</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Control Implementation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Audit Preparation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Documentation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Test-Driven Validation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-white">Continuous Monitoring</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link to="/ai-assessment">
                <Button 
                  size="lg" 
                  className="bg-accent text-primary hover:bg-accent/90 font-semibold text-lg px-8 py-6"
                >
                  Start Your AI Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Risk Assessment Chat */}
          <HeroChatEmbed />
        </div>
      </div>
    </section>
  );
};

export default Hero;
