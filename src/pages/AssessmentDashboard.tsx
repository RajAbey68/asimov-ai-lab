import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, FileText, Calendar, CheckCircle2, Clock, TrendingUp, Shield, AlertTriangle, Activity, BarChart3, PieChart, Target, Zap } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, PieChart as RechartPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AuditSession {
  id: string;
  session_name: string;
  framework_filter: string;
  status: string;
  created_at: string;
  sector_id: number | null;
  region_id: number | null;
  completed_at: string | null;
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

interface SessionStats {
  sessionId: string;
  sessionName: string;
  totalControls: number;
  answeredControls: number;
  averageScore: number;
  highRiskControls: number;
  highRiskAnswered: number;
}

interface AnalyticsSummary {
  totalSessions: number;
  completedSessions: number;
  inProgressSessions: number;
  totalResponses: number;
  averageComplianceScore: number;
  highRiskIssues: number;
}

const AssessmentDashboard = () => {
  const [sessions, setSessions] = useState<AuditSession[]>([]);
  const [sessionStats, setSessionStats] = useState<SessionStats[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    totalSessions: 0,
    completedSessions: 0,
    inProgressSessions: 0,
    totalResponses: 0,
    averageComplianceScore: 0,
    highRiskIssues: 0
  });
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
    fetchAnalytics();
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
      if (data) {
        fetchSessionStats(data.map(s => s.id));
      }
    }
    setLoading(false);
  };

  const fetchSessionStats = async (sessionIds: string[]) => {
    const statsPromises = sessionIds.map(async (sessionId) => {
      const session = sessions.find(s => s.id === sessionId);
      
      // Get total controls count
      const { count: totalControls } = await supabase
        .from("controls")
        .select("*", { count: "exact", head: true })
        .eq("framework", "EU AI Act (2023)");

      // Get responses for this session
      const { data: responses } = await supabase
        .from("audit_responses")
        .select("response_score")
        .eq("session_id", sessionId);

      // Get high risk controls
      const { count: highRiskControls } = await supabase
        .from("controls")
        .select("*", { count: "exact", head: true })
        .eq("framework", "EU AI Act (2023)")
        .eq("risk_level", "High Risk");

      const answeredControls = responses?.length || 0;
      const averageScore = responses && responses.length > 0
        ? responses.reduce((sum, r) => sum + (r.response_score || 0), 0) / responses.length
        : 0;

      return {
        sessionId,
        sessionName: session?.session_name || "",
        totalControls: totalControls || 0,
        answeredControls,
        averageScore,
        highRiskControls: highRiskControls || 0,
        highRiskAnswered: 0
      };
    });

    const stats = await Promise.all(statsPromises);
    setSessionStats(stats);
  };

  const fetchAnalytics = async () => {
    // Get session counts
    const { data: allSessions } = await supabase
      .from("audit_sessions")
      .select("status");

    const totalSessions = allSessions?.length || 0;
    const completedSessions = allSessions?.filter(s => s.status === "completed").length || 0;
    const inProgressSessions = allSessions?.filter(s => s.status === "in_progress").length || 0;

    // Get all responses with scores
    const { data: allResponses } = await supabase
      .from("audit_responses")
      .select("response_score");

    const totalResponses = allResponses?.length || 0;
    const averageComplianceScore = allResponses && allResponses.length > 0
      ? allResponses.reduce((sum, r) => sum + (r.response_score || 0), 0) / allResponses.length
      : 0;

    // Count high risk issues (scores below 3)
    const highRiskIssues = allResponses?.filter(r => (r.response_score || 0) < 3).length || 0;

    setAnalytics({
      totalSessions,
      completedSessions,
      inProgressSessions,
      totalResponses,
      averageComplianceScore: Math.round(averageComplianceScore * 10) / 10,
      highRiskIssues
    });
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
            <h1 className="text-4xl font-bold mb-2">AI Governance Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your EU AI Act compliance audits</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <FileText className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="w-4 h-4 mr-2" />
              New
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Analytics */}
          <TabsContent value="overview" className="space-y-6">
            {/* Hero Analytics - Visual Infographic Style */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Compliance Score Radial Chart */}
              <Card className="lg:col-span-1 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-center">Compliance Score</CardTitle>
                  <CardDescription className="text-center">Overall compliance rating</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pb-6">
                  <ChartContainer
                    config={{
                      score: {
                        label: "Score",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[200px] w-full"
                  >
                    <RadialBarChart
                      width={200}
                      height={200}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      data={[{
                        name: "Compliance",
                        value: (analytics.averageComplianceScore / 5) * 100,
                        fill: "hsl(var(--accent))",
                      }]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="text-center mt-4">
                    <div className="text-4xl font-bold">{analytics.averageComplianceScore.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">out of 5.0</div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Distribution Pie Chart */}
              <Card className="lg:col-span-1 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-center">Session Status</CardTitle>
                  <CardDescription className="text-center">Distribution overview</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pb-6">
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed",
                        color: "hsl(142 76% 36%)",
                      },
                      inProgress: {
                        label: "In Progress",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[200px] w-full"
                  >
                    <RechartPie width={200} height={200}>
                      <Pie
                        data={[
                          { name: "Completed", value: analytics.completedSessions, fill: "hsl(142 76% 36%)" },
                          { name: "In Progress", value: analytics.inProgressSessions, fill: "hsl(var(--accent))" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        dataKey="value"
                      >
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RechartPie>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{analytics.completedSessions}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: "hsl(var(--accent))" }}>{analytics.inProgressSessions}</div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="lg:col-span-1 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-center">Key Metrics</CardTitle>
                  <CardDescription className="text-center">At a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <Activity className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                        <p className="text-2xl font-bold">{analytics.totalSessions}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <Target className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Responses</p>
                        <p className="text-2xl font-bold">{analytics.totalResponses}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/20 rounded-full">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">High Risk Issues</p>
                        <p className="text-2xl font-bold text-destructive">{analytics.highRiskIssues}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Progress Visualization */}
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Session Progress Overview
                </CardTitle>
                <CardDescription>
                  Visual progress tracking across all assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessionStats.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <FileText className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      No active sessions. Create one to start tracking progress.
                    </p>
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      progress: {
                        label: "Progress",
                        color: "hsl(var(--accent))",
                      },
                      score: {
                        label: "Score",
                        color: "hsl(142 76% 36%)",
                      },
                    }}
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sessionStats.map(stat => ({
                        name: stat.sessionName.length > 20 
                          ? stat.sessionName.substring(0, 20) + '...' 
                          : stat.sessionName,
                        progress: Math.round((stat.answeredControls / stat.totalControls) * 100),
                        score: stat.averageScore,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="progress" 
                          fill="hsl(var(--accent))" 
                          radius={[8, 8, 0, 0]}
                          name="Progress %"
                        />
                        <Bar 
                          dataKey="score" 
                          fill="hsl(142 76% 36%)" 
                          radius={[8, 8, 0, 0]}
                          name="Avg Score"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4"
                  onClick={() => navigate("/controls")}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">View All Controls</p>
                    <p className="text-xs text-muted-foreground">Browse 251 AI controls</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4"
                  onClick={() => {
                    const tabs = document.querySelector('[value="create"]') as HTMLElement;
                    tabs?.click();
                  }}
                >
                  <Plus className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">New Assessment</p>
                    <p className="text-xs text-muted-foreground">Start compliance audit</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4"
                  onClick={() => navigate("/framework")}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Framework Info</p>
                    <p className="text-xs text-muted-foreground">Learn about EU AI Act</p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
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
                  {sessions.map((session) => {
                    const stat = sessionStats.find(s => s.sessionId === session.id);
                    const progress = stat 
                      ? (stat.answeredControls / stat.totalControls) * 100 
                      : 0;
                    
                    return (
                      <Card
                        key={session.id}
                        className="cursor-pointer hover:border-primary/50 transition-colors group"
                        onClick={() => navigate(`/assessment/${session.id}`)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {session.session_name}
                            </CardTitle>
                            {getStatusBadge(session.status)}
                          </div>
                          <CardDescription>
                            {session.framework_filter}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          {stat && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Compliance Score</span>
                              <Badge variant="outline">
                                {stat.averageScore.toFixed(1)}/5
                              </Badge>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(session.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Create New Session Tab */}
          <TabsContent value="create">
            <div className="grid md:grid-cols-2 gap-8">
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
                      <p className="font-medium">251 AI Governance Controls</p>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive coverage across EU AI Act, NIST AI RMF, ISO/IEC, GDPR, and SCF frameworks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Evidence Management</p>
                      <p className="text-sm text-muted-foreground">
                        Upload files, add URLs, and document compliance evidence with AI quality assessment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">AI-Powered Life-Wise Insights</p>
                      <p className="text-sm text-muted-foreground">
                        Get sector-specific regulatory guidance with authentic references from trusted authorities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Risk Assessment & Analytics</p>
                      <p className="text-sm text-muted-foreground">
                        Visual dashboards, risk heatmaps, and ASIMOV Pillars tracking for compliance monitoring
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
