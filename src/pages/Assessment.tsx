import Navigation from "@/components/Navigation";
import FloatingCTA from "@/components/FloatingCTA";
import ContactInfo from "@/components/ContactInfo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import assessmentBg from "@/assets/assessment-bg.jpg";
import aiCompliance from "@/assets/ai-compliance.jpg";
import aiMlLifecycle from "@/assets/ai-ml-lifecycle.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, TrendingUp, Shield, Lock, Scale, DollarSign, UserCheck, Lightbulb, Zap, Eye, RefreshCw, Target, Building2, Heart, Landmark, ArrowRight } from "lucide-react";
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
      <FloatingCTA />
      
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
                <span className="text-sm text-accent font-medium">Expert AI Risk Assessment & Compliance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ASIMOV-AI Risk Assessment Method</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our proven framework helps you identify, assess, and mitigate AI risks to achieve compliance with EU AI Act, NIST, and ISO/IEC 42001 standards
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg shadow-lg">
                  <a href="#request-form">
                    Request Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
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

            {/* 5 Core Phases - Iterative Lifecycle */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">ITERATIVE LIFECYCLE</h2>
                <p className="text-lg text-accent font-semibold mb-2">CONTINUOUS IMPROVEMENT</p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Five core phases integrated with domain experts embedded at concept stage to reduce rework and anticipate sectoral risk
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: Lightbulb,
                    title: "CONCEPT",
                    desc: "Initial AI system design, requirement gathering, stakeholder alignment, risk tiering, and feasibility assessment",
                    bgColor: "bg-blue-500/10",
                    iconColor: "text-blue-500"
                  },
                  {
                    icon: Zap,
                    title: "DEVELOP",
                    desc: "Build and train models, integrate data pipelines, document architectural decisions, implement technical controls, and establish data governance",
                    bgColor: "bg-purple-500/10",
                    iconColor: "text-purple-500"
                  },
                  {
                    icon: CheckCircle,
                    title: "VALIDATE",
                    desc: "Test against requirements, verify compliance controls, validate model performance, create audit trails, and complete documentation",
                    bgColor: "bg-green-500/10",
                    iconColor: "text-green-500"
                  },
                  {
                    icon: Eye,
                    title: "MONITOR",
                    desc: "Continuous monitoring, performance tracking, model drift detection, incident response, and ongoing risk assessment",
                    bgColor: "bg-orange-500/10",
                    iconColor: "text-orange-500"
                  },
                  {
                    icon: RefreshCw,
                    title: "DEPLOY",
                    desc: "Roll out to production, user training, change management, stakeholder communication, and handover documentation",
                    bgColor: "bg-cyan-500/10",
                    iconColor: "text-cyan-500"
                  }
                ].map((phase) => (
                  <Card key={phase.title} className="border-border hover:border-accent/50 transition-all hover:shadow-lg group">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 rounded-full ${phase.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <phase.icon className={`w-8 h-8 ${phase.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg font-bold mb-3">{phase.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{phase.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                <RefreshCw className="w-5 h-5 text-accent" />
                <p className="text-center text-accent font-semibold">
                  This is NOT a waterfall process - each phase can iterate and feed back to previous phases
                </p>
              </div>
            </div>

            {/* CI/CD Explanation Section */}
            <Card className="border-border mb-16 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="text-2xl">AI/ML Lifecycle: Continuous Integration & Deployment</CardTitle>
                <CardDescription className="text-base">
                  Unlike traditional waterfall development, the AI/ML lifecycle operates as a <strong>continuous, iterative process</strong> where models are constantly refined and improved
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-muted-foreground">
                  Each phase includes both quantitative and qualitative gates that determine whether to proceed or iterate back. This enables organizations to maintain quality, compliance, and performance throughout the model lifecycle.
                </p>

                {/* Lifecycle Diagram */}
                <div className="flex justify-center my-8">
                  <img 
                    src={aiMlLifecycle} 
                    alt="AI/ML Lifecycle showing continuous flow between Data Collection, Training, Validation, Inference, Monitoring, and Deployment phases with alternating quantitative and qualitative gates" 
                    className="max-w-md w-full h-auto"
                  />
                </div>

                {/* Concrete Examples Table */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-center">Concrete Phase Gate Examples</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Here are practical examples of quantitative and qualitative phase gates for each stage in the AI/ML lifecycle:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-border">
                          <th className="text-left p-4 font-bold bg-accent/10">Phase</th>
                          <th className="text-left p-4 font-bold bg-accent/10">Quantitative Gate Example</th>
                          <th className="text-left p-4 font-bold bg-accent/10">Qualitative Gate Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Data Collection</td>
                          <td className="p-4 text-muted-foreground">Minimum data volume (e.g. &gt;10,000 samples), missing value rate</td>
                          <td className="p-4 text-muted-foreground">Data source credibility, ethical and bias review</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Training</td>
                          <td className="p-4 text-muted-foreground">Training loss &lt; threshold, convergence in &lt;N epochs</td>
                          <td className="p-4 text-muted-foreground">Proper algorithm selection, code & notebook quality</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Validation</td>
                          <td className="p-4 text-muted-foreground">Validation accuracy &gt; 95%, AUC-ROC &gt; 0.9</td>
                          <td className="p-4 text-muted-foreground">Stakeholder acceptance, correct result interpretation</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Deployment</td>
                          <td className="p-4 text-muted-foreground">Latency &lt; 100ms, uptime &gt; 99%</td>
                          <td className="p-4 text-muted-foreground">Production readiness, documentation & compliance</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Inference</td>
                          <td className="p-4 text-muted-foreground">Expected throughput, memory usage &lt; target limit</td>
                          <td className="p-4 text-muted-foreground">Result interpretability, user experience check</td>
                        </tr>
                        <tr className="hover:bg-accent/5 transition-colors">
                          <td className="p-4 font-semibold">Monitoring</td>
                          <td className="p-4 text-muted-foreground">No significant drift detected, error rate &lt; 2%</td>
                          <td className="p-4 text-muted-foreground">Incident review, business value alignment</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        Quantitative Gates
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Numeric thresholds or measurable performance criteria that must be met to advance
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-accent" />
                        Qualitative Gates
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Expert assessments, code reviews, documentation checks, or business alignment requirements before proceeding
                      </p>
                    </div>
                  </div>
                </div>

                {/* CI/CD in ML Operations */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-accent" />
                    CI/CD in ML Operations
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The iterative arrows in the lifecycle diagram represent <strong>continuous feedback loops</strong> where monitoring triggers retraining, validation failures return to training adjustments, and inference results feed back into data collection.
                  </p>
                  <p className="text-muted-foreground">
                    This enables automated model updates, A/B testing of model versions, and progressive rollouts - fundamentally different from waterfall's linear, one-time deployment approach.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compliance, Legal & Regulatory Risk Section */}
            <Card className="border-border mb-16 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Scale className="w-6 h-6 text-accent" />
                  AI CI/CD: Addressing Compliance, Legal & Regulatory Risk
                </CardTitle>
                <CardDescription className="text-base">
                  Transforming compliance from a point-in-time audit exercise into a continuous, automated governance process embedded throughout the ML lifecycle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Introduction */}
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    AI CI/CD fundamentally transforms compliance from a <strong>point-in-time audit exercise into a continuous, automated governance process</strong> embedded throughout the ML lifecycle. This shift is critical because AI models are non-deterministic and their behavior emerges from training data, prompts, and user interactions—making traditional "check-the-box" compliance dangerously inadequate.
                  </p>
                </div>

                {/* Continuous Compliance Architecture */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Continuous Compliance Architecture
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-semibold text-accent mb-3 text-lg">Automated Governance Checkpoints</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Automated governance checkpoints are integrated directly into CI/CD pipelines, ensuring every code commit, model update, and deployment undergoes compliance validation before progressing. This includes automated bias testing, privacy checks, security scans, and regulatory framework validation against standards like the EU AI Act, GDPR, NIST AI RMF, and industry-specific regulations.
                      </p>
                    </div>
                    <div className="p-5 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-semibold text-accent mb-3 text-lg">Audit Trail Automation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Audit trail automation generates comprehensive documentation and lineage tracking throughout the ML lifecycle. Every data transformation, model training run, hyperparameter change, and deployment decision is logged with timestamps, actor accountability, and rationale—creating defensible evidence for regulators and auditors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Management Through Phase Gates */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    Risk Management Through Phase Gates
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Each phase gate in the AI lifecycle incorporates compliance-specific quantitative and qualitative checks:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors">
                      <h4 className="font-semibold text-accent mb-2">Data Collection Gates</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify data privacy compliance (GDPR, HIPAA), ethical sourcing, bias assessment, and consent management before training proceeds.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors">
                      <h4 className="font-semibold text-accent mb-2">Training Gates</h4>
                      <p className="text-sm text-muted-foreground">
                        Enforce model risk management policies, including fairness metrics thresholds, explainability requirements, and documentation standards aligned with regulatory frameworks.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors">
                      <h4 className="font-semibold text-accent mb-2">Validation Gates</h4>
                      <p className="text-sm text-muted-foreground">
                        Require bias audits, adversarial robustness testing, and performance validation across protected demographic groups before deployment approval.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors">
                      <h4 className="font-semibold text-accent mb-2">Deployment Gates</h4>
                      <p className="text-sm text-muted-foreground">
                        Mandate security assessments, infrastructure compliance verification, model card documentation, and sign-off from model risk committees or compliance officers.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors">
                      <h4 className="font-semibold text-accent mb-2">Monitoring Gates</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement continuous drift detection, performance degradation alerts, and automated compliance reporting to regulatory bodies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Industry-Specific Regulatory Alignment */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-accent" />
                    Industry-Specific Regulatory Alignment
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-start gap-3 mb-3">
                        <Building2 className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                        <h4 className="font-bold text-lg">Financial Services</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Financial services must comply with Basel III capital requirements, Fair Lending Act provisions for credit decisioning, and SEC AI risk disclosure guidelines. MLOps frameworks embed model risk management (MRM) practices including independent validation, back-testing, and stress testing directly into CI/CD workflows.
                      </p>
                    </div>
                    
                    <div className="p-5 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="flex items-start gap-3 mb-3">
                        <Heart className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <h4 className="font-bold text-lg">Healthcare & Life Sciences</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Healthcare and life sciences face HIPAA privacy requirements, FDA regulations for AI-powered diagnostics, and EU AI Act high-risk classification. Pre-Cert Cybersecurity Plans (PCCP) and Total Product Lifecycle (TPLC) frameworks integrate with CI/CD to enable compliant adaptive ML models that can update post-deployment.
                      </p>
                    </div>
                    
                    <div className="p-5 rounded-lg bg-orange-500/5 border border-orange-500/20">
                      <div className="flex items-start gap-3 mb-3">
                        <Shield className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                        <h4 className="font-bold text-lg">Critical Infrastructure & Defense</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Critical infrastructure and defense must meet NIST AI Risk Management Framework standards, CISA security guidance, and Executive Order 13960 on trustworthy AI in government.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Governance as Competitive Advantage */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-accent" />
                    Governance as Competitive Advantage
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Organizations with robust CI/CD foundations gain <strong>speed with control</strong>—enabling rapid innovation while maintaining regulatory compliance. This includes:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Role-Based Accountability</h4>
                          <p className="text-sm text-muted-foreground">
                            Clearly defined responsibilities for model owners (risk management), validators (fairness testing), approvers (compliance sign-off), and deployers (production monitoring).
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Policy Enforcement Automation</h4>
                          <p className="text-sm text-muted-foreground">
                            Compliance rules are codified as tests within pipelines, eliminating manual reviews and reducing deployment friction.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Real-Time Risk Visibility</h4>
                          <p className="text-sm text-muted-foreground">
                            Dashboards showing compliance posture, control failures, and emerging risks across all deployed models.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Third-Party Model Risk Management</h4>
                          <p className="text-sm text-muted-foreground">
                            For vendor-supplied models, open-source components, and foundation models (LLMs), ensuring external AI systems meet the same governance standards.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Controlling AI Agent Autonomy</h4>
                          <p className="text-sm text-muted-foreground">
                            CI/CD guardrails define operational boundaries including automated verification checks, rollback triggers, and human-in-the-loop approval workflows for high-risk changes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance-by-Design */}
                <div className="bg-accent/5 border-l-4 border-accent rounded-lg p-6">
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    The convergence of MLOps engineering rigor with AI governance policy creates <strong className="text-accent">compliance-by-design architectures</strong> where regulatory requirements become testable, transparent, and integrated into developer workflows rather than bolted-on audit afterthoughts.
                  </p>
                </div>
              </CardContent>
            </Card>

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
            <div id="request-form" className="max-w-4xl mx-auto scroll-mt-24">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-muted-foreground">Get your free AI risk assessment within 24-48 hours</p>
              </div>
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
                  <CardTitle className="text-2xl">Start Your Free Risk Assessment</CardTitle>
                  <CardDescription className="text-base">
                    Our experts will analyze your AI system and provide actionable recommendations for compliance
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

              {/* Contact Information */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-6">Prefer to Talk First?</h3>
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
