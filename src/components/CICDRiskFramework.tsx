import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Database, Code, GitBranch, Server, Eye, FileText, Cloud } from "lucide-react";

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
      severity: "high"
    },
    {
      id: 2,
      icon: RefreshCw,
      title: "Model Training in the Loop",
      scenario: "Models retrain automatically from new data streams.",
      risk: "Uncontrolled drift or bias; parameters change without oversight.",
      consequence: "Accuracy decay; reputational or regulatory breach.",
      mitigation: "Introduce drift-detection thresholds; schedule human review checkpoints; automate retraining approval workflow with rollback option.",
      severity: "high"
    },
    {
      id: 3,
      icon: Code,
      title: "Continuous Integration of AI Code",
      scenario: "Developers merge code, data configs, and model scripts into main branch via CI tools.",
      risk: "Dependency & security exposure — open-source packages, unscanned models.",
      consequence: "Data exfiltration, IP leakage, unlicensed component use.",
      mitigation: "Embed software-composition analysis (SCA) and vulnerability scans in CI; sign model artefacts; maintain dependency SBOM (Software Bill of Materials).",
      severity: "critical"
    },
    {
      id: 4,
      icon: GitBranch,
      title: "Continuous Delivery to Production",
      scenario: "Automated CD pipeline deploys models via containers or APIs.",
      risk: "Lack of approval or rollback control.",
      consequence: "Breach of internal governance (COBIT BAI06); unintended outputs to customers.",
      mitigation: "Enforce release-gate approvals; record model version + signature; test in staging before live promotion.",
      severity: "critical"
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Automated Testing and Bias Checks",
      scenario: "Bias, robustness, and accuracy tests run automatically but results aren't reviewed.",
      risk: "False assurance — tests pass without human interpretation.",
      consequence: "Overconfidence in 'green' models; exposure under Art. 15 (Robustness).",
      mitigation: "Add explainability review tasks; store test artefacts as audit evidence; require sign-off from Responsible AI Officer.",
      severity: "high"
    },
    {
      id: 6,
      icon: Eye,
      title: "Model Monitoring and Alerting",
      scenario: "Continuous telemetry tracks model performance post-deployment.",
      risk: "Alert fatigue or missing anomaly correlation.",
      consequence: "Delayed detection of performance degradation or discriminatory outcomes.",
      mitigation: "Define alert severity matrix; integrate monitoring with incident-response playbook; automate EU AI Act Art. 61 incident logging.",
      severity: "medium"
    },
    {
      id: 7,
      icon: FileText,
      title: "Documentation & Annex IV Compliance",
      scenario: "Documentation generated automatically but not reviewed.",
      risk: "Incomplete technical documentation; failure under conformity assessment.",
      consequence: "Legal non-conformity; failed CE marking.",
      mitigation: "Link CI/CD documentation builds to Annex IV checklist; store PDF outputs in immutable evidence repo (Supabase / S3).",
      severity: "high"
    },
    {
      id: 8,
      icon: Cloud,
      title: "Multi-Environment Deployment",
      scenario: "Models deployed across cloud, on-prem, and edge devices.",
      risk: "Configuration drift; inconsistent model behaviour.",
      consequence: "Inconsistent performance or bias by region.",
      mitigation: "Implement infrastructure-as-code with version control; enforce environment parity; continuous configuration compliance scans.",
      severity: "medium"
    },
    {
      id: 9,
      icon: Eye,
      title: "Human-in-the-Loop Oversight Gaps",
      scenario: "Automated retraining eliminates human checkpoints.",
      risk: "Loss of accountability under Art. 14 (Human Oversight).",
      consequence: "No traceable human review of critical decisions.",
      mitigation: "Enforce oversight sign-off in CI/CD pipeline; maintain reviewer logs; integrate with access-control system.",
      severity: "critical"
    },
    {
      id: 10,
      icon: Server,
      title: "Audit Evidence Retention",
      scenario: "Logs and artefacts are overwritten during continuous runs.",
      risk: "Loss of historical evidence for conformity assessments.",
      consequence: "Regulator may deem AI system non-compliant (Art. 71).",
      mitigation: "Configure immutable logging; time-stamped artefact archiving; define minimum retention (≥ 5 years).",
      severity: "high"
    }
  ];

  const governanceAlignment = [
    {
      domain: "Governance & Policy",
      objective: "Ensure pipeline automation adheres to AI policies",
      frameworks: "COBIT EDM01 / NIST Govern"
    },
    {
      domain: "Data Management",
      objective: "Validate and version datasets",
      frameworks: "ISO 42001 §8.4 / EU AI Act Art. 10"
    },
    {
      domain: "Security",
      objective: "Scan and sign artefacts",
      frameworks: "ISO 27001 A.12"
    },
    {
      domain: "Risk & Quality",
      objective: "Bias and drift tests integrated into CI",
      frameworks: "NIST Measure / EU AI Art. 15"
    },
    {
      domain: "Documentation",
      objective: "Auto-generate and archive Annex IV records",
      frameworks: "EU AI Annex IV & VII"
    },
    {
      domain: "Monitoring",
      objective: "Continuous incident and performance tracking",
      frameworks: "EU AI Art. 61–67"
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
          AI CI/CD Risk Framework
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Building confidence in continuous AI delivery through technology, data, and risk management controls
        </p>
      </div>

      {/* Scenarios Grid */}
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

      {/* Governance Alignment */}
      <Card className="border-border bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-2xl">Governance Alignment Summary</CardTitle>
          <CardDescription>
            CI/CD controls mapped to regulatory frameworks and standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Domain</TableHead>
                <TableHead className="font-semibold">CI/CD Control Objective</TableHead>
                <TableHead className="font-semibold">Framework Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {governanceAlignment.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.domain}</TableCell>
                  <TableCell>{item.objective}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {item.frameworks}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

// Add missing import
import { RefreshCw } from "lucide-react";

export default CICDRiskFramework;
