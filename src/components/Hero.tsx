import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle2, ChevronDown, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-governance-network.jpg";
import HeroChatEmbed from "./HeroChatEmbed";
import ConsultationIntakeDialog from "@/components/ConsultationIntakeDialog";
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
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

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
                <span className="text-brand-blue text-sm font-bold tracking-wider uppercase bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                  Leadership Advisory
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl lg:text-6xl font-medium leading-tight text-slate-900 font-display"
              >
                Before regulators ask questions, <span className="text-brand-blue">leadership needs clear answers</span>.
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-sans">
                Is your organization's data ready for AI? Our <strong>30-Point AI Readiness Audit</strong> identifies security gaps before you deploy.
              </p>
            </div>

            {/* AI Risk Readiness Assessment Block */}
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-brand-blue" />
                <h3 className="font-bold text-slate-900">AI Risk Readiness – 5 Minute Leadership Assessment</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Receive a confidential Governance Maturity Score & Delivery Risk Profile.
              </p>
              <Link to="/assessment-info" className="text-brand-blue font-semibold text-sm hover:underline flex items-center gap-1">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Compliance Statement */}
            <div className="pt-2 space-y-4">
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Aligned with <span className="font-semibold text-slate-700">EU AI Act</span>, <span className="font-semibold text-slate-700">NIST AI RMF</span>, <span className="font-semibold text-slate-700">ISO/IEC 42001</span>.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Link to="/#book-consultation" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-brand-blue text-white hover:bg-blue-600 font-semibold text-lg px-8 py-6 shadow-lg shadow-brand-blue/20"
                  >
                    Book Initial Discover Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-sm text-slate-600 text-center leading-relaxed px-2">
                  <span className="font-semibold text-slate-900">Leadership Briefing.</span> A structured conversation to understand your AI governance posture and delivery risks.
                </p>
              </div>
            </div>

            <ConsultationIntakeDialog
              open={isConsultationOpen}
              onOpenChange={setIsConsultationOpen}
            />
          </div>

          {/* AI Risk Assessment Chat */}
          <HeroChatEmbed />
        </div>
      </div>
    </section>
  );
};

export default Hero;
