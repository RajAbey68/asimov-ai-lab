import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Palette, Smartphone, Zap, Compass, FileText, Shield, Bot, CheckCircle2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistCategory {
  title: string;
  icon: any;
  items: ChecklistItem[];
}

const DesignAudit = () => {
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      title: "Visual Design Principles",
      icon: Palette,
      items: [
        { id: "contrast", label: "Color contrast meets WCAG AA standards (4.5:1 text, 3:1 UI)", checked: false },
        { id: "typography", label: "Readable font sizes (min 16px body), clear hierarchy, line height 1.5-1.8", checked: false },
        { id: "whitespace", label: "Balanced content density with adequate breathing room", checked: false },
        { id: "hierarchy", label: "Clear visual hierarchy guides user attention", checked: false },
        { id: "consistency", label: "Uniform patterns across buttons, forms, navigation", checked: false },
      ]
    },
    {
      title: "Responsive & Accessible Design",
      icon: Smartphone,
      items: [
        { id: "touch-targets", label: "Touch targets minimum 44×44px, thumb-friendly zones", checked: false },
        { id: "breakpoints", label: "Fluid layouts adapt across mobile/tablet/desktop", checked: false },
        { id: "keyboard-nav", label: "All interactive elements keyboard accessible", checked: false },
        { id: "screen-readers", label: "Semantic HTML, ARIA labels, alt text present", checked: false },
        { id: "focus-states", label: "Visible focus indicators for keyboard navigation", checked: false },
      ]
    },
    {
      title: "Performance & Usability",
      icon: Zap,
      items: [
        { id: "load-time", label: "Initial load under 3s, interaction response under 1s", checked: false },
        { id: "core-vitals", label: "Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1", checked: false },
        { id: "progressive", label: "Core functionality works without JavaScript", checked: false },
        { id: "error-prevention", label: "Clear form validation, confirmation for destructive actions", checked: false },
        { id: "feedback", label: "Loading states, success/error messages, progress indicators", checked: false },
      ]
    },
    {
      title: "Navigation & Information Architecture",
      icon: Compass,
      items: [
        { id: "nav-clarity", label: "Intuitive menu structure, breadcrumbs, visible current location", checked: false },
        { id: "search", label: "Prominent search with autocomplete and filters (if applicable)", checked: false },
        { id: "ctas", label: "Clear primary actions with contrasting buttons", checked: false },
        { id: "footer", label: "Essential links, contact info, legal/privacy in footer", checked: false },
        { id: "sitemap", label: "Logical hierarchy, maximum 3-4 levels deep", checked: false },
      ]
    },
    {
      title: "Content & Messaging",
      icon: FileText,
      items: [
        { id: "clarity", label: "Plain language, technical terms explained", checked: false },
        { id: "scannability", label: "Headings, bullets, short paragraphs (3-4 lines max)", checked: false },
        { id: "value-prop", label: "Clear above-the-fold value proposition", checked: false },
        { id: "trust-signals", label: "Testimonials, case studies, certifications visible", checked: false },
        { id: "cta-specific", label: "Specific, compelling CTAs throughout journey", checked: false },
      ]
    },
    {
      title: "Trust & Transparency",
      icon: Shield,
      items: [
        { id: "privacy", label: "Privacy policy easy to find and clearly written", checked: false },
        { id: "cookie-consent", label: "GDPR/ePrivacy compliant cookie consent", checked: false },
        { id: "security", label: "SSL certificate, trust badges, secure indicators", checked: false },
        { id: "contact", label: "Multiple contact methods, response time expectations", checked: false },
        { id: "about-team", label: "Real people, credentials, company background shown", checked: false },
      ]
    },
    {
      title: "AI Interface Guidelines",
      icon: Bot,
      items: [
        { id: "ai-disclosure", label: "Clear indication when users interact with AI (EU AI Act Art 52)", checked: false },
        { id: "explainability", label: "AI provides reasoning for decisions/recommendations", checked: false },
        { id: "human-escalation", label: "Path to human support for complex/sensitive issues", checked: false },
        { id: "feedback-mech", label: "Users can rate/correct AI responses", checked: false },
        { id: "ai-limitations", label: "Transparent about AI capabilities and limitations", checked: false },
      ]
    },
  ]);

  const handleCheckboxChange = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].checked = 
      !newCategories[categoryIndex].items[itemIndex].checked;
    setCategories(newCategories);
  };

  const calculateCategoryProgress = (category: ChecklistCategory) => {
    const checked = category.items.filter(item => item.checked).length;
    return (checked / category.items.length) * 100;
  };

  const calculateOverallProgress = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = categories.reduce(
      (sum, cat) => sum + cat.items.filter(item => item.checked).length, 
      0
    );
    return (checkedItems / totalItems) * 100;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-accent-foreground">Internal Quality Assurance</Badge>
            <h1 className="text-4xl font-bold mb-4">Design Audit Checklist</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Evaluate ASIMOV-AI website against UI/UX best practices, accessibility standards, and AI governance principles.
            </p>
            
            {/* Overall Progress */}
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-2xl font-bold text-accent">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
                {overallProgress === 100 && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">All criteria met!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Checklist Categories */}
          <div className="space-y-6">
            {categories.map((category, categoryIndex) => {
              const progress = calculateCategoryProgress(category);
              const Icon = category.icon;
              
              return (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                      <Badge variant={progress === 100 ? "default" : "secondary"}>
                        {Math.round(progress)}%
                      </Badge>
                    </div>
                    <Progress value={progress} className="mt-4 h-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
                            className="mt-1"
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm leading-relaxed cursor-pointer flex-1"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recommendations Note */}
          <Card className="mt-8 border-accent/20 bg-gradient-subtle">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Governance-First Design
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This checklist embodies ASIMOV-AI's commitment to transparency and accountability. 
                Every design decision should support user trust, accessibility, and ethical AI principles. 
                Review this audit quarterly and after major site updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignAudit;
