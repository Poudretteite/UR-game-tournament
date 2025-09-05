const rateLimitMap = new Map();

export function rateLimit(ip, limit = 5, windowMs = 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, last: now };

  if (now - record.last > windowMs) {
    record.count = 1;
    record.last = now;
  } else {
    record.count++;
  }

  rateLimitMap.set(ip, record);
  return record.count > limit;
}