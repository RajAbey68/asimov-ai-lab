import { Shield, Users, Target, TrendingUp, Award, Globe, Building2, Gamepad2, Landmark, ShoppingBag, Mail, Linkedin, Scale, Brain, Lock, DollarSign, UserCheck, ChevronRight, ArrowRight } from 'lucide-react';
import { ValidationScale, RiskPrioritization, AssessmentWorkflow, DeliveryTimelines, StrategicAdvantages } from './AssessmentDetails';
import { RiskQuiz } from './RiskQuiz';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Asimov-AI</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
              <a href="#methodology" className="text-gray-700 hover:text-blue-600 transition">Methodology</a>
              <a href="#assessment" className="text-gray-700 hover:text-blue-600 transition">Assessment</a>
              <a href="#team" className="text-gray-700 hover:text-blue-600 transition">Team</a>
              <a href="#sectors" className="text-gray-700 hover:text-blue-600 transition">Sectors</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Is Your AI Project Putting Your <span className="gradient-text">Organisation at Risk?</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              EU AI Act compliance deadline: August 2026. Most mid-market organisations are dangerously unprepared.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#risk-assessment-quiz" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#risk-assessment-quiz')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                Take the 3-Minute Risk Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#methodology" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg hover:shadow-xl border-2 border-blue-600">
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-12">
            <RiskQuiz />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An AI advisory and consulting group focused on helping organisations ask the right questions before deploying AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">150+ Years</h3>
              <p className="text-gray-600">
                Combined leadership experience across IT Law, cybersecurity, and digital transformation
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <Award className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Expertise</h3>
              <p className="text-gray-600">
                Aligned with frameworks like EU AI Act and NIST AI RMF for worldwide compliance
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <Globe className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">FAME Funded</h3>
              <p className="text-gray-600">
                Backed by <a href="https://www.fame.so/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FAME</a> to advance safe, ethical, and legally compliant AI adoption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Asimov-AI Risk Methodology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmark your AI maturity across three critical pillars
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-red-500">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Risk</h3>
              <p className="text-gray-600 mb-4">
                Understand and mitigate AI-specific risks, from compliance gaps to adversarial threats
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Regulatory compliance assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Adversarial threat analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>IP and data protection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Readiness</h3>
              <p className="text-gray-600 mb-4">
                Assess organisational preparedness for safe AI adoption, aligned with global frameworks
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>EU AI Act alignment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>NIST AI RMF compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Governance framework setup</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-green-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Returns</h3>
              <p className="text-gray-600 mb-4">
                Maximise AI's business value through responsible deployment and robust governance
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>ROI optimization strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Responsible deployment plans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Business value realization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Risk Assessment Section */}
      <section id="assessment" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Assessment Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AI Risk Assessment Methodology</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
              A structured, multi-disciplinary framework designed to help organisations adopt AI responsibly by identifying, evaluating, and prioritising non-technical risks
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold">
              <Brain className="h-5 w-5 mr-2" />
              Built for Boardrooms, Regulators & Executive Decision-Makers
            </div>
          </div>

          {/* Core Pillars */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Assessment Pillars</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Legal & Regulatory */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <Scale className="h-10 w-10 text-blue-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Legal & Regulatory</h4>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Compliance with AI laws (EU AI Act, GDPR, IP law)</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" /><span>Regulatory boundaries</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" /><span>IP ownership clarity</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" /><span>Due diligence documentation</span></div>
                </div>
              </div>

              {/* Ethical & Societal */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <Brain className="h-10 w-10 text-purple-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Ethical & Societal</h4>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Bias, discrimination, transparency, explainability</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" /><span>Fairness testing</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" /><span>Decision explainability</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" /><span>Bias mitigation</span></div>
                </div>
              </div>

              {/* Security & Operational */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <Lock className="h-10 w-10 text-cyan-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Security & Operational</h4>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Data governance, access controls, threat exposure</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-cyan-600 mr-1 mt-0.5 flex-shrink-0" /><span>Data protection</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-cyan-600 mr-1 mt-0.5 flex-shrink-0" /><span>API security</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-cyan-600 mr-1 mt-0.5 flex-shrink-0" /><span>Threat assessment</span></div>
                </div>
              </div>

              {/* Commercial & Reputational */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-10 w-10 text-orange-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Commercial & Reputational</h4>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Liability, contractual risk, brand exposure</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-orange-600 mr-1 mt-0.5 flex-shrink-0" /><span>Litigation risk assessment</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-orange-600 mr-1 mt-0.5 flex-shrink-0" /><span>Contract clarity</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-orange-600 mr-1 mt-0.5 flex-shrink-0" /><span>Brand protection</span></div>
                </div>
              </div>

              {/* Governance & Accountability */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition md:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-4">
                  <UserCheck className="h-10 w-10 text-green-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Governance & Accountability</h4>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Oversight, human-in-the-loop, decision rights</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" /><span>Role definition</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" /><span>Escalation paths</span></div>
                  <div className="flex items-start"><ChevronRight className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" /><span>Accountability frameworks</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Scale */}
          <ValidationScale />

          {/* Risk Prioritization */}
          <RiskPrioritization />

          {/* Assessment Workflow */}
          <AssessmentWorkflow />

          {/* Delivery Timelines */}
          <DeliveryTimelines />

          {/* Strategic Advantages */}
          <StrategicAdvantages />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Core Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class expertise in IT Law, security compliance, and digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nick Lockett</h3>
              <p className="text-blue-600 font-semibold mb-3">Barrister</p>
              <p className="text-gray-600">
                30 years of expertise in IT Law and regulatory frameworks for emerging technologies
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="bg-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sushila Nair</h3>
              <p className="text-purple-600 font-semibold mb-3">Security & Compliance Leader</p>
              <p className="text-gray-600">
                Global leader in security compliance and governance across enterprise organizations
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="bg-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rajiv Abhyankar</h3>
              <p className="text-green-600 font-semibold mb-3">Transformation Expert</p>
              <p className="text-gray-600">
                Expert in application modernisation and enterprise transformation strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sectors We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized AI governance solutions across critical industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <Building2 className="h-12 w-12 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Services</h3>
              <p className="text-gray-600 text-sm">
                Capital Markets, Insurance, Retail & Investment Banking
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <Gamepad2 className="h-12 w-12 text-purple-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gaming & Entertainment</h3>
              <p className="text-gray-600 text-sm">
                Interactive Entertainment & Gaming Industries
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <Landmark className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Government & Public Sector</h3>
              <p className="text-gray-600 text-sm">
                Public Services & Government Organizations
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <ShoppingBag className="h-12 w-12 text-orange-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Retail & Healthcare</h3>
              <p className="text-gray-600 text-sm">
                Consumer Services & Healthcare Providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to advance safe, ethical, and legally compliant AI adoption in your organization?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:contact@asimov-ai.com" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg hover:shadow-xl border-2 border-blue-600">
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            Funded by <a href="https://www.fame.so/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FAME</a> |
            Advancing AI Governance Globally
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Asimov-AI</span>
              </div>
              <p className="text-gray-400">
                Empowering leadership teams to manage AI risks through expert advisory services.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#methodology" className="hover:text-white transition">Methodology</a></li>
                <li><a href="#team" className="hover:text-white transition">Team</a></li>
                <li><a href="#sectors" className="hover:text-white transition">Sectors</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="mailto:contact@asimov-ai.com" className="hover:text-white transition flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Asimov-AI. All rights reserved. | Funded by <a href="https://www.fame.so/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">FAME</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
