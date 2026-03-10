import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import ProvenResults from "@/components/ProvenResults";
import RiskProfileSelector from "@/components/RiskProfileSelector";
import ServiceTiers from "@/components/ServiceTiers";
import ServicePillars from "@/components/ServicePillars";
import DeliveryPackages from "@/components/DeliveryPackages";
import RajivMethodology from "@/components/RajivMethodology";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Team from "@/components/Team";
import BookConsultationSection from "@/components/BookConsultationSection";
import FloatingCTA from "@/components/FloatingCTA";
import AsimovChatWidget from "@/components/AsimovChatWidget";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { CTARibbon } from "@/components/CTARibbon";
import TrustBar from "@/components/TrustBar";
import DataSovereignty from "@/components/DataSovereignty";
import MBADLifecycle from "@/components/MBADLifecycle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <StructuredData />
      <Navigation />
      <FloatingCTA />
      <Hero />
      <MBADLifecycle />
      <TrustBar />
      <DataSovereignty />
      <div id="risk-profiles">
        <RiskProfileSelector />
      </div>
      <ServicePillars />
      <ProvenResults />
      <ServiceTiers />
      <DeliveryPackages />
      <RajivMethodology />
      <TestimonialCarousel />
      <CTARibbon />
      <Team />
      <BookConsultationSection />
      <Footer />
    </div>
  );
};

export default Index;
