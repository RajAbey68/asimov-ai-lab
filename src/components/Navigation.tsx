import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Mail, Phone } from "lucide-react";

const Navigation = () => {
  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="w-8 h-8 text-accent transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Asimov AI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6" role="menubar" aria-label="Primary navigation">
            <Link 
              to="/" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              Home
            </Link>
            <Link 
              to="/assessment" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              AI Assessment
            </Link>
            <Link 
              to="/framework" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              Framework
            </Link>
            <Link 
              to="/sectors" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              Sectors
            </Link>
            <Link 
              to="/team" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              Team
            </Link>
            <Link 
              to="/resources" 
              className="text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
              role="menuitem"
            >
              Resources
            </Link>
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border" role="group" aria-label="Contact information">
              <a 
                href="mailto:info@asimov-ai.org" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-label="Email us at info@asimov-ai.org"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span className="hidden lg:inline">info@asimov-ai.org</span>
              </a>
              <a 
                href="tel:+447733393956" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-label="Call or message us on WhatsApp or Telegram at +44 7733 393956"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="hidden lg:inline">+44 7733 393956 (WhatsApp/Telegram)</span>
              </a>
            </div>
          </div>

          <Button asChild className="bg-accent hover:bg-accent/90">
            <a href="/#book-consultation" aria-label="Book a consultation with our team">
              Book Consultation
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
