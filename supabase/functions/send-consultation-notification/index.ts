import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  full_name: string;
  email: string;
  organisation: string;
  role: string;
  country: string;
  contact_number?: string;
  session_type: string;
  session_objective: string;
  ai_category: string;
  sector: string;
  use_case_description?: string;
  framework_alignment?: string[];
  risk_domain?: string;
  maturity_level?: string;
  participant_role?: string;
  meeting_mode?: string;
  datasets_involved?: string;
  preferred_regulator?: string;
  expected_outcome?: string[];
  referral_source?: string;
  preferred_schedule?: string;
}

const sendEmail = async (to: string[], subject: string, html: string) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ASIMOV-AI RISK <noreply@asimov-ai.org>",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationRequest = await req.json();

    console.log("Sending consultation notification email for:", data.email);

    // Send notification to admin
    const adminEmailResult = await sendEmail(
      ["Rajiv@ASIMOV-AI.ORG"],
      `New Consultation Request from ${data.full_name} - ${data.session_type}`,
      `
        <h2 style="color: #2563eb;">New Consultation Request</h2>
        
        <h3>Contact Information</h3>
        <ul>
          <li><strong>Name:</strong> ${data.full_name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Organisation:</strong> ${data.organisation}</li>
          <li><strong>Role:</strong> ${data.role}</li>
          <li><strong>Country:</strong> ${data.country}</li>
          ${data.contact_number ? `<li><strong>Contact Number:</strong> ${data.contact_number}</li>` : ''}
          ${data.participant_role ? `<li><strong>Participant Role:</strong> ${data.participant_role}</li>` : ''}
        </ul>
        
        <h3>Consultation Details</h3>
        <ul>
          <li><strong>Session Type:</strong> ${data.session_type}</li>
          <li><strong>Objective:</strong> ${data.session_objective}</li>
          <li><strong>AI Category:</strong> ${data.ai_category}</li>
          <li><strong>Sector:</strong> ${data.sector}</li>
          ${data.risk_domain ? `<li><strong>Risk Focus:</strong> ${data.risk_domain}</li>` : ''}
          ${data.maturity_level ? `<li><strong>Maturity Level:</strong> ${data.maturity_level}</li>` : ''}
          ${data.meeting_mode ? `<li><strong>Meeting Mode:</strong> ${data.meeting_mode}</li>` : ''}
        </ul>
        
        ${data.framework_alignment && data.framework_alignment.length > 0 ? `
          <h3>Framework Alignment</h3>
          <ul>
            ${data.framework_alignment.map(f => `<li>${f}</li>`).join('')}
          </ul>
        ` : ''}
        
        ${data.expected_outcome && data.expected_outcome.length > 0 ? `
          <h3>Expected Outcomes</h3>
          <ul>
            ${data.expected_outcome.map(o => `<li>${o}</li>`).join('')}
          </ul>
        ` : ''}
        
        ${data.use_case_description ? `
          <h3>Use Case Description</h3>
          <p>${data.use_case_description.replace(/\n/g, '<br>')}</p>
        ` : ''}
        
        ${data.datasets_involved ? `
          <h3>Datasets Involved</h3>
          <p>${data.datasets_involved.replace(/\n/g, '<br>')}</p>
        ` : ''}
        
        ${data.preferred_regulator ? `<p><strong>Preferred Regulator:</strong> ${data.preferred_regulator}</p>` : ''}
        ${data.preferred_schedule ? `<p><strong>Preferred Schedule:</strong> ${data.preferred_schedule}</p>` : ''}
        ${data.referral_source ? `<p><strong>Referral Source:</strong> ${data.referral_source}</p>` : ''}
        
        <hr style="margin: 20px 0;">
        <p><strong>View full details in the <a href="https://lovable.dev" style="color: #2563eb;">Admin Dashboard</a></strong></p>
      `
    );

    // Send confirmation to client
    const clientEmailResult = await sendEmail(
      [data.email],
      "Consultation Request Received - ASIMOV-AI RISK",
      `
        <h2>Thank you for your consultation request, ${data.full_name}!</h2>
        
        <p>We have received your request for a <strong>${data.session_type}</strong> consultation.</p>
        
        <h3>What happens next?</h3>
        <ol>
          <li>Our team will review your request within 24 hours</li>
          <li>We'll contact you via email or ${data.contact_number ? 'WhatsApp/phone' : 'email'} to schedule your session</li>
          <li>You'll receive a pre-meeting questionnaire to help us prepare</li>
          <li>We'll conduct your 50-minute consultation at the agreed time</li>
        </ol>
        
        <h3>Your Request Summary</h3>
        <ul>
          <li><strong>Session Objective:</strong> ${data.session_objective}</li>
          <li><strong>AI Category:</strong> ${data.ai_category}</li>
          <li><strong>Sector:</strong> ${data.sector}</li>
        </ul>
        
        <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:Rajiv@ASIMOV-AI.ORG">Rajiv@ASIMOV-AI.ORG</a>.</p>
        
        <p>Best regards,<br>
        The ASIMOV-AI RISK Team</p>
      `
    );

    console.log("Admin email sent:", adminEmailResult);
    console.log("Client email sent:", clientEmailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailId: adminEmailResult.id,
        clientEmailId: clientEmailResult.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending notification emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
