// Contact form endpoint (Vercel Function, Node runtime). The site itself stays static.
//
// Environment variables (set in Vercel, never in the repo):
//   RESEND_API_KEY  API key from https://resend.com
//   CONTACT_TO      address that receives the messages (kept out of the HTML on purpose)
//   CONTACT_FROM    optional, e.g. "Portfolio <contact@freddybautista.me>" once the domain is
//                   verified in Resend. Defaults to Resend's shared test sender, which can
//                   only deliver to the address that owns the Resend account.

const MIN_FILL_MS = 2500; // humans need a couple of seconds to write; bots post instantly
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = 5; // messages per IP per window (best effort: memory is per instance)
const GLOBAL_LIMIT = 30; // messages per window across all visitors (flood guard, same caveat)
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 20_000; // the form allows ~5 KB of text; anything bigger is not from the form

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

const json = (status: number, body: Record<string, unknown>, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra },
  });

function originAllowed(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    if (hostname === 'freddybautista.me' || hostname === 'www.freddybautista.me') return true;
    // Preview deployments and local dev are only accepted outside production, so a page that someone
    // else hosts on *.vercel.app can never post to the live endpoint.
    if (process.env.VERCEL_ENV === 'production') return false;
    return hostname.endsWith('.vercel.app') || hostname === 'localhost';
  } catch {
    return false;
  }
}

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  return false;
}

function floodGuard(now: number): boolean {
  globalHits = globalHits.filter((t) => now - t < RATE_WINDOW_MS);
  if (globalHits.length >= GLOBAL_LIMIT) return true;
  globalHits.push(now);
  return false;
}

/** Removes line breaks so a value can never inject extra mail headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(request: Request): Promise<Response> {
  if (!originAllowed(request)) return json(403, { error: 'origin' });

  if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return json(415, { error: 'invalid' });
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return json(413, { error: 'invalid' });

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json(413, { error: 'invalid' });
    data = JSON.parse(raw);
  } catch {
    return json(400, { error: 'invalid' });
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return json(400, { error: 'invalid' });
  const str = (k: string) => (typeof data[k] === 'string' ? (data[k] as string) : '');

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (str('website')) return json(200, { ok: true });

  const now = Date.now();
  const age = now - Number(data.ts);
  if (!Number.isFinite(age) || age < MIN_FILL_MS || age > MAX_AGE_MS) return json(400, { error: 'invalid' });

  const name = oneLine(str('name'));
  const email = oneLine(str('email'));
  const message = str('message').trim();

  const errors: Record<string, true> = {};
  if (name.length < 1 || name.length > 100) errors.name = true;
  if (email.length > 254 || !/^[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']{2,}$/.test(email)) errors.email = true;
  if (message.length < 10 || message.length > 5000) errors.message = true;
  if (Object.keys(errors).length) return json(400, { error: 'validation', fields: errors });

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip, now) || floodGuard(now)) return json(429, { error: 'rate' }, { 'retry-after': '3600' });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    // Visible only in the Vercel function logs (names and presence, never values).
    console.error('contact: not configured', { RESEND_API_KEY: !!key, CONTACT_TO: !!to });
    return json(503, { error: 'not_configured' });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Portfolio: message from ${name}`.slice(0, 150),
        // Plain text only: the visitor's text is never interpreted as HTML.
        text: `From: ${name} <${email}>\n\n${message}\n`,
      }),
    });
    if (!res.ok) {
      // Function logs only (Vercel dashboard): why the mail provider refused the message.
      console.error('contact: provider refused', res.status, (await res.text().catch(() => '')).slice(0, 300));
      return json(502, { error: 'upstream' });
    }
    return json(200, { ok: true });
  } catch {
    return json(502, { error: 'upstream' });
  }
}
