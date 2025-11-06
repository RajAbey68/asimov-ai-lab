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
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Trusted by enterprises across EU, UK & US</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight">
            Purpose-Built Platform for
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">
              EU AI Act Compliance
            </span>
          </h1>

          {/* Problem-First Subheadline */}
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Don't wait for regulators to knock. Navigate high-risk AI requirements with expert-led assessments, 
            automated gap analysis, and compliance frameworks—built specifically for the EU AI Act.
          </p>

          {/* Product Evidence Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Controls Mapped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Major Frameworks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">24hr</div>
              <div className="text-sm text-muted-foreground">Initial Response</div>
            </div>
          </div>

          {/* Single Primary CTA */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg h-14 px-10 shadow-lg">
              <a href="#book-consultation">
                Book Your Risk Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">Free initial consultation • No credit card required</p>
          </div>

          {/* Use Cases / Who It's For */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-border/30">
            {[
              { icon: Shield, title: "High-Risk AI Systems", desc: "EU AI Act Annex III compliance for critical applications" },
              { icon: Zap, title: "General Purpose AI", desc: "GPAI transparency and systemic risk assessments" },
              { icon: Shield, title: "Cross-Border Deployment", desc: "Multi-jurisdiction regulatory alignment (EU/UK/US)" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <item.icon className="w-8 h-8 text-accent mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
