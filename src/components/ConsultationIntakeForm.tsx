import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const consultationIntakeSchema = z.object({
  // Identity
  full_name: z.string().trim().min(1, "Full name is required").max(100),
  organisation: z.string().trim().min(1, "Organisation is required").max(200),
  role: z.string().trim().min(1, "Role is required").max(100),
  country: z.string().min(1, "Country is required"),
  email: z.string().trim().email("Invalid email address").max(255),
  contact_number: z.string().trim().max(50).optional(),
  
  // Consultation
  session_type: z.string().min(1, "Session type is required"),
  session_objective: z.string().trim().min(1, "Session objective is required").max(500),
  ai_category: z.string().min(1, "AI category is required"),
  sector: z.string().min(1, "Sector is required"),
  framework_alignment: z.array(z.string()).optional(),
  risk_domain: z.string().optional(),
  maturity_level: z.string().optional(),
  participant_role: z.string().optional(),
  meeting_mode: z.string().optional(),
  
  // Optional Info
  use_case_description: z.string().trim().max(2000).optional(),
  datasets_involved: z.string().trim().max(1000).optional(),
  preferred_regulator: z.string().optional(),
  expected_outcome: z.array(z.string()).optional(),
  referral_source: z.string().optional(),
  future_interest: z.array(z.string()).optional(),
  preferred_schedule: z.string().optional(),
  
  // Invoice Details
  invoice_company_name: z.string().trim().max(200).optional(),
  invoice_vat_number: z.string().trim().max(50).optional(),
  invoice_billing_contact: z.string().trim().max(100).optional(),
  
  // Consent
  data_consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing",
  }),
  non_legal_ack: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this is not legal advice",
  }),
});

type ConsultationIntakeFormData = z.infer<typeof consultationIntakeSchema>;

interface ConsultationIntakeFormProps {
  onSuccess?: () => void;
  chatSessionId?: string;
}

export const ConsultationIntakeForm = ({ onSuccess, chatSessionId }: ConsultationIntakeFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ConsultationIntakeFormData>({
    resolver: zodResolver(consultationIntakeSchema),
    defaultValues: {
      framework_alignment: [],
      expected_outcome: [],
      future_interest: [],
      data_consent: false,
      non_legal_ack: false,
    },
  });

  const onSubmit = async (data: ConsultationIntakeFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("consultation_intake").insert({
        full_name: data.full_name,
        organisation: data.organisation,
        role: data.role,
        country: data.country,
        email: data.email,
        contact_number: data.contact_number,
        session_type: data.session_type,
        session_objective: data.session_objective,
        ai_category: data.ai_category,
        sector: data.sector,
        framework_alignment: data.framework_alignment,
        risk_domain: data.risk_domain,
        maturity_level: data.maturity_level,
        participant_role: data.participant_role,
        meeting_mode: data.meeting_mode,
        use_case_description: data.use_case_description,
        datasets_involved: data.datasets_involved,
        preferred_regulator: data.preferred_regulator,
        expected_outcome: data.expected_outcome,
        referral_source: data.referral_source,
        future_interest: data.future_interest,
        preferred_schedule: data.preferred_schedule,
        invoice_company_name: data.invoice_company_name,
        invoice_vat_number: data.invoice_vat_number,
        invoice_billing_contact: data.invoice_billing_contact,
        data_consent: data.data_consent,
        non_legal_ack: data.non_legal_ack,
        chat_session_id: chatSessionId || null,
      });

      if (error) throw error;

      // Send email notifications
      try {
        await supabase.functions.invoke("send-consultation-notification", {
          body: {
            full_name: data.full_name,
            email: data.email,
            organisation: data.organisation,
            role: data.role,
            country: data.country,
            contact_number: data.contact_number,
            session_type: data.session_type,
            session_objective: data.session_objective,
            ai_category: data.ai_category,
            sector: data.sector,
            use_case_description: data.use_case_description,
            framework_alignment: data.framework_alignment,
            risk_domain: data.risk_domain,
            maturity_level: data.maturity_level,
            participant_role: data.participant_role,
            meeting_mode: data.meeting_mode,
            datasets_involved: data.datasets_involved,
            preferred_regulator: data.preferred_regulator,
            expected_outcome: data.expected_outcome,
            referral_source: data.referral_source,
            preferred_schedule: data.preferred_schedule,
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't fail the whole submission if email fails
      }

      toast({
        title: "Consultation request submitted",
        description: "We'll be in touch shortly to schedule your session.",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Failed to submit consultation request",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Identity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>Basic contact and organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organisation / Company *</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role / Job Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief Compliance Officer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country / Jurisdiction *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["UK", "France", "Germany", "Italy", "Spain", "Netherlands", "Belgium", "Sweden", "Poland", "Ireland", "United States", "Other"].map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number (WhatsApp optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+44 7700 900000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Consultation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
            <CardDescription>What you'd like to discuss</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="session_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Engagement *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select engagement type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["AI Risk Brief", "Legal Interpretation", "Governance Framework", "Product Compliance", "AI Readiness Review", "Custom Topic"].map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="session_objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Objective (one sentence) *</FormLabel>
                  <FormControl>
                    <Input placeholder="Understand EU AI Act compliance requirements for our chatbot" {...field} />
                  </FormControl>
                  <FormDescription>Describe what you want to achieve in this consultation</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ai_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI System Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["High-Risk (Annex III)", "General Purpose AI (GPAI)", "Limited Risk (Transparency Obligations)", "Minimal Risk (Unregulated)"].map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector / Industry *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["Finance", "Healthcare", "Public Sector", "Education", "Defence", "Telecom", "Manufacturing", "Retail", "Start-up / SME", "Other"].map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="risk_domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Risk Focus</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk domain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["Legal", "Regulatory", "Ethical", "IP", "Operational", "Security", "Bias & Fairness", "Conformity Assessment"].map((domain) => (
                        <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maturity_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Maturity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maturity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["Early Exploration", "Pilot Stage", "Partial Deployment", "Enterprise-wide Use"].map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participant_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participant Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["Legal", "Compliance", "Product", "Technology", "Executive", "Policy", "Academia"].map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meeting_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Meeting Mode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meeting mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["Online (Zoom/Teams)", "In-person (London/EU)", "Confidential Call"].map((mode) => (
                        <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Optional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information (Optional)</CardTitle>
            <CardDescription>Help us prepare for your consultation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="use_case_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Use-Case Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Briefly describe the AI system or area you wish to discuss"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datasets_involved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datasets Involved</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal data, synthetic data, public datasets, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_regulator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Regulator / Standard</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regulator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["ENISA", "ICO (UK)", "CNIL (France)", "NIST", "ISO", "Other"].map((regulator) => (
                        <SelectItem key={regulator} value={regulator}>{regulator}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referral_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about Asimov-AI?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50">
                      {["LinkedIn", "ISACA", "Partner", "Website", "Event", "Referral", "Other"].map((source) => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Consultation Timeslot</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice / Billing Information (Optional)</CardTitle>
            <CardDescription>For invoicing purposes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="invoice_company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoice_vat_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT Number</FormLabel>
                  <FormControl>
                    <Input placeholder="GB123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoice_billing_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Consent */}
        <Card>
          <CardHeader>
            <CardTitle>Consent & Acknowledgement</CardTitle>
            <CardDescription>Required to proceed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="data_consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to Asimov-AI processing my information under its Privacy Policy. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="non_legal_ack"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I understand this consultation does not constitute legal advice. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Consultation Request
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};