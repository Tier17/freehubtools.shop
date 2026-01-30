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

  // Check content length (limit to 1MB to prevent large payload attacks)
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 1024 * 1024) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  const rateLimit = checkRateLimit(req, 'AI');
  if (!rateLimit.success) {
    return rateLimit.response;
  }

  try {
    const { text, voice = 'alloy', speed = 1.0 } = await req.json();

    if (!text || text.length > 4096) {
      return NextResponse.json(
        { error: 'Invalid text. Max 4096 characters.' },
        { status: 400 }
      );
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
      speed: Number(speed),
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('OpenAI API Error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
