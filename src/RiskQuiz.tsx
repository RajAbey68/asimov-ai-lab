
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Shield, ArrowRight, RefreshCcw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you have a formally documented AI Risk Register?",
    options: [
      { text: "Yes, fully detailed and updated quarterly", score: 2 },
      { text: "Partially, but it's ad-hoc", score: 1 },
      { text: "No, we haven't documented risks yet", score: 0 }
    ]
  },
  {
    id: 2,
    text: "Have you classified your AI systems under EU AI Act categories?",
    options: [
      { text: "Yes, all systems are classified (High/Limited/Minimal Risk)", score: 2 },
      { text: "We are currently working on it", score: 1 },
      { text: "No, or I don't know what that means", score: 0 }
    ]
  },
  {
    id: 3,
    text: "Do you have established protocols for Human-in-the-Loop oversight?",
    options: [
      { text: "Yes, clearly defined for all automated decisions", score: 2 },
      { text: "Only for some critical systems", score: 1 },
      { text: "No, reliance is mostly fully automated", score: 0 }
    ]
  },
  {
    id: 4,
    text: "Is there a clear accountability framework for AI errors?",
    options: [
      { text: "Yes, specific roles (e.g., Board, CISO) own AI risk", score: 2 },
      { text: "Sort of, it falls under general IT", score: 1 },
      { text: "No, it's unclear who is responsible", score: 0 }
    ]
  }
];

export function RiskQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const getResult = () => {
    // Max score is 8 (4 questions * 2 points)
    // High Risk: 0-3
    // Moderate Risk: 4-6
    // Well-Prepared: 7-8
    
    if (score <= 3) {
      return {
        title: "Critical Risk Detected",
        description: "Your organization appears to be significantly exposed to regulatory and operational risks. Immediate action is recommended to avoid penalties under frameworks like the EU AI Act.",
        color: "red",
        icon: <AlertTriangle className="w-16 h-16 text-red-600 mb-4" />
      };
    } else if (score <= 6) {
      return {
        title: "Moderate Risk Profile",
        description: "You have some foundations in place, but significant gaps exist. You are likely vulnerable to specific compliance checks and should prioritize a gap analysis.",
        color: "orange",
        icon: <Shield className="w-16 h-16 text-orange-600 mb-4" />
      };
    } else {
      return {
        title: "Strong Governance Foundation",
        description: "You are well-prepared. Your focus should shift to continuous monitoring, scaling your governance framework, and auditing for 'drift' over time.",
        color: "green",
        icon: <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
      };
    }
  };

  const result = showResult ? getResult() : null;

  return (
    <div id="risk-assessment-quiz" className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          AI Governance Readiness Assessment
        </h3>
      </div>
      
      <div className="p-8">
        {!showResult ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h4 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
              {questions[currentQuestion].text}
            </h4>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-blue-900">{option.text}</span>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center">{result?.icon}</div>
            <h3 className={`text-3xl font-bold mb-4 text-${result?.color}-600`}>
              {result?.title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              {result?.description}
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="font-semibold text-gray-900 mb-2">Recommended Next Step:</p>
              <p className="text-gray-600 mb-6">
                Book a free 15-minute diagnostic call to review your specific gaps.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Diagnostic Call
              </a>
            </div>

            <button 
              onClick={resetQuiz}
              className="text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto text-sm font-medium"
            >
              <RefreshCcw className="w-4 h-4 mr-1" />
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
