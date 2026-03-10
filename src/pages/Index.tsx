import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import ProvenResults from "@/components/ProvenResults";
import RiskProfileSelector from "@/components/RiskProfileSelector";
import ServicePillars from "@/components/ServicePillars";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Team from "@/components/Team";
import BookConsultationSection from "@/components/BookConsultationSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { CTARibbon } from "@/components/CTARibbon";
import TrustBar from "@/components/TrustBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <StructuredData />
      <Navigation />
      <FloatingCTA />

      {/* 1. Hero — Priestley-style clarity */}
      <Hero />

      {/* 2. Trust Strip — Standards alignment */}
      <TrustBar />

      {/* 3. Services — Audit → Prototype → Enterprise */}
      <ServicePillars />

      {/* 4. Who We Help — Risk profiles */}
      <div id="risk-profiles">
        <RiskProfileSelector />
      </div>

      {/* 5. Proven Results / Evidence */}
      <ProvenResults />

      {/* 6. Assessment CTA Ribbon */}
      <CTARibbon />

      {/* 7. Testimonials */}
      <TestimonialCarousel />

      {/* 8. Team */}
      <Team />

      {/* 9. Book Consultation */}
      <BookConsultationSection />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
