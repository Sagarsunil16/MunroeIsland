interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory sliding-window store
const rateLimitStore = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries (every 10 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Standard in-memory sliding-window rate limiter.
 * Protects public API endpoints from automated brute-force attacks and abuse.
 */
export function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000
): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}
