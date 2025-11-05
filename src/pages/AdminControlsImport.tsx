import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Upload, Database } from "lucide-react";
import { toast } from "sonner";

// Sample controls data structure - you'll paste the full dataset here
const CONTROLS_DATA = [
  // Data Governance & Quality (DAT-001 to DAT-045)
  {
    controlId: "DAT-001",
    domain: "Data Governance & Quality",
    title: "Control 1 for Data Governance & Quality",
    specification: "Ensure that the data governance & quality framework includes policy, testing, and documentation per Art 10 of the EU AI Act.",
    validationScale: "🟢",
    evidence: "Policy, test records, and QMS documentation required.",
    euArticle: "Art 10",
    euAnnex: "Annex IV §2",
    nistRef: "GV-1",
    cobitRef: "BAI06.02",
    isoRef: "ISO/IEC 27001 §6.1"
  },
  // Add all 360 controls here...
];

// Mapping functions
const VALIDATION_SCALE_TO_RISK: Record<string, string> = {
  '🟢': 'Low Risk',
  '🟡': 'General Risk',
  '🔴': 'High Risk',
  '🔵': 'General Risk',
};

const DOMAIN_TO_PILLAR: Record<string, string> = {
  'DAT': 'Accountability',
  'RIS': 'Oversight',
  'MOD': 'Interpretability',
  'TRA': 'Accountability',
  'HUM': 'Oversight',
  'ACC': 'Accountability',
  'CYB': 'Security',
  'POS': 'Monitoring',
};

const mapRiskLevel = (validationScale: string): string => {
  return VALIDATION_SCALE_TO_RISK[validationScale] || 'General Risk';
};

const mapAsimovPillar = (controlId: string): string => {
  const prefix = controlId.split('-')[0];
  return DOMAIN_TO_PILLAR[prefix] || 'Accountability';
};

const formatRegulatoryRefs = (control: any): string => {
  const refs: string[] = [];
  if (control.euArticle) refs.push(`EU AI Act ${control.euArticle}`);
  if (control.euAnnex) refs.push(control.euAnnex);
  if (control.nistRef) refs.push(`NIST ${control.nistRef}`);
  if (control.cobitRef) refs.push(`COBIT ${control.cobitRef}`);
  if (control.isoRef) refs.push(control.isoRef);
  return refs.join(' | ') || '';
};

const AdminControlsImport = () => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: []
  });

  const importControls = async () => {
    setImporting(true);
    setProgress(0);
    setResults({ success: 0, failed: 0, errors: [] });

    const batchSize = 50;
    let successCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < CONTROLS_DATA.length; i += batchSize) {
      const batch = CONTROLS_DATA.slice(i, i + batchSize);
      
      const controlsToInsert = batch.map((control, index) => ({
        control_name: control.title,
        category: control.domain,
        framework: 'EU AI Act (2023)',
        asimov_pillar: mapAsimovPillar(control.controlId),
        risk_level: mapRiskLevel(control.validationScale),
        description: control.specification,
        evidence_requirements: control.evidence,
        regulatory_references: formatRegulatoryRefs(control),
        sort_order: i + index + 1
      }));

      try {
        const { error } = await supabase
          .from('governance_controls')
          .insert(controlsToInsert);

        if (error) {
          failedCount += batch.length;
          errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
        } else {
          successCount += batch.length;
        }
      } catch (err) {
        failedCount += batch.length;
        errors.push(`Batch ${i / batchSize + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      setProgress(Math.round(((i + batch.length) / CONTROLS_DATA.length) * 100));
      setResults({ success: successCount, failed: failedCount, errors });
    }

    setImporting(false);
    
    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} controls`);
    }
    
    if (failedCount > 0) {
      toast.error(`Failed to import ${failedCount} controls`);
    }
  };

  const clearAllControls = async () => {
    if (!confirm('Are you sure you want to delete ALL governance controls? This cannot be undone!')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('governance_controls')
        .delete()
        .neq('id', 0); // Delete all

      if (error) throw error;
      
      toast.success('All controls deleted successfully');
      setResults({ success: 0, failed: 0, errors: [] });
    } catch (err) {
      toast.error(`Failed to clear controls: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Governance Controls Import
          </CardTitle>
          <CardDescription>
            Import 360 EU AI AICM governance controls into the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              This tool will import {CONTROLS_DATA.length} governance controls across 8 domains:
              Data Governance, Risk Management, Model Security, Transparency, Human Oversight, 
              Accuracy, Cybersecurity, and Post-Market Monitoring.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={importControls} 
                disabled={importing}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                {importing ? 'Importing...' : 'Import Controls'}
              </Button>
              
              <Button 
                onClick={clearAllControls} 
                variant="destructive"
                disabled={importing}
              >
                Clear All Controls
              </Button>
            </div>

            {importing && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">{progress}% complete</p>
              </div>
            )}

            {(results.success > 0 || results.failed > 0) && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-semibold">Success: {results.success}</span>
                    </div>
                  </div>
                  
                  {results.failed > 0 && (
                    <div className="flex-1 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <XCircle className="h-5 w-5" />
                        <span className="font-semibold">Failed: {results.failed}</span>
                      </div>
                    </div>
                  )}
                </div>

                {results.errors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="font-semibold">Errors:</p>
                        {results.errors.map((error, index) => (
                          <p key={index} className="text-sm">{error}</p>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>Note:</strong> Before importing, make sure you have the complete dataset 
              in CONTROLS_DATA array. Currently showing {CONTROLS_DATA.length} controls.
              To use this tool, paste all 360 controls from the Excel file into the CONTROLS_DATA constant.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControlsImport;
