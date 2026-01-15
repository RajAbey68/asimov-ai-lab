#!/usr/bin/env python3
"""
Script to import AI controls from EU_AI_AICM_Crosswalk_v6.xlsx
into the ai_controls table in Supabase.

Usage:
    python scripts/import_ai_controls.py
"""

import pandas as pd
import json
from pathlib import Path

def load_controls(file_path: str) -> pd.DataFrame:
    """Load controls from Excel file."""
    df = pd.read_excel(file_path)
    print(f"Loaded {len(df)} controls from {file_path}")
    return df

def format_array_field(value: str) -> str:
    """Format a string value as PostgreSQL array literal."""
    if pd.isna(value) or value == '':
        return 'NULL'
    
    # Split by common delimiters
    items = []
    if ',' in str(value):
        items = [item.strip() for item in str(value).split(',')]
    elif ';' in str(value):
        items = [item.strip() for item in str(value).split(';')]
    elif '|' in str(value):
        items = [item.strip() for item in str(value).split('|')]
    else:
        items = [str(value).strip()]
    
    # Filter out empty strings
    items = [item for item in items if item]
    
    if not items:
        return 'NULL'
    
    # Escape single quotes and format as array
    escaped_items = [item.replace("'", "''") for item in items]
    array_str = "ARRAY[" + ", ".join([f"'{item}'" for item in escaped_items]) + "]"
    return array_str

def escape_sql_string(value) -> str:
    """Escape a value for SQL string literal."""
    if pd.isna(value) or value == '':
        return 'NULL'
    return f"'{str(value).replace("'", "''")}'"

def generate_sql(df: pd.DataFrame) -> str:
    """Generate SQL INSERT statements."""
    sql_lines = [
        "-- Import AI Controls from EU AI AICM Crosswalk v6",
        "-- Generated from EU_AI_AICM_Crosswalk_v6.xlsx",
        "",
        "-- Clear existing data (optional - uncomment if needed)",
        "-- DELETE FROM ai_controls;",
        "",
        "INSERT INTO ai_controls (",
        "  control_id,",
        "  domain,",
        "  title,",
        "  specification,",
        "  control_type,",
        "  lifecycle_phase,",
        "  role_applicability,",
        "  threat_vector,",
        "  eu_article,",
        "  eu_annex,",
        "  mapping_rationale,",
        "  nist_ref,",
        "  cobit_ref,",
        "  iso_ref,",
        "  validation_scale,",
        "  evidence_required",
        ") VALUES",
    ]
    
    values = []
    for idx, row in df.iterrows():
        control_id = escape_sql_string(row.get('Control ID'))
        domain = escape_sql_string(row.get('Domain'))
        title = escape_sql_string(row.get('Title'))
        specification = escape_sql_string(row.get('Specification'))
        control_type = escape_sql_string(row.get('Control Type'))
        lifecycle_phase = format_array_field(row.get('Lifecycle Phase'))
        role_applicability = format_array_field(row.get('Role Applicability'))
        threat_vector = escape_sql_string(row.get('Threat Vector'))
        eu_article = escape_sql_string(row.get('EU Article'))
        eu_annex = escape_sql_string(row.get('EU Annex'))
        mapping_rationale = escape_sql_string(row.get('Mapping Rationale'))
        nist_ref = escape_sql_string(row.get('NIST Ref'))
        cobit_ref = escape_sql_string(row.get('COBIT Ref'))
        iso_ref = escape_sql_string(row.get('ISO Ref'))
        validation_scale = escape_sql_string(row.get('Validation Scale'))
        evidence_required = escape_sql_string(row.get('Evidence Required'))
        
        value = f"""(
  {control_id},
  {domain},
  {title},
  {specification},
  {control_type},
  {lifecycle_phase},
  {role_applicability},
  {threat_vector},
  {eu_article},
  {eu_annex},
  {mapping_rationale},
  {nist_ref},
  {cobit_ref},
  {iso_ref},
  {validation_scale},
  {evidence_required}
)"""
        values.append(value)
    
    sql_lines.append(',\n'.join(values))
    sql_lines.append(";")
    sql_lines.append("")
    sql_lines.append(f"-- Successfully imported {len(values)} AI controls")
    
    return '\n'.join(sql_lines)

def main():
    """Main execution function."""
    script_dir = Path(__file__).parent
    input_file = script_dir / "EU_AI_AICM_Crosswalk_v6.xlsx"
    output_file = script_dir / "import_ai_controls.sql"
    
    print("="*80)
    print("EU AI AICM AI Controls Import Script")
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
    print(f"   Domains: {df['Domain'].nunique() if 'Domain' in df.columns else 'N/A'}")
    if 'Domain' in df.columns:
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
    print("1. Review the generated SQL file: scripts/import_ai_controls.sql")
    print("2. Execute the SQL in Supabase using the insert tool")
    print("3. Verify the import by querying the ai_controls table")
    print()

if __name__ == '__main__':
    main()
