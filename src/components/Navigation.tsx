import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

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
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/assessment" className="text-foreground hover:text-accent transition-colors">
              AI Assessment
            </Link>
            <Link to="/resources" className="text-foreground hover:text-accent transition-colors">
              Resources
            </Link>
          </div>

          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link to="/assessment">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
