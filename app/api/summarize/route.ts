import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, length = 'medium', format = 'paragraph' } = await req.json();

    if (!text || text.length > 10000) {
      return NextResponse.json(
        { error: 'Invalid text provided. Text must be between 1 and 10000 characters.' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a professional article summarizer. 
    Summarize the provided text based on the following preferences:
    - Length: ${length} (short: ~50 words, medium: ~150 words, long: ~300 words)
    - Format: ${format} (paragraph or bullet points)
    
    Return the result as a JSON object with a "summary" field containing the text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{"summary": ""}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
