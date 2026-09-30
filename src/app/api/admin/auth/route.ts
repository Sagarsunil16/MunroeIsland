import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  generateAdminSessionToken,
  isAuthenticatedAdmin,
} from '@/lib/admin-auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  const authenticated = await isAuthenticatedAdmin(request);
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    // Rate limit brute-force attempts: max 6 attempts per 15 mins per IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const limit = checkRateLimit(`admin-auth:${ip}`, 6, 15 * 60 * 1000);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please wait ${limit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { passcode } = await request.json();
    const correctSecret = process.env.ADMIN_PASSCODE || 'munroe2026';

    if (!passcode || typeof passcode !== 'string' || passcode.trim() !== correctSecret.trim()) {
      return NextResponse.json(
        { error: 'Incorrect administrative passcode. Access denied.' },
        { status: 401 }
      );
    }

    const token = generateAdminSessionToken();
    const cookieStore = await cookies();

    // 7-day persistent secure session
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Authenticated successfully.' });
  } catch (error) {
    console.error('[Admin Auth] Error:', error);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
