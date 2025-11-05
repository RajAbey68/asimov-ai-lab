import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, FileText, Calendar, CheckCircle2, Clock } from "lucide-react";

interface AuditSession {
  id: string;
  session_name: string;
  framework_filter: string;
  status: string;
  created_at: string;
  sector_id: number | null;
  region_id: number | null;
}

interface Sector {
  id: number;
  name: string;
  description: string;
}

interface Region {
  id: number;
  name: string;
  code: string;
}

const AssessmentDashboard = () => {
  const [sessions, setSessions] = useState<AuditSession[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingSession, setCreatingSession] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    fetchSectorsAndRegions();
  }, []);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from("audit_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading sessions",
        description: error.message,
      });
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  };

  const fetchSectorsAndRegions = async () => {
    const [sectorsRes, regionsRes] = await Promise.all([
      supabase.from("sectors").select("*").order("name"),
      supabase.from("regions").select("*").order("name"),
    ]);

    if (sectorsRes.data) setSectors(sectorsRes.data);
    if (regionsRes.data) setRegions(regionsRes.data);
  };

  const createNewSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingSession(true);

    const formData = new FormData(e.currentTarget);
    const session_name = formData.get("session_name") as string;
    const sector_id = formData.get("sector") as string;
    const region_id = formData.get("region") as string;
    const risk_level_filter = formData.get("risk_level") as string;

    const { data, error } = await supabase
      .from("audit_sessions")
      .insert({
        user_id: user?.id,
        session_name,
        framework_filter: "EU AI Act (2023)",
        sector_id: sector_id ? parseInt(sector_id) : null,
        region_id: region_id ? parseInt(region_id) : null,
        risk_level_filter: risk_level_filter || null,
        status: "in_progress",
      })
      .select()
      .single();

    setCreatingSession(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error creating session",
        description: error.message,
      });
    } else {
      toast({
        title: "Assessment session created",
        description: "Starting your EU AI Act compliance audit...",
      });
      navigate(`/assessment/${data.id}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Completed</span>
          </div>
        );
      case "in_progress":
        return (
          <div className="flex items-center gap-1 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">In Progress</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Governance Assessments</h1>
            <p className="text-muted-foreground">Manage your EU AI Act compliance audits</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Assessment
              </CardTitle>
              <CardDescription>
                Start a new EU AI Act compliance audit session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createNewSession} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session_name">Assessment Name</Label>
                  <Input
                    id="session_name"
                    name="session_name"
                    placeholder="Q4 2025 AI Compliance Audit"
                    required
                    disabled={creatingSession}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select name="sector" disabled={creatingSession}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.id} value={sector.id.toString()}>
                          {sector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select name="region" disabled={creatingSession}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id.toString()}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk_level">Risk Level</Label>
                  <Select name="risk_level" disabled={creatingSession}>
                    <SelectTrigger>
                      <SelectValue placeholder="All risk levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High Risk">High Risk Only</SelectItem>
                      <SelectItem value="General Risk">General Risk Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={creatingSession}>
                  {creatingSession ? "Creating..." : "Start Assessment"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Features</CardTitle>
              <CardDescription>What you get with ASIMOV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">127 EU AI Act Controls</p>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive coverage of EU AI Act requirements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Evidence Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Upload files, add URLs, and document compliance evidence
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">AI-Powered Insights</p>
                  <p className="text-sm text-muted-foreground">
                    Get Life-Wise regulatory guidance for each control
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Your Assessment Sessions</h2>
          
          {sessions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No assessment sessions yet. Create one to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => navigate(`/assessment/${session.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{session.session_name}</CardTitle>
                      {getStatusBadge(session.status)}
                    </div>
                    <CardDescription>
                      {session.framework_filter}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
