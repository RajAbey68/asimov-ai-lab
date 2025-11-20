import RiskDiagram from "./RiskDiagram";

const MethodologyComparisonDiagram = () => {
  return (
    <RiskDiagram
      title="AI Methodology Landscape: How ASIMOV-AI Fits"
      description="Understanding the relationships between leading AI development and governance methodologies"
    >
      <div className="space-y-8">
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left p-3 font-semibold">Methodology</th>
                <th className="text-left p-3 font-semibold">Core Focus</th>
                <th className="text-left p-3 font-semibold">Relationship to ASIMOV-AI</th>
                <th className="text-left p-3 font-semibold">Integration Points</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-primary">ASIMOV-AI</td>
                <td className="p-3">AI Governance & Risk Management</td>
                <td className="p-3 text-muted-foreground">Foundation Layer</td>
                <td className="p-3">Provides governance framework for all other methods</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">BMAD Method</td>
                <td className="p-3">Agent-Driven Modular Development</td>
                <td className="p-3 text-muted-foreground">Orthogonal (Development)</td>
                <td className="p-3">Development process operates within ASIMOV-AI governance controls</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium">Morningside AI</td>
                <td className="p-3">AI Automation Agency Business Model</td>
                <td className="p-3 text-muted-foreground">Complementary (Business)</td>
                <td className="p-3">Business model benefits from ASIMOV-AI compliance credibility</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">MAD Landscape</td>
                <td className="p-3">AI/ML/Data Tool Ecosystem Mapping</td>
                <td className="p-3 text-muted-foreground">Contextual (Market Intel)</td>
                <td className="p-3">Market research informs tool selection within governance framework</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key Integration Insights */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-border rounded-lg bg-card">
            <h4 className="font-semibold mb-2 text-primary">Why ASIMOV-AI is Foundational</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Addresses regulatory compliance (EU AI Act, GDPR)</li>
              <li>• Provides risk assessment framework (NIST AI RMF)</li>
              <li>• Enables audit readiness and governance</li>
              <li>• Required regardless of development methodology</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card">
            <h4 className="font-semibold mb-2 text-primary">Positioning Strategy</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• BMAD/Morningside: "How to build" → ASIMOV-AI: "How to govern"</li>
              <li>• MAD: "What tools exist" → ASIMOV-AI: "Which comply"</li>
              <li>• None conflict → All need governance</li>
              <li>• ASIMOV-AI makes any build method compliant</li>
            </ul>
          </div>
        </div>

        {/* Prompts for External Tools */}
        <div className="mt-8 p-6 border-2 border-primary/20 rounded-lg bg-muted/30">
          <h3 className="text-xl font-bold mb-4">Infographic Generation Prompts</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use these prompts in Google Gemini, Perplexity, or other AI tools to generate professional infographics:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-semibold mb-2 text-sm">Prompt 1: Relationship Diagram</h4>
              <code className="text-xs block p-2 bg-muted rounded">
                Create a professional infographic showing the relationship between four AI methodologies: ASIMOV-AI (governance & risk foundation at center), BMAD Method (agent-driven development, orthogonal relationship), Morningside AI (agency business model, complementary relationship), and MAD Landscape (market intelligence, contextual relationship). Use a hub-and-spoke layout with ASIMOV-AI at center. Include connecting lines labeled with relationship types. Style: Modern, professional, corporate colors (blue/teal primary).
              </code>
            </div>

            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-semibold mb-2 text-sm">Prompt 2: Comparison Matrix</h4>
              <code className="text-xs block p-2 bg-muted rounded">
                Design a comparison matrix infographic with 4 columns (ASIMOV-AI, BMAD, Morningside AI, MAD) and 4 rows (Core Focus, Primary Value, Integration Point, Best Used For). ASIMOV-AI focuses on governance & risk (EU AI Act, NIST AI RMF, ISO/IEC 42001). BMAD focuses on modular development. Morningside AI focuses on agency business models. MAD focuses on market tool mapping. Use icons and visual hierarchy. Professional corporate style.
              </code>
            </div>

            <div className="p-4 bg-background rounded border border-border">
              <h4 className="font-semibold mb-2 text-sm">Prompt 3: Integration Flow</h4>
              <code className="text-xs block p-2 bg-muted rounded">
                Create a workflow infographic showing AI project lifecycle: Start with MAD Landscape (market research), choose development method (BMAD or Morningside AI approach), implement ASIMOV-AI governance controls throughout, achieve regulatory compliance (EU AI Act, NIST AI RMF). Show this as a sequential flow with ASIMOV-AI as a foundational layer underneath all stages. Include compliance checkpoints. Modern, clean design with teal/blue accent colors.
              </code>
            </div>
          </div>
        </div>
      </div>
    </RiskDiagram>
  );
};

export default MethodologyComparisonDiagram;
