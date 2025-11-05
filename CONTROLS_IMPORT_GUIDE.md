# Governance Controls Import Guide

## Overview

This guide explains how to import the 360 EU AI AICM governance controls into your Supabase database.

## Files Provided

1. **Excel File**: `scripts/EU_AI_AICM_Crosswalk_v6.xlsx`
   - Contains all 360 controls across 8 domains
   - Structured with EU AI Act mappings, NIST, COBIT, and ISO references

2. **Import Script**: `scripts/import_controls.py`
   - Python script to convert Excel data to SQL INSERT statements

3. **Admin UI**: `/admin/controls-import`
   - Web-based import interface (requires admin authentication)

## Data Structure

### 8 Domains (45 controls each = 360 total):

1. **DAT** - Data Governance & Quality
2. **RIS** - Risk Management  
3. **MOD** - Model Security & Robustness
4. **TRA** - Transparency & Human Oversight
5. **HUM** - Human Oversight (additional)
6. **ACC** - Accuracy & Performance
7. **CYB** - Cybersecurity
8. **POS** - Post-Market Monitoring

### Mapped to ASIMOV Pillars:

- **A**ccountability (DAT, TRA, ACC)
- **S**ecurity (CYB)
- **I**nterpretability (MOD)
- **M**onitoring (POS)
- **O**versight (RIS, HUM)
- **V**erification (all domains)

### Risk Levels (from Validation Scale):

- 🟢 Green → Low Risk
- 🟡 Yellow → General Risk  
- 🔴 Red → High Risk
- 🔵 Blue → General Risk

## Import Methods

### Method 1: Using Python Script (Recommended for Bulk Import)

```bash
# 1. Install pandas library
pip install pandas openpyxl

# 2. Run the import script
python scripts/import_controls.py

# 3. This generates: scripts/import_controls.sql

# 4. Execute the SQL using Supabase insert tool or directly in database
```

### Method 2: Using Admin UI

1. Navigate to `/admin/controls-import`
2. Click "Import Controls"
3. Monitor progress (imports in batches of 50)
4. Review success/failure statistics

**Note**: The CONTROLS_DATA array in `AdminControlsImport.tsx` currently contains only sample data. You need to:

a. Extract full data from Excel using Python script, OR
b. Manually paste all 360 control objects into the array

### Method 3: Direct SQL Execution

Use the Supabase insert tool to run SQL directly:

```sql
-- Example for first batch
INSERT INTO governance_controls (
  control_name,
  category,
  framework,
  asimov_pillar,
  risk_level,
  description,
  evidence_requirements,
  regulatory_references,
  sort_order
) VALUES
(
  'Control 1 for Data Governance & Quality',
  'Data Governance & Quality',
  'EU AI Act (2023)',
  'Accountability',
  'Low Risk',
  'Ensure that the data governance & quality framework includes policy, testing, and documentation per Art 10 of the EU AI Act.',
  'Policy, test records, and QMS documentation required.',
  'EU AI Act Art 10 | Annex IV §2 | NIST GV-1 | COBIT BAI06.02 | ISO/IEC 27001 §6.1',
  1
),
-- ... add remaining 359 controls
;
```

## Database Schema

The `governance_controls` table structure:

```sql
CREATE TABLE governance_controls (
  id SERIAL PRIMARY KEY,
  control_name TEXT NOT NULL,
  category TEXT NOT NULL,
  framework TEXT NOT NULL DEFAULT 'EU AI Act (2023)',
  asimov_pillar TEXT CHECK (asimov_pillar IN (
    'Accountability', 'Security', 'Interpretability',
    'Monitoring', 'Oversight', 'Verification'
  )),
  risk_level TEXT NOT NULL CHECK (risk_level IN (
    'High Risk', 'General Risk', 'Low Risk'
  )),
  description TEXT NOT NULL,
  evidence_requirements TEXT NOT NULL,
  regulatory_references TEXT,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Verification

After import, verify the data:

```sql
-- Check total count
SELECT COUNT(*) as total FROM governance_controls;
-- Expected: 360

-- Check distribution by domain
SELECT category, COUNT(*) as count
FROM governance_controls
GROUP BY category
ORDER BY category;
-- Expected: 8 domains with 45 controls each

-- Check ASIMOV Pillar distribution
SELECT asimov_pillar, COUNT(*) as count
FROM governance_controls
GROUP BY asimov_pillar
ORDER BY asimov_pillar;

-- Check risk level distribution  
SELECT risk_level, COUNT(*) as count
FROM governance_controls
GROUP BY risk_level
ORDER BY risk_level;
```

## Next Steps After Import

1. **Test Queries**: Verify all controls are accessible
2. **Create Assessments**: Start assessment/user_id/sessions with imported controls
3. **Generate Insights**: Use Lovable AI to generate sector-specific guidance
4. **Configure Sectors**: Ensure sectors table is populated
5. **Configure Regions**: Ensure regions table is populated

## Troubleshooting

### Issue: Import Fails with RLS Error

**Solution**: Ensure you're authenticated as an admin user:

```sql
-- Check your role
SELECT role FROM user_roles WHERE user_id = auth.uid();

-- If needed, grant admin role
INSERT INTO user_roles (user_id, role)
VALUES (auth.uid(), 'admin'::app_role);
```

### Issue: Duplicate Controls

**Solution**: Clear table before re-importing:

```sql
-- CAUTION: This deletes ALL controls
DELETE FROM governance_controls;
```

### Issue: Excel File Not Found

**Solution**: Ensure file is in correct location:

```bash
# File should be at:
scripts/EU_AI_AICM_Crosswalk_v6.xlsx
```

## Contact

For issues or questions about the import process, consult the project documentation or Supabase backend configuration.

## Data Source

**File**: EU_AI_AICM_Crosswalk_v6.xlsx  
**Version**: 6  
**Date**: 2025-11-05  
**Controls**: 360  
**Frameworks**: EU AI Act (2023), NIST AI RMF, COBIT, ISO/IEC standards
