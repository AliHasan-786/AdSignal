import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { inputs, output } = await req.json();

    const formatLabels: Record<string, string> = {
      standard_15: "Standard 15s",
      standard_30: "Standard 30s",
      interactive_choice: "Interactive Choice Ad",
      shoppable: "Shoppable / Action Ad",
      pause_ad: "Pause Ad",
      qr_code: "QR Code Overlay",
    };

    const prompt = `You are an expert CTV advertising strategist. A media planner has configured an ad format simulation with the following parameters:

FORMAT: ${formatLabels[inputs.format] || inputs.format}
CATEGORY: ${inputs.category}
AD LENGTH: ${inputs.adLength}s
INTERACTIVITY LEVEL: ${inputs.interactivityLevel}/5
TARGET FREQUENCY: ${inputs.targetFrequency}x per day

SIMULATION RESULTS (based on IAB CTV Benchmarks 2024 and Deloitte Digital Media Trends 2025):
- Predicted CTR: ${output.ctrFormatted}
- Completion Rate: ${output.completionFormatted}
- Ad Fatigue Score: ${output.fatigueScore}/10 (${output.fatigueLabel})

Based on these specific simulated results, provide a concise 3-4 sentence format recommendation. Explain:
1. Whether this format/category combination is likely to perform well, citing the specific numbers
2. The single most important risk factor (fatigue, completion drop-off, or CTR) and why
3. One concrete action to improve the predicted outcome

Be direct and analytical. Reference the specific metrics. Do not write marketing language.`;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ad-signal.vercel.app",
        "X-Title": "AdSignal",
      },
      body: JSON.stringify({
        model: "anthropic/claude-haiku-4-5",
        max_tokens: 280,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ recommendation: text });
  } catch (error) {
    console.error("AI recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
