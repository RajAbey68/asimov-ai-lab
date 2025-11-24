import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AsimovChatWidget from "./AsimovChatWidget";

export const ConsultationLeadForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    interest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("consultation_requests")
        .insert({
          name: formData.fullName,
          email: formData.email,
          company: formData.company,
          message: `Primary Interest: ${formData.interest}`,
          contact_method: "email",
          expert_name: "General Inquiry",
          phone: ""
        });

      if (error) throw error;

      toast.success("Consultation request submitted! We'll be in touch soon.");
      setFormData({ fullName: "", email: "", company: "", interest: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-8 text-foreground">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Get Strategic Guidance</h3>
        <p className="text-muted-foreground">Schedule a consultation with our AI governance experts</p>
      </div>
      
      {/* AI Chat Assistant */}
      <div className="mb-6">
        <AsimovChatWidget />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="w-full"
            aria-label="Full Name"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Business Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full"
            aria-label="Business Email"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="w-full"
            aria-label="Company"
          />
        </div>
        <div>
          <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
            <SelectTrigger className="w-full" aria-label="Primary Interest">
              <SelectValue placeholder="Primary Interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="risk-assessment">AI Risk Assessment</SelectItem>
              <SelectItem value="project-delivery">AI Project Delivery</SelectItem>
              <SelectItem value="rapid-assessment">Rapid Assessment</SelectItem>
              <SelectItem value="governance">Governance Framework</SelectItem>
              <SelectItem value="compliance">Compliance Audit</SelectItem>
              <SelectItem value="ip-strategy">IP Strategy</SelectItem>
              <SelectItem value="data-provenance">Data Provenance & IP Protection</SelectItem>
              <SelectItem value="expert-consultation">Expert Consultation</SelectItem>
              <SelectItem value="integration-support">Integration Support</SelectItem>
              <SelectItem value="continuous-monitoring">Continuous Monitoring</SelectItem>
              <SelectItem value="implementation-risk">Implementation Risk Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Schedule Consultation"}
        </Button>
      </form>
    </div>
  );
};
