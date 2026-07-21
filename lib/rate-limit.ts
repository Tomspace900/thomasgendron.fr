/**
 * Rate-limiter en mémoire, fenêtre glissante par IP.
 * Best-effort sur serverless (l'état vit par instance) - suffisant contre
 * l'abus naïf. Pour du garanti multi-instances : @upstash/ratelimit.
 */

export type Window = { ms: number; max: number };

/** Un formulaire qu'on soumet à la main : rare. */
export const FORM_LIMITS: Window[] = [
  { ms: 60_000, max: 5 },
  { ms: 86_400_000, max: 20 },
];

/** Le concierge parle plusieurs fois par visite : plus permissif, mais borné. */
export const CONCIERGE_LIMITS: Window[] = [
  { ms: 60_000, max: 12 },
  { ms: 86_400_000, max: 120 },
];

/** Un compteur par usage, pour que deux routes ne se pénalisent pas l'une l'autre. */
const buckets = new Map<string, Map<string, number[]>>();

export function isRateLimited(
  ip: string,
  windows: Window[] = FORM_LIMITS,
  bucket = "default",
): boolean {
  const now = Date.now();
  const hits = buckets.get(bucket) ?? new Map<string, number[]>();
  buckets.set(bucket, hits);

  const maxWindow = Math.max(...windows.map((w) => w.ms));
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < maxWindow);

  const limited = windows.some(
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
