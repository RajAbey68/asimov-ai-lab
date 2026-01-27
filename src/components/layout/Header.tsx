import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Asimov</span>
            <span className="text-2xl font-light text-accent ml-1">AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/assessment" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                AI Assessment
              </Link>
              <Link to="/consultation" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                Consultation
              </Link>
              <Link to="/training" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                Training
              </Link>
            </div>
          </div>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/consultation"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 space-y-4">
            <Link to="/" className="block text-sm font-medium text-foreground hover:text-primary">
              Home
            </Link>
            <Link to="/assessment" className="block text-sm font-medium text-foreground hover:text-primary">
              AI Assessment
            </Link>
            <Link to="/consultation" className="block text-sm font-medium text-foreground hover:text-primary">
              Consultation
            </Link>
            <Link to="/about" className="block text-sm font-medium text-foreground hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="block text-sm font-medium text-foreground hover:text-primary">
              Contact
            </Link>
            <Link 
              to="/consultation"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Book Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
