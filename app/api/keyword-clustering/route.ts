import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/security';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an SEO and data analysis expert.
Group the provided list of keywords into semantic clusters.
Output strictly as a JSON object with a "clusters" array.
Each cluster should have a "name" (string) and "keywords" (array of strings).`;

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

    if (!text) {
      return NextResponse.json({ error: 'Keywords are required' }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: 'Text exceeds 5000 characters' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Cluster these keywords:\n${text}` }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"clusters": []}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Keyword clustering error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to cluster keywords' }, { status: 500 });
  }
}
