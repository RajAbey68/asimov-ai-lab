/**
 * ASIMOV AI — Homepage Content
 * Target: Tiers 2–4 professional services (mid-tier law firms, regional accountancy,
 * mid-market corporates, independent financial advisors)
 * Strategy: Fractional Chief AI Risk Officer — Magic Circle rigour at mid-market speed
 *
 * Text enforcement rules:
 * 1. Outcome language only — what the buyer gains or prevents
 * 2. Signed sign-off is a feature — barrister-qualified partner signs every report
 * 3. Cross-referral to AI Integ appears ONCE, at the bottom only
 * 4. Do not use disallowed marketing terms (e.g. h-word, l-word, u-word, c-word, j-word)
 * 5. No stock imagery — real portraits are a HARD LAUNCH DEPENDENCY
 */

export const homepageCopy = {
  hero: {
    h1: "We tell you the truth about your AI risk. In plain English. On paper. With a name on it.",
    subhead:
      "Mid-tier professional services firms and Tiers 2–4 corporates face enterprise-class AI liability. They cannot afford a McKinsey framework, and they cannot afford to ignore the risk. We deliver independent, signed risk verdicts.",
    primaryCta: { label: "Book an AI Risk Diagnostic", href: "/diagnostic" },
    secondaryCta: { label: "Download the ASIMOV Governance Matrix", href: "/matrix" },
  },

  hooks: [
    {
      id: "regulatory-trap",
      headline:
        "The EU AI Act and updated UK GDPR regulations hold deployers accountable, not just the creators.",
      body: "If your staff uses unvetted models, the liability stops at your board. You don't need a Magic Circle budget to get Magic Circle protection. We deliver a board-ready risk assessment and a clear remediation roadmap in a fixed-fee, 6-week engagement.",
      subhook: "The same defensive rigour. A fraction of the cost.",
    },
    {
      id: "vendor-blindspot",
      headline: "Your software vendors added AI features overnight. Did your liability change?",
      body: "When your software vendors silently push generative AI features into your core case management or CRM systems overnight, your corporate liability changes instantly. Your client data is moving through models your firm never assessed, agreed to, or disclosed. We arm you with the precise questions to ask your suppliers to ensure your firm stays protected.",
      subhook: "Third-party AI is your liability. Know what to ask.",
    },
    {
      id: "objective-shield",
      headline:
        "Traditional software integrators audit your systems just to upsell you a contract.",
      body: "ASIMOV AI does one thing: we give you an unbiased, signed risk verdict. We don't sell software, and we don't build systems. We have no conflict of interest, ensuring your leadership can act with complete certainty — our work ends at the recommendation.",
      subhook: "Independent verdict. No conflict of interest. Ever.",
    },
  ],

  product: {
    headline: "The ASIMOV Audit",
    subhead: "A fixed-scope, 6-week structured programme built for Tiers 2–4 boards.",
    description:
      "We score your AI risk position from L0 to L5 across six essential governance domains using a COBIT-aligned maturity scale. The output: a board-ready compliance dashboard, a prioritised remediation roadmap, and a signed report — every finding tied to a specific regulatory obligation (FCA SM&CR, SRA, UK GDPR), every recommendation ranked by effort and impact.",
    domains: [
      {
        id: "legal",
        label: "Legal",
        description: "Contract liability, AI-output ownership, professional indemnity exposure",
      },
      {
        id: "regulatory",
        label: "Regulatory",
        description: "FCA SM&CR, SRA obligations, ICO UK GDPR, sector-specific requirements",
      },
      {
        id: "ethical",
        label: "Ethical",
        description: "Bias and fairness, Equality Act 2010, human oversight obligations",
      },
      {
        id: "reputational",
        label: "Reputational",
        description: "Client disclosure, public-facing AI, incident response readiness",
      },
      {
        id: "ip",
        label: "IP",
        description: "Training-data infringement risk, AI-output ownership, vendor licence terms",
      },
      {
        id: "security",
        label: "Security",
        description: "Data isolation, access controls, third-party model risk, breach exposure",
      },
    ],
  },

  outputs: {
    headline: "What you receive at week 6",
    items: [
      {
        label: "Compliance dashboard",
        description:
          "Scored position across all six domains in plain English. Presentable to your audit committee, board, or regulator without translation.",
      },
      {
        label: "Remediation roadmap",
        description:
          "Every finding ranked by effort and regulatory impact. Your leadership knows exactly what to fix first — and why.",
      },
      {
        label: "Signed partner report",
        description:
          "A barrister-qualified partner reviews and signs every report. A named professional with personal accountability — not an algorithm, not a junior associate.",
      },
    ],
    signedNote:
      "Dr Nick Lockett — barrister, solicitor, founder of CAAIRO — reviews and countersigns every ASIMOV Audit report.",
  },

  diagnostic: {
    headline: "Book an AI Risk Diagnostic",
    body: "A confidential, 30-minute consultation with a named practitioner — Nick, Sushila, or Raj — to review your immediate regulatory exposures. No sales pitches. No technical jargon. Just a clear view of where you stand.",
    intakeLabel: "Answer three questions to confirm your booking:",
    intakeFields: [
      {
        id: "sector",
        label: "Your sector",
        placeholder: "Law firm / Accountancy / IFA / Corporate / Other",
      },
      { id: "headcount", label: "Approximate headcount", placeholder: "50–200 / 200–500 / 500+" },
      {
        id: "concern",
        label: "Your primary AI concern (one line)",
        placeholder:
          "e.g. 'We use Microsoft Copilot and have no idea where our client data is going'",
      },
    ],
    cta: { label: "Book an AI Risk Diagnostic", href: "/diagnostic/book" },
  },

  matrix: {
    headline: "Download the ASIMOV Governance Matrix",
    body: "Get the exact 6-domain framework our partners use to audit corporate AI risk. Includes the critical compliance questions your board should be asking your IT team today. When you realise your team cannot answer them, you will know where you stand.",
    gateFields: [
      { id: "email", label: "Work email address", type: "email" },
      { id: "job_title", label: "Your role", type: "text" },
    ],
    cta: { label: "Download the ASIMOV Governance Matrix", href: "/matrix/download" },
    disclaimer:
      "We will email you the matrix immediately. We do not share your details with third parties.",
  },

  principals: {
    headline: "Named accountability. Real practitioners.",
    subhead: "A barrister-qualified partner reviews and signs every report.",
    people: [
      {
        name: "Sushila Nair CISSP",
        role: "Cybersecurity Consultant | 2024 ISACA Technology for Humanity Award",
        credential:
          "Former Vice President of Cybersecurity at Capgemini and NTT DATA. Legal expert witness in cybersecurity matters. ISACA Global Emerging Trends Working Group. She translates governance intent into controls that auditors will recognise and regulators will accept.",
        portrait: "/images/sushila-nair.jpg",
      },
      {
        name: "Dr Nick Lockett",
        role: "Barrister & Solicitor | Founder, CAAIRO | Partner Associate, ASIMOV AI",
        credential:
          "Barrister and authority on technology law since 1993. Advising institutions on digital liability longer than most of your software vendors have existed. He reviews and signs every ASIMOV Audit report — personally accountable for every finding.",
        portrait: "/images/nick-lockett.jpg",
      },
      {
        name: "Rajiv Abeysinghe",
        role: "Co-founder, ASIMOV AI | BCS Chartered IT Professional | AWS Certified Solutions Architect",
        credential:
          "27 years delivering AI and enterprise technology across public sector, financial services, and regulated industries. Co-author, The Digital Law Firm (Law Society Publishing, Q4 2026).",
        portrait: "/images/raj-abeysinghe.jpg",
      },
    ],
  },

  pricing: {
    headline: "Predictable, fixed-fee engagements. No hourly billing. No scope creep.",
    signal: "Typical engagement: 6 weeks · Fixed fee · Confirmed at Diagnostic",
    tiers: [
      {
        name: "AI Risk Diagnostic",
        duration: "30 min",
        from: "No charge",
        description:
          "Confidential intake call. Establishes your exposure. Confirms whether a full audit is warranted.",
      },
      {
        name: "ASIMOV Audit",
        duration: "6 weeks",
        from: "Fixed fee confirmed at Diagnostic",
        description: "Full 6-domain audit. Board-ready report. Signed by a named partner.",
      },
      {
        name: "Advisory Retainer",
        duration: "Ongoing",
        from: "From £3,500/month",
        description:
          "Standing counsel. Regulatory monitoring. Monthly session. Quarterly posture update.",
      },
      {
        name: "Embedded Advisory",
        duration: "Ongoing",
        from: "Scoped on enquiry",
        description:
          "Named principal attends your board or risk committee. SM&CR mapping included.",
      },
    ],
  },

  crossReferral: {
    headline: "Need a partner to implement your remediation roadmap?",
    body: "ASIMOV AI's work ends at the recommendation. We have no commercial interest in the implementation. If your roadmap requires someone to build — a governance dashboard, an isolated AI environment, a data classification system — our recommended delivery partner handles that work independently.",
    cta: { label: "Meet AI Integ →", href: "https://ai-integ.com" },
    neutralityNote:
      "ASIMOV AI receives no commercial benefit from this referral. Your audit result is not influenced by this relationship.",
  },

  disclaimer:
    "This website and all ASIMOV AI outputs are decision-support only and do not constitute legal advice. Consult qualified legal counsel before relying on any finding for compliance purposes. © 2026 ASIMOV AI. All rights reserved.",
} as const;
