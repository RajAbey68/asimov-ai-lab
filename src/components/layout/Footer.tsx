import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Asimov</span>
              <span className="text-2xl font-light text-accent ml-1">AI</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Expert AI governance and risk assessment services. Navigate AI regulations with confidence.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/assessment" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                AI Risk Assessment
              </Link>
              <Link to="/consultation" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                Expert Consultation
              </Link>
              <Link to="/training" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                Training Programs
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                About Us
              </Link>
              <Link to="/team" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                Our Team
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:hello@asimov-ai.com" className="flex items-center text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                hello@asimov-ai.com
              </a>
              <a href="tel:+442012345678" className="flex items-center text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                +44 20 1234 5678
              </a>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Asimov AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
