export const MOCK_CONTROLS = [
  {
    id: 1,
    control_name: 'AI System Risk Assessment Documentation',
    category: 'Risk Management',
    risk_level: 'High Risk',
    description: 'Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks, evaluation of risk probability and severity, and mitigation measures throughout the AI system lifecycle per EU AI Act Article 9.',
    evidence: 'Risk assessment reports, impact analysis documents, mitigation plans, risk registers, third-party audit reports',
    asimov_pillar: 'Accountability',
    framework: 'EU AI Act (2023)',
    sort_order: 1
  },
  {
    id: 2,
    control_name: 'Conformity Assessment Process',
    category: 'Compliance',
    risk_level: 'High Risk',
    description: 'Establish conformity assessment procedures for high-risk AI systems before market placement, including technical documentation, quality management system, and post-market monitoring plan per EU AI Act Article 43.',
    evidence: 'Conformity certificates, technical documentation, quality management procedures, notified body reports',
    asimov_pillar: 'Verification',
    framework: 'EU AI Act (2023)',
    sort_order: 2
  },
  {
    id: 3,
    control_name: 'Data Governance Framework',
    category: 'Data Protection',
    risk_level: 'High Risk',
    description: 'Implement data governance practices ensuring training, validation and testing data sets are relevant, representative, free of errors and complete per EU AI Act Article 10.',
    evidence: 'Data quality reports, governance policies, data lineage documentation, bias assessment reports',
    asimov_pillar: 'Security',
    framework: 'EU AI Act (2023)',
    sort_order: 3
  },
  {
    id: 4,
    control_name: 'Transparency and User Information',
    category: 'Transparency',
    risk_level: 'General Risk',
    description: 'Provide clear and adequate information to users about AI system capabilities, limitations, accuracy, and purpose per EU AI Act Article 13.',
    evidence: 'User documentation, disclosure statements, capability descriptions, limitation notices',
    asimov_pillar: 'Interpretability',
    framework: 'EU AI Act (2023)',
    sort_order: 4
  },
  {
    id: 5,
    control_name: 'Human Oversight Measures',
    category: 'Governance',
    risk_level: 'High Risk',
    description: 'Design high-risk AI systems with appropriate human oversight measures including human-in-the-loop, human-on-the-loop, or human-in-command per EU AI Act Article 14.',
    evidence: 'Oversight procedures, escalation protocols, human review logs, intervention mechanisms',
    asimov_pillar: 'Oversight',
    framework: 'EU AI Act (2023)',
    sort_order: 5
  }
];
