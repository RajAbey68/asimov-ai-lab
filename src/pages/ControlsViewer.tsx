import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, RefreshCw, BookOpen, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface AIControl {
  id: string;
  control_id: string;
  domain: string;
  title: string;
  specification: string;
  control_type: string | null;
  lifecycle_phase: string[] | null;
  role_applicability: string[] | null;
  threat_vector: string | null;
  eu_article: string | null;
  eu_annex: string | null;
  mapping_rationale: string | null;
  nist_ref: string | null;
  cobit_ref: string | null;
  iso_ref: string | null;
  validation_scale: string | null;
  evidence_required: string | null;
}

const validationScaleColors: Record<string, string> = {
  '🔵': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  '🟢': 'bg-green-500/10 text-green-500 border-green-500/20',
  '🟡': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  '🔴': 'bg-red-500/10 text-red-500 border-red-500/20',
};

const validationScaleLabels: Record<string, string> = {
  '🔵': 'General Risk',
  '🟢': 'Low Risk',
  '🟡': 'General Risk',
  '🔴': 'High Risk',
};

const ControlsViewer = () => {
  const [controls, setControls] = useState<AIControl[]>([]);
  const [filteredControls, setFilteredControls] = useState<AIControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>("all");
  const [selectedValidation, setSelectedValidation] = useState<string>("all");
  const [selectedFramework, setSelectedFramework] = useState<string>("all");

  // Extract unique values for filters
  const domains = Array.from(new Set(controls.map(c => c.domain))).sort();
  const lifecyclePhases = Array.from(
    new Set(controls.flatMap(c => c.lifecycle_phase || []))
  ).sort();
  const validationScales = Array.from(
    new Set(controls.map(c => c.validation_scale).filter(Boolean))
  ).sort();

  useEffect(() => {
    fetchControls();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [controls, searchTerm, selectedDomain, selectedLifecycle, selectedValidation, selectedFramework]);

  const fetchControls = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_controls')
        .select('*')
        .order('control_id');

      if (error) throw error;
      setControls(data || []);
      toast.success(`Loaded ${data?.length || 0} controls`);
    } catch (error) {
      console.error('Error fetching controls:', error);
      toast.error('Failed to load controls');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...controls];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.control_id.toLowerCase().includes(term) ||
        c.title?.toLowerCase().includes(term) ||
        c.specification?.toLowerCase().includes(term) ||
        c.domain.toLowerCase().includes(term)
      );
    }

    // Domain filter
    if (selectedDomain !== "all") {
      filtered = filtered.filter(c => c.domain === selectedDomain);
    }

    // Lifecycle filter
    if (selectedLifecycle !== "all") {
      filtered = filtered.filter(c =>
        c.lifecycle_phase?.includes(selectedLifecycle)
      );
    }

    // Validation scale filter
    if (selectedValidation !== "all") {
      filtered = filtered.filter(c => c.validation_scale === selectedValidation);
    }

    // Framework filter
    if (selectedFramework !== "all") {
      switch (selectedFramework) {
        case "eu":
          filtered = filtered.filter(c => c.eu_article || c.eu_annex);
          break;
        case "nist":
          filtered = filtered.filter(c => c.nist_ref);
          break;
        case "cobit":
          filtered = filtered.filter(c => c.cobit_ref);
          break;
        case "iso":
          filtered = filtered.filter(c => c.iso_ref);
          break;
      }
    }

    setFilteredControls(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDomain("all");
    setSelectedLifecycle("all");
    setSelectedValidation("all");
    setSelectedFramework("all");
  };

  const ControlCard = ({ control }: { control: AIControl }) => (
    <Card className="hover:border-accent transition-colors">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-mono text-xs">
                {control.control_id}
              </Badge>
              {control.validation_scale && (
                <Badge 
                  variant="outline" 
                  className={validationScaleColors[control.validation_scale]}
                >
                  {control.validation_scale} {validationScaleLabels[control.validation_scale]}
                </Badge>
              )}
              {control.control_type && (
                <Badge variant="secondary" className="text-xs">
                  {control.control_type}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">
              {control.title || 'Untitled Control'}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm">
          <span className="font-semibold text-foreground">{control.domain}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {control.specification && (
          <div className="space-y-1">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Specification
            </h4>
            <p className="text-sm text-muted-foreground">{control.specification}</p>
          </div>
        )}

        {(control.lifecycle_phase && control.lifecycle_phase.length > 0) && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground">Lifecycle Phases</h4>
            <div className="flex flex-wrap gap-1">
              {control.lifecycle_phase.map((phase, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {phase}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(control.role_applicability && control.role_applicability.length > 0) && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground">Applicable Roles</h4>
            <div className="flex flex-wrap gap-1">
              {control.role_applicability.map((role, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {control.threat_vector && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Threat Vector
            </h4>
            <p className="text-xs text-muted-foreground">{control.threat_vector}</p>
          </div>
        )}

        {(control.eu_article || control.eu_annex || control.nist_ref || control.cobit_ref || control.iso_ref) && (
          <div className="space-y-2 pt-3 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Regulatory Mappings
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {control.eu_article && (
                <div>
                  <span className="font-semibold">EU Article:</span> {control.eu_article}
                </div>
              )}
              {control.eu_annex && (
                <div>
                  <span className="font-semibold">EU Annex:</span> {control.eu_annex}
                </div>
              )}
              {control.nist_ref && (
                <div>
                  <span className="font-semibold">NIST:</span> {control.nist_ref}
                </div>
              )}
              {control.cobit_ref && (
                <div>
                  <span className="font-semibold">COBIT:</span> {control.cobit_ref}
                </div>
              )}
              {control.iso_ref && (
                <div>
                  <span className="font-semibold">ISO:</span> {control.iso_ref}
                </div>
              )}
            </div>
          </div>
        )}

        {control.evidence_required && (
          <div className="space-y-1 pt-3 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground">Evidence Required</h4>
            <p className="text-xs text-muted-foreground">{control.evidence_required}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Controls Viewer</h1>
          <p className="text-muted-foreground mt-1">
            Browse and filter {controls.length} governance controls from EU AI AICM framework
          </p>
        </div>
        <Button onClick={fetchControls} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search controls by ID, title, or specification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger>
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLifecycle} onValueChange={setSelectedLifecycle}>
              <SelectTrigger>
                <SelectValue placeholder="All Lifecycle Phases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lifecycle Phases</SelectItem>
                {lifecyclePhases.map(phase => (
                  <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedValidation} onValueChange={setSelectedValidation}>
              <SelectTrigger>
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                {validationScales.map(scale => (
                  <SelectItem key={scale} value={scale}>
                    {scale} {validationScaleLabels[scale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger>
                <SelectValue placeholder="All Frameworks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                <SelectItem value="eu">EU AI Act</SelectItem>
                <SelectItem value="nist">NIST</SelectItem>
                <SelectItem value="cobit">COBIT</SelectItem>
                <SelectItem value="iso">ISO 42001</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredControls.length} of {controls.length} controls
            </p>
            <Button onClick={resetFilters} variant="ghost" size="sm">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground mt-4">Loading controls...</p>
        </div>
      ) : filteredControls.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No controls found matching your filters.</p>
            <Button onClick={resetFilters} variant="outline" className="mt-4">
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
            {filteredControls.map(control => (
              <ControlCard key={control.id} control={control} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ControlsViewer;
