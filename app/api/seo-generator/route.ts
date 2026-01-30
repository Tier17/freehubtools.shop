import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an SEO expert.
Your task is to generate optimized meta titles, meta descriptions, and keywords for the provided content or topic.
Follow best practices: Title under 60 chars, Description under 160 chars.
Output strictly as a JSON object with keys: "metaTitle", "metaDescription", "keywords" (array).`;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate SEO meta tags for: ${text}` }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('SEO generation error:', error);
    return NextResponse.json({ error: 'Failed to generate SEO data' }, { status: 500 });
  }
}
