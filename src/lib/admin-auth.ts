import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'mni_admin_session';

function getAdminSecret(): string {
  return process.env.ADMIN_PASSCODE || 'munroe2026';
}

/**
 * Creates a cryptographically signed session token for the admin dashboard.
 */
export function generateAdminSessionToken(): string {
  const secret = getAdminSecret();
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${secret}:${timestamp}`)
    .digest('hex');

  return `${timestamp}.${signature}`;
}

/**
 * Verifies if an admin session token is authentic and unexpired (valid for 7 days).
 */
export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [timestampStr, signature] = parts;
    const timestamp = Number(timestampStr);

    if (isNaN(timestamp)) return false;

    // Token expires after 7 days
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > SEVEN_DAYS_MS || Date.now() < timestamp - 60000) {
      return false;
    }

    const secret = getAdminSecret();
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${secret}:${timestamp}`)
      .digest('hex');

    const expectedBuf = Buffer.from(expected, 'utf8');
    const signatureBuf = Buffer.from(signature, 'utf8');

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}

/**
 * Verifies admin authentication from request cookies or authorization headers.
 */
export async function isAuthenticatedAdmin(request?: Request): Promise<boolean> {
  // 1. Check authorization header if supplied
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (verifyAdminSessionToken(token)) return true;
    }

    const secretHeader = request.headers.get('x-admin-passcode');
    if (secretHeader && secretHeader === getAdminSecret()) {
      return true;
    }
  }

  // 2. Check HTTP-only cookie
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (sessionCookie && verifyAdminSessionToken(sessionCookie.value)) {
      return true;
    }
  } catch {
    // In environments where cookies() cannot be called
  }

  return false;
}
