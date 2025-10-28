import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <Hero />
      <Services />
    </div>
  );
};

export default Index;
