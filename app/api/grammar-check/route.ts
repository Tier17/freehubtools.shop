import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/security';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const { text } = await req.json();

    if (!text || text.length > 5000) {
      return NextResponse.json(
        { error: 'Invalid text provided. Text must be between 1 and 5000 characters.' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional grammar and style checker. Analyze the provided text and return a JSON object with a list of "items". 
Each item must have:
- "original": the exact text segment that has an issue.
- "suggestion": the corrected version or suggestion.
- "type": one of "spelling", "grammar", "style", or "punctuation".
- "explanation": a brief explanation of why this change is recommended.
If the text is correct, return an empty items list.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"items": []}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('OpenAI API Error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
