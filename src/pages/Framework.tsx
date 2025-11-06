import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Hammer, Settings, Users, AlertTriangle, Shield, Scale, Lock, Eye, CheckCircle, RefreshCw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CICDRiskFramework from "@/components/CICDRiskFramework";
import aiRiskIllustration from "@/assets/ai-risk-illustration.jpg";
import aiGovernance from "@/assets/ai-governance.jpg";
import aiLifecycle from "@/assets/ai-lifecycle.jpg";
import euAiActInfographic from "@/assets/eu-ai-act-infographic.png";

const Framework = () => {
  const phases = [
    {
      phase: "Design",
      icon: Lightbulb,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-600",
      focus: "Concept, scoping, requirements, data strategy, risk planning",
      risks: [
        "Problem framing bias – poorly defined objectives lead to harmful or discriminatory outcomes",
        "Lack of domain expertise – excluding legal, ethics, or sector specialists at the design stage",
        "Regulatory misalignment – not accounting for sector-specific or jurisdictional legal duties",
        "Data sourcing risks – using unlicensed, sensitive, or biased data sources",
        "IP risk – unclear ownership of training data or generated outputs",
        "Failure to perform impact assessments – missing DPIA, FRIA, etc."
      ],
      components: [
        "System specification",
        "Risk tiering/classification (e.g. per EU AI Act)",
        "Data governance strategy",
        "AI use case definition"
      ]
    },
    {
      phase: "Build",
      icon: Hammer,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-600",
      focus: "Model development, training, testing, and integration",
      risks: [
        "Bias and discrimination – introduced during model training or feature selection",
        "Security vulnerabilities – exposure to adversarial attacks or data poisoning",
        "Lack of explainability – models too opaque to audit or justify decisions",
        "Privacy violations – training on personally identifiable data without sufficient protections",
        "Overfitting/underfitting – impacting performance in real-world conditions"
      ],
      components: [
        "Machine learning pipelines",
        "Feature engineering",
        "Model selection and training",
        "Algorithm interpretability",
        "Security controls (e.g., differential privacy, adversarial testing)"
      ]
    },
    {
      phase: "Operate",
      icon: Settings,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-600",
      focus: "Deployment, monitoring, retraining, and support",
      risks: [
        "Model drift – performance degradation over time due to changing data",
        "Insufficient monitoring – lack of alerts for bias, failures, or anomalies",
        "Change management failure – deploying updates without testing or stakeholder review",
        "Automation bias – over-reliance on AI outputs without human oversight",
        "Non-compliance with updates to law – systems no longer align with evolving regulatory standards"
      ],
      components: [
        "Deployment pipelines",
        "Real-time monitoring tools",
        "Logging and audit trails",
        "Human-in-the-loop (HITL) controls",
        "Feedback loops for retraining"
      ]
    },
    {
      phase: "Usage",
      icon: Users,
      color: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      focus: "End-user interaction, consumption, and societal impact",
      risks: [
        "Misuse or abuse – system used in harmful or unintended ways",
        "Lack of transparency for users – failure to disclose AI use or provide recourse",
        "Trust erosion – users lose faith due to hallucinations or ethical breaches",
        "Accessibility and fairness – system creates unequal access or benefit"
      ],
      components: [
        "User interface / chatbot / decision support",
        "Documentation and disclosures",
        "Appeals and recourse mechanisms",
        "Usage analytics",
        "External communication (e.g. terms, consent)"
      ]
    }
  ];

  const frameworks = [
    { name: "EU AI Act", lifecycle: true, focus: "Legal/regulatory" },
    { name: "NIST AI RMF 1.0", lifecycle: true, focus: "Risk management" },
    { name: "ISO/IEC 42001", lifecycle: true, focus: "Organisational controls" },
    { name: "ISACA AI Assurance Toolkit", lifecycle: true, focus: "Audit & compliance" },
    { name: "OECD AI Principles", lifecycle: false, focus: "Policy/ethics focus" },
    { name: "MITRE ATLAS", lifecycle: true, focus: "Threat modelling" },
    { name: "IEEE 7000 series", lifecycle: false, focus: "Ethics and system design" },
    { name: "FAT ML Principles", lifecycle: true, focus: "Fairness, Accountability, Transparency" }
  ];

  const maturityLevels = [
    {
      level: "1 - Ad Hoc",
      design: "No formal risk assessment or governance process",
      build: "Minimal testing, no bias or security controls",
      operate: "No monitoring or drift detection",
      usage: "No user transparency or recourse mechanisms"
    },
    {
      level: "2 - Developing",
      design: "Basic impact assessments performed",
      build: "Some testing for bias and security vulnerabilities",
      operate: "Basic logging and monitoring in place",
      usage: "Users informed AI is being used"
    },
    {
      level: "3 - Defined",
      design: "Comprehensive DPIAs, FRIAs, and regulatory mapping",
      build: "Robust testing, explainability measures implemented",
      operate: "Real-time monitoring with alerting for drift and bias",
      usage: "Clear disclosures, documented appeals process"
    },
    {
      level: "4 - Optimized",
      design: "Proactive risk anticipation, domain experts embedded",
      build: "Continuous security testing, adversarial robustness",
      operate: "Automated retraining triggers, comprehensive audit trails",
      usage: "Full transparency, accessible recourse, continuous feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-medium">Lifecycle-Based AI Risk Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AI System Risk Framework</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A structured approach to managing AI risks across four critical lifecycle phases: Design, Build, Operate, and Usage
              </p>
            </div>

            {/* Tabs for Framework Sections */}
            <Tabs defaultValue="lifecycle" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="lifecycle">Lifecycle Framework</TabsTrigger>
                <TabsTrigger value="cicd">CI/CD Risk</TabsTrigger>
              </TabsList>

              <TabsContent value="lifecycle" className="space-y-16">
                {/* AI Risk Illustration */}
                <div>
                  <Card className="border-border overflow-hidden">
                    <div className="relative h-[400px] md:h-[500px]">
                      <img
                    src={aiRiskIllustration} 
                    alt="AI Risk Management illustration showing neural network with warning symbols, data bias, security shields, and privacy protection" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end">
                    <div className="p-8 w-full">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">Understanding AI Risk Dimensions</h2>
                      <p className="text-muted-foreground max-w-3xl">
                        AI systems present multifaceted risks spanning bias, security vulnerabilities, privacy concerns, and ethical considerations. Effective risk management requires addressing each dimension across the system lifecycle.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Lifecycle Visualization */}
            <div className="mb-16">
              <Card className="border-border bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">AI System Lifecycle</CardTitle>
                  <CardDescription className="text-center">
                    Risk management integrated across all phases with continuous feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="relative">
                      <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-2">1</div>
                          <CardTitle className="text-lg">Design</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Risk Tiering</p>
                          <p>• Impact Assessments</p>
                          <p>• Data Strategy</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div className="relative">
                      <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-2">2</div>
                          <CardTitle className="text-lg">Build</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Model Training</p>
                          <p>• Bias Testing</p>
                          <p>• Security Controls</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div className="relative">
                      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mb-2">3</div>
                          <CardTitle className="text-lg">Operate</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• Monitoring</p>
                          <p>• Drift Detection</p>
                          <p>• HITL Controls</p>
                        </CardContent>
                      </Card>
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-accent rotate-45"></div>
                    </div>

                    <div>
                      <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-orange-600/20 h-full">
                        <CardHeader className="pb-3">
                          <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mb-2">4</div>
                          <CardTitle className="text-lg">Usage</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-1">
                          <p>• User Transparency</p>
                          <p>• Appeals Process</p>
                          <p>• Fairness Metrics</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 text-accent" />
                    <span>Continuous feedback loop enables iterative improvement across all phases</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Four Phase Model */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Four-Phase Risk Model</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Categorizing AI system risks into Design, Build, Operate, and Usage phases aligns with global frameworks including the EU AI Act, NIST AI RMF, and ISO/IEC 42001
              </p>

              {/* Lifecycle Illustration */}
              <div className="mb-12 flex justify-center">
                <div className="relative max-w-2xl">
                  <img 
                    src={aiLifecycle} 
                    alt="AI Lifecycle phases showing Design, Build, Operate, and Usage as interconnected stages" 
                    className="w-full h-auto rounded-xl shadow-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <Card key={index} className={`border-2 ${phase.borderColor} bg-gradient-to-br ${phase.color}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center flex-shrink-0 ${phase.iconColor}`}>
                          <phase.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl">{phase.phase} Phase</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              Phase {index + 1}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            <strong>Focus:</strong> {phase.focus}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="risks" className="border-border/50">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                              <span className="font-semibold">Risk Categories ({phase.risks.length})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 mt-2">
                              {phase.risks.map((risk, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                  <span className="text-destructive mt-1">•</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="components" className="border-border/50">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-primary" />
                              <span className="font-semibold">AI System Components ({phase.components.length})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 mt-2">
                              {phase.components.map((component, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{component}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ethical & Societal Standards */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Ethical & Societal Standards</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                When it comes to ethical and societal considerations in AI, there is no single global standard — but several leading frameworks, principles, and emerging standards are widely adopted across jurisdictions and sectors
              </p>

              {/* AI Governance Illustration */}
              <div className="mb-8 flex justify-center">
                <div className="relative max-w-md">
                  <img 
                    src={aiGovernance} 
                    alt="AI Governance Framework showing interconnected pillars of Ethics, Compliance, Security, Fairness, and Experience" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "OECD AI Principles",
                    status: "Adopted by 46+ countries, including UK, US, EU, Japan",
                    badge: "Global Policy Framework",
                    areas: [
                      "Inclusive growth and well-being",
                      "Human-centred values and fairness",
                      "Transparency and explainability",
                      "Robustness, security, and safety",
                      "Accountability"
                    ],
                    use: "Provides a global ethical foundation but is not an audit framework. Often used to align internal AI ethics principles."
                  },
                  {
                    title: "UNESCO Recommendation on AI Ethics",
                    status: "Endorsed by 193 member states (2021)",
                    badge: "Global Policy Framework",
                    areas: [
                      "Human rights and dignity",
                      "Environmental and societal well-being",
                      "Avoidance of harms (bias, surveillance, manipulation)",
                      "Governance and ethical impact assessments"
                    ],
                    use: "A global ethical policy framework. Encourages nations to develop legal structures and mandates AI Ethical Impact Assessments (AI-EIA)."
                  },
                  {
                    title: "IEEE 7000 Series",
                    status: "Industry technical standards (published and in development)",
                    badge: "Engineering & Ethics Standards",
                    areas: [
                      "IEEE 7000 – Ethical system design processes",
                      "IEEE 7001 – Transparency of autonomous systems",
                      "IEEE 7010 – Well-being metrics for AI systems",
                      "IEEE 7002 – Data privacy process"
                    ],
                    use: "Closest to an auditable standard for ethical AI design, especially useful for system engineers, developers, and risk teams."
                  },
                  {
                    title: "NIST AI Risk Management Framework (AI RMF 1.0)",
                    status: "US-developed, used internationally",
                    badge: "Risk Management Framework",
                    areas: [
                      "Governance of risk",
                      "Mapping sociotechnical risks (including societal and environmental)",
                      "Measurable trustworthiness (including fairness, transparency)",
                      "Managing and monitoring risks across lifecycle"
                    ],
                    use: "Best for risk-aware, ethical-by-design system planning. It supports mapping societal impacts, but not a standalone audit tool."
                  },
                  {
                    title: "EU AI Act",
                    status: "Binding legal standard in the EU (enforceable 2026)",
                    badge: "Legal Regulation",
                    areas: [
                      "High-risk classification for systems that impact rights and well-being",
                      "Obligations for transparency, human oversight, fairness",
                      "Prohibited uses (e.g., social scoring, manipulative AI)",
                      "Conformity assessments include fundamental rights impact"
                    ],
                    use: "Mandates documented risk analysis and post-deployment monitoring for societal harms. Closest to an enforceable audit path for ethics in AI."
                  }
                ].map((framework, i) => (
                  <Card key={i} className="border-border hover:border-accent/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl">{framework.title}</CardTitle>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">{framework.badge}</Badge>
                      </div>
                      <CardDescription className="text-sm font-medium text-foreground/70">
                        {framework.status}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2 text-accent">Focus Areas:</p>
                        <ul className="space-y-1">
                          {framework.areas.map((area, j) => (
                            <li key={j} className="flex gap-2 text-sm">
                              <span className="text-accent mt-1">•</span>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1 text-accent">Use:</p>
                        <p className="text-sm text-muted-foreground">{framework.use}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Important Distinction Table */}
              <Card className="border-border bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Important Distinction
                  </CardTitle>
                  <CardDescription>
                    Understanding what you can and cannot audit against
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold">Type</th>
                          <th className="text-left p-3 font-semibold">Examples</th>
                          <th className="text-left p-3 font-semibold">Can You Audit Against It?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50 hover:bg-accent/5">
                          <td className="p-3">
                            <Badge variant="outline">Principles</Badge>
                          </td>
                          <td className="p-3 text-sm">OECD, UNESCO, FAT-ML</td>
                          <td className="p-3 text-sm">Not directly — high-level guidance</td>
                        </tr>
                        <tr className="border-b border-border/50 hover:bg-accent/5">
                          <td className="p-3">
                            <Badge variant="outline" className="border-green-500/50 text-green-600">Standards</Badge>
                          </td>
                          <td className="p-3 text-sm">IEEE 7000, ISO/IEC 42001</td>
                          <td className="p-3 text-sm font-medium text-green-600">Yes — technical or process audits possible</td>
                        </tr>
                        <tr className="border-b border-border/50 hover:bg-accent/5">
                          <td className="p-3">
                            <Badge variant="outline" className="border-blue-500/50 text-blue-600">Regulations</Badge>
                          </td>
                          <td className="p-3 text-sm">EU AI Act, GDPR</td>
                          <td className="p-3 text-sm font-medium text-blue-600">Yes — legally enforceable, with penalties</td>
                        </tr>
                        <tr className="hover:bg-accent/5">
                          <td className="p-3">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600">Frameworks</Badge>
                          </td>
                          <td className="p-3 text-sm">NIST AI RMF, ISACA AI Audit</td>
                          <td className="p-3 text-sm">Used to build auditable processes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Combined Approach */}
              <Card className="border-border bg-gradient-accent mt-8">
                <CardHeader>
                  <CardTitle className="text-xl text-accent-foreground flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recommended Combined Approach
                  </CardTitle>
                  <CardDescription className="text-accent-foreground/80">
                    For real-world governance, ethical/societal impact is typically addressed through:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 text-accent-foreground">Impact Assessments:</p>
                    <p className="text-sm text-accent-foreground/80">DPIA, Fundamental Rights Impact Assessment (FRIA), Ethical Impact Assessment (EIA)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 text-accent-foreground">Ethics Boards or Panels:</p>
                    <p className="text-sm text-accent-foreground/80">Independent review or governance body</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 text-accent-foreground">Conformance Audits:</p>
                    <p className="text-sm text-accent-foreground/80">Using ISO 42001, IEEE 7000 or bespoke frameworks</p>
                  </div>
                  <div className="pt-4 border-t border-accent-foreground/20">
                    <p className="text-sm font-semibold mb-2 text-accent-foreground">For a robust, auditable approach to ethical and societal risk, combine:</p>
                    <ul className="space-y-2">
                      {[
                        "NIST AI RMF (mapping + managing risk)",
                        "IEEE 7000 (design ethics + documentation)",
                        "EU AI Act (legal thresholds + conformity)",
                        "UNESCO or OECD principles (policy framing)"
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-accent-foreground/90">
                          <span className="text-accent-foreground">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audit Frameworks */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Audit Frameworks</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Our audit frameworks translate complex regulatory requirements into clear, actionable controls that your organization can implement and demonstrate
              </p>

              {/* EU AI Act Audit Framework */}
              <Card className="border-border mb-8">
                <CardHeader className="border-b border-border bg-gradient-subtle">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                        <Scale className="w-6 h-6 text-primary" />
                        EU AI Act Audit Framework — Overview v1.0
                      </CardTitle>
                      <CardDescription className="text-base">
                        The first legally binding, comprehensive regulatory framework governing artificial intelligence
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="text-sm">Version 1.0</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  {/* Two Column Layout: Content Left, Infographic Right */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Column - Content */}
                    <div>
                      <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
                        <p className="text-base leading-relaxed mb-4">
                          The <strong>EU AI Act</strong> (Regulation (EU) 2024/1689) is the first legally binding, comprehensive regulatory framework governing artificial intelligence.
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed mb-4">
                          It requires all providers, importers, distributors, and deployers of AI systems to prove compliance with rules covering areas such as risk management, data governance, and post-market monitoring. As the regulation will be phased in between 2025 and 2027, organisations must urgently convert these requirements into auditable controls.
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Our audit framework adapts established enterprise risk and assurance standards—like <strong>COBIT</strong>, <strong>NIST AI RMF</strong>, and <strong>ISO/IEC 42001</strong>—to mirror the EU AI Act's structure.
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed mt-4">
                          This helps internal auditors, compliance teams, and external reviewers confirm that each requirement is met through clear evidence and governance documents.
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Infographic */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-full">
                        <img 
                          src={euAiActInfographic} 
                          alt="EU AI Act Audit Framework infographic showing framework components and validation approach" 
                          className="w-full h-auto rounded-lg shadow-lg border border-border"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Framework Components</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          number: "1",
                          icon: AlertTriangle,
                          iconColor: "text-blue-600",
                          bgColor: "bg-blue-500/10",
                          title: "Risk-Based Classification",
                          description: "The Act categorizes AI systems into four risk levels: Prohibited, High-Risk, Limited-Risk, and Minimal-Risk. Every AI system must be classified within these tiers."
                        },
                        {
                          number: "2",
                          icon: Shield,
                          iconColor: "text-purple-600",
                          bgColor: "bg-purple-500/10",
                          title: "Governance Alignment",
                          description: "Auditors review whether documented AI policies, quality management systems, and accountability structures are in place (as required by Articles 16–18 and Annex IV §1)."
                        },
                        {
                          number: "3",
                          icon: CheckCircle,
                          iconColor: "text-green-600",
                          bgColor: "bg-green-500/10",
                          title: "Data & Model Integrity",
                          description: "Article 10 and Annex IV §2 demand that datasets be relevant, representative, and unbiased. Audits focus on checking data quality metrics and evidence of bias mitigation."
                        },
                        {
                          number: "4",
                          icon: Eye,
                          iconColor: "text-orange-600",
                          bgColor: "bg-orange-500/10",
                          title: "Transparency & Human Oversight",
                          description: "Articles 13 and 14 require AI systems to be explainable and monitored by qualified individuals. Auditors test for proper oversight and documentation."
                        },
                        {
                          number: "5",
                          icon: Lock,
                          iconColor: "text-red-600",
                          bgColor: "bg-red-500/10",
                          title: "Technical Robustness & Cybersecurity",
                          description: "Article 15 and Annex IV §3 call for strong and secure AI systems. Audits include adversarial resistance testing, fallback procedures, and secure development practices."
                        },
                        {
                          number: "6",
                          icon: RefreshCw,
                          iconColor: "text-teal-600",
                          bgColor: "bg-teal-500/10",
                          title: "Post-Market Monitoring & Reporting",
                          description: "Articles 61–67 require ongoing monitoring, incident logs, and corrective action tracking."
                        },
                        {
                          number: "7",
                          icon: Users,
                          iconColor: "text-indigo-600",
                          bgColor: "bg-indigo-500/10",
                          title: "Fundamental Rights & Ethics",
                          description: "Audits ensure that AI systems uphold human dignity, equality, and non-discrimination principles (see Recitals 17–30)."
                        },
                        {
                          number: "8",
                          icon: Scale,
                          iconColor: "text-pink-600",
                          bgColor: "bg-pink-500/10",
                          title: "Validation Scale",
                          description: "A standardized scoring system: Fully Validated, Largely Validated, Partially Validated, or Not Yet Validated. This covers governance, data, and ethics."
                        },
                        {
                          number: "9",
                          icon: CheckCircle,
                          iconColor: "text-emerald-600",
                          bgColor: "bg-emerald-500/10",
                          title: "Outcome",
                          description: "The framework converts legal requirements into measurable controls, ensuring traceability from EU AI Act provisions to audit evidence."
                        }
                      ].map((item, index) => (
                        <Card key={index} className="border-border hover:border-accent/50 transition-all">
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-muted-foreground">{item.number}.</span>
                                  <CardTitle className="text-base">{item.title}</CardTitle>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Card className="border-border bg-gradient-accent">
                    <CardHeader>
                      <CardTitle className="text-lg text-accent-foreground flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Framework Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-accent-foreground/90 leading-relaxed mb-4">
                        The framework converts legal requirements into measurable controls, ensuring traceability from EU AI Act provisions to audit evidence. It is aligned with <strong>ISO/IEC 42001</strong> and <strong>NIST AI RMF</strong>, giving organizational leadership a unified overview of their readiness for regulatory review and certification.
                      </p>
                      <div className="pt-4 border-t border-accent-foreground/20">
                        <p className="text-sm font-semibold text-accent-foreground mb-3">Key Alignments:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-accent-foreground/30 text-accent-foreground">ISO/IEC 42001</Badge>
                          <Badge variant="outline" className="border-accent-foreground/30 text-accent-foreground">NIST AI RMF</Badge>
                          <Badge variant="outline" className="border-accent-foreground/30 text-accent-foreground">COBIT</Badge>
                          <Badge variant="outline" className="border-accent-foreground/30 text-accent-foreground">Phased 2025-2027</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 text-xs text-muted-foreground text-center">
                    © 2025 Asimov■AI Integrity • www.asimovrisk.com
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Framework Alignment */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Framework Alignment</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                This lifecycle model aligns with and supports implementation of global AI standards and frameworks
              </p>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {frameworks.map((framework, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-all">
                        <div className="flex items-start gap-2 mb-2">
                          {framework.lifecycle ? (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 flex-shrink-0" />
                          )}
                          <div>
                            <h3 className="font-semibold text-sm mb-1">{framework.name}</h3>
                            <p className="text-xs text-muted-foreground">{framework.focus}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maturity Framework */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">AI Governance Maturity Framework</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Assess your organization's AI governance maturity across all lifecycle phases
              </p>
              
              <div className="space-y-4">
                {maturityLevels.map((level, index) => (
                  <Card key={index} className="border-border hover:border-accent/50 transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant={index === 3 ? "default" : "outline"}>
                          {level.level}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold text-sm">Design</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.design}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Hammer className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-sm">Build</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.build}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Settings className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-sm">Operate</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.operate}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-orange-600" />
                            <h4 className="font-semibold text-sm">Usage</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.usage}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Table */}
            <Card className="border-border bg-gradient-accent">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-accent-foreground">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-accent-foreground/20">
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Phase</th>
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Risk Focus</th>
                        <th className="text-left py-3 px-4 text-accent-foreground font-semibold">Key Tools/Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Design</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Framing, legality, data rights</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Impact assessments, governance plans</td>
                      </tr>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Build</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Bias, robustness, privacy</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Secure SDLC, adversarial testing</td>
                      </tr>
                      <tr className="border-b border-accent-foreground/10">
                        <td className="py-3 px-4 text-accent-foreground font-medium">Operate</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Drift, monitoring, HITL</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Monitoring, logging, alerting</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-accent-foreground font-medium">Usage</td>
                        <td className="py-3 px-4 text-accent-foreground/80">Misuse, trust, fairness</td>
                        <td className="py-3 px-4 text-accent-foreground/80">User disclosures, feedback, appeal processes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
                </TabsContent>

                <TabsContent value="cicd">
                  <CICDRiskFramework />
                </TabsContent>
              </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Framework;
