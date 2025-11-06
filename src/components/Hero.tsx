import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

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
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-white font-medium">Trusted by enterprises across EU, UK & US</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight text-white">
            From Risk Assessment to
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">
              Compliant AI Deployment
            </span>
          </h1>

          {/* Problem-First Subheadline */}
          <p className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mx-auto mb-8">
            We don't just assess—we execute. Navigate EU AI Act compliance with expert assessments, 
            then deploy your AI systems with confidence through our end-to-end delivery management.
          </p>

          {/* Product Evidence Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Assessment</div>
              <div className="text-sm text-white/70">Risk & Gap Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">→</div>
              <div className="text-sm text-white/70">Then</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Delivery</div>
              <div className="text-sm text-white/70">Implementation & Launch</div>
            </div>
          </div>

          {/* Single Primary CTA */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg h-14 px-10 shadow-lg">
              <a href="#book-consultation">
                Book Your Risk Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-sm text-white/80">Free initial consultation • No credit card required</p>
          </div>

          {/* Use Cases / Who It's For */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/20 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg text-white mb-3">Assess & Plan</h3>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• EU AI Act compliance gap analysis</li>
                <li>• Risk profiling & classification</li>
                <li>• Regulatory roadmap creation</li>
                <li>• Expert consultation sessions</li>
              </ul>
            </div>
            <div className="text-center p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <Zap className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg text-white mb-3">Execute & Deliver</h3>
              <ul className="text-sm text-white/80 space-y-2 text-left">
                <li>• AI system development & integration</li>
                <li>• Compliance documentation production</li>
                <li>• Testing & validation management</li>
                <li>• Launch & deployment support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
