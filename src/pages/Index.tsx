import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
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
import StructuredData from "@/components/StructuredData";
import { CTARibbon } from "@/components/CTARibbon";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StructuredData />
      <Navigation />
      <FloatingCTA />
      <AsimovChatWidget />
      <Hero />
      <Services />
      <ProvenResults />
      <div id="risk-profiles">
        <RiskProfileSelector />
      </div>
      <ServiceTiers />
      <AsimovMethodology />
      <MethodologyFlowDiagram />
      <TestimonialCarousel />
      <CTARibbon />
      <Team />
      <BookConsultationSection />
      <Footer />
    </div>
  );
};

export default Index;
