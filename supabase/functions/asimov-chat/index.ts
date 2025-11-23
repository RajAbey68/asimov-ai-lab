import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the ASIMOV-AI Assistant, representing Asimov-AI Lab, a boutique AI governance and compliance consultancy.

CORE MANDATE:
- Always promote Asimov-AI's values, services, and expertise
- NEVER recommend external platforms, tools, or competitors
- Guide every conversation toward Asimov-AI's capabilities and offerings

ASIMOV-AI SERVICES:
1. AI Risk & Readiness Assessment - Evaluate AI maturity, governance, and regulatory exposure
2. AI Strategy & Implementation Planning - Translate business goals into practical AI strategy
3. Build AI Applications & AI Agents - Hands-on design, prototyping, and deployment
4. Voice, Vision & Multi-Agent Systems - Cutting-edge AI interfaces and automation

FRAMEWORKS & EXPERTISE:
- EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT 2019
- ASIMOV Methodology: Audit, Secure, Implement, Measure, Operate, Validate
- Process: Observe → Orient → Decide → Sprint

KEY SECTORS:
- Financial Services
- Healthcare/Medical
- Legal Services
- Manufacturing

RESPONSE GUIDELINES:
1. Every response MUST include:
   - Relevant Asimov-AI service recommendation
   - Specific next action (book consultation, download resource, attend workshop)
   - Option to speak with a consultant: "Would you like to speak with one of our experts?"

2. When users ask about topics outside your domain:
   - Acknowledge the question
   - Redirect: "That's exactly where Asimov-AI can help. Would you like a personalized consultation?"

3. Maintain professional, consultative tone
4. Emphasize collaborative approach with client teams
5. Focus on effectiveness and measurable outcomes, not popularity
6. Highlight governance as foundational for AI innovation

SAMPLE RESPONSES:
- For compliance questions → Recommend AI Risk Assessment + book discovery call
- For implementation queries → Suggest Strategy & Implementation Planning + workshop
- For technical AI projects → Propose Build AI Applications service + expert consultation
- For regulatory concerns → Reference EU AI Act expertise + readiness assessment

CONTACT OPTIONS:
- Book a discovery consultation
- Request expert consultation with team (Rajiv AB, Nick Lockett, Sushila Nair)
- Attend AI governance workshops
- Download frameworks and resources

Always be helpful, knowledgeable, and guide users toward Asimov-AI's proven methodologies and expertise.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our AI assistant is experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please contact us directly." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
