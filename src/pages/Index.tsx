import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <Hero />
      <Services />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
