import { NextResponse } from 'next/server';

export function checkOrigin(req: Request): { success: boolean; response?: NextResponse } {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  
  // In production/strict mode, we require Origin or Referer for API calls
  // to prevent direct API abuse (e.g. from Postman/curl without spoofing).
  // Browsers automatically send Origin for POST/PUT/DELETE.
  
  const requestOrigin = origin || referer;

  if (!requestOrigin) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Missing Origin or Referer header' },
        { status: 403 }
      ),
    };
  }

  // Allowed domains
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freehubtools.shop';
  const allowedOrigins = [
    appUrl, 
    'http://localhost:3000', 
    'https://www.freehubtools.shop',
    // Add Vercel preview domains if needed, or use a wildcard strategy for previews
    // For now, strict allowlist is safer.
  ];

  const isAllowed = allowedOrigins.some(allowed => requestOrigin.startsWith(allowed));

  if (!isAllowed) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      ),
    };
  }

  return { success: true };
}
