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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Download, Eye } from "lucide-react";

interface ConsultationRequest {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  organisation: string;
  role: string;
  country: string;
  sector: string;
  ai_category: string;
  session_type: string;
  session_objective: string;
  use_case_description: string;
  meeting_mode: string;
  participant_role: string;
  maturity_level: string;
  risk_domain: string;
  framework_alignment: string[];
  preferred_regulator: string;
  datasets_involved: string;
  preferred_schedule: string;
  expected_outcome: string[];
  future_interest: string[];
  referral_source: string;
  data_consent: boolean;
  non_legal_ack: boolean;
  invoice_company_name: string;
  invoice_vat_number: string;
  invoice_billing_contact: string;
  notes: string;
  status: string;
  created_at: string;
}

const AdminConsultations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [aiCategoryFilter, setAiCategoryFilter] = useState("all");

  useEffect(() => {
    checkAdminAndFetchRequests();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [requests, searchTerm, statusFilter, sectorFilter, aiCategoryFilter]);

  const checkAdminAndFetchRequests = async () => {
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

    await fetchRequests();
  };

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("consultation_intake")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load consultation requests",
        variant: "destructive",
      });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...requests];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.full_name.toLowerCase().includes(term) ||
          req.email.toLowerCase().includes(term) ||
          req.organisation.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    // Sector filter
    if (sectorFilter !== "all") {
      filtered = filtered.filter((req) => req.sector === sectorFilter);
    }

    // AI Category filter
    if (aiCategoryFilter !== "all") {
      filtered = filtered.filter((req) => req.ai_category === aiCategoryFilter);
    }

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("consultation_intake")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
      fetchRequests();
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from("consultation_intake")
      .update({ notes })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update notes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Notes updated successfully",
      });
      fetchRequests();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      scheduled: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Organisation", "Sector", "AI Category", "Status", "Created"];
    const rows = filteredRequests.map((req) => [
      req.full_name,
      req.email,
      req.organisation,
      req.sector,
      req.ai_category,
      req.status,
      new Date(req.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consultation-requests-${new Date().toISOString()}.csv`;
    a.click();
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Consultation Requests</h1>
            <p className="text-muted-foreground">Manage and track consultation requests</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/chat-logs")} variant="outline">
              View Chat Logs
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
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "scheduled").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "completed").length}
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, org..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="financial-services">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={aiCategoryFilter} onValueChange={setAiCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by AI category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="high-risk">High-Risk</SelectItem>
                  <SelectItem value="limited-risk">Limited-Risk</SelectItem>
                  <SelectItem value="minimal-risk">Minimal-Risk</SelectItem>
                  <SelectItem value="unacceptable-risk">Unacceptable-Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>AI Category</TableHead>
                  <TableHead>Session Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No consultation requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.full_name}</TableCell>
                      <TableCell>{request.organisation}</TableCell>
                      <TableCell>{request.sector}</TableCell>
                      <TableCell>{request.ai_category}</TableCell>
                      <TableCell>{request.session_type}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consultation Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p>{selectedRequest.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                    <p>{selectedRequest.contact_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Organisation</label>
                    <p>{selectedRequest.organisation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <p>{selectedRequest.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Country</label>
                    <p>{selectedRequest.country}</p>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Session Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sector</label>
                    <p>{selectedRequest.sector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">AI Category</label>
                    <p>{selectedRequest.ai_category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Session Type</label>
                    <p>{selectedRequest.session_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Meeting Mode</label>
                    <p>{selectedRequest.meeting_mode}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Session Objective</label>
                    <p>{selectedRequest.session_objective}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Use Case Description</label>
                    <p>{selectedRequest.use_case_description}</p>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Status Management</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Status</label>
                    <Select
                      value={selectedRequest.status}
                      onValueChange={(value) => updateStatus(selectedRequest.id, value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Internal Notes</label>
                    <Textarea
                      placeholder="Add internal notes..."
                      value={selectedRequest.notes || ""}
                      onChange={(e) => {
                        setSelectedRequest({ ...selectedRequest, notes: e.target.value });
                      }}
                      className="mt-1"
                      rows={4}
                    />
                    <Button
                      onClick={() => updateNotes(selectedRequest.id, selectedRequest.notes)}
                      className="mt-2"
                      size="sm"
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConsultations;
