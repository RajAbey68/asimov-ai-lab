import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RiskProfileSelector from "@/components/RiskProfileSelector";
import ServiceTiers from "@/components/ServiceTiers";
import ServicePillars from "@/components/ServicePillars";
import AsimovMethodology from "@/components/AsimovMethodology";
import Team from "@/components/Team";
import BookConsultationSection from "@/components/BookConsultationSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <Hero />
      <div id="risk-profiles">
        <RiskProfileSelector />
      </div>
      <ServiceTiers />
      <ServicePillars />
      <AsimovMethodology />
      <Team />
      <BookConsultationSection />
      <Footer />
    </div>
  );
};

export default Index;
