import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-ai-brain.png";

interface HeroMedia {
  id: number;
  media_type: string;
  file_path: string;
}

const Hero = () => {
  const [heroMedia, setHeroMedia] = useState<HeroMedia | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto" role="main">
          {/* Brand Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="text-sm text-white font-medium">A Consultative Approach to AI Governance</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            id="hero-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight text-white"
          >
            Not Sure Where Your
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">
              AI Compliance Starts?
            </span>
          </h1>

          {/* Core Purpose - Discovery Oriented */}
          <p className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mx-auto mb-8">
            Let&apos;s discover it together. You know your business. We know AI governance frameworks. Together, we&apos;ll map your path forward.
          </p>
          
          {/* Discovery Questions */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-3xl mx-auto mb-10">
            <p className="text-lg text-white/90 mb-4 font-medium">Most organizations are asking:</p>
            <ul className="space-y-3 text-left text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Which AI regulations actually apply to us?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>How do we classify our AI systems by risk level?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>What evidence do auditors actually need to see?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>How do we build AI without creating compliance debt?</span>
              </li>
            </ul>
          </div>

          {/* Methodology - Observations → Decisions → Sprints */}
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-center text-white/90 mb-6 text-lg">
              Our collaborative process:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <div className="text-2xl font-bold text-accent mb-2">1. Observe</div>
                <div className="text-white/80 text-sm">
                  We start by understanding your current state—no assumptions, just discovery of where you actually are.
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <div className="text-2xl font-bold text-accent mb-2">2. Orient</div>
                <div className="text-white/80 text-sm">
                  Together, we map your observations to frameworks (EU AI Act, ISO 42001, NIST) and make informed decisions.
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <div className="text-2xl font-bold text-accent mb-2">3. Sprint</div>
                <div className="text-white/80 text-sm">
                  We execute rapid, focused sprints—building controls, documentation, and deployments that stick.
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA - Discovery Oriented */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg h-14 px-10 shadow-lg">
              <a href="#book-consultation" aria-label="Start with a discovery consultation">
                Start with Discovery <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="text-sm text-white/80">Free consultation • No sales pitch, just conversation</p>
          </div>

          {/* What We Help You Discover */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/20 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-accent mb-4 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-lg text-white mb-3">Governance Readiness</h3>
              <p className="text-sm text-white/80 text-left mb-3">
                We help you discover your current position relative to:
              </p>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• EU AI Act, ISO/IEC 42001, NIST AI RMF</li>
                <li>• Risk classification requirements</li>
                <li>• Control implementation gaps</li>
                <li>• Audit preparation needs</li>
              </ul>
            </div>
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Zap className="w-10 h-10 text-accent mb-4 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-lg text-white mb-3">Implementation Pathways</h3>
              <p className="text-sm text-white/80 text-left mb-3">
                Then we map practical routes to:
              </p>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• Deploy compliant AI systems</li>
                <li>• Build custom agents & automations</li>
                <li>• Integrate governance into workflows</li>
                <li>• Sprint toward production readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
