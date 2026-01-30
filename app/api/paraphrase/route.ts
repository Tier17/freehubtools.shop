import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(req, 'AI');
  if (!rateLimit.success) {
    return rateLimit.response;
  }

  try {
    const { text, tone = 'professional', mode = 'standard' } = await req.json();

    if (!text || text.length > 5000) {
      return NextResponse.json(
        { error: 'Invalid text provided. Text must be between 1 and 5000 characters.' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert paraphrasing tool. Rewrite the user's text.
    - Tone: ${tone} (e.g., Professional, Casual, Academic, Creative)
    - Mode: ${mode} (Standard: rewrite clearly; Fluency: fix errors/flow; Expand: make longer; Shorten: make concise)
    
    Return the result as a JSON object with a "rewritten" field containing the text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"rewritten": ""}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
