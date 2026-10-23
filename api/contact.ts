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
const RATE_WINDOW_MS = 60 * 60 * 1000;

const hits = new Map<string, number[]>();

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

function originAllowed(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'freddybautista.me' ||
      hostname === 'www.freddybautista.me' ||
      hostname.endsWith('.vercel.app') || // preview deployments
      hostname === 'localhost'
    );
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

/** Removes line breaks so a value can never inject extra mail headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(request: Request): Promise<Response> {
  if (!originAllowed(request)) return json(403, { error: 'origin' });

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: 'invalid' });
  }
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
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = true;
  if (message.length < 10 || message.length > 5000) errors.message = true;
  if (Object.keys(errors).length) return json(400, { error: 'validation', fields: errors });

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip, now)) return json(429, { error: 'rate' });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return json(503, { error: 'not_configured' });

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
    if (!res.ok) return json(502, { error: 'upstream' });
    return json(200, { ok: true });
  } catch {
    return json(502, { error: 'upstream' });
  }
}
