import { Card } from "@/components/ui/card";
import { ConsultationIntakeForm } from "./ConsultationIntakeForm";
import { Shield, Clock, Users } from "lucide-react";

const BookConsultationSection = () => {
  return (
    <section id="book-consultation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your Consultation
            </h2>
            <p className="text-xl text-muted-foreground">
              Get expert guidance on AI risk assessment and regulatory compliance
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center border-accent/20">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance from AI compliance specialists
              </p>
            </Card>
            <Card className="p-6 text-center border-accent/20">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fast Response</h3>
              <p className="text-sm text-muted-foreground">
                We'll contact you within 24 hours to schedule your session
              </p>
            </Card>
            <Card className="p-6 text-center border-accent/20">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tailored Approach</h3>
              <p className="text-sm text-muted-foreground">
                Custom solutions designed for your specific needs
              </p>
            </Card>
          </div>

          {/* Form */}
          <div className="bg-background rounded-lg border border-border p-8 shadow-lg">
            <ConsultationIntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookConsultationSection;
