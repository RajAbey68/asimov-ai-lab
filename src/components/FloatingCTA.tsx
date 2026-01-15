import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px down
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative">
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl transition-all text-base font-semibold pr-6"
        >
          <a href="#book-consultation">
            Book Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;
