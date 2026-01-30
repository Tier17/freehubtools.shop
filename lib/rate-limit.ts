import { LRUCache } from 'lru-cache';
import { NextResponse } from 'next/server';

type RateLimitType = 'AI' | 'STANDARD';

const TRACKING_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

const tokenCache = new LRUCache<string, number>({
  max: 5000,
  ttl: TRACKING_WINDOW_MS,
});

export function checkRateLimit(req: Request, type: RateLimitType = 'STANDARD') {
  // Get IP from headers (works with Vercel/Next.js)
  const forwardedFor = req.headers.get('x-forwarded-for');
  // Parse first IP if multiple are present (common in Vercel/proxies)
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
  
  // Create a unique key based on IP and limit type to track separately if needed
  // For this requirement, we want a global limit per user for AI tools.
  const key = `${ip}:${type}`;
  
  const currentUsage = tokenCache.get(key) || 0;
  const limit = type === 'AI' ? 5 : 10;

  if (currentUsage >= limit) {
    return {
      success: false,
      response: NextResponse.json(
        { error: `Rate limit exceeded. You can only use ${type === 'AI' ? 'AI tools 5' : 'tools 10'} times per day.` },
        { status: 429 }
      ),
    };
  }

  tokenCache.set(key, currentUsage + 1);
  return { success: true };
}
