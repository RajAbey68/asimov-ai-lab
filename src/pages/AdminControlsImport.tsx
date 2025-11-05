import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Upload, Database } from "lucide-react";
import { toast } from "sonner";

// Sample controls data structure - replace with actual data from Excel
const CONTROLS_DATA = [
  {
    controlId: "DAT-001",
    domain: "Data Governance & Quality",
    title: "Control 1 for Data Governance & Quality",
    specification: "Ensure that the data governance & quality framework includes policy, testing, and documentation per Art 10 of the EU AI Act.",
    controlType: "Preventive",
    lifecyclePhase: "Design, Development",
    roleApplicability: "Data Scientist, ML Engineer",
    threatVector: "Data quality issues",
    validationScale: "🟢",
    evidenceRequired: "Policy, test records, and QMS documentation required.",
    euArticle: "Art 10",
    euAnnex: "Annex IV §2",
    mappingRationale: "Direct mapping to EU AI Act requirements",
    nistRef: "GV-1",
    cobitRef: "BAI06.02",
    isoRef: "ISO/IEC 27001 §6.1"
  },
  // Add all 360 controls here...
];

// Helper function to parse array fields from string
const parseArrayField = (value: string | undefined): string[] | null => {
  if (!value || value.trim() === '') return null;
  
  // Split by common delimiters and clean up
  const items = value
    .split(/[,;|]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  return items.length > 0 ? items : null;
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
      
      const controlsToInsert = batch.map(control => ({
        control_id: control.controlId,
        domain: control.domain,
        title: control.title,
        specification: control.specification,
        control_type: control.controlType || null,
        lifecycle_phase: parseArrayField(control.lifecyclePhase),
        role_applicability: parseArrayField(control.roleApplicability),
        threat_vector: control.threatVector || null,
        eu_article: control.euArticle || null,
        eu_annex: control.euAnnex || null,
        mapping_rationale: control.mappingRationale || null,
        nist_ref: control.nistRef || null,
        cobit_ref: control.cobitRef || null,
        iso_ref: control.isoRef || null,
        validation_scale: control.validationScale || null,
        evidence_required: control.evidenceRequired || null
      }));

      try {
        const { error } = await supabase
          .from('ai_controls')
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
        .from('ai_controls')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

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
            AI Controls Import
          </CardTitle>
          <CardDescription>
            Import 360 EU AI AICM controls into the ai_controls table
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              This tool will import {CONTROLS_DATA.length} AI controls with full support for:
              lifecycle phases, role applicability, threat vectors, and regulatory mappings 
              (EU AI Act, NIST, COBIT, ISO 42001).
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
              You can generate the full import SQL using the Python script: <code>python scripts/import_ai_controls.py</code>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControlsImport;
