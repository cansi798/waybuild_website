// robots.txt – in der Vorschau alles sperren, live Sitemap melden.
import type { APIRoute } from 'astro';
import { IS_PREVIEW } from '../lib/env';
import { absolute } from '../lib/paths';

export const GET: APIRoute = ({ site }) => {
  const body = IS_PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap-index.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
