import { Link } from "react-router-dom";
import { Brain, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Brain className="w-8 h-8 text-accent transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Asimov AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Expert AI risk assessment and governance solutions for enterprise organizations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  AI Assessment
                </Link>
              </li>
              <li>
                <Link to="/framework" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Framework
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Rapid Risk Assessment</li>
              <li className="text-sm text-muted-foreground">Expert Consultation</li>
              <li className="text-sm text-muted-foreground">Integration Support</li>
              <li className="text-sm text-muted-foreground">Continuous Monitoring</li>
              <li className="text-sm text-muted-foreground">Project Delivery</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-accent" />
                <a href="mailto:info@asimov-ai.org" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  info@asimov-ai.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-accent" />
                <a href="tel:+441234567890" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  +44 (0) 123 456 7890 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  United Kingdom
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Asimov AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/sitemap.xml" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
