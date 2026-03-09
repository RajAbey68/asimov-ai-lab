import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isMobileSectorsOpen, setIsMobileSectorsOpen] = useState(false);
  const sectorsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBookConsultation = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      scrollToConsultation();
    } else {
      navigate("/#book-consultation");
      setTimeout(scrollToConsultation, 100);
    }
  };

  const scrollToConsultation = () => {
    const element = document.getElementById('book-consultation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSectorsEnter = () => {
    if (sectorsTimeout.current) clearTimeout(sectorsTimeout.current);
    setIsSectorsOpen(true);
  };

  const handleSectorsLeave = () => {
    sectorsTimeout.current = setTimeout(() => setIsSectorsOpen(false), 150);
  };

  const navLinks = [
    { name: "Frameworks", path: "/framework" },
    { name: "Modernisation", path: "/legacy-modernisation" },
    { name: "Services", path: "/#services" },
    { name: "Strategic Delivery", path: "/strategic-delivery" },
    { name: "Assessment", path: "/assessment-info" },
    { name: "Team", path: "/team" },
  ];

  const sectorLinks = [
    { name: "All Sectors", path: "/sectors" },
    { name: "Professional Services", path: "/sectors/professional-services-ai-governance" },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-brand-blue/20 p-2 rounded-lg group-hover:bg-brand-blue/30 transition-colors">
              <Brain className="w-6 h-6 text-brand-blue" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Asimov<span className="text-brand-blue">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 border-b-2 border-transparent hover:border-brand-blue"
              >
                {link.name}
              </Link>
            ))}

            {/* Sectors Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleSectorsEnter}
              onMouseLeave={handleSectorsLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 border-b-2 border-transparent hover:border-brand-blue">
                Sectors
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSectorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSectorsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 rounded-lg border border-white/10 shadow-xl py-2 animate-in fade-in-0 zoom-in-95 duration-150">
                  {sectorLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setIsSectorsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-6 rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:scale-105"
              onClick={handleBookConsultation}
            >
              Book Initial Discover Call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Sectors Expandable */}
            <div className="border-b border-white/5">
              <button
                className="w-full flex items-center justify-between text-lg font-medium text-slate-300 hover:text-white py-3"
                onClick={() => setIsMobileSectorsOpen(!isMobileSectorsOpen)}
              >
                Sectors
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSectorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileSectorsOpen && (
                <div className="pl-4 pb-3 space-y-2">
                  {sectorLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block text-base text-slate-400 hover:text-white py-2"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileSectorsOpen(false); }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="w-full bg-brand-blue hover:bg-blue-600 text-white mt-4"
              onClick={handleBookConsultation}
            >
              Book Initial Discover Call
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
