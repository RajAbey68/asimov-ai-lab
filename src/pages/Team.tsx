import Navigation from "@/components/Navigation";
import Team from "@/components/Team";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import { ConsultationIntakeForm } from "@/components/ConsultationIntakeForm";

const TeamPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingCTA />
      <Team />
      
      {/* Consultation Request Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Consultation</h2>
              <p className="text-lg text-muted-foreground">
                Fill out this form to schedule your session with our expert team
              </p>
            </div>
            <ConsultationIntakeForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TeamPage;
