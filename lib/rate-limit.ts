/**
 * Rate-limiter en mémoire, fenêtre glissante par IP.
 * Best-effort sur serverless (l'état vit par instance) — suffisant contre
 * l'abus naïf. Pour du garanti multi-instances : @upstash/ratelimit.
 */

const WINDOWS = [
  { ms: 60_000, max: 5 }, // 5 requêtes / minute
  { ms: 86_400_000, max: 20 }, // 20 requêtes / jour
] as const;

const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const maxWindow = Math.max(...WINDOWS.map((w) => w.ms));

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < maxWindow);

  const limited = WINDOWS.some(
    ({ ms, max }) => timestamps.filter((t) => now - t < ms).length >= max,
  );

  if (!limited) {
    timestamps.push(now);
    hits.set(ip, timestamps);
    // Purge paresseuse pour éviter de grossir indéfiniment
    if (hits.size > 5_000) {
      for (const [key, value] of hits) {
        if (value.every((t) => now - t >= maxWindow)) hits.delete(key);
      }
    }
  }

  return limited;
}
