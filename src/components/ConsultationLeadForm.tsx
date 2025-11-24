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
            <SelectContent className="bg-background z-50">
              <SelectItem value="risk-assessment">
                <div className="space-y-1">
                  <div className="font-medium">AI Risk Assessment</div>
                  <div className="text-xs text-muted-foreground">Comprehensive evaluation to identify vulnerabilities, compliance gaps, and operational risks before deployment.</div>
                </div>
              </SelectItem>
              <SelectItem value="project-delivery">
                <div className="space-y-1">
                  <div className="font-medium">AI Project Delivery</div>
                  <div className="text-xs text-muted-foreground">End-to-end execution from strategy to deployment, ensuring quality, speed, and business alignment.</div>
                </div>
              </SelectItem>
              <SelectItem value="rapid-assessment">
                <div className="space-y-1">
                  <div className="font-medium">Rapid Assessment</div>
                  <div className="text-xs text-muted-foreground">Quick turnaround risk evaluation for time-sensitive projects. Actionable insights in days, not weeks.</div>
                </div>
              </SelectItem>
              <SelectItem value="governance">
                <div className="space-y-1">
                  <div className="font-medium">Governance Framework</div>
                  <div className="text-xs text-muted-foreground">Establish policies, controls, and oversight structures for responsible AI deployment across your organization.</div>
                </div>
              </SelectItem>
              <SelectItem value="compliance">
                <div className="space-y-1">
                  <div className="font-medium">Compliance Audit</div>
                  <div className="text-xs text-muted-foreground">Verify adherence to EU AI Act, ISO standards, and sector regulations with detailed audit reporting.</div>
                </div>
              </SelectItem>
              <SelectItem value="ip-strategy">
                <div className="space-y-1">
                  <div className="font-medium">IP Strategy</div>
                  <div className="text-xs text-muted-foreground">Protect intellectual property in AI models, training data, and outputs. Manage ownership and licensing risks.</div>
                </div>
              </SelectItem>
              <SelectItem value="data-provenance">
                <div className="space-y-1">
                  <div className="font-medium">Data Provenance & IP Protection</div>
                  <div className="text-xs text-muted-foreground">Track data lineage, ensure lawful sourcing, and maintain audit trails for regulatory compliance.</div>
                </div>
              </SelectItem>
              <SelectItem value="expert-consultation">
                <div className="space-y-1">
                  <div className="font-medium">Expert Consultation</div>
                  <div className="text-xs text-muted-foreground">Strategic guidance from seasoned AI professionals throughout your AI governance journey.</div>
                </div>
              </SelectItem>
              <SelectItem value="integration-support">
                <div className="space-y-1">
                  <div className="font-medium">Integration Support</div>
                  <div className="text-xs text-muted-foreground">Seamless integration of AI solutions into existing infrastructure with minimal disruption.</div>
                </div>
              </SelectItem>
              <SelectItem value="continuous-monitoring">
                <div className="space-y-1">
                  <div className="font-medium">Continuous Monitoring</div>
                  <div className="text-xs text-muted-foreground">Ongoing surveillance ensuring sustained performance, security, and compliance over time.</div>
                </div>
              </SelectItem>
              <SelectItem value="implementation-risk">
                <div className="space-y-1">
                  <div className="font-medium">Implementation Risk Management</div>
                  <div className="text-xs text-muted-foreground">Identify and mitigate risks during AI system deployment, rollout, and organizational change.</div>
                </div>
              </SelectItem>
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
