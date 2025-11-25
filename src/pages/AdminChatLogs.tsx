import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  assistant_response: string;
  guardrail_triggered: boolean;
  guardrail_type: string | null;
  redirect_reason: string | null;
  response_time_ms: number | null;
  model_used: string;
  created_at: string;
}

const AdminChatLogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<ChatLog | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [guardrailFilter, setGuardrailFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    checkAdminAndFetchLogs();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [logs, searchTerm, guardrailFilter, dateFilter]);

  const checkAdminAndFetchLogs = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    await fetchLogs();
  };

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load chat logs",
        variant: "destructive",
      });
    } else {
      setLogs(data || []);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.user_message.toLowerCase().includes(term) ||
          log.assistant_response.toLowerCase().includes(term) ||
          log.session_id.toLowerCase().includes(term)
      );
    }

    // Guardrail filter
    if (guardrailFilter === "triggered") {
      filtered = filtered.filter((log) => log.guardrail_triggered);
    } else if (guardrailFilter === "not-triggered") {
      filtered = filtered.filter((log) => !log.guardrail_triggered);
    }

    // Date filter
    const now = new Date();
    if (dateFilter === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter((log) => new Date(log.created_at) >= today);
    } else if (dateFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => new Date(log.created_at) >= weekAgo);
    } else if (dateFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => new Date(log.created_at) >= monthAgo);
    }

    setFilteredLogs(filtered);
  };

  const exportToCSV = () => {
    const headers = ["Session ID", "User Message", "Assistant Response", "Guardrail", "Type", "Reason", "Response Time (ms)", "Model", "Created"];
    const rows = filteredLogs.map((log) => [
      log.session_id,
      `"${log.user_message.replace(/"/g, '""')}"`,
      `"${log.assistant_response.substring(0, 100).replace(/"/g, '""')}..."`,
      log.guardrail_triggered ? "Yes" : "No",
      log.guardrail_type || "",
      log.redirect_reason || "",
      log.response_time_ms || "",
      log.model_used,
      new Date(log.created_at).toISOString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simo-chat-logs-${new Date().toISOString()}.csv`;
    a.click();
  };

  const getGuardrailBadge = (triggered: boolean, type: string | null) => {
    if (!triggered) {
      return <Badge variant="secondary" className="flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Normal
      </Badge>;
    }
    return <Badge variant="destructive" className="flex items-center gap-1">
      <AlertTriangle className="w-3 h-3" />
      {type || "Triggered"}
    </Badge>;
  };

  const totalGuardrails = logs.filter(l => l.guardrail_triggered).length;
  const avgResponseTime = logs.length > 0 
    ? Math.round(logs.filter(l => l.response_time_ms).reduce((sum, l) => sum + (l.response_time_ms || 0), 0) / logs.filter(l => l.response_time_ms).length)
    : 0;

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
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/consultations")} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-bold">SIMO Chat Logs</h1>
            <p className="text-muted-foreground">Monitor AI assistant conversations and guardrail triggers</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/analytics")} variant="outline">
              View Analytics
            </Button>
            <Button onClick={fetchLogs} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
              <p className="text-xs text-muted-foreground">Last 500 conversations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Guardrails Triggered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{totalGuardrails}</div>
              <p className="text-xs text-muted-foreground">
                {logs.length > 0 ? ((totalGuardrails / logs.length) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgResponseTime}ms</div>
              <p className="text-xs text-muted-foreground">Across all interactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(logs.map(l => l.session_id)).size}
              </div>
              <p className="text-xs text-muted-foreground">Distinct conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={guardrailFilter} onValueChange={setGuardrailFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by guardrail" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interactions</SelectItem>
                  <SelectItem value="triggered">Guardrails Triggered</SelectItem>
                  <SelectItem value="not-triggered">Normal Flow</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>User Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No chat logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.session_id.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {log.user_message}
                      </TableCell>
                      <TableCell>
                        {getGuardrailBadge(log.guardrail_triggered, log.guardrail_type)}
                      </TableCell>
                      <TableCell>
                        {log.response_time_ms ? `${log.response_time_ms}ms` : "-"}
                      </TableCell>
                      <TableCell className="text-xs">{log.model_used}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLog(log);
                            setDetailsOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Chat Interaction Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <ScrollArea className="max-h-[calc(90vh-8rem)]">
              <div className="space-y-6">
                {/* Metadata */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Session ID</label>
                      <p className="font-mono text-sm">{selectedLog.session_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                      <p className="text-sm">{new Date(selectedLog.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Model</label>
                      <p className="text-sm">{selectedLog.model_used}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Response Time</label>
                      <p className="text-sm">{selectedLog.response_time_ms ? `${selectedLog.response_time_ms}ms` : "Not recorded"}</p>
                    </div>
                  </div>
                </div>

                {/* Guardrail Status */}
                {selectedLog.guardrail_triggered && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="w-5 h-5" />
                      Guardrail Triggered
                    </h3>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Type</label>
                        <p className="font-semibold">{selectedLog.guardrail_type || "Unspecified"}</p>
                      </div>
                      {selectedLog.redirect_reason && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Reason</label>
                          <p>{selectedLog.redirect_reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Conversation */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">User Message</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedLog.user_message}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Assistant Response</h3>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedLog.assistant_response}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminChatLogs;
