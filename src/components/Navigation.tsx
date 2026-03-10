import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
  const industriesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleIndustriesEnter = () => {
    if (industriesTimeout.current) clearTimeout(industriesTimeout.current);
    setIsIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    industriesTimeout.current = setTimeout(() => setIsIndustriesOpen(false), 150);
  };

  const navLinks = [
    { name: "AI Risk Assessment", path: "/assessment-info" },
    { name: "Services", path: "/strategic-delivery" },
    { name: "Framework", path: "/framework" },
    { name: "Resources", path: "/resources" },
    { name: "Team", path: "/team" },
  ];

  const industryLinks = [
    { name: "All Industries", path: "/sectors" },
    { name: "Professional Services", path: "/sectors/professional-services-ai-governance" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
              <span className="material-symbols-outlined text-brand-blue text-xl">shield_with_heart</span>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Asimov<span className="text-brand-blue">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors py-2 border-b-2 ${
                  isActive(link.path)
                    ? 'text-brand-blue border-brand-blue'
                    : 'text-slate-600 hover:text-brand-blue border-transparent hover:border-brand-blue/30'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleIndustriesEnter}
              onMouseLeave={handleIndustriesLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors py-2 border-b-2 border-transparent hover:border-brand-blue/30">
                Industries
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isIndustriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg border border-slate-200 shadow-xl py-2 animate-in fade-in-0 zoom-in-95 duration-150">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-blue hover:bg-blue-50/50 transition-colors"
                      onClick={() => setIsIndustriesOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/free-assessment">
              <Button
                className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-6 rounded-md shadow-md shadow-brand-blue/15 transition-all hover:shadow-lg"
              >
                Take AI Risk Score
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-1 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium py-3 px-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-slate-700 hover:text-brand-blue hover:bg-blue-50/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Industries Expandable */}
            <div className="border-t border-slate-100 mt-1 pt-1">
              <button
                className="w-full flex items-center justify-between text-base font-medium text-slate-700 hover:text-brand-blue py-3 px-3 rounded-lg"
                onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
              >
                Industries
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileIndustriesOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block text-sm text-slate-500 hover:text-brand-blue py-2 px-3 rounded-lg hover:bg-blue-50/50"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileIndustriesOpen(false); }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/free-assessment" className="mt-3" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold"
              >
                Take AI Risk Score
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
