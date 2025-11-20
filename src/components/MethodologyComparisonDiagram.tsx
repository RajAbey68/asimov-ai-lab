import RiskDiagram from "./RiskDiagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const MethodologyComparisonDiagram = () => {
  const generatePDFEssay = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("AI Development Methodologies: A Comprehensive Comparison", margin, yPosition);
    yPosition += 15;

    // Essay content
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const essay = `The landscape of artificial intelligence development has evolved rapidly, giving rise to diverse methodologies that address different aspects of AI system creation, deployment, and governance. This essay examines four prominent frameworks: ASIMOV-AI, BMAD, Morningside AI, and the MAD landscape, exploring how they complement each other to provide comprehensive solutions for modern AI development challenges.

ASIMOV-AI: The Governance Foundation

ASIMOV-AI serves as a foundational governance and risk management framework specifically designed for AI systems. Named after the science fiction author Isaac Asimov, this methodology emphasizes ethical AI development through structured governance processes. It focuses on establishing robust policies, procedures, and controls that ensure AI systems are developed and deployed responsibly. The framework addresses critical concerns around AI safety, transparency, accountability, and compliance with emerging regulations such as the EU AI Act.

The strength of ASIMOV-AI lies in its comprehensive approach to AI governance, providing organizations with clear pathways to assess and mitigate risks throughout the AI lifecycle. It emphasizes continuous monitoring, stakeholder engagement, and iterative improvement, making it particularly valuable for organizations operating in regulated industries or those handling sensitive data. The methodology's focus on compliance and risk management makes it an essential baseline for any serious AI development effort.

BMAD: Agile Agent-Driven Development

The BMAD (Breakthrough Method for Agile AI Development) methodology represents a paradigm shift in how AI systems are built. This modular, agent-driven approach leverages specialized AI agents for different phases of development planning and execution. The methodology employs planning agents including Analysts, Project Managers, and Architects to create highly structured product requirement documents, architectural diagrams, and user experience guidelines.

What distinguishes BMAD is its use of a Scrum Master agent that converts strategic plans into detailed story files, complete with architectural context and implementation guidelines. This approach eliminates context loss between planning and execution phases, a common challenge in traditional development workflows. The method's emphasis on incremental, modular builds and strict context-aware workflows enables rapid iteration while maintaining coherence across the development lifecycle. BMAD integrates seamlessly with modern AI tools including OpenAI, Claude, and Qwen, making it highly practical for current development environments.

Morningside AI: The Business-First Approach

Liam Ottley's Morningside AI methodology takes a distinctly entrepreneurial approach to AI development. Rather than focusing solely on technical implementation, Morningside AI provides a comprehensive roadmap for building AI Automation Agencies. The 6-Month AI Automation Agency Roadmap emphasizes practical skill-building, marketing, operations, and project delivery, drawing from real-world experience in scaling AI-driven businesses.

This methodology bridges the gap between technical capability and business value, teaching practitioners not just how to build AI systems, but how to package and deliver them as viable business solutions. Example projects like avatar systems for content creation and AI-driven analytics engines demonstrate the hands-on, outcome-focused nature of this approach. Morningside AI is particularly valuable for entrepreneurs and agencies seeking to monetize AI capabilities, providing both technical frameworks and business development strategies.

MAD: Industry Intelligence and Benchmarking

The MAD (Machine Learning, AI & Data) landscape serves a different but complementary purpose. Rather than prescribing development methodologies, MAD provides comprehensive mapping and benchmarking of the AI tool ecosystem. This framework helps organizations understand the competitive landscape, evaluate tools and platforms, and make informed technology selection decisions. The MAD landscape blends market research with engineering considerations, offering insights into emerging trends, mature solutions, and gaps in the current ecosystem.

Integration and Synergy

The true power of these methodologies emerges when they are integrated strategically. ASIMOV-AI provides the governance foundation and risk management framework that ensures responsible AI development. BMAD offers the tactical development methodology for rapid, structured implementation. Morningside AI contributes the business context and delivery framework that ensures commercial viability. The MAD landscape provides the market intelligence needed to make informed technology choices.

Organizations can adopt ASIMOV-AI as their baseline governance framework, implementing BMAD's agent-driven approach for technical development while following Morningside AI's business roadmap for go-to-market strategy. Throughout this process, the MAD landscape serves as a reference for tool selection and competitive positioning.

Practical Application

In practice, a comprehensive AI development strategy might begin with ASIMOV-AI governance assessment to understand regulatory requirements and risk tolerance. BMAD's planning agents would then create detailed technical specifications aligned with these governance requirements. Development would proceed using BMAD's modular approach, while business development follows Morningside AI's agency roadmap. Tool selection throughout would reference the MAD landscape for best-in-class solutions.

This integrated approach addresses the full spectrum of AI development challenges: governance and compliance through ASIMOV-AI, technical excellence through BMAD, business viability through Morningside AI, and informed technology choices through MAD. Organizations need not choose one methodology over another; rather, they can leverage each framework's strengths to build a comprehensive AI development capability.

Conclusion

The evolution of AI development methodologies reflects the maturing of the AI industry itself. As AI systems become more complex and consequential, organizations need frameworks that address technical, governance, and business dimensions simultaneously. ASIMOV-AI, BMAD, Morningside AI, and MAD each contribute unique value, and their integration represents the state of the art in comprehensive AI development practice. Organizations that successfully combine these approaches position themselves to build AI systems that are technically sophisticated, ethically sound, and commercially successful.`;

    const lines = doc.splitTextToSize(essay, maxWidth);
    
    lines.forEach((line: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });

    // Save the PDF
    doc.save("ai-methodologies-comparison.pdf");
    toast.success("PDF essay downloaded successfully");
  };

  return (
    <RiskDiagram
      title="AI Methodology Landscape: How ASIMOV-AI Fits"
      description="Understanding the relationships between leading AI development and governance methodologies"
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          <Button onClick={generatePDFEssay} className="gap-2">
            <Download className="h-4 w-4" />
            Export as PDF Essay
          </Button>
        </div>
        {/* Visual Diagram */}
        <div className="w-full max-w-4xl mx-auto">
          <svg viewBox="0 0 800 600" className="w-full h-auto">
            {/* ASIMOV-AI Core - Center Foundation */}
            <rect
              x="250"
              y="250"
              width="300"
              height="100"
              fill="hsl(var(--primary))"
              opacity="0.9"
              rx="8"
            />
            <text
              x="400"
              y="290"
              textAnchor="middle"
              fill="white"
              fontSize="24"
              fontWeight="bold"
            >
              ASIMOV-AI
            </text>
            <text
              x="400"
              y="315"
              textAnchor="middle"
              fill="white"
              fontSize="14"
            >
              Governance & Risk Foundation
            </text>
            <text
              x="400"
              y="335"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              opacity="0.9"
            >
              EU AI Act • NIST AI RMF • ISO/IEC 42001
            </text>

            {/* BMAD - Top Left */}
            <rect
              x="50"
              y="50"
              width="200"
              height="80"
              fill="hsl(var(--accent))"
              opacity="0.8"
              rx="6"
            />
            <text
              x="150"
              y="80"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="18"
              fontWeight="bold"
            >
              BMAD Method
            </text>
            <text
              x="150"
              y="105"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="12"
            >
              Agent-Driven Development
            </text>

            {/* Morningside AI - Top Right */}
            <rect
              x="550"
              y="50"
              width="200"
              height="80"
              fill="hsl(var(--accent))"
              opacity="0.8"
              rx="6"
            />
            <text
              x="650"
              y="80"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="18"
              fontWeight="bold"
            >
              Morningside AI
            </text>
            <text
              x="650"
              y="105"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="12"
            >
              Agency Business Model
            </text>

            {/* MAD Landscape - Bottom */}
            <rect
              x="300"
              y="480"
              width="200"
              height="80"
              fill="hsl(var(--secondary))"
              opacity="0.7"
              rx="6"
            />
            <text
              x="400"
              y="510"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="18"
              fontWeight="bold"
            >
              MAD Landscape
            </text>
            <text
              x="400"
              y="535"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="12"
            >
              Market Intelligence
            </text>

            {/* Connecting Lines with Labels */}
            {/* BMAD to ASIMOV-AI */}
            <line
              x1="200"
              y1="130"
              x2="320"
              y2="250"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x="240"
              y="180"
              fill="hsl(var(--muted-foreground))"
              fontSize="11"
              fontWeight="500"
            >
              Orthogonal
            </text>
            <text
              x="235"
              y="195"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              (Development)
            </text>

            {/* Morningside to ASIMOV-AI */}
            <line
              x1="600"
              y1="130"
              x2="480"
              y2="250"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x="520"
              y="180"
              fill="hsl(var(--muted-foreground))"
              fontSize="11"
              fontWeight="500"
            >
              Complementary
            </text>
            <text
              x="530"
              y="195"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              (Business)
            </text>

            {/* MAD to ASIMOV-AI */}
            <line
              x1="400"
              y1="480"
              x2="400"
              y2="350"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x="420"
              y="420"
              fill="hsl(var(--muted-foreground))"
              fontSize="11"
              fontWeight="500"
            >
              Contextual
            </text>
            <text
              x="420"
              y="435"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              (Market Intel)
            </text>
          </svg>
        </div>

        {/* Detailed Comparison Table */}
        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold">Detailed Methodology Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Methodology</th>
                  <th className="border border-border p-3 text-left">Core Focus</th>
                  <th className="border border-border p-3 text-left">Unique Aspects</th>
                  <th className="border border-border p-3 text-left">Main Contributors</th>
                  <th className="border border-border p-3 text-left">Integration with ASIMOV-AI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">ASIMOV-AI</td>
                  <td className="border border-border p-3">AI Governance & Risk Management</td>
                  <td className="border border-border p-3">EU AI Act compliance, risk assessment, lifecycle controls</td>
                  <td className="border border-border p-3">Asimov Nexus</td>
                  <td className="border border-border p-3">Foundation Layer - Provides compliance baseline for all AI initiatives</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">BMAD Method</td>
                  <td className="border border-border p-3">Modular agentic build</td>
                  <td className="border border-border p-3">Agent-driven planning (Analyst, PM, Architect), context-rich PRDs, Scrum Master story files, strict workflow</td>
                  <td className="border border-border p-3">BMad Code team, community</td>
                  <td className="border border-border p-3">Development process operates within ASIMOV-AI governance controls and compliance requirements</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Morningside AI</td>
                  <td className="border border-border p-3">Practical agency build</td>
                  <td className="border border-border p-3">6-Month AAA Roadmap, hands-on business automation, avatar systems, YouTube analysis engines</td>
                  <td className="border border-border p-3">Liam Ottley, Morningside AI</td>
                  <td className="border border-border p-3">Agency business model benefits from ASIMOV-AI compliance credibility and client trust</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">MAD Landscape</td>
                  <td className="border border-border p-3">Industry landscape</td>
                  <td className="border border-border p-3">Benchmarking tools/systems, ML/AI/Data ecosystem mapping, market research focus</td>
                  <td className="border border-border p-3">Industry analysts (Matt Turck et al.)</td>
                  <td className="border border-border p-3">Market intelligence informs compliant tool selection and technology stack decisions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Methodology Descriptions */}
        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-semibold">Detailed Methodology Descriptions</h3>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>BMAD (Breakthrough Method for Agile AI Development)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A modular, agent-driven approach designed for rapid and structured AI system development.
                </p>
                <div>
                  <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Specialized planning agents (Analyst, Project Manager, Architect) develop context-rich PRDs and architecture diagrams</li>
                    <li>• Scrum Master agent converts plans into detailed 'story files' with architectural context</li>
                    <li>• Eliminates context loss and confusion for developer and QA agents</li>
                    <li>• Emphasizes incremental, modular builds with strict, context-aware workflows</li>
                    <li>• Real-world integration with OpenAI, Qwen, Claude, and more</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <Badge variant="secondary">Development Process</Badge>
                  <Badge variant="outline" className="ml-2">Orthogonal to ASIMOV-AI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Morningside AI (Liam Ottley's Approach)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A step-by-step agency build roadmap focusing on building AI Automation Agencies (AAA).
                </p>
                <div>
                  <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 6-Month AI Automation Agency Roadmap for launching successful AI-driven businesses</li>
                    <li>• Emphasizes practical skill-building, marketing, operations, and project delivery</li>
                    <li>• Draws from experience scaling Morningside AI</li>
                    <li>• Example projects: avatar systems for content creation, AI-driven YouTube channel analysis</li>
                    <li>• Focus on building AI workflows for real business outcomes</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <Badge variant="secondary">Business Model</Badge>
                  <Badge variant="outline" className="ml-2">Complementary to ASIMOV-AI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MAD (Machine Learning, AI & Data)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A frequently updated mapping and framework capturing the ML, AI, and data tool ecosystem.
                </p>
                <div>
                  <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Comprehensive landscape mapping of ML/AI/Data tools and products</li>
                    <li>• Used for benchmarking tools, products, and build methodologies</li>
                    <li>• Blends market research with engineering approaches</li>
                    <li>• Regular updates reflecting the evolving AI ecosystem</li>
                    <li>• Helps organizations navigate tool selection and technology decisions</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <Badge variant="secondary">Market Intelligence</Badge>
                  <Badge variant="outline" className="ml-2">Contextual to ASIMOV-AI</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Integration Insights */}
        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold">Key Insights</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Why ASIMOV-AI is Foundational</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Addresses regulatory compliance before market entry</li>
                  <li>• Provides risk management framework for all development</li>
                  <li>• Creates competitive advantage through certified compliance</li>
                  <li>• Required regardless of development methodology or business model</li>
                  <li>• Enables BMAD builds to be compliant by design</li>
                  <li>• Gives Morningside agencies credibility and client trust</li>
                  <li>• Guides MAD tool selection toward compliant options</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Integration Strategy</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• BMAD: Development workflows operate within governance controls</li>
                  <li>• Morningside: Agency services backed by compliance framework</li>
                  <li>• MAD: Market intelligence informs compliant technology choices</li>
                  <li>• All three can coexist with ASIMOV-AI as foundation</li>
                  <li>• Not competing - addressing different layers of AI implementation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prompts for External Tools */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Infographic Generation Prompts</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Copy these detailed prompts into Google's Gemini, Perplexity AI, or other AI image generation tools to create professional infographics:
          </p>
          
          <div className="space-y-6">
            <div className="p-4 bg-card rounded border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                Foundation Layer Architecture
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-mono bg-muted p-3 rounded">
                "Create a professional business infographic showing AI methodology relationships. Bottom layer: ASIMOV-AI as the foundation (governance & risk management, EU AI Act compliance). 
                Three pillars on top: 1) BMAD Method (agent-driven development with Analyst, PM, Architect agents, modular builds), 2) Morningside AI (6-month agency roadmap, AAA business model, client acquisition), 
                3) MAD Landscape (ML/AI/Data ecosystem mapping, tool benchmarking). Use corporate blue for ASIMOV-AI foundation, green for BMAD, orange for Morningside, purple for MAD. 
                Include connecting arrows showing integration points. Clean, modern design with icons for each methodology. Style: McKinsey/Deloitte consulting deck aesthetic."
              </p>
            </div>

            <div className="p-4 bg-card rounded border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                Detailed Comparison Matrix
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-mono bg-muted p-3 rounded">
                "Design a detailed comparison table infographic for AI methodologies: ASIMOV-AI, BMAD Method, Morningside AI, MAD Landscape. 
                Columns: Methodology name with icon. Rows: Core Focus, Unique Aspects (bullet points), Main Contributors, Integration Type. 
                ASIMOV-AI: Governance/compliance, EU AI Act framework, Asimov Nexus, Foundation. 
                BMAD: Modular builds, agent planning (Analyst/PM/Architect), BMad Code team, Orthogonal. 
                Morningside: Agency roadmap, 6-month AAA program, Liam Ottley, Complementary. 
                MAD: Tool mapping, ecosystem benchmarking, Matt Turck/analysts, Contextual. 
                Professional color coding, clean typography, business presentation style."
              </p>
            </div>

            <div className="p-4 bg-card rounded border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
                Integration Journey Map
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-mono bg-muted p-3 rounded">
                "Create a user journey infographic showing how AI teams use methodologies together. Center: ASIMOV-AI (governance hub). 
                Three branches radiating outward: 1) BMAD path - shows sprint planning with AI agents, context-rich PRDs, modular development; 
                2) Morningside path - shows agency growth stages (month 1-6), client acquisition, revenue milestones; 
                3) MAD path - shows tool selection workflow, ecosystem mapping, technology decisions. 
                Each path shows specific milestones and deliverables. All paths start from ASIMOV-AI compliance baseline. 
                Use flowchart style with icons, progressive disclosure, modern tech aesthetic with gradients and clean lines."
              </p>
            </div>

            <div className="p-4 bg-card rounded border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">4</span>
                Venn Diagram Relationships
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-mono bg-muted p-3 rounded">
                "Design a Venn diagram infographic showing methodology overlap and unique value. Four circles: ASIMOV-AI (largest, underlaying all), 
                BMAD Method, Morningside AI, MAD Landscape. Show overlap areas: BMAD+ASIMOV='Compliant Development', Morningside+ASIMOV='Trusted Agency', 
                MAD+ASIMOV='Compliant Tool Selection', Center (all four)='Comprehensive AI Excellence'. 
                Each methodology circle lists 3-4 unique features. Use transparent overlays, distinct colors, labels with key terms. 
                Modern, clean design suitable for executive presentations."
              </p>
            </div>

            <div className="p-4 bg-card rounded border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">5</span>
                Timeline Integration Roadmap
              </h4>
              <p className="text-sm text-muted-foreground mb-2 font-mono bg-muted p-3 rounded">
                "Create a timeline roadmap infographic for AI project methodology adoption. Horizontal timeline with phases: 
                Phase 0 (Foundation): ASIMOV-AI governance setup, risk assessment, compliance baseline. 
                Phase 1-3 (Parallel tracks): BMAD track shows sprint cycles with agent workflows, Morningside track shows months 1-6 agency milestones, MAD track shows quarterly tool evaluations. 
                Each track has specific deliverables and checkpoints. All tracks reference ASIMOV-AI compliance gates. 
                Use swim lanes, milestone markers, color-coded phases. Include icons for each methodology. 
                Professional project management style with clear visual hierarchy."
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded border border-primary/20">
            <h4 className="font-semibold mb-2 text-sm">💡 Pro Tips for Best Results:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Copy the full prompt text including all details for best accuracy</li>
              <li>• Request "16:9 aspect ratio" or "landscape orientation" for presentation slides</li>
              <li>• Add "high resolution, professional quality" to prompts for print-ready output</li>
              <li>• Iterate with "make it more [modern/corporate/colorful/minimal]" for style adjustments</li>
              <li>• For Google Gemini: Use Gemini Advanced or Gemini 2.0 for best image generation</li>
              <li>• For Perplexity: Use Pro mode with image generation enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </RiskDiagram>
  );
};

export default MethodologyComparisonDiagram;
