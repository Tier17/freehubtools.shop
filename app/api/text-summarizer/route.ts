import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/security';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an expert text summarizer.
Summarize the provided text into a concise and clear version.
Output strictly as a JSON object with a "summary" string field.`;

export async function POST(req: Request) {
  const originCheck = checkOrigin(req);
  if (!originCheck.success) {
    return originCheck.response;
  }

  const rateLimit = checkRateLimit(req, 'AI');
  if (!rateLimit.success) {
    return rateLimit.response;
  }

  try {
    const { text, length = 'medium' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: 'Text exceeds 5000 characters' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Summarize this text (${length} length):\n\n${text}` }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"summary": ""}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Summarization error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to summarize text' }, { status: 500 });
  }
}
