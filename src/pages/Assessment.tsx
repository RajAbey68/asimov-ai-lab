import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import assessmentBg from "@/assets/assessment-bg.jpg";
import aiCompliance from "@/assets/ai-compliance.jpg";
import asimovIterative from "@/assets/asimov-iterative.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, TrendingUp, Shield, Lock, Scale, DollarSign, UserCheck, Lightbulb, Zap, Eye, RefreshCw, Target, Building2, Heart, Landmark } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Assessment = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    description: "",
    timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assessment Request Submitted",
      description: "Our team will review your request and contact you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <img src={assessmentBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-medium">Built for Boardrooms, Regulators & Executive Decision-Makers</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ASIMOV-AI Risk Method</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A structured, cross-disciplinary governance framework to manage legal, ethical, and technical risks of AI systems
              </p>
            </div>

            {/* Compliance Illustration */}
            <div className="mb-12">
              <Card className="border-border overflow-hidden">
                <div className="relative h-[400px]">
                  <img 
                    src={aiCompliance} 
                    alt="AI Compliance and Assessment showing checklists, risk matrices, regulatory documents, and compliance badges" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end">
                    <div className="p-8 w-full">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">Comprehensive Risk Assessment</h2>
                      <p className="text-muted-foreground max-w-3xl">
                        Our methodology provides systematic evaluation across legal, ethical, and technical dimensions to ensure AI systems meet regulatory requirements and organizational standards.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Overview Section */}
            <Card className="border-border mb-12 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="text-2xl">Framework Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The ASIMOV-AI Risk Method is a structured, cross-disciplinary governance framework developed to help organisations manage the legal, ethical, and technical risks of Artificial Intelligence (AI) systems. It is especially suited for high-risk AI applications such as generative AI, large language models (LLMs), and automated decision-making systems.
                </p>
                <p>
                  Developed in response to the growing complexity of AI risk, the methodology combines traditional audit disciplines with AI-specific safeguards. It aligns to global standards including the <strong>EU AI Act</strong>, <strong>NIST AI Risk Management Framework</strong>, and <strong>ISO/IEC 42001</strong>, enabling organisations to achieve practical compliance while maintaining operational agility.
                </p>
                <div className="pt-4">
                  <Button asChild variant="outline" className="gap-2">
                    <a href="/framework">
                      <Eye className="w-4 h-4" />
                      View Detailed Framework
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 5 Core Phases */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Iterative Lifecycle Approach</h2>
              <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
                Five core phases integrated with domain experts embedded at concept stage to reduce rework and anticipate sectoral risk
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <RefreshCw className="w-5 h-5 text-accent" />
                <p className="text-center text-accent font-semibold">
                  This is NOT a waterfall process - each phase can iterate and feed back to previous phases
                </p>
              </div>

              {/* ASIMOV Iterative Method Infographic */}
              <div className="mb-12 flex justify-center">
                <div className="relative max-w-5xl">
                  <img 
                    src={asimovIterative} 
                    alt="ASIMOV AI Risk Methodology showing five iterative phases with bidirectional arrows: Concept & Design, Development, Validation & Testing, Deployment, and Monitoring & Review" 
                    className="w-full h-auto rounded-xl shadow-xl"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    phase: "1",
                    icon: Lightbulb,
                    title: "Concept & Design",
                    desc: "Risk tiering, regulatory mapping, and stakeholder profiling",
                    color: "text-blue-600"
                  },
                  {
                    phase: "2",
                    icon: Zap,
                    title: "Development",
                    desc: "Secure AI development lifecycle with embedded privacy and bias controls",
                    color: "text-purple-600"
                  },
                  {
                    phase: "3",
                    icon: CheckCircle,
                    title: "Pre-Deployment",
                    desc: "Compliance validation and conformance documentation",
                    color: "text-green-600"
                  },
                  {
                    phase: "4",
                    icon: Eye,
                    title: "Monitoring",
                    desc: "Real-time dashboards, model drift tracking, and incident logging",
                    color: "text-orange-600"
                  },
                  {
                    phase: "5",
                    icon: RefreshCw,
                    title: "Continuous Improvement",
                    desc: "Post-incident learning and policy refresh cycles",
                    color: "text-cyan-600"
                  }
                ].map((item) => (
                  <Card key={item.phase} className="border-border hover:border-accent/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-muted/10 group-hover:text-muted/20 transition-colors">
                      {item.phase}
                    </div>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Core Risk Pillars */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Core Risk Assessment Pillars</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Scale,
                    title: "Legal & Regulatory",
                    desc: "EU AI Act, GDPR, IP law compliance",
                    gradient: "from-blue-500/20 to-blue-600/20"
                  },
                  {
                    icon: Shield,
                    title: "Ethical & Societal",
                    desc: "Bias, discrimination, transparency",
                    gradient: "from-purple-500/20 to-purple-600/20"
                  },
                  {
                    icon: Lock,
                    title: "Security & Operational",
                    desc: "Data governance, access controls",
                    gradient: "from-cyan-500/20 to-cyan-600/20"
                  },
                  {
                    icon: DollarSign,
                    title: "Commercial & Reputational",
                    desc: "Liability, contractual risk",
                    gradient: "from-orange-500/20 to-orange-600/20"
                  },
                  {
                    icon: UserCheck,
                    title: "Governance & Accountability",
                    desc: "Oversight, human-in-the-loop",
                    gradient: "from-green-500/20 to-green-600/20"
                  }
                ].map((pillar, i) => (
                  <Card key={i} className={`border-border hover:border-accent/50 transition-all bg-gradient-to-br ${pillar.gradient}`}>
                    <CardHeader>
                      <pillar.icon className="w-10 h-10 mb-3 text-accent" />
                      <CardTitle className="text-xl">{pillar.title}</CardTitle>
                      <CardDescription className="text-base">{pillar.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sector Applications */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Proven Across Sectors</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Applied successfully in multiple industries with specific use cases and measurable outcomes
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Building2,
                    title: "Financial Services",
                    use: "Reducing bias in AI-based credit scoring models"
                  },
                  {
                    icon: Heart,
                    title: "Healthcare",
                    use: "Enabling regulatory-compliant diagnostic tools"
                  },
                  {
                    icon: Landmark,
                    title: "Government",
                    use: "Improving explainability for public sector decisions"
                  },
                  {
                    icon: Target,
                    title: "Retail",
                    use: "Enhancing customer experience with responsible AI"
                  }
                ].map((sector, i) => (
                  <Card key={i} className="border-border hover:border-accent/50 transition-all text-center">
                    <CardHeader>
                      <sector.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                      <CardTitle className="text-lg">{sector.title}</CardTitle>
                      <CardDescription className="text-sm">{sector.use}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <Card className="border-border bg-gradient-accent mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-accent-foreground">Strategic Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: CheckCircle, title: "Compliance-Ready", desc: "Aligns with EU AI Act, NIST AI RMF, ISO/IEC 42001" },
                    { icon: Shield, title: "Litigation Shield", desc: "Pre-empts legal challenges through documented governance" },
                    { icon: TrendingUp, title: "Investment-Ready", desc: "Builds confidence by proving you understand and manage AI risk" },
                    { icon: Target, title: "Operational Agility", desc: "Balance innovation with governance, speed with responsibility" }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <benefit.icon className="w-6 h-6 text-accent-foreground flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-accent-foreground mb-1">{benefit.title}</h3>
                        <p className="text-sm text-accent-foreground/80">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Request Assessment Form */}
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: CheckCircle, title: "24-48 Hour Turnaround", desc: "Fast analysis without compromising quality" },
                  { icon: AlertCircle, title: "Risk Identification", desc: "Comprehensive evaluation of potential issues" },
                  { icon: TrendingUp, title: "Actionable Insights", desc: "Clear recommendations for improvement" },
                ].map((item, i) => (
                  <Card key={i} className="text-center border-border hover:border-accent/50 transition-all">
                    <CardHeader>
                      <item.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Request an Assessment</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will begin your ASIMOV-AI risk assessment
                  </CardDescription>
                </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="Enter your project name"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      required
                    >
                      <SelectTrigger id="projectType">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nlp">Natural Language Processing</SelectItem>
                        <SelectItem value="computer-vision">Computer Vision</SelectItem>
                        <SelectItem value="predictive">Predictive Analytics</SelectItem>
                        <SelectItem value="recommendation">Recommendation Systems</SelectItem>
                        <SelectItem value="automation">Process Automation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Expected Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      required
                    >
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                        <SelectItem value="standard">Standard (1-2 months)</SelectItem>
                        <SelectItem value="flexible">Flexible (3+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your AI project, goals, and any specific concerns..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                    Submit Assessment Request
                  </Button>
                </form>
              </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
