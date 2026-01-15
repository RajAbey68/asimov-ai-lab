import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Database, Code, GitBranch, Server, Eye, FileText, Cloud, RefreshCw, Lock, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CICDRiskFramework = () => {
  const scenarios = [
    {
      id: 1,
      icon: Database,
      title: "Data Pipeline Automation",
      scenario: "Automated data ingestion pulls datasets directly from APIs or production feeds.",
      risk: "Data contamination — poor lineage or unvalidated sources enter the model lifecycle.",
      consequence: "Biased or non-compliant models; violation of Art. 10 EU AI Act (Data Quality).",
      mitigation: "Implement data-quality gates in CI/CD; hash-based lineage logging; periodic data audits; require provenance metadata before model build.",
      severity: "high",
      nistFunction: "Map / Measure"
    },
    {
      id: 2,
      icon: RefreshCw,
      title: "Model Training in the Loop",
      scenario: "Models retrain automatically from new data streams.",
      risk: "Uncontrolled drift or bias; parameters change without oversight.",
      consequence: "Accuracy decay; reputational or regulatory breach.",
      mitigation: "Introduce drift-detection thresholds; schedule human review checkpoints; automate retraining approval workflow with rollback option.",
      severity: "high",
      nistFunction: "Measure / Manage"
    },
    {
      id: 3,
      icon: Code,
      title: "Continuous Integration of AI Code",
      scenario: "Developers merge code, data configs, and model scripts into main branch via CI tools.",
      risk: "Dependency & security exposure — open-source packages, unscanned models.",
      consequence: "Data exfiltration, IP leakage, unlicensed component use.",
      mitigation: "Embed software-composition analysis (SCA) and vulnerability scans in CI; sign model artefacts; maintain dependency SBOM (Software Bill of Materials).",
      severity: "critical",
      nistFunction: "Measure / Manage"
    },
    {
      id: 4,
      icon: GitBranch,
      title: "Continuous Delivery to Production",
      scenario: "Automated CD pipeline deploys models via containers or APIs.",
      risk: "Lack of approval or rollback control.",
      consequence: "Unintended outputs to customers; breach of governance principles.",
      mitigation: "Enforce release-gate approvals; record model version + signature; test in staging before live promotion.",
      severity: "critical",
      nistFunction: "Manage"
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Automated Testing and Bias Checks",
      scenario: "Bias, robustness, and accuracy tests run automatically but results aren't reviewed.",
      risk: "False assurance — tests pass without human interpretation.",
      consequence: "Overconfidence in 'green' models; exposure under Art. 15 (Robustness).",
      mitigation: "Add explainability review tasks; store test artefacts as audit evidence; require sign-off from Responsible AI Officer.",
      severity: "high",
      nistFunction: "Measure / Manage"
    },
    {
      id: 6,
      icon: Eye,
      title: "Model Monitoring and Alerting",
      scenario: "Continuous telemetry tracks model performance post-deployment.",
      risk: "Alert fatigue or missing anomaly correlation.",
      consequence: "Delayed detection of performance degradation or discriminatory outcomes.",
      mitigation: "Define alert severity matrix; integrate monitoring with incident-response playbook; automate EU AI Act Art. 61 incident logging.",
      severity: "medium",
      nistFunction: "Manage"
    },
    {
      id: 7,
      icon: FileText,
      title: "Documentation & Annex IV Compliance",
      scenario: "Documentation generated automatically but not reviewed.",
      risk: "Incomplete technical documentation; failure under conformity assessment.",
      consequence: "Legal non-conformity; failed CE marking.",
      mitigation: "Link CI/CD documentation builds to Annex IV checklist; store PDF outputs in immutable evidence repo (Supabase / S3).",
      severity: "high",
      nistFunction: "Govern"
    },
    {
      id: 8,
      icon: Cloud,
      title: "Multi-Environment Deployment",
      scenario: "Models deployed across cloud, on-prem, and edge devices.",
      risk: "Configuration drift; inconsistent model behaviour.",
      consequence: "Inconsistent performance or bias by region.",
      mitigation: "Implement infrastructure-as-code with version control; enforce environment parity; continuous configuration compliance scans.",
      severity: "medium",
      nistFunction: "Govern / Manage"
    },
    {
      id: 9,
      icon: Eye,
      title: "Human-in-the-Loop Oversight Gaps",
      scenario: "Automated retraining eliminates human checkpoints.",
      risk: "Loss of accountability under Art. 14 (Human Oversight).",
      consequence: "No traceable human review of critical decisions.",
      mitigation: "Enforce oversight sign-off in CI/CD pipeline; maintain reviewer logs; integrate with access-control system.",
      severity: "critical",
      nistFunction: "Govern"
    },
    {
      id: 10,
      icon: Server,
      title: "Audit Evidence Retention",
      scenario: "Logs and artefacts are overwritten during continuous runs.",
      risk: "Loss of historical evidence for conformity assessments.",
      consequence: "Regulator may deem AI system non-compliant (Art. 71).",
      mitigation: "Configure immutable logging; time-stamped artefact archiving; define minimum retention (≥ 5 years).",
      severity: "high",
      nistFunction: "Govern"
    }
  ];

  const threePillars = [
    {
      domain: "Technology",
      subtitle: "Trust by Design",
      icon: Code,
      color: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-600",
      description: "Infrastructure, automation pipelines, and software integrity — the 'engine room' of CI/CD",
      controls: [
        {
          focus: "Version-Controlled Infrastructure",
          application: "Infrastructure-as-Code (IaC) ensures consistent environments",
          regulation: "Annex IV §2(d) – Technical Documentation",
          risk: "Inconsistent builds → untestable models",
          assurance: "Audit IaC repositories for traceability & approval workflow"
        },
        {
          focus: "Pipeline Security & RBAC",
          application: "Access controls and secrets management in CI/CD",
          regulation: "Art. 15 – Robustness & Cybersecurity",
          risk: "Insider manipulation / tampering",
          assurance: "Review pipeline security policies, enforce signed builds"
        },
        {
          focus: "Dependency & Vulnerability Scanning",
          application: "Automated scanning of libraries, models, and containers",
          regulation: "Art. 15(2)(b)",
          risk: "Supply-chain compromise",
          assurance: "Integrate SCA, CVE scanning, and verify signed model artefacts"
        },
        {
          focus: "Deployment Controls & Rollback",
          application: "Controlled, reversible model releases",
          regulation: "Annex VII §2(c) – QMS",
          risk: "Uncontrolled rollouts / service instability",
          assurance: "Require rollback testing and environment parity checks"
        },
        {
          focus: "Monitoring Integration",
          application: "CI/CD triggers continuous observability dashboards",
          regulation: "Art. 61–67 – Post-market Monitoring",
          risk: "Latent drift / undetected incidents",
          assurance: "Validate monitoring connectors and log completeness"
        }
      ],
      takeaway: "Your CI/CD must act as a control system, not just an automation engine. Asimov-AI audits verify that every technical step emits evidence — a log, hash, or signature — satisfying compliance and traceability."
    },
    {
      domain: "Data",
      subtitle: "Integrity in Motion",
      icon: Database,
      color: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-600",
      description: "Governing the flow and transformation of data within the CI/CD lifecycle",
      controls: [
        {
          focus: "Data Ingestion & Validation",
          application: "Automated ingestion must validate schema, origin, and licensing",
          regulation: "Art. 10 – Data Governance",
          risk: "Biased / illegal data sources",
          assurance: "Audit CI pipelines for validation scripts & provenance logs"
        },
        {
          focus: "Data Versioning",
          application: "Use DVC / Delta Lake to tag datasets with pipeline runs",
          regulation: "Annex IV §2(a)",
          risk: "Loss of training evidence",
          assurance: "Require dataset hashes stored with model metadata"
        },
        {
          focus: "Sensitive Data Handling",
          application: "Apply anonymisation, encryption, and access restriction in build",
          regulation: "GDPR + Art. 10(5)",
          risk: "Regulatory breach, re-identification",
          assurance: "Check automated masking and compliance tests in CI jobs"
        },
        {
          focus: "Synthetic / Augmented Data",
          application: "Generated data must be marked and justified",
          regulation: "Recital 60 / Art. 10(3)",
          risk: "Misrepresentation of risk",
          assurance: "Include data-type tags in pipeline metadata for auditability"
        },
        {
          focus: "Data Drift Detection",
          application: "Continuous validation post-deployment",
          regulation: "Art. 61 – Monitoring",
          risk: "Model deterioration / fairness drift",
          assurance: "Require drift-alert thresholds and retraining triggers"
        }
      ],
      takeaway: "CI/CD isn't just code delivery — it's data delivery with accountability. An Asimov-AI audit ensures that every dataset or feature pipeline carries a digital chain of custody."
    },
    {
      domain: "Risk",
      subtitle: "Compliance in the Loop",
      icon: BarChart3,
      color: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      description: "Embedding governance, controls, and decisions into automation — not bolting them on afterwards",
      controls: [
        {
          focus: "Automated Risk Scoring in Pipeline",
          application: "Each build run generates a risk score (bias, explainability, robustness)",
          regulation: "Art. 9 – Risk Management System",
          risk: "Undocumented risk decisions",
          assurance: "Audit that CI/CD integrates risk scoring and flag thresholds"
        },
        {
          focus: "Human Oversight Checkpoints",
          application: "'Human-in-the-loop' before deployment to production",
          regulation: "Art. 14 – Human Oversight",
          risk: "Accountability gaps",
          assurance: "Verify approval workflow + reviewer evidence logs"
        },
        {
          focus: "Audit Evidence Retention",
          application: "Pipelines must retain artefacts and logs ≥5 years",
          regulation: "Art. 71 – Record Keeping",
          risk: "Inability to prove compliance",
          assurance: "Ensure immutable evidence storage (Supabase / S3)"
        },
        {
          focus: "Incident & Non-Conformity Handling",
          application: "Automatically create incident reports on test failures",
          regulation: "Art. 62 – Serious Incidents",
          risk: "Regulatory breach reporting failure",
          assurance: "Validate automated incident creation & escalation chain"
        },
        {
          focus: "Continuous Improvement Loop",
          application: "CI/CD metrics feed into QMS improvement cycles",
          regulation: "Annex VII §3(d)",
          risk: "Static risk posture",
          assurance: "Evaluate feedback integration to governance dashboard"
        }
      ],
      takeaway: "The CI/CD pipeline itself becomes the compliance control. Asimov-AI embeds risk checkpoints, ensuring regulatory compliance isn't reactive — it's continuous."
    }
  ];

  const integratedAlignment = [
    {
      domain: "Tech",
      objective: "Secure, reproducible pipeline automation",
      nistFunction: "Govern / Manage",
      evidence: "Pipeline definitions, signed artefacts, IaC logs"
    },
    {
      domain: "Data",
      objective: "Traceable, high-quality data lifecycle",
      nistFunction: "Map / Measure",
      evidence: "Dataset registry, validation reports"
    },
    {
      domain: "Risk",
      objective: "Continuous compliance & assurance",
      nistFunction: "Govern / Measure / Manage",
      evidence: "Approval records, risk metrics, incident logs"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <GitBranch className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">CI/CD Risk & Assurance</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          NIST-Aligned AI CI/CD Risk Framework
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Reference: NIST AI RMF v1.0 | Supporting: ISO/IEC 42001, ISO 27001 | Functions: Govern • Map • Measure • Manage
        </p>
        <Card className="border-accent bg-accent/5 max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Asimov-AI's NIST-Aligned CI/CD Audit Model</strong> ensures:
              <strong className="text-foreground"> Govern</strong> — Policies embedded into automation; 
              <strong className="text-foreground"> Map</strong> — Data, model, and system context documented; 
              <strong className="text-foreground"> Measure</strong> — Automated testing quantifies risk and bias; 
              <strong className="text-foreground"> Manage</strong> — Continuous monitoring closes the loop.
              This creates an auditable, regulator-ready trail across every pipeline run.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Three Pillars */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-8">
          {/* Three Pillars Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            {threePillars.map((pillar, index) => (
              <Card key={index} className={`border-2 ${pillar.borderColor} ${pillar.color}`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-3 ${pillar.iconColor}`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{pillar.domain}</CardTitle>
                  <CardDescription className="font-semibold text-foreground">
                    {pillar.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
                  <Badge variant="outline">{pillar.controls.length} Controls</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integrated Alignment */}
          <Card className="border-border bg-gradient-subtle">
            <CardHeader>
              <CardTitle className="text-2xl">Integrated Alignment Summary</CardTitle>
              <CardDescription>
                Tech–Data–Risk controls mapped to NIST AI RMF functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Domain</TableHead>
                    <TableHead className="font-semibold">Objective</TableHead>
                    <TableHead className="font-semibold">NIST Function</TableHead>
                    <TableHead className="font-semibold">Typical Evidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integratedAlignment.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{item.domain}</TableCell>
                      <TableCell>{item.objective}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.nistFunction}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.evidence}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 10 Scenarios */}
          <div>
            <h3 className="text-2xl font-bold mb-6">10 Critical CI/CD Scenarios</h3>
            <div className="space-y-6">
              {scenarios.map((item) => (
                <Card key={item.id} className="border-border hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <Badge variant={getSeverityColor(item.severity)}>
                            {item.severity.toUpperCase()}
                          </Badge>
                          {item.nistFunction && (
                            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                              NIST: {item.nistFunction}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {item.scenario}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <h4 className="font-semibold text-sm">Risk</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.risk}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <h4 className="font-semibold text-sm">Consequence</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.consequence}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-accent" />
                          <h4 className="font-semibold text-sm">Mitigation</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.mitigation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {threePillars.map((pillar, index) => (
          <TabsContent key={index} value={pillar.domain.toLowerCase()} className="space-y-8 mt-8">
            <Card className={`border-2 ${pillar.borderColor} ${pillar.color}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-lg bg-background flex items-center justify-center ${pillar.iconColor}`}>
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{pillar.domain} Domain</CardTitle>
                    <CardDescription className="text-lg font-semibold text-foreground">
                      {pillar.subtitle}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{pillar.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              {pillar.controls.map((control, i) => (
                <Card key={i} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{control.focus}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary" />
                          How CI/CD Applies
                        </h4>
                        <p className="text-sm text-muted-foreground">{control.application}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-accent" />
                          EU AI Act Link
                        </h4>
                        <Badge variant="outline" className="font-mono text-xs">
                          {control.regulation}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          Risk if Ignored
                        </h4>
                        <p className="text-sm text-muted-foreground">{control.risk}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent" />
                          Asimov-AI Assurance
                        </h4>
                        <p className="text-sm text-muted-foreground">{control.assurance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-accent bg-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">{pillar.domain} Takeaway</h4>
                    <p className="text-sm text-muted-foreground">{pillar.takeaway}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Service Offerings */}
      <Card className="border-accent bg-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl">Asimov-AI CI/CD Services</CardTitle>
          <CardDescription>
            Comprehensive assurance for your AI delivery pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">AI CI/CD Audit Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Independent review of AI pipelines against regulatory and CI/CD controls — Readiness score, control gap map
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Continuous Compliance Monitor</h4>
                  <p className="text-sm text-muted-foreground">
                    Plug-in to observe CI/CD logs for bias or documentation gaps — Real-time compliance dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">AI Maturity Certification</h4>
                  <p className="text-sm text-muted-foreground">
                    Annual attestation mapped to EU AI Act Annex VII — External assurance badge
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Governance Blueprint for DevOps</h4>
                  <p className="text-sm text-muted-foreground">
                    Pre-built YAML templates aligning Jenkins/GitHub pipelines with compliance — "Compliance-in-the-loop" automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CICDRiskFramework;
