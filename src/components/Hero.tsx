import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-governance-network.jpg";
import { ConsultationLeadForm } from "./ConsultationLeadForm";

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
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto" role="main">
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 
                id="hero-heading"
                className="text-4xl lg:text-6xl font-bold leading-tight text-white"
              >
                Navigate AI Governance with{" "}
                <span className="text-accent">Confidence</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
                Strategic advisory for senior leadership teams managing AI risk, compliance, and ethical implementation across enterprise environments.
              </p>
            </div>

            {/* Delivery Phase Activities */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Risk Mapping (Standards-Aligned)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Control Implementation (Framework-Based)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Audit Preparation (Compliance-Ready)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Documentation (Traceable)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Test-Driven Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">Continuous Monitoring (Governance-Integrated)</span>
              </div>
            </div>

            {/* Core Offerings */}
            <div className="space-y-4 pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Core Offerings</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Regulatory Compliance Pillars</h4>
                    <p className="text-sm text-white/80">Achieving EU AI Act Readiness and GDPR Compliant systems through comprehensive risk mapping.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <Zap className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">MLOps Security Modules</h4>
                    <p className="text-sm text-white/80">Hardening your CI/CD pipelines with audits informed by OWASP and threat modeling using MITRE ATLAS.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Governance & Audit Deliverables</h4>
                    <p className="text-sm text-white/80">Implementing controls based on NIST AI RMF and COBIT 2019 to ensure clear board oversight.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <ConsultationLeadForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
