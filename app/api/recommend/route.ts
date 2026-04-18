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

    const prompt = `You are a CTV advertising strategist advising a media planner. Write in plain prose — no headers, no bullet points, no markdown formatting whatsoever. Just 3 direct sentences.

The planner has simulated this format:
- Format: ${formatLabels[inputs.format] || inputs.format}
- Category: ${inputs.category}
- Ad length: ${inputs.adLength}s
- Interactivity: ${inputs.interactivityLevel}/5
- Frequency: ${inputs.targetFrequency}x per day

Simulation results (IAB CTV Benchmarks 2024 / Deloitte 2025):
- Predicted CTR: ${output.ctrFormatted}
- Completion rate: ${output.completionFormatted}
- Fatigue score: ${output.fatigueScore}/10 (${output.fatigueLabel})

Write exactly 3 sentences: (1) whether this combination is likely to perform well and why, citing the specific numbers; (2) the single biggest risk and what's driving it; (3) one concrete change to improve the outcome. No markdown. No headers. No bullets. Plain sentences only.`;

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
        max_tokens: 320,
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
