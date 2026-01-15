#!/usr/bin/env python3
"""
Script to import governance controls from EU_AI_AICM_Crosswalk_v6.xlsx
into the governance_controls table in Supabase.

Usage:
    python scripts/import_controls.py
"""

import pandas as pd
import json
from pathlib import Path

# Mapping from Validation Scale emojis to Risk Levels
VALIDATION_SCALE_TO_RISK = {
    '🟢': 'Low Risk',      # Green - Low risk
    '🟡': 'General Risk',  # Yellow - General risk  
    '🔴': 'High Risk',     # Red - High risk
    '🔵': 'General Risk',  # Blue - General risk
}

# Mapping from Domain prefixes to ASIMOV Pillars
DOMAIN_TO_PILLAR = {
    'DAT': 'Accountability',      # Data Governance & Quality
    'MOD': 'Interpretability',    # Model Development
    'SEC': 'Security',            # Security & Privacy
    'MON': 'Monitoring',          # Monitoring & Performance
    'GOV': 'Oversight',           # Governance & Compliance
    'TRA': 'Accountability',      # Transparency & Explainability
    'VAL': 'Verification',        # Validation & Testing
    'DOC': 'Accountability',      # Documentation
}

def load_controls(file_path: str) -> pd.DataFrame:
    """Load controls from Excel file."""
    df = pd.read_excel(file_path)
    print(f"Loaded {len(df)} controls from {file_path}")
    return df

def map_risk_level(validation_scale: str) -> str:
    """Map validation scale emoji to risk level."""
    return VALIDATION_SCALE_TO_RISK.get(validation_scale, 'General Risk')

def map_asimov_pillar(control_id: str) -> str:
    """Map control ID prefix to ASIMOV pillar."""
    prefix = control_id.split('-')[0]
    return DOMAIN_TO_PILLAR.get(prefix, 'Accountability')

def format_regulatory_refs(row: dict) -> str:
    """Combine regulatory references into a single text field."""
    refs = []
    
    if pd.notna(row.get('EU Article')):
        refs.append(f"EU AI Act {row['EU Article']}")
    
    if pd.notna(row.get('EU Annex')):
        refs.append(f"{row['EU Annex']}")
    
    if pd.notna(row.get('NIST Ref')):
        refs.append(f"NIST {row['NIST Ref']}")
    
    if pd.notna(row.get('COBIT Ref')):
        refs.append(f"COBIT {row['COBIT Ref']}")
    
    if pd.notna(row.get('ISO Ref')):
        refs.append(f"{row['ISO Ref']}")
    
    if pd.notna(row.get('Mapping Rationale')):
        refs.append(f"Rationale: {row['Mapping Rationale']}")
    
    return ' | '.join(refs) if refs else None

def generate_sql(df: pd.DataFrame) -> str:
    """Generate SQL INSERT statements."""
    sql_lines = [
        "-- Import 360 Governance Controls from EU AI AICM Crosswalk",
        "-- Generated from EU_AI_AICM_Crosswalk_v6.xlsx",
        "",
        "INSERT INTO governance_controls (",
        "  control_name,",
        "  category,",
        "  framework,",
        "  asimov_pillar,",
        "  risk_level,",
        "  description,",
        "  evidence_requirements,",
        "  regulatory_references,",
        "  sort_order",
        ") VALUES",
    ]
    
    values = []
    for idx, row in df.iterrows():
        control_name = row['Title'].replace("'", "''")
        category = row['Domain'].replace("'", "''")
        description = row['Specification'].replace("'", "''")
        evidence = row['Evidence Required'].replace("'", "''") if pd.notna(row.get('Evidence Required')) else 'Documentation and audit trail required.'
        
        risk_level = map_risk_level(row.get('Validation Scale', '🟡'))
        asimov_pillar = map_asimov_pillar(row['Control ID'])
        regulatory_refs = format_regulatory_refs(row)
        regulatory_refs_sql = f"'{regulatory_refs.replace("'", "''")}'" if regulatory_refs else 'NULL'
        
        value = f"""(
  '{control_name}',
  '{category}',
  'EU AI Act (2023)',
  '{asimov_pillar}',
  '{risk_level}',
  '{description}',
  '{evidence}',
  {regulatory_refs_sql},
  {idx + 1}
)"""
        values.append(value)
    
    sql_lines.append(',\n'.join(values))
    sql_lines.append(";")
    sql_lines.append("")
    sql_lines.append(f"-- Successfully imported {len(values)} governance controls")
    
    return '\n'.join(sql_lines)

def main():
    """Main execution function."""
    script_dir = Path(__file__).parent
    input_file = script_dir / "EU_AI_AICM_Crosswalk_v6.xlsx"
    output_file = script_dir / "import_controls.sql"
    
    print("="*80)
    print("EU AI AICM Governance Controls Import Script")
    print("="*80)
    print()
    
    if not input_file.exists():
        print(f"❌ Error: Input file not found: {input_file}")
        return
    
    # Load controls
    df = load_controls(str(input_file))
    
    # Display summary
    print("\n📊 Data Summary:")
    print(f"   Total Controls: {len(df)}")
    print(f"   Domains: {df['Domain'].nunique()}")
    print(f"   Unique Domains:")
    for domain in sorted(df['Domain'].unique()):
        count = len(df[df['Domain'] == domain])
        print(f"      • {domain}: {count} controls")
    
    # Generate SQL
    print("\n🔄 Generating SQL INSERT statements...")
    sql = generate_sql(df)
    
    # Write to file
    output_file.write_text(sql, encoding='utf-8')
    print(f"✅ SQL file generated: {output_file}")
    print(f"   Total lines: {len(sql.splitlines())}")
    print()
    
    print("="*80)
    print("Next Steps:")
    print("="*80)
    print("1. Review the generated SQL file: scripts/import_controls.sql")
    print("2. Execute the SQL in Supabase using the insert tool")
    print("3. Verify the import by querying the governance_controls table")
    print()

if __name__ == '__main__':
    main()
