import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a professional copywriter and marketing expert.
Your task is to generate catchy, engaging, and SEO-friendly titles/headlines based on the user's input.
Provide 5-10 distinct options ranging from professional to click-worthy.
Output strictly as a JSON object with a "titles" array of strings.`;

export async function POST(req: Request) {
  try {
    const { text, style = 'mixed' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate ${style} titles for: ${text}` }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"titles": []}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Title generation error:', error);
    return NextResponse.json({ error: 'Failed to generate titles' }, { status: 500 });
  }
}
