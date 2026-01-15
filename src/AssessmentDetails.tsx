import { CheckCircle2, AlertCircle, AlertTriangle, XCircle, Clock, Calendar, Workflow, BarChart3, FileText, Zap, Target, ChevronRight, FileCheck, Scale, Lock, Users, TrendingUp } from 'lucide-react';

export const ValidationScale = () => (
  <div className="mb-20 bg-gradient-to-br from-slate-50 to-blue-50 p-8 md:p-12 rounded-2xl">
    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">4-Point Validation Scale</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
        <div className="flex items-center mb-3">
          <CheckCircle2 className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h4 className="text-lg font-bold text-gray-900">Fully Validated</h4>
            <p className="text-sm text-blue-600">Evidence-based, signed off</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Complete documentation and testing with formal approval</p>
        <div className="flex items-center text-sm font-semibold text-blue-700">
          <Zap className="h-4 w-4 mr-1" />
          Action: Monitor periodically
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <h4 className="text-lg font-bold text-gray-900">Largely Validated</h4>
            <p className="text-sm text-green-600">Mostly compliant, small gaps</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Minor documentation or testing gaps identified</p>
        <div className="flex items-center text-sm font-semibold text-green-700">
          <Clock className="h-4 w-4 mr-1" />
          Action: Address gaps in next cycle
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-600">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
          <div>
            <h4 className="text-lg font-bold text-gray-900">Partially Validated</h4>
            <p className="text-sm text-yellow-600">Significant assumptions or missing evidence</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Critical gaps requiring immediate attention</p>
        <div className="flex items-center text-sm font-semibold text-yellow-700">
          <Target className="h-4 w-4 mr-1" />
          Action: Prioritise remediation
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
        <div className="flex items-center mb-3">
          <XCircle className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <h4 className="text-lg font-bold text-gray-900">Not Yet Validated</h4>
            <p className="text-sm text-red-600">No evidence or testing done</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">No documentation, testing, or formal processes in place</p>
        <div className="flex items-center text-sm font-semibold text-red-700">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Action: Critical action required
        </div>
      </div>
    </div>
  </div>
);

export const RiskPrioritization = () => (
  <div className="mb-20">
    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Risk Prioritisation & Action Planning</h3>
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Priority Levels</h4>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h5 className="font-bold text-gray-900 mb-1">Critical</h5>
              <p className="text-sm text-gray-600 mb-2">High impact × High likelihood</p>
              <div className="text-sm font-semibold text-red-700">→ Immediate remediation project</div>
            </div>
          </div>

          <div className="flex items-start p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
            <AlertCircle className="h-6 w-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h5 className="font-bold text-gray-900 mb-1">High</h5>
              <p className="text-sm text-gray-600 mb-2">High impact × Low likelihood</p>
              <div className="text-sm font-semibold text-orange-700">→ Mitigation plan & monitoring</div>
            </div>
          </div>

          <div className="flex items-start p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h5 className="font-bold text-gray-900 mb-1">Medium</h5>
              <p className="text-sm text-gray-600 mb-2">Moderate impact × Likelihood</p>
              <div className="text-sm font-semibold text-yellow-700">→ Medium-term roadmap</div>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <CheckCircle2 className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h5 className="font-bold text-gray-900 mb-1">Low</h5>
              <p className="text-sm text-gray-600 mb-2">Low impact × Low likelihood</p>
              <div className="text-sm font-semibold text-blue-700">→ Monitor and review annually</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Ownership & Stakeholders</h4>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Scale className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-gray-900 mb-1">Legal & Compliance</h5>
              <p className="text-sm text-gray-600">Regulatory frameworks, IP rights, contracts</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Lock className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-gray-900 mb-1">CISO / Security</h5>
              <p className="text-sm text-gray-600">Data governance, threat assessment, access control</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-gray-900 mb-1">Product / Engineering</h5>
              <p className="text-sm text-gray-600">Implementation, testing, technical validation</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Users className="h-6 w-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-gray-900 mb-1">Executive Leadership</h5>
              <p className="text-sm text-gray-600">Strategic oversight, budget approval, accountability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AssessmentWorkflow = () => (
  <div className="mb-20 bg-gradient-to-r from-blue-600 to-cyan-600 p-8 md:p-12 rounded-2xl text-white">
    <h3 className="text-3xl font-bold mb-8 text-center">Typical Assessment Workflow</h3>
    <div className="grid md:grid-cols-4 gap-6">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h4 className="text-xl font-bold mb-2">1. Discovery</h4>
        <p className="text-sm text-blue-100 mb-3">Weeks 1-2</p>
        <p className="text-sm">Baseline understanding of current AI risk posture using maturity assessment</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs font-semibold">Output: Heatmap & Gap Report</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <h4 className="text-xl font-bold mb-2">2. Prioritisation</h4>
        <p className="text-sm text-blue-100 mb-3">Weeks 3-4</p>
        <p className="text-sm">Rank risks by severity and urgency using Impact × Likelihood matrix</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs font-semibold">Output: Critical-path Action List</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Workflow className="h-6 w-6 text-white" />
        </div>
        <h4 className="text-xl font-bold mb-2">3. Roadmap</h4>
        <p className="text-sm text-blue-100 mb-3">Weeks 5-6</p>
        <p className="text-sm">Build phased action plan with clear ownership and delivery timelines</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs font-semibold">Output: Action Plan & Owners</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <h4 className="text-xl font-bold mb-2">4. Follow-Up</h4>
        <p className="text-sm text-blue-100 mb-3">Quarterly</p>
        <p className="text-sm">Track progress, re-score maturity, and update board with trend analysis</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs font-semibold">Output: Progress Dashboard</p>
        </div>
      </div>
    </div>
  </div>
);

export const DeliveryTimelines = () => (
  <div className="mb-20">
    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery & Funding Pipeline</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <Zap className="h-10 w-10 text-green-600 mr-3" />
          <h4 className="text-xl font-bold text-gray-900">Quick Wins</h4>
        </div>
        <p className="text-sm text-green-700 font-semibold mb-3">0-3 Months</p>
        <ul className="space-y-2 text-sm text-gray-700 mb-6">
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Address red-zone risks</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Complete missing DPIAs</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Fix data residency breaches</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Add absent IP clauses</span>
          </li>
        </ul>
        <div className="pt-4 border-t border-green-200">
          <p className="text-xs font-semibold text-gray-600">Funding: Operational Budget</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <Target className="h-10 w-10 text-blue-600 mr-3" />
          <h4 className="text-xl font-bold text-gray-900">Strategic Fixes</h4>
        </div>
        <p className="text-sm text-blue-700 font-semibold mb-3">3-6 Months</p>
        <ul className="space-y-2 text-sm text-gray-700 mb-6">
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Implement governance layers</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Establish bias testing protocols</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Define documentation standards</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Align to compliance frameworks</span>
          </li>
        </ul>
        <div className="pt-4 border-t border-blue-200">
          <p className="text-xs font-semibold text-gray-600">Funding: Project/Programme Budget</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-10 w-10 text-purple-600 mr-3" />
          <h4 className="text-xl font-bold text-gray-900">Sustainable Controls</h4>
        </div>
        <p className="text-sm text-purple-700 font-semibold mb-3">6-12 Months</p>
        <ul className="space-y-2 text-sm text-gray-700 mb-6">
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Continuous risk monitoring</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Real-time compliance dashboards</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Automated audit trail systems</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
            <span>Board-level reporting tools</span>
          </li>
        </ul>
        <div className="pt-4 border-t border-purple-200">
          <p className="text-xs font-semibold text-gray-600">Funding: Strategic/Capital Investment</p>
        </div>
      </div>
    </div>
  </div>
);

export const StrategicAdvantages = () => (
  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 md:p-12 rounded-2xl">
    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Strategic Advantages</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
        <CheckCircle2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-900 mb-2">Faster Compliance</h4>
        <p className="text-sm text-gray-600">Aligns with EU AI Act, NIST AI RMF, ISO/IEC 23894, OECD guidelines</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
        <FileCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-900 mb-2">Regulator-Ready</h4>
        <p className="text-sm text-gray-600">Full audit trail of due diligence for boards, insurers, and regulators</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
        <Scale className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-900 mb-2">Litigation Shield</h4>
        <p className="text-sm text-gray-600">Pre-empts legal challenges through documented governance</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
        <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
        <h4 className="font-bold text-gray-900 mb-2">Investment-Ready</h4>
        <p className="text-sm text-gray-600">Builds confidence by proving you understand and manage AI risk</p>
      </div>
    </div>
  </div>
);
