import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  outcome: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The structured ASIMOV methodology transformed our AI governance from reactive compliance to proactive risk management. We now have full traceability and audit-ready documentation.",
    author: "Dr. Sarah Mitchell",
    role: "Chief Data Officer",
    organization: "Global Financial Services",
    outcome: "Achieved ISO 42001 certification in 6 months"
  },
  {
    quote: "Working with ASIMOV-AI Lab gave us confidence to deploy AI in production knowing we met regulatory requirements. Their discovery process identified risks we hadn't considered.",
    author: "Marcus Chen",
    role: "VP of Engineering",
    organization: "Healthcare Technology",
    outcome: "Reduced compliance review time by 60%"
  },
  {
    quote: "The collaborative approach meant our internal teams learned the governance framework while building it. We now have sustainable AI governance capabilities in-house.",
    author: "Emma Thompson",
    role: "Head of Legal & Compliance",
    organization: "Manufacturing Enterprise",
    outcome: "Built internal AI governance capability"
  },
  {
    quote: "Their expertise in EU AI Act requirements was invaluable. They translated complex regulations into practical controls we could implement without slowing down innovation.",
    author: "James Rodriguez",
    role: "Chief Innovation Officer",
    organization: "Legal Services Firm",
    outcome: "EU AI Act conformity assessment prepared"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Organizations that have transformed their AI governance with ASIMOV-AI
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-border/50 bg-card/80 backdrop-blur shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-16 h-16 text-accent/20" aria-hidden="true" />
                
                <div className="relative z-10 min-h-[280px] flex flex-col justify-between">
                  <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <div className="font-bold text-lg">{currentTestimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{currentTestimonial.role}</div>
                        <div className="text-sm font-semibold text-accent">{currentTestimonial.organization}</div>
                      </div>

                      <div className="inline-block px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
                        <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Outcome</div>
                        <div className="text-sm font-medium text-foreground">{currentTestimonial.outcome}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-accent w-8" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              {isAutoPlaying ? "Auto-playing" : "Paused"} • {currentIndex + 1} of {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
