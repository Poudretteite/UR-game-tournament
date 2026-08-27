const rateLimitMap = new Map();

export function rateLimit(ip, limit = 5, windowMs = 60 * 1000) {
  const now = Date.now();

  // Oczyszczanie przedawnionych wpisów w celu ochrony pamięci
  if (rateLimitMap.size > 500) {
    for (const [storedIp, data] of rateLimitMap.entries()) {
      if (now - data.last > windowMs) {
        rateLimitMap.delete(storedIp);
      }
    }
  }

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