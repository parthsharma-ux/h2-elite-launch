import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FitnessData {
  age: string;
  height: string;
  weight: string;
  goal: string;
  diet: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { age, height, weight, goal, diet }: FitnessData = await req.json();

    const prompt = `You are an expert fitness coach and nutritionist. Based on the following user data, create a personalized fitness plan:

User Profile:
- Age: ${age} years
- Height: ${height} cm
- Weight: ${weight} kg
- Fitness Goal: ${goal}
- Diet Preference: ${diet}

Please provide a JSON response with the following structure (no markdown, just pure JSON):
{
  "calories": <daily calorie target as number>,
  "protein": <daily protein in grams as number>,
  "carbs": <daily carbs in grams as number>,
  "fats": <daily fats in grams as number>,
  "dietPlan": [
    "<5 meal suggestions with emojis, each as a string>"
  ],
  "workoutSplit": [
    "<7 day workout schedule, each day as 'Day: Activity' format>"
  ],
  "tip": "<one motivational tip for their goal>"
}

Calculate using Mifflin-St Jeor equation with 1.55 activity multiplier. Adjust calories based on goal (Fat Loss: -500, Muscle Building: +300, Strength: +200). Use 2g protein per kg bodyweight.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert fitness coach. Always respond with valid JSON only, no markdown formatting." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean up markdown if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const fitnessplan = JSON.parse(content);

    return new Response(JSON.stringify(fitnessplan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
