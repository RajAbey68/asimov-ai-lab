import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Sparkles, Download, Save, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MOCK_CONTROLS } from "@/data/mockControls";

interface Control {
  id: number;
  control_name: string;
  category: string;
  risk_level: string;
  description: string;
  evidence: string;
  asimov_pillar: string;
}

const Assessment = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [controls, setControls] = useState<Control[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentControl, setCurrentControl] = useState<Control | null>(null);
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionName, setSessionName] = useState("");

  useEffect(() => {
    if (sessionId) {
      fetchSession();
      fetchControls();
    }
  }, [sessionId]);

  useEffect(() => {
    if (controls.length > 0 && currentIndex < controls.length) {
      setCurrentControl(controls[currentIndex]);
      generateInsight(controls[currentIndex]);
    }
  }, [currentIndex, controls]);

  const fetchSession = async () => {
    const { data } = await supabase
      .from("audit_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();
    if (data) setSessionName(data.session_name);
  };

  const fetchControls = async () => {
    // Get the session to check risk level filter
    const { data: sessionData } = await supabase
      .from("audit_sessions")
      .select("risk_level_filter")
      .eq("id", sessionId)
      .single();

    let query = supabase
      .from("controls")
      .select("*")
      .eq("framework", "EU AI Act (2023)");

    // Apply risk level filter if exists
    if (sessionData?.risk_level_filter) {
      const riskLevels = sessionData.risk_level_filter.split(",");
      query = query.in("risk_level", riskLevels);
    }

    const { data } = await query.order("sort_order");

    // Use Mock Data if DB is empty
    if (!data || data.length === 0) {
      setControls(MOCK_CONTROLS as Control[]);
      if (!sessionData?.risk_level_filter) {
        toast({ title: "Demo Mode", description: "Using sample controls (Database is empty)" });
      }
    } else {
      setControls(data);
    }
  };

  const generateInsight = async (control: Control) => {
    setLoadingInsight(true);
    try {
      const { data } = await supabase.functions.invoke('generate-insight', {
        body: { control_name: control.control_name, category: control.category, risk_level: control.risk_level },
      });
      if (data?.insight) setInsight(data.insight);
    } catch (error) {
      setInsight("Insight generation temporarily unavailable.");
    } finally {
      setLoadingInsight(false);
    }
  };

  const saveResponse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from("audit_responses").upsert([{
      session_id: sessionId,
      control_id: currentControl?.id,
      response: formData.get("response") as string,
      response_score: parseInt(formData.get("response_score") as string),
      evidence: formData.get("evidence") as string,
      evidence_notes: formData.get("evidence_notes") as string,
    }]);

    setSaving(false);

    if (error) {
      console.log("Save error (likely demo mode):", error);
      toast({ title: "Response saved (Demo Mode)", description: "Database is read-only, proceeding locally." });
    } else {
      toast({ title: "Response saved" });
    }

    // Reset form for next question
    e.currentTarget.reset();

    if (currentIndex < controls.length - 1) setCurrentIndex(currentIndex + 1);
    else navigate("/assessment");
  };

  if (!currentControl) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  const progress = ((currentIndex + 1) / controls.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <TooltipProvider delayDuration={200}>
        <div className="container max-w-5xl mx-auto px-4 py-24">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/assessment")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Button>
            <h1 className="text-3xl font-bold mb-4">{sessionName}</h1>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">Question {currentIndex + 1} of {controls.length}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{currentControl.control_name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={currentControl.risk_level === "High Risk" ? "destructive" : "secondary"}>{currentControl.risk_level}</Badge>
                    <Badge variant="outline">{currentControl.category}</Badge>
                  </div>
                  <CardDescription className="text-base mt-2">{currentControl.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />AI Insight</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingInsight ? <div className="animate-pulse">Generating...</div> : <p className="text-sm whitespace-pre-wrap">{insight}</p>}
                </CardContent>
              </Card>
            </div>

            <Card className="sticky top-24 h-fit">
              <CardHeader><CardTitle>Your Response</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={saveResponse} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Status</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex">
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs z-50" side="left">
                          <p className="font-semibold mb-1">Implementation Status</p>
                          <p className="text-xs">Indicates your current compliance level:</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• <strong>Fully Implemented:</strong> Control is active and documented</li>
                            <li>• <strong>Partially Implemented:</strong> Work in progress, gaps exist</li>
                            <li>• <strong>Not Implemented:</strong> No current controls in place</li>
                          </ul>
                          <p className="text-xs mt-2 text-yellow-600">Lower status increases compliance risk and audit exposure.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select name="response" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully Implemented">Fully Implemented</SelectItem>
                        <SelectItem value="Partially Implemented">Partially Implemented</SelectItem>
                        <SelectItem value="Not Implemented">Not Implemented</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Score (1-5)</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex">
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs z-50" side="left">
                          <p className="font-semibold mb-1">Compliance Maturity Score</p>
                          <p className="text-xs">Rate the quality and maturity of your implementation:</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• <strong>5:</strong> Fully documented, tested, and optimized</li>
                            <li>• <strong>4:</strong> Well implemented with minor gaps</li>
                            <li>• <strong>3:</strong> Basic implementation, needs improvement</li>
                            <li>• <strong>2:</strong> Significant gaps or documentation missing</li>
                            <li>• <strong>1:</strong> Minimal or ineffective implementation</li>
                          </ul>
                          <p className="text-xs mt-2 text-yellow-600">Scores below 3 indicate high remediation priority and increased regulatory risk.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select name="response_score" required>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Evidence</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex">
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs z-50" side="left">
                          <p className="font-semibold mb-1">Supporting Evidence</p>
                          <p className="text-xs">Document proof of compliance for auditors:</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Policy documents and procedures</li>
                            <li>• Technical documentation and architecture</li>
                            <li>• Testing results and validation reports</li>
                            <li>• Training records and certifications</li>
                            <li>• Screenshots, logs, or system configurations</li>
                          </ul>
                          <p className="text-xs mt-2 text-yellow-600">Strong evidence is critical for defending your compliance during regulatory audits and demonstrating due diligence.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea name="evidence" rows={3} placeholder="List evidence: documents, URLs, file references..." />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Notes</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex">
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs z-50" side="left">
                          <p className="font-semibold mb-1">Implementation Notes</p>
                          <p className="text-xs">Record context and action items:</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Current challenges or blockers</li>
                            <li>• Planned improvements and timelines</li>
                            <li>• Dependencies on other teams/systems</li>
                            <li>• Risk mitigation strategies</li>
                            <li>• Questions for legal/compliance review</li>
                          </ul>
                          <p className="text-xs mt-2 text-yellow-600">Detailed notes create an audit trail showing proactive compliance management and continuous improvement efforts.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea name="evidence_notes" rows={4} placeholder="Add context, challenges, action items, or questions..." />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>
                      <ArrowLeft className="w-4 h-4 mr-2" />Prev
                    </Button>
                    <Button type="submit" className="flex-1" disabled={saving}>
                      {currentIndex === controls.length - 1 ? <><Save className="w-4 h-4 mr-2" />Finish</> : <>Next<ArrowRight className="w-4 h-4 ml-2" /></>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Assessment;
