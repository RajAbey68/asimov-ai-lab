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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
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
        <div className="max-w-5xl mx-auto">
          {/* Brand Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-white font-medium">Strategic AI, Responsibly Delivered</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight text-white">
            Design. Govern. Deploy
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">
              AI with Confidence
            </span>
          </h1>

          {/* Core Purpose */}
          <p className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mx-auto mb-8">
            A boutique AI consultancy helping leadership teams navigate the full AI lifecycle—from risk assessment to production deployment—with compliance built in from day one.
          </p>

          {/* Core Value Props */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Assess</div>
              <div className="text-sm text-white/70">Know Your Risks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">→</div>
              <div className="text-sm text-white/70">Build</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Deploy</div>
              <div className="text-sm text-white/70">With Confidence</div>
            </div>
          </div>

          {/* Single Primary CTA */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg h-14 px-10 shadow-lg">
              <a href="#book-consultation">
                Start Your AI Journey <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-sm text-white/80">Free consultation • Show the future, not the fear</p>
          </div>

          {/* Key Capabilities */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/20 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg text-white mb-3">Governance & Compliance</h3>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• EU AI Act, ISO/IEC 42001, NIST AI RMF</li>
                <li>• Risk assessment & classification</li>
                <li>• Control frameworks & policies</li>
                <li>• Audit-ready documentation</li>
              </ul>
            </div>
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Zap className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg text-white mb-3">Build & Deploy AI</h3>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• Custom AI agents & applications</li>
                <li>• Voice, vision & multi-agent systems</li>
                <li>• No-code/low-code automations</li>
                <li>• Production-ready deployments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
