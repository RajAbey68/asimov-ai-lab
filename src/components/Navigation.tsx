import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Mail, Phone } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="w-8 h-8 text-accent transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Asimov AI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/assessment" className="text-foreground hover:text-accent transition-colors">
              AI Assessment
            </Link>
            <Link to="/framework" className="text-foreground hover:text-accent transition-colors">
              Framework
            </Link>
            <Link to="/team" className="text-foreground hover:text-accent transition-colors">
              Team
            </Link>
            <Link to="/resources" className="text-foreground hover:text-accent transition-colors">
              Resources
            </Link>
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
              <a href="mailto:info@asimov-ai.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden lg:inline">info@asimov-ai.org</span>
              </a>
              <a href="tel:+441234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">+44 (0) 123 456 7890 (WhatsApp)</span>
              </a>
            </div>
          </div>

          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link to="/assessment">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
