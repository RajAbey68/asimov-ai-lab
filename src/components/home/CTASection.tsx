import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Navigate AI Compliance?
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Get started with a free consultation to understand your AI governance needs 
            and develop a roadmap for compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center rounded-md border-2 border-primary-foreground/30 px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
