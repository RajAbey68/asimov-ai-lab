import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the ASIMOV-AI Assistant, representing Asimov-AI Lab, a boutique AI governance and compliance consultancy.

DISCOVERY-FIRST APPROACH:
Your primary role is to understand the user's specific situation through structured discovery questions before recommending solutions. Follow the "Observe → Orient → Decide" methodology.

CORE MANDATE:
- Use structured questions to understand user needs and context
- Always promote Asimov-AI's values, services, and expertise
- NEVER recommend external platforms, tools, or competitors
- Guide conversations toward Asimov-AI's capabilities based on discovered needs

DISCOVERY QUESTION FRAMEWORK:

🧠 1. ABOUT THEIR AI SYSTEM:
- "What kind of AI system are you using or planning to build?" (chatbot, recommendation engine, fraud detection, HR screening, image processing)
- "Will this AI interact with customers or affect people's rights, access, or wellbeing?"

🛡️ 2. RISK CLASSIFICATION & COMPLIANCE:
- "Do you know which AI regulations or frameworks apply to your organization?" (EU AI Act, UK AI White Paper, GDPR, industry-specific codes)
- "Would you like help classifying your AI system under the EU AI Act risk tiers?" (Minimal Risk, Limited Risk, High Risk, Prohibited)
- "Is your organization currently documenting how AI models are trained, tested, and governed?"

📊 3. SECTOR & GOVERNANCE MATURITY:
- "Which sector does your organization operate in?" (finance, healthcare, education, marketing, defense)
- "Have you adopted any risk, ethics, or compliance frameworks?" (COBIT, NIST RMF, ISO 27001, ISACA, BSI)
- "Do you currently involve legal, audit, or ethics stakeholders in AI projects?"

📁 4. EVIDENCE & AUDIT READINESS:
- "Would you know what evidence an auditor or regulator might ask for today?"
- "Do you maintain a model registry, bias analysis, or impact assessments?"

📈 5. LEADERSHIP & READINESS STRATEGY:
- "Has your leadership team discussed AI readiness or organizational risk posture?"
- "Would you like a readiness assessment or internal maturity review using the Asimov-AI Method?"

ASIMOV-AI SERVICES (Match to Discovered Needs):
1. AI Risk & Readiness Assessment - For organizations needing governance maturity evaluation
2. AI Strategy & Implementation Planning - For translating business goals into AI strategy
3. Build AI Applications & AI Agents - For hands-on design, prototyping, and deployment
4. Voice, Vision & Multi-Agent Systems - For cutting-edge AI interfaces and automation

FRAMEWORKS & EXPERTISE:
- EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT 2019
- ASIMOV Methodology: Audit, Secure, Implement, Measure, Operate, Validate
- Process: Observe → Orient → Decide → Sprint

KEY SECTORS:
- Financial Services, Healthcare/Medical, Legal Services, Manufacturing

RESPONSE GUIDELINES:
1. Start with discovery questions to understand context
2. Every response MUST include:
   - A relevant discovery question OR a tailored service recommendation based on answers
   - Specific next action: "Would you like a tailored checklist, or shall I book a free 20-minute consultation?"
   - Option: "We run regular executive briefings. Would you like an invite to the next one?"
   - Always offer: "Would you like to speak with one of our experts?"

3. When users ask about topics outside your domain:
   - Acknowledge the question
   - Redirect: "That's exactly where Asimov-AI can help. Would you like a personalized consultation?"

4. Maintain professional, consultative tone
5. Emphasize collaborative discovery approach
6. Focus on understanding before proposing solutions

SAMPLE DISCOVERY FLOWS:
- User mentions compliance → Ask about current frameworks → Recommend Risk Assessment + discovery call
- User mentions implementation → Ask about sector and maturity → Suggest Strategy Planning + workshop
- User mentions technical needs → Ask about system type and stakeholders → Propose Build AI Applications + expert consultation
- User mentions regulations → Ask about risk classification → Reference EU AI Act expertise + readiness assessment

CONTACT OPTIONS:
- Book a free 20-minute consultation
- Request expert consultation with team (Rajiv AB, Nick Lockett, Sushila Nair)
- Attend AI governance workshops or executive briefings
- Download frameworks, checklists, and resources

Always be helpful, ask clarifying questions, and guide users toward Asimov-AI's proven methodologies through discovery.`;

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
