import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProvenResults from "@/components/ProvenResults";
import RiskProfileSelector from "@/components/RiskProfileSelector";
import ServiceTiers from "@/components/ServiceTiers";
import ServicePillars from "@/components/ServicePillars";
import AsimovMethodology from "@/components/AsimovMethodology";
import MethodologyFlowDiagram from "@/components/MethodologyFlowDiagram";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Team from "@/components/Team";
import BookConsultationSection from "@/components/BookConsultationSection";
import FloatingCTA from "@/components/FloatingCTA";
import AsimovChatWidget from "@/components/AsimovChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <AsimovChatWidget />
      <Hero />
      <ProvenResults />
      <div id="risk-profiles">
        <RiskProfileSelector />
      </div>
      <ServiceTiers />
      <AsimovMethodology />
      <MethodologyFlowDiagram />
      <TestimonialCarousel />
      <Team />
      <BookConsultationSection />
      <Footer />
    </div>
  );
};

export default Index;
