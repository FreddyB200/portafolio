import type { APIRoute } from 'astro';
import { copy, langs, pathFor, site, type PageKey } from '../data/content';

// Generated from content.ts so new hackathons and projects are listed without editing a file by hand.
export const GET: APIRoute = () => {
  const entries: { page: PageKey; slug?: string }[] = [
    { page: 'home' },
    { page: 'about' },
    { page: 'hackathons' },
    ...copy.en.competitions.list.map((p) => ({ page: 'hackathons' as const, slug: p.slug })),
    { page: 'projects' },
    ...copy.en.pages.projects.list.filter((p) => p.story).map((p) => ({ page: 'projects' as const, slug: p.slug })),
  ];
  const abs = (lang: (typeof langs)[number], e: (typeof entries)[number]) => new URL(pathFor(lang, e.page, e.slug), site.url).href;
  const urls = entries.flatMap((e) =>
    langs.map(
      (lang) =>
        `  <url>\n    <loc>${abs(lang, e)}</loc>\n` +
        langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(l, e)}" />`).join('\n') +
        '\n  </url>',
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};
