import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import resourcesBg from "@/assets/resources-bg.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Video, ExternalLink, Download, Notebook } from "lucide-react";

const Resources = () => {
  const news = [
    {
      title: "AI regulation and safety developments",
      description: "Latest news and updates on AI regulation, safety, and industry developments",
      source: "BBC News",
      date: "2025",
      url: "https://www.bbc.co.uk/news/articles/cly97lj0nddo",
    },
  ];

  const papers = [
    {
      title: "EU AI Act v5 vs COBIT/NIST: Legal Framework Analysis",
      description: "Comprehensive analysis of how the EU AI Act (Regulation (EU) 2024/1689) differs from voluntary frameworks like COBIT, NIST AI RMF, and ISO 42001, with detailed guidance on where regulators will need to provide further clarification",
      type: "Technical Essay",
      date: "2025",
      featured: true,
    },
    {
      title: "AI Risk Assessment Framework - RFC 2024",
      description: "Comprehensive framework for evaluating and mitigating risks in AI systems",
      type: "RFC Document",
      date: "2024",
    },
    {
      title: "Best Practices for AI Model Deployment",
      description: "Industry standards and guidelines for safe AI deployment in production",
      type: "White Paper",
      date: "2024",
    },
    {
      title: "Ethical Considerations in AI Development",
      description: "Analysis of ethical implications and responsible AI development practices",
      type: "Research Paper",
      date: "2023",
    },
  ];

  const videos = [
    {
      title: "Introduction to AI Risk Assessment",
      description: "Overview of key concepts and methodologies in AI risk evaluation",
      duration: "15 min",
    },
    {
      title: "Case Study: Enterprise AI Deployment",
      description: "Real-world example of successful AI project delivery",
      duration: "22 min",
    },
    {
      title: "AI Compliance and Regulatory Landscape",
      description: "Understanding current and upcoming AI regulations",
      duration: "18 min",
    },
  ];

  const notebooks = [
    {
      title: "Asimov AI Lab - Research Notebook",
      description: "Interactive research assistant powered by Google's NotebookLM. Ask questions about our framework, methodology, and AI safety principles.",
      source: "Google NotebookLM",
      url: "https://notebooklm.google.com/notebook/960f1b5d-6ae4-4c97-b21c-ddfa3d0ee582",
    },
    {
      title: "Asimov AI Lab - Research Notebook (Secondary)",
      description: "Additional interactive analysis and reference materials for ongoing research tracks.",
      source: "Google NotebookLM",
      url: "https://notebooklm.google.com/notebook/b9e999f2-b602-4c3c-b794-5b3f8ca5570b",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <img src={resourcesBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
              <p className="text-xl text-muted-foreground">
                Videos, papers, and RFC documents to guide your AI journey
              </p>
            </div>

            <Tabs defaultValue="news" className="space-y-8">
              <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="papers">Papers & RFCs</TabsTrigger>
                <TabsTrigger value="notebooks">Notebooks</TabsTrigger>
              </TabsList>

              <TabsContent value="news" className="space-y-6">
                <div className="grid gap-6">
                  {news.map((item, index) => (
                    <Card key={index} className="border-border hover:border-accent/50 transition-all group">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm font-medium text-accent">{item.source}</span>
                              <span className="text-sm text-muted-foreground">{item.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            Read <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.map((video, index) => (
                    <Card key={index} className="border-border hover:border-accent/50 transition-all group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Video className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{video.duration}</span>
                          <Button variant="outline" size="sm" className="gap-2">
                            Watch <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="papers" className="space-y-6">
                <div className="grid gap-6">
                  {papers.map((paper, index) => (
                    <Card key={index} className={`border-border hover:border-accent/50 transition-all group ${paper.featured ? 'border-accent' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div className="flex-1">
                            {paper.featured && (
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full mb-2">
                                Featured Essay
                              </span>
                            )}
                            <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                            <CardDescription>{paper.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm font-medium text-accent">{paper.type}</span>
                              <span className="text-sm text-muted-foreground">{paper.date}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            {paper.featured ? 'Read' : 'Download'} {paper.featured ? <ExternalLink className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                      {paper.featured && (
                        <CardContent className="pt-0">
                          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-3">Part 1: How the EU AI Act v5 (Legal) Differs from COBIT/NIST (Frameworks)</h3>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">1) Source of Authority</h4>
                                  <p><strong>COBIT / NIST AI RMF / ISO 42001:</strong> Voluntary frameworks reflecting consensus best-practice for governance, risk, and assurance. They do not, by themselves, create legal obligations.</p>
                                  <p><strong>EU AI Act (Regulation (EU) 2024/1689):</strong> A binding law with enforceable duties, penalties, and timeframes. It creates obligations for providers, deployers, importers, distributors, and GPAI/systemic-risk model actors.</p>
                                  <p className="italic">Practical upshot: frameworks help you "do the right things"; the Act dictates the things you must do (and prove) to place, make available, or use AI systems in the EU.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">2) Purpose & Use</h4>
                                  <p><strong>Frameworks:</strong> Aim at maturity, consistency, and governance quality. Internal audit can score capability and drive improvement.</p>
                                  <p><strong>EU AI Act:</strong> Aims at market access and legal conformity. Evidence is compiled to demonstrate conformity assessment, CE marking, Declaration of Conformity, and post-market monitoring compliance.</p>
                                  <p className="italic">Practical upshot: your COBIT/NIST artefacts become inputs to a conformity dossier, not ends in themselves.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">3) Scope and Applicability</h4>
                                  <p><strong>Frameworks:</strong> Enterprise-wide by design (governance, security, data, risk, ops, ethics) and are role-agnostic.</p>
                                  <p><strong>EU AI Act:</strong> Actor-specific and risk-tiered:</p>
                                  <ul className="list-disc pl-6 space-y-1">
                                    <li>Prohibited practices (Art. 5) — absolute ban</li>
                                    <li>High-risk AI (Art. 6 + Annex III/II safety components) — full QMS, TD, logging, robustness, oversight, PMM, CE/DoC</li>
                                    <li>Limited-risk transparency (Art. 52) — disclosure duties for interactions, deepfakes, emotion recognition/biometric categorisation</li>
                                    <li>GPAI/Systemic-risk (Arts. 55–56) — distinct transparency, testing, and information-sharing</li>
                                  </ul>
                                  <p className="italic">Practical upshot: the same system can face different legal profiles depending on its use case and the actor's role.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">4) Granularity & Traceability</h4>
                                  <p><strong>Frameworks:</strong> Control statements reference processes and functions (e.g., COBIT EDM01 "Governance framework setting"; NIST RM "Risk management").</p>
                                  <p><strong>EU AI Act:</strong> Every control must trace to Article X §Y and/or Annex §Z. For high-risk, Annex IV (Technical Documentation) effectively becomes the canonical evidence index.</p>
                                  <p className="italic">Practical upshot: your audit workbook must link each test to a specific legal clause; "best-practice" without citation won't satisfy a notified body.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">5) Terminology & Evidence</h4>
                                  <p><strong>Frameworks:</strong> Speak in governance verbs: establish, define, manage, measure. Evidence is flexible.</p>
                                  <p><strong>EU AI Act:</strong> Requires legally sufficient evidence:</p>
                                  <ul className="list-disc pl-6 space-y-1">
                                    <li>Technical Documentation (Annex IV) — structure and content are prescribed</li>
                                    <li>Conformity routes (Annex VI/VII) — documented selection and execution</li>
                                    <li>Declaration of Conformity (Annex V) — signed, retained 10 years</li>
                                    <li>PMM & Serious Incident reporting (Arts. 61–67) — timelines and content</li>
                                  </ul>
                                  <p className="italic">Practical upshot: the bar shifts from "good practice" to "prove conformity in the specified format and sequence".</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">6) Annex Integration</h4>
                                  <p><strong>Frameworks:</strong> Don't prescribe market-access artefacts.</p>
                                  <p><strong>EU AI Act:</strong> Embeds Annexes into the control set:</p>
                                  <ul className="list-disc pl-6 space-y-1">
                                    <li>Annex I (Techniques) → scoping of "AI system"</li>
                                    <li>Annex II–III → high-risk categorisation and sector law linkage</li>
                                    <li>Annex IV → technical documentation (build-time evidence)</li>
                                    <li>Annex V–VII → DoC, CE marking, and conformity procedures</li>
                                  </ul>
                                  <p className="italic">Practical upshot: treat Annexes as mandatory control families folded into governance domains — not optional appendices.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">7) Validation & Enforcement</h4>
                                  <p><strong>Frameworks:</strong> Maturity scales (initial → optimized).</p>
                                  <p><strong>EU AI Act:</strong> Compliance validation feeds conformity assessment and market surveillance; noncompliance can lead to enforcement, withdrawal, or fines.</p>
                                  <p className="italic">Practical upshot: the validation scale should be interpreted as a legal risk posture, not only capability maturity.</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-3">Part 2: Where Regulators Will Likely Need to Go Deeper</h3>
                              <p className="mb-4">The Act is deliberately technology-neutral. In practice, authorities, harmonised standards, and common specifications will need to tighten definitions, thresholds, and methods.</p>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">A) Data Quality & Bias (Art. 10; Annex IV §2)</h4>
                                  <p><strong>What's missing:</strong> Concrete definitions of "relevant, representative, as far as possible free of errors, and complete." Minimum statistical tests, acceptable error/bias thresholds by context.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Reference metrics & thresholds per domain; sampling & reweighting methods; bias test catalogues linked to use-case risk.</p>
                                  <p><strong>How to implement now:</strong> Institute a Data Quality Control Plan with named metrics, target bands, and retest cadence; store proofs in Annex IV TD pack.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">B) Robustness & Cybersecurity (Art. 15; Annex IV §3)</h4>
                                  <p><strong>What's missing:</strong> Standard adversarial test suites and "adequate" robustness criteria for different model classes.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Baseline adversarial test batteries per modality; red-team methodology and severity scoring; secure SDLC for ML.</p>
                                  <p><strong>How to implement now:</strong> Create a Model Security Test Plan referencing concrete attacks and store results in TD §3.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">C) Logging & Traceability (Art. 12)</h4>
                                  <p><strong>What's missing:</strong> Minimum logging schema, retention, and linkage to incident analysis.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Canonical AI logging schema; retention timelines aligned to risk class and sector laws.</p>
                                  <p><strong>How to implement now:</strong> Adopt an AI Traceability Profile with log fields, rotation, and tamper-evidence.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">D) Human Oversight (Art. 14)</h4>
                                  <p><strong>What's missing:</strong> What qualifies as "effective" human oversight; reaction time standards; competence requirements.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Design patterns for HITL/HOTL; competency matrices and training hour minima.</p>
                                  <p><strong>How to implement now:</strong> Define Oversight Scenarios with time-to-act SLAs; run usability drills.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">E) Transparency for Limited-Risk (Art. 52)</h4>
                                  <p><strong>What's missing:</strong> Uniform wording and prominence for AI interaction disclosures; deepfake labelling standards.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Standard disclosure text & UI placement; audio/visual watermarking baselines.</p>
                                  <p><strong>How to implement now:</strong> Build a Transparency Implementation Guide per channel + synthetic content SOP.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">F) GPAI & Systemic-Risk (Arts. 55–56)</h4>
                                  <p><strong>What's missing:</strong> The boundary between "strong" GPAI and "systemic-risk" models; test intensity for downstream integrators.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Quantitative thresholds; evaluation suites by capability class; depth of downstream information packs.</p>
                                  <p><strong>How to implement now:</strong> Create a GPAI Handover Pack template: model card, eval & red-team summary, risk notes, integration constraints.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">G) Post-Market Monitoring & Serious Incidents (Arts. 61–67)</h4>
                                  <p><strong>What's missing:</strong> Report content and timelines by incident severity; boundary between "malfunction" and "serious incident".</p>
                                  <p><strong>What regulators/standards should specify:</strong> Severity taxonomy, reporting templates, and time windows; feedback loop from PMM into TD/DoC/CE updates.</p>
                                  <p><strong>How to implement now:</strong> Stand up an AI PMM Board with a severity rubric and regulatory reporting playbook.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">H) Role-Specific Duties (Provider/Importer/Distributor/Deployer)</h4>
                                  <p><strong>What's missing:</strong> Granular playbooks per role and shared evidence boundaries.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Role evidence matrices; multi-party conformity guidance.</p>
                                  <p><strong>How to implement now:</strong> Maintain a Role-Obligation Ledger; align contracts and SLAs to legal duties.</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">I) Intersections with Other Laws</h4>
                                  <p><strong>What's missing:</strong> Deeper alignment with GDPR, product safety law, medical/aviation/finance regulations.</p>
                                  <p><strong>What regulators/standards should specify:</strong> Joint guidance to resolve edge cases: data reuse, profiling, special categories, clinical/safety validation.</p>
                                  <p><strong>How to implement now:</strong> Build a Cross-Regulatory Register mapping AI Act duties to GDPR DPIA/records, product law conformity, and sector norms.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notebooks" className="space-y-6">
                <div className="grid gap-6">
                  {notebooks.map((item, index) => (
                    <Card key={index} className="border-border hover:border-accent/50 transition-all group">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Notebook className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm font-medium text-accent">{item.source}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            Open Notebook <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
