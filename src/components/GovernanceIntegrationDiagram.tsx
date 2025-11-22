import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Brain, TrendingUp, Users, Shield, AlertTriangle, Target, GitBranch } from "lucide-react";

const GovernanceIntegrationDiagram = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Data Governance vs AI Governance Integration
          </CardTitle>
          <CardDescription className="text-base">
            How ASIMOV-AI, BMAD, Morningside AI, and MAD Landscape address the evolution from traditional Data Governance to comprehensive AI Governance
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="coverage" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
          <TabsTrigger value="coverage">Coverage Mapping</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholder Evolution</TabsTrigger>
          <TabsTrigger value="risks">Risk Taxonomy</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
          <TabsTrigger value="integration">Integration Points</TabsTrigger>
        </TabsList>

        {/* Tab 1: Methodology Coverage Mapping */}
        <TabsContent value="coverage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Methodology Coverage: Data Governance → AI Governance
              </CardTitle>
              <CardDescription>
                Each methodology provides distinct but complementary coverage across the governance spectrum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ASIMOV-AI */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="default" className="mt-1">ASIMOV-AI</Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Comprehensive AI Governance (with Data Governance as Foundation)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Data Governance Coverage:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Data Quality Controls (DQ-01 through DQ-05)</li>
                          <li>Data Lineage & Provenance (MD-02)</li>
                          <li>Access Controls & Privacy (SC-02, SC-04)</li>
                          <li>Data Validation Gates (QA-01)</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">AI Governance Coverage:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Model Risk Assessment (RM-01 through RM-05)</li>
                          <li>Bias Detection & Fairness (MD-03, ET-02)</li>
                          <li>Explainability & Transparency (MD-01, ET-01)</li>
                          <li>Model Monitoring & Drift Detection (OP-03)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BMAD */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">BMAD</Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Technical Implementation of Governance Controls</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Data Governance Implementation:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Automated data validation pipelines</li>
                          <li>Schema enforcement & type checking</li>
                          <li>Data versioning systems</li>
                          <li>Test-driven data quality assurance</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">AI Governance Implementation:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Model validation test suites</li>
                          <li>Bias detection automated tests</li>
                          <li>Explainability requirement specs</li>
                          <li>Performance monitoring dashboards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Morningside AI */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Morningside AI</Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Business-Focused Governance for Commercial Viability</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Data Governance Business Context:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Data monetization strategies</li>
                          <li>Compliance as competitive advantage</li>
                          <li>Client data handling protocols</li>
                          <li>SLA definitions for data quality</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">AI Governance Business Context:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Responsible AI as brand differentiator</li>
                          <li>Client trust through transparency</li>
                          <li>Risk-adjusted pricing models</li>
                          <li>Governance in go-to-market strategy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAD Landscape */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1 bg-accent">MAD Landscape</Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Tool Selection for Governance Capabilities</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Data Governance Tooling:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Data cataloging platforms</li>
                          <li>Data quality monitoring tools</li>
                          <li>Lineage tracking systems</li>
                          <li>Access control frameworks</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">AI Governance Tooling:</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                          <li>Model registries & versioning</li>
                          <li>Bias detection platforms</li>
                          <li>Explainability frameworks</li>
                          <li>MLOps monitoring solutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Stakeholder Evolution */}
        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Stakeholder Evolution: Data Stewards → AI Ethics Officers
              </CardTitle>
              <CardDescription>
                How methodologies define and transition governance roles from established data practices to emerging AI oversight
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Evolution Visualization */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-muted-foreground/30 via-primary/50 to-primary"></div>
                
                {/* Data Governance Stakeholders */}
                <div className="ml-8 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">Established Data Governance Roles</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Traditional Stakeholders:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Data Stewards</li>
                        <li>• Data Quality Analysts</li>
                        <li>• Database Administrators</li>
                        <li>• Privacy Officers</li>
                        <li>• Compliance Managers</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Methodology Mapping:</h4>
                      <ul className="text-sm space-y-1">
                        <li><Badge variant="outline" className="mr-2">ASIMOV-AI</Badge>Policy Framework Owner (GA-04)</li>
                        <li><Badge variant="outline" className="mr-2">BMAD</Badge>Data Validation Engineer</li>
                        <li><Badge variant="outline" className="mr-2">Morningside</Badge>Client Data Consultant</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transition Zone */}
                <div className="ml-8 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <GitBranch className="h-6 w-6 text-primary/70" />
                    <h3 className="text-xl font-semibold">Transitional Hybrid Roles</h3>
                  </div>
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <h4 className="font-semibold mb-3">Bridging Data & AI Governance:</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Badge className="mb-2">ASIMOV-AI</Badge>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• AI Risk Manager (RM-01)</li>
                          <li>• Lifecycle Stage Gate Reviewer (GA-07)</li>
                          <li>• Ethics Board Member (ET-01)</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">BMAD</Badge>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• ML Pipeline Engineer</li>
                          <li>• Scrum Master (AI Projects)</li>
                          <li>• Test Automation Specialist</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">Morningside</Badge>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• AI Product Manager</li>
                          <li>• Agency Operations Lead</li>
                          <li>• Client Success Manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Governance Stakeholders */}
                <div className="ml-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Emerging AI Governance Roles</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-primary/10">
                      <h4 className="font-semibold mb-2">New AI-Specific Stakeholders:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• AI Ethics Officers</li>
                        <li>• Model Risk Validators</li>
                        <li>• Fairness & Bias Auditors</li>
                        <li>• AI Transparency Leads</li>
                        <li>• MLOps Governance Managers</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4 bg-primary/10">
                      <h4 className="font-semibold mb-2">Methodology Mapping:</h4>
                      <ul className="text-sm space-y-1">
                        <li><Badge className="mr-2">ASIMOV-AI</Badge>Model Validator (MD-01)</li>
                        <li><Badge className="mr-2">ASIMOV-AI</Badge>Ethical Review Board (ET-02)</li>
                        <li><Badge variant="secondary" className="mr-2">BMAD</Badge>AI Agent Orchestrator</li>
                        <li><Badge variant="outline" className="mr-2">Morningside</Badge>AI Delivery Consultant</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mt-6">
                <p className="text-sm font-medium mb-2">Key Insight:</p>
                <p className="text-sm text-muted-foreground">
                  The methodologies don't replace traditional data governance roles—they extend them. ASIMOV-AI provides the framework for role evolution, 
                  BMAD defines the technical responsibilities, and Morningside AI contextualizes these roles within business delivery structures.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Risk Taxonomy Alignment */}
        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Risk Taxonomy: Data Risks vs AI-Specific Risks
              </CardTitle>
              <CardDescription>
                How each methodology addresses the distinct but interconnected risk landscapes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Risk Category</th>
                      <th className="text-left p-3 font-semibold">Data Governance Risks</th>
                      <th className="text-left p-3 font-semibold">AI Governance Risks</th>
                      <th className="text-left p-3 font-semibold">Methodology Coverage</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-3 font-medium">Quality & Accuracy</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Data quality issues</li>
                          <li>• Schema violations</li>
                          <li>• Incomplete records</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Model accuracy degradation</li>
                          <li>• Prediction drift</li>
                          <li>• Training data poisoning</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">DQ-01-05, MD-01</span>
                          <br />
                          <Badge variant="secondary" className="mr-1">BMAD</Badge>
                          <span className="text-xs">Test automation</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Privacy & Security</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Data breaches</li>
                          <li>• Unauthorized access</li>
                          <li>• GDPR violations</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Model inversion attacks</li>
                          <li>• Training data leakage</li>
                          <li>• Prompt injection risks</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">SC-02, SC-04, RM-03</span>
                          <br />
                          <Badge variant="secondary" className="mr-1">BMAD</Badge>
                          <span className="text-xs">Security testing</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Fairness & Bias</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Sampling bias</li>
                          <li>• Historical data bias</li>
                          <li>• Selection bias</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Algorithmic discrimination</li>
                          <li>• Amplification of bias</li>
                          <li>• Unfair treatment patterns</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">ET-02, MD-03, RM-02</span>
                          <br />
                          <Badge variant="secondary" className="mr-1">BMAD</Badge>
                          <span className="text-xs">Bias detection tests</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Transparency</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Unknown data lineage</li>
                          <li>• Missing metadata</li>
                          <li>• Unclear transformations</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Black box models</li>
                          <li>• Unexplainable decisions</li>
                          <li>• Hidden model behavior</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">ET-01, MD-01, MD-02</span>
                          <br />
                          <Badge variant="outline" className="mr-1">Morningside</Badge>
                          <span className="text-xs">Client docs</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Operational</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• System downtime</li>
                          <li>• Data pipeline failures</li>
                          <li>• Integration issues</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Model performance decay</li>
                          <li>• Concept drift</li>
                          <li>• Deployment failures</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">OP-01-05, RM-04</span>
                          <br />
                          <Badge variant="secondary" className="mr-1">BMAD</Badge>
                          <span className="text-xs">CI/CD pipeline</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Compliance</td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Regulatory violations</li>
                          <li>• Audit failures</li>
                          <li>• Retention policy breach</li>
                        </ul>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• EU AI Act non-compliance</li>
                          <li>• Risk classification errors</li>
                          <li>• Documentation gaps</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant="default" className="mr-1">ASIMOV</Badge>
                          <span className="text-xs">GA-01-07, RM-01</span>
                          <br />
                          <Badge variant="outline" className="mr-1">Morningside</Badge>
                          <span className="text-xs">Client SLAs</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Critical Dependency */}
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Critical Dependency: Data Governance as Foundation
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  AI Governance cannot function without solid Data Governance. The methodologies reflect this dependency:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <Badge variant="default" className="mr-2">ASIMOV-AI</Badge>
                    Pillar 2 explicitly requires data quality controls (DQ-*) before model development (MD-*) can proceed
                  </li>
                  <li>
                    <Badge variant="secondary" className="mr-2">BMAD</Badge>
                    Cannot implement AI governance tests without validated data pipelines and quality gates
                  </li>
                  <li>
                    <Badge variant="outline" className="mr-2">Morningside AI</Badge>
                    Client deliverables fail without foundational data governance practices
                  </li>
                  <li>
                    <Badge variant="secondary" className="mr-2 bg-accent">MAD Landscape</Badge>
                    AI tooling selection requires understanding of data infrastructure constraints
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Maturity Assessment */}
        <TabsContent value="maturity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Maturity Spectrum: Established Practices → Emerging Governance
              </CardTitle>
              <CardDescription>
                Positioning methodologies across the data governance (established) to AI governance (emerging) maturity spectrum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Maturity Visualization */}
              <div className="space-y-8">
                {/* Spectrum Bar */}
                <div className="relative h-12 bg-gradient-to-r from-muted via-primary/30 to-primary rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="text-sm font-semibold text-muted-foreground">Established</span>
                    <span className="text-sm font-semibold text-primary">Emerging</span>
                  </div>
                </div>

                {/* Methodology Positioning */}
                <div className="space-y-6">
                  {/* ASIMOV-AI: Bridge Position */}
                  <div className="border rounded-lg p-6 bg-gradient-to-r from-muted/30 via-primary/10 to-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="default" className="text-base px-4 py-1">ASIMOV-AI</Badge>
                      <span className="text-sm font-semibold text-primary">Bridge Position (40% → 60%)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          Established Data Governance (40%)
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Builds on proven data quality frameworks</li>
                          <li>• Leverages existing access control models</li>
                          <li>• Extends data lineage best practices</li>
                          <li>• Mature: Policy frameworks (GA-04)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          Emerging AI Governance (60%)
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Pioneering: Model validation (MD-01)</li>
                          <li>• Pioneering: Bias detection (ET-02, MD-03)</li>
                          <li>• Pioneering: Explainability standards (ET-01)</li>
                          <li>• Pioneering: AI risk taxonomy (RM-01-05)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 bg-background/50 rounded p-3">
                      <p className="text-sm font-medium mb-1">Strategic Positioning:</p>
                      <p className="text-sm text-muted-foreground">
                        ASIMOV-AI intentionally bridges established and emerging practices, providing a pathway for organizations to evolve 
                        their data governance capabilities into comprehensive AI governance frameworks.
                      </p>
                    </div>
                  </div>

                  {/* BMAD: Technical Maturity */}
                  <div className="border rounded-lg p-6 bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-base px-4 py-1">BMAD</Badge>
                      <span className="text-sm font-semibold">Technical Execution (30% → 70%)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Established Practices (30%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Agile/Scrum methodologies</li>
                          <li>• CI/CD pipeline patterns</li>
                          <li>• Test-driven development</li>
                          <li>• Code versioning (Git)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Emerging Practices (70%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI agent-driven development</li>
                          <li>• Automated bias detection testing</li>
                          <li>• ML-specific validation frameworks</li>
                          <li>• Agentic architecture patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Morningside AI: Business Maturity */}
                  <div className="border rounded-lg p-6 bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-base px-4 py-1">Morningside AI</Badge>
                      <span className="text-sm font-semibold">Business Model (50% → 50%)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Established Business Practices (50%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Agency business models</li>
                          <li>• Client delivery frameworks</li>
                          <li>• Marketing & sales strategies</li>
                          <li>• Project management standards</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Emerging AI Business (50%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI automation agency model</li>
                          <li>• AI governance as value prop</li>
                          <li>• Responsible AI branding</li>
                          <li>• AI-specific client success</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* MAD Landscape: Market Intelligence */}
                  <div className="border rounded-lg p-6 bg-accent/20">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-accent text-base px-4 py-1">MAD Landscape</Badge>
                      <span className="text-sm font-semibold">Technology Selection (20% → 80%)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Established Tools (20%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Traditional data platforms</li>
                          <li>• Established BI tools</li>
                          <li>• Legacy ML frameworks</li>
                          <li>• Conventional databases</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Emerging AI Tools (80%)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Foundation model platforms</li>
                          <li>• AI observability tools</li>
                          <li>• Bias detection platforms</li>
                          <li>• MLOps governance suites</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium mb-2 text-primary">Maturity Progression Strategy:</p>
                <p className="text-sm text-muted-foreground">
                  Organizations should start with ASIMOV-AI's established data governance foundations, use BMAD to implement technical controls with 
                  proven DevOps practices, leverage Morningside AI's established agency model, and consult MAD Landscape to select mature tools—then 
                  progressively adopt the emerging AI governance capabilities as organizational maturity increases.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Integration Points */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Integration Points: Data Governance → AI Governance Dependencies
              </CardTitle>
              <CardDescription>
                Critical dependency mapping showing where data governance controls must be in place before AI governance can be effective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Integration Diagram */}
              <div className="space-y-6">
                {/* Integration Point 1: Data Quality Gates */}
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Data Quality Gates → Model Training
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DATA GOVERNANCE PREREQUISITE</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-01</Badge>Quality thresholds</li>
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-02</Badge>Validation rules</li>
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-03</Badge>Completeness checks</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl text-primary">→</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-2">AI GOVERNANCE ENABLED</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge className="text-xs mr-1">MD-01</Badge>Model validation</li>
                          <li><Badge className="text-xs mr-1">MD-02</Badge>Training lineage</li>
                          <li><Badge className="text-xs mr-1">QA-01</Badge>Quality assurance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Methodology Implementation:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• <Badge variant="default" className="mr-1">ASIMOV</Badge>Enforces DQ controls before MD controls in lifecycle gates (GA-07)</li>
                      <li>• <Badge variant="secondary" className="mr-1">BMAD</Badge>Implements automated data validation as prerequisite for model tests</li>
                    </ul>
                  </div>
                </div>

                {/* Integration Point 2: Access Controls */}
                <div className="border-l-4 border-primary/70 pl-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary/70 text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Access Controls → Model Security
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DATA GOVERNANCE PREREQUISITE</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge variant="outline" className="text-xs mr-1">SC-02</Badge>Role-based access</li>
                          <li><Badge variant="outline" className="text-xs mr-1">SC-04</Badge>Data privacy controls</li>
                          <li><Badge variant="outline" className="text-xs mr-1">GA-04</Badge>Policy framework</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl text-primary/70">→</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-2">AI GOVERNANCE ENABLED</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge className="text-xs mr-1">RM-03</Badge>Model access control</li>
                          <li><Badge className="text-xs mr-1">SC-*</Badge>AI security controls</li>
                          <li><Badge className="text-xs mr-1">OP-02</Badge>Access monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Methodology Implementation:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• <Badge variant="default" className="mr-1">ASIMOV</Badge>Extends data access controls to model artifacts and predictions</li>
                      <li>• <Badge variant="secondary" className="mr-1">BMAD</Badge>Implements security testing for both data and model layers</li>
                    </ul>
                  </div>
                </div>

                {/* Integration Point 3: Lineage Tracking */}
                <div className="border-l-4 border-primary/50 pl-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary/50 text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Data Lineage → Model Provenance
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DATA GOVERNANCE PREREQUISITE</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge variant="outline" className="text-xs mr-1">MD-02</Badge>Data lineage tracking</li>
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-04</Badge>Source documentation</li>
                          <li><Badge variant="outline" className="text-xs mr-1">GA-03</Badge>Change management</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl text-primary/50">→</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-2">AI GOVERNANCE ENABLED</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge className="text-xs mr-1">MD-02</Badge>Model provenance</li>
                          <li><Badge className="text-xs mr-1">ET-01</Badge>Transparency docs</li>
                          <li><Badge className="text-xs mr-1">OP-04</Badge>Audit trails</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Methodology Implementation:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• <Badge variant="default" className="mr-1">ASIMOV</Badge>Extends data lineage to include model training, tuning, and deployment history</li>
                      <li>• <Badge variant="secondary" className="mr-1">BMAD</Badge>Implements version control and automated documentation generation</li>
                      <li>• <Badge variant="outline" className="mr-1">Morningside</Badge>Provides client-facing lineage documentation as deliverable</li>
                    </ul>
                  </div>
                </div>

                {/* Integration Point 4: Bias Detection */}
                <div className="border-l-4 border-primary/30 pl-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary/30 text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Data Bias Detection → Algorithmic Fairness
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DATA GOVERNANCE PREREQUISITE</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-05</Badge>Sampling bias checks</li>
                          <li><Badge variant="outline" className="text-xs mr-1">ET-02</Badge>Data fairness review</li>
                          <li><Badge variant="outline" className="text-xs mr-1">RM-02</Badge>Bias risk assessment</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl text-primary/30">→</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-2">AI GOVERNANCE ENABLED</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge className="text-xs mr-1">MD-03</Badge>Model bias detection</li>
                          <li><Badge className="text-xs mr-1">ET-02</Badge>Fairness validation</li>
                          <li><Badge className="text-xs mr-1">OP-03</Badge>Ongoing bias monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Methodology Implementation:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• <Badge variant="default" className="mr-1">ASIMOV</Badge>Requires data-level bias assessment before model fairness testing</li>
                      <li>• <Badge variant="secondary" className="mr-1">BMAD</Badge>Implements automated bias detection tests at both data and model layers</li>
                      <li>• <Badge variant="secondary" className="bg-accent mr-1">MAD</Badge>Recommends bias detection tools for both data and AI layers</li>
                    </ul>
                  </div>
                </div>

                {/* Integration Point 5: Monitoring */}
                <div className="border-l-4 border-primary/20 pl-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                    Data Monitoring → Model Drift Detection
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DATA GOVERNANCE PREREQUISITE</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge variant="outline" className="text-xs mr-1">OP-01</Badge>Data monitoring</li>
                          <li><Badge variant="outline" className="text-xs mr-1">OP-05</Badge>Incident response</li>
                          <li><Badge variant="outline" className="text-xs mr-1">DQ-*</Badge>Quality dashboards</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl text-primary/20">→</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-2">AI GOVERNANCE ENABLED</p>
                        <ul className="text-sm space-y-1">
                          <li><Badge className="text-xs mr-1">OP-03</Badge>Model drift detection</li>
                          <li><Badge className="text-xs mr-1">RM-04</Badge>Performance monitoring</li>
                          <li><Badge className="text-xs mr-1">OP-05</Badge>AI incident response</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Methodology Implementation:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• <Badge variant="default" className="mr-1">ASIMOV</Badge>Integrates data and model monitoring into unified observability framework</li>
                      <li>• <Badge variant="secondary" className="mr-1">BMAD</Badge>Implements automated drift detection using data distribution analysis</li>
                      <li>• <Badge variant="outline" className="mr-1">Morningside</Badge>Delivers client dashboards showing both data and model health</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Critical Success Factor */}
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-5">
                <h4 className="font-bold text-destructive mb-3 flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5" />
                  Critical Success Factor: Sequential Implementation
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  These integration points represent <strong>hard dependencies</strong>—not optional enhancements. Organizations cannot skip data governance 
                  and jump directly to AI governance. The methodologies enforce this through:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background rounded p-3">
                    <Badge variant="default" className="mb-2">ASIMOV-AI Approach</Badge>
                    <p className="text-sm text-muted-foreground">
                      Lifecycle Stage Gates (GA-07) prevent progression to AI-specific controls until data governance prerequisites are met and validated.
                    </p>
                  </div>
                  <div className="bg-background rounded p-3">
                    <Badge variant="secondary" className="mb-2">BMAD Approach</Badge>
                    <p className="text-sm text-muted-foreground">
                      CI/CD pipeline fails model tests if underlying data validation pipelines are not in place and passing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernanceIntegrationDiagram;