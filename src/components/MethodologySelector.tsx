import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    scores: {
      bmad?: number;
      morningside?: number;
      mad?: number;
    };
  }[];
}

const questions: Question[] = [
  {
    id: "stage",
    question: "What stage is your AI project in?",
    options: [
      { value: "planning", label: "Planning & Research", scores: { mad: 3, morningside: 1 } },
      { value: "building", label: "Active Development", scores: { bmad: 3, mad: 1 } },
      { value: "scaling", label: "Scaling & Operationalizing", scores: { morningside: 3, bmad: 1 } },
      { value: "compliance", label: "Seeking Compliance/Audit", scores: {} }
    ]
  },
  {
    id: "focus",
    question: "What's your primary focus?",
    options: [
      { value: "speed", label: "Rapid development with AI agents", scores: { bmad: 3 } },
      { value: "business", label: "Building an AI automation business", scores: { morningside: 3 } },
      { value: "tools", label: "Selecting the right AI/ML tools", scores: { mad: 3 } },
      { value: "governance", label: "Governance & risk management", scores: {} }
    ]
  },
  {
    id: "team",
    question: "How would you describe your team?",
    options: [
      { value: "solo", label: "Solo founder/developer", scores: { bmad: 2, morningside: 2 } },
      { value: "agency", label: "Building an agency", scores: { morningside: 3, bmad: 1 } },
      { value: "product", label: "Product development team", scores: { bmad: 2, mad: 1 } },
      { value: "enterprise", label: "Enterprise with compliance needs", scores: { mad: 1 } }
    ]
  },
  {
    id: "priority",
    question: "What's most important to you right now?",
    options: [
      { value: "modular", label: "Modular, context-rich development", scores: { bmad: 3 } },
      { value: "market", label: "Understanding market & tooling landscape", scores: { mad: 3 } },
      { value: "revenue", label: "Client acquisition & revenue", scores: { morningside: 3 } },
      { value: "compliance", label: "Regulatory compliance (EU AI Act, etc.)", scores: {} }
    ]
  }
];

interface Recommendation {
  methodology: string;
  score: number;
  reason: string;
  integration: string;
}

const MethodologySelector = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateRecommendations = (): Recommendation[] => {
    const scores = { bmad: 0, morningside: 0, mad: 0 };
    
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      
      if (option?.scores) {
        if (option.scores.bmad) scores.bmad += option.scores.bmad;
        if (option.scores.morningside) scores.morningside += option.scores.morningside;
        if (option.scores.mad) scores.mad += option.scores.mad;
      }
    });

    const recommendations: Recommendation[] = [
      {
        methodology: "ASIMOV-AI",
        score: 100, // Always recommended
        reason: "Essential governance foundation for all AI projects to ensure regulatory compliance and risk management",
        integration: "Provides the governance framework within which all other methodologies operate"
      }
    ];

    if (scores.bmad > 0) {
      recommendations.push({
        methodology: "BMAD Method",
        score: scores.bmad,
        reason: "Agent-driven modular development for rapid, structured AI system builds",
        integration: "Development process operates within ASIMOV-AI governance controls"
      });
    }

    if (scores.morningside > 0) {
      recommendations.push({
        methodology: "Morningside AI",
        score: scores.morningside,
        reason: "Proven agency blueprint for building and scaling AI automation businesses",
        integration: "Business model benefits from ASIMOV-AI compliance credibility"
      });
    }

    if (scores.mad > 0) {
      recommendations.push({
        methodology: "MAD Landscape",
        score: scores.mad,
        reason: "Market intelligence on AI/ML/Data tools and ecosystem mapping",
        integration: "Market research informs compliant tool selection"
      });
    }

    return recommendations.sort((a, b) => b.score - a.score);
  };

  const currentAnswer = answers[questions[currentQuestion]?.id];
  const canProceed = !!currentAnswer;

  if (showResults) {
    const recommendations = calculateRecommendations();
    
    return (
      <Card className="border-border bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Your Recommended Methodology Stack
          </CardTitle>
          <CardDescription>
            Based on your responses, here's the optimal combination of methodologies for your AI project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations.map((rec, index) => (
            <div
              key={rec.methodology}
              className="p-4 border border-border rounded-lg bg-card space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {rec.methodology}
                  {index === 0 && (
                    <Badge variant="default" className="ml-2">Foundation</Badge>
                  )}
                  {index > 0 && rec.score >= 6 && (
                    <Badge variant="secondary">Highly Recommended</Badge>
                  )}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Integration:</span> {rec.integration}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold mb-3">Next Steps</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Start with ASIMOV-AI governance framework to establish compliance baseline</li>
              {recommendations.find(r => r.methodology === "BMAD Method") && (
                <li>• Implement BMAD's agent-driven development within governance controls</li>
              )}
              {recommendations.find(r => r.methodology === "Morningside AI") && (
                <li>• Follow Morningside AI's agency roadmap while maintaining compliance</li>
              )}
              {recommendations.find(r => r.methodology === "MAD Landscape") && (
                <li>• Use MAD research to select compliant tools and technologies</li>
              )}
            </ul>
          </div>

          <Button onClick={handleReset} className="w-full">
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="border-border bg-gradient-subtle">
      <CardHeader>
        <CardTitle className="text-2xl">AI Methodology Selector</CardTitle>
        <CardDescription>
          Answer a few questions to find the best methodology combination for your project
        </CardDescription>
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {questions[currentQuestion].question}
          </h3>
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MethodologySelector;
