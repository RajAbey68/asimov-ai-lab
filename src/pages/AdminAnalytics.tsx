import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, Clock, MessageSquare, Users, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  assistant_response: string;
  guardrail_triggered: boolean;
  created_at: string;
}

interface DailyStats {
  date: string;
  conversations: number;
  guardrails: number;
  uniqueSessions: number;
}

interface HourlyStats {
  hour: number;
  count: number;
}

interface TopicData {
  topic: string;
  count: number;
  percentage: number;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");
  
  // Analytics data
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [hourlyStats, setHourlyStats] = useState<HourlyStats[]>([]);
  const [topicStats, setTopicStats] = useState<TopicData[]>([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalConversations, setTotalConversations] = useState(0);
  const [avgSessionLength, setAvgSessionLength] = useState(0);

  useEffect(() => {
    checkAdminAndFetchData();
  }, [user, dateRange]);

  const checkAdminAndFetchData = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    await fetchAnalyticsData();
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    
    const daysAgo = parseInt(dateRange);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Fetch chat logs
    const { data: logsData, error: logsError } = await supabase
      .from("chat_logs")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true });

    if (logsError) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Fetch consultations with chat sessions
    const { data: consultData } = await supabase
      .from("consultation_intake")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .not("chat_session_id", "is", null);

    setLogs(logsData || []);
    setConsultations(consultData || []);
    
    processAnalytics(logsData || [], consultData || []);
    setLoading(false);
  };

  const processAnalytics = (logsData: ChatLog[], consultData: any[]) => {
    // Daily stats
    const dailyMap = new Map<string, { conversations: number; guardrails: number; sessions: Set<string> }>();
    
    logsData.forEach(log => {
      const date = new Date(log.created_at).toLocaleDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { conversations: 0, guardrails: 0, sessions: new Set() });
      }
      const stats = dailyMap.get(date)!;
      stats.conversations++;
      if (log.guardrail_triggered) stats.guardrails++;
      stats.sessions.add(log.session_id);
    });

    const daily = Array.from(dailyMap.entries())
      .map(([date, stats]) => ({
        date,
        conversations: stats.conversations,
        guardrails: stats.guardrails,
        uniqueSessions: stats.sessions.size,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setDailyStats(daily);

    // Hourly stats (aggregate by hour of day)
    const hourlyMap = new Map<number, number>();
    for (let i = 0; i < 24; i++) hourlyMap.set(i, 0);
    
    logsData.forEach(log => {
      const hour = new Date(log.created_at).getHours();
      hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
    });

    const hourly = Array.from(hourlyMap.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour - b.hour);

    setHourlyStats(hourly);

    // Topic analysis (basic keyword extraction)
    const topicMap = new Map<string, number>();
    const topics = [
      'compliance', 'risk', 'audit', 'eu ai act', 'gdpr', 'assessment',
      'high-risk', 'chatbot', 'biometric', 'documentation', 'governance',
      'consultation', 'framework', 'nist', 'iso', 'pricing', 'service'
    ];

    logsData.forEach(log => {
      const message = log.user_message.toLowerCase();
      topics.forEach(topic => {
        if (message.includes(topic)) {
          topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
        }
      });
    });

    const totalTopicMentions = Array.from(topicMap.values()).reduce((sum, count) => sum + count, 0);
    const topicData = Array.from(topicMap.entries())
      .map(([topic, count]) => ({
        topic,
        count,
        percentage: totalTopicMentions > 0 ? (count / totalTopicMentions) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setTopicStats(topicData);

    // Conversion rate
    const uniqueSessions = new Set(logsData.map(l => l.session_id));
    const sessionsWithConsultation = new Set(consultData.map(c => c.chat_session_id));
    const conversions = sessionsWithConsultation.size;
    const rate = uniqueSessions.size > 0 ? (conversions / uniqueSessions.size) * 100 : 0;
    
    setTotalSessions(uniqueSessions.size);
    setTotalConversations(logsData.length);
    setConversionRate(rate);

    // Average session length
    const sessionLengths = new Map<string, number>();
    logsData.forEach(log => {
      sessionLengths.set(log.session_id, (sessionLengths.get(log.session_id) || 0) + 1);
    });
    const avgLength = sessionLengths.size > 0
      ? Array.from(sessionLengths.values()).reduce((sum, len) => sum + len, 0) / sessionLengths.size
      : 0;
    
    setAvgSessionLength(avgLength);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/chat-logs")} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chat Logs
            </Button>
            <h1 className="text-3xl font-bold">SIMO Analytics Dashboard</h1>
            <p className="text-muted-foreground">Usage insights and conversion metrics</p>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="14">Last 14 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Unique Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                {totalSessions > 0 ? (totalConversations / totalSessions).toFixed(1) : 0} messages/session avg
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Total Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversations}</div>
              <p className="text-xs text-muted-foreground">
                {avgSessionLength.toFixed(1)} messages/session avg
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {consultations.length} consultation bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Peak Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hourlyStats.length > 0 
                  ? `${hourlyStats.reduce((max, h) => h.count > max.count ? h : max).hour}:00`
                  : "N/A"
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Most active hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1: Usage Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Usage Trends Over Time
              </CardTitle>
              <CardDescription>Daily conversation volume and unique sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Conversations"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uniqueSessions" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Unique Sessions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="guardrails" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Guardrails"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Peak Usage Hours
              </CardTitle>
              <CardDescription>Conversation volume by hour of day (24h format)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}:00`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip labelFormatter={(hour) => `${hour}:00 - ${hour + 1}:00`} />
                  <Bar dataKey="count" fill="#3b82f6" name="Conversations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2: Topics & Conversion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Popular Topics
              </CardTitle>
              <CardDescription>Most frequently discussed keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topicStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="topic" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" name="Mentions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Conversion Funnel
              </CardTitle>
              <CardDescription>Chat sessions to consultation bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Started Chat</p>
                      <p className="text-sm text-muted-foreground">{totalSessions} sessions</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                </div>

                <div className="h-px bg-border my-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Booked Consultation</p>
                      <p className="text-sm text-muted-foreground">{consultations.length} conversions</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    {conversionRate.toFixed(1)}%
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Conversion Insights</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Drop-off rate:</span>
                      <span className="font-semibold">{(100 - conversionRate).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg session length:</span>
                      <span className="font-semibold">{avgSessionLength.toFixed(1)} messages</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
