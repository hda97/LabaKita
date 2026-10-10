import type { APIRoute } from 'astro';
import site from '../../site.config.mjs';

// Selama situs belum diindeks (indexable = false), seluruh situs diblokir dari mesin pencari.
export const GET: APIRoute = () =>
  new Response(
    site.indexable
      ? `User-agent: *\nAllow: /\nDisallow: /cari/\n\nSitemap: ${site.url}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
