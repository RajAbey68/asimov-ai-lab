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
import { ArrowLeft, ArrowRight, Sparkles, Download, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    const { data } = await supabase
      .from("controls")
      .select("*")
      .eq("framework", "EU AI Act (2023)")
      .order("sort_order");
    if (data) setControls(data);
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
    
    await supabase.from("audit_responses").upsert([{
      session_id: sessionId,
      control_id: currentControl?.id,
      response: formData.get("response") as string,
      response_score: parseInt(formData.get("response_score") as string),
      evidence: formData.get("evidence") as string,
      evidence_notes: formData.get("evidence_notes") as string,
    }]);

    setSaving(false);
    toast({ title: "Response saved" });
    if (currentIndex < controls.length - 1) setCurrentIndex(currentIndex + 1);
    else navigate("/assessment");
  };

  if (!currentControl) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  const progress = ((currentIndex + 1) / controls.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
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

          <Card className="sticky top-24">
            <CardHeader><CardTitle>Your Response</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={saveResponse} className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
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
                  <Label>Score (1-5)</Label>
                  <Select name="response_score" required>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[5,4,3,2,1].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Evidence</Label>
                  <Textarea name="evidence" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea name="evidence_notes" rows={4} />
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
    </div>
  );
};

export default Assessment;
