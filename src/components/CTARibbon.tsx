import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTARibbon = () => {
  return (
    <section className="bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Strengthen Your AI Governance?
          </h2>
          <p className="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
            Connect with our experts to discuss your organization's AI governance needs and regulatory readiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to="/#book-consultation">Schedule Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/resources">Download Resources</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
