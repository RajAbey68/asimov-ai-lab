import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { control_name, category, risk_level, sector, region } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Construct a sector and region-specific prompt for regulatory insights
    const systemPrompt = `You are an AI governance compliance expert specializing in the EU AI Act. 
Generate Life-Wise regulatory insights that include:
1. Relevant EU AI Act articles and requirements
2. Sector-specific regulatory references (${sector || 'General'})
3. Region-specific compliance considerations (${region || 'Global'})
4. Best practices from regulatory authorities (MHRA, FCA, NIST, FDA, EBA, etc.)
5. Practical implementation guidance

Keep insights concise (2-3 paragraphs), actionable, and reference specific regulatory documents where applicable.`;

    const userPrompt = `Generate a Life-Wise regulatory insight for this AI governance control:
Control: ${control_name}
Category: ${category}
Risk Level: ${risk_level}
Sector: ${sector || 'General'}
Region: ${region || 'Global'}

Provide specific regulatory guidance including relevant articles, sector-specific requirements, and best practices.`;

    console.log('Generating insight for:', { control_name, category, sector, region });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again later.',
            code: 'RATE_LIMIT'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'AI credits required. Please add credits to your workspace.',
            code: 'PAYMENT_REQUIRED'
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const insight = data.choices?.[0]?.message?.content || 'Unable to generate insight at this time.';

    console.log('Successfully generated insight');

    return new Response(
      JSON.stringify({ 
        insight,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-insight function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
