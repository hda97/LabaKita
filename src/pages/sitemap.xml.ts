import type { APIRoute } from 'astro';
import site from '../../site.config.mjs';
import { calculatorContent } from '../data/calculator-content.js';
import { getArticles } from '../lib/content.js';

// Halaman yang tidak perlu diindeks (/cari/, 404) sengaja tidak dimasukkan.
const STATIC_PAGES = [
  '/',
  '/kalkulator/',
  '/panduan/',
  '/modal-keuangan/',
  '/hobi-jadi-usaha/',
  '/tentang/',
  '/kontak/',
  '/kebijakan-privasi/',
  '/disclaimer/',
  '/syarat-ketentuan/',
];

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const latest = articles.length ? day(articles[0].data.updated) : day(new Date());
  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: p, lastmod: latest })),
    ...calculatorContent.map((c) => ({ loc: `/${c.slug}/`, lastmod: latest })),
    ...articles.map((a) => ({ loc: `/${a.id}/`, lastmod: day(a.data.updated) })),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${new URL(u.loc, site.url).href}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
