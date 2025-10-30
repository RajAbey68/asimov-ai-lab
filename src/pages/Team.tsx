import Navigation from "@/components/Navigation";
import Team from "@/components/Team";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <Team />
      <Footer />
    </div>
  );
};

export default TeamPage;
