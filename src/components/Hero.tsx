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
                  AI Governance & Compliance
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl lg:text-6xl font-medium leading-tight text-slate-900 font-display"
              >
                We offer a governance framework to identify, assess & mitigate <span className="text-brand-blue">legal, ethical, technical & operational</span> AI risks — fast.
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-sans">
                Built for today’s AI reality:
              </p>
            </div>

            {/* Built For... */}
            <div className="space-y-4 pt-2">
              <div className="grid gap-3">
                {[
                  "Generative AI & LLMs",
                  "Agentic & autonomous systems",
                  "Real-time / edge AI (drones, vehicles, robotics)",
                  "OSS integrations & BSS/OSS environments"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-1" />
                    <p className="text-slate-900 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Statement */}
            <div className="pt-6 space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed font-sans">
                Fully aligned with <span className="font-semibold text-brand-blue">EU AI Act</span>, <span className="font-semibold text-brand-blue">NIST AI RMF</span>, <span className="font-semibold text-brand-blue">ISO/IEC 42001</span> — practical compliance without killing velocity.
              </p>
              <p className="text-xl font-bold text-slate-900 italic">
                Get compliant. Stay agile. Scale safely.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Link to="/assessment-info" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-brand-blue text-white hover:bg-blue-600 font-semibold text-lg px-8 py-6 shadow-lg shadow-brand-blue/20"
                  >
                    Request free initial call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-sm text-slate-600 text-center leading-relaxed px-2">
                  <span className="font-semibold text-slate-900">Initial Feasibility Call.</span> A preliminary discussion to scope your requirements and determine if our framework aligns with your needs.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsConsultationOpen(true)}
                  size="lg"
                  variant="outline"
                  className="w-full border-brand-blue text-brand-blue hover:bg-blue-50 font-semibold text-lg px-8 py-6 shadow-md"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Request a Consultation
                </Button>
                <p className="text-sm text-slate-600 text-center leading-relaxed px-2">
                  <span className="font-semibold text-slate-900">Expert Advisory.</span> A chargeable session to resolve specific tactical or strategic delivery issues, legal questions, or compliance blockers.
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
