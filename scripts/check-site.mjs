// Pemeriksaan otomatis hasil build (dist/) terhadap aturan di workflow:
// - semua tautan internal valid, sitemap hanya berisi halaman yang ada
// - setiap halaman: satu <h1>, <title> & meta description unik, canonical, JSON-LD valid
// - meta description 140–155 karakter (Fase 5)
// - setiap artikel minimal 1.200 kata (template Fase 4)
// - setiap artikel menautkan ≥1 kalkulator, ≥1 artikel pilar sama, ≥1 artikel pilar lain (Fase 3)
// - setiap kalkulator punya bagian "Panduan terkait" (Fase 3)
// - 5 halaman wajib ada dan tertaut di footer (Fase 3)
// Jalankan: npm run build && npm run check
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const ARTIKEL = new URL('../src/content/artikel/', import.meta.url).pathname;
const errors = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const routeExists = (href) => {
  const path = decodeURIComponent(href.split(/[?#]/)[0]);
  if (path === '/') return existsSync(join(DIST, 'index.html'));
  const target = join(DIST, path);
  if (path.endsWith('/')) return existsSync(join(target, 'index.html'));
  return existsSync(target) && statSync(target).isFile();
};

// Pilar setiap artikel dari frontmatter.
const pilarOf = Object.fromEntries(
  readdirSync(ARTIKEL)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = readFileSync(join(ARTIKEL, f), 'utf8');
      if (/^draft:\s*true/m.test(src)) return null;
      return [`/${f.replace(/\.md$/, '')}/`, src.match(/^pilar:\s*(\w+)/m)[1]];
    })
    .filter(Boolean),
);

const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const titles = new Map();
const descriptions = new Map();

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  const noindex = /<meta name="robots" content="noindex/.test(html);

  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (!routeExists(decode(href))) fail(route, `tautan rusak ${href}`);
  }

  const h1 = html.match(/<h1[\s>]/g) || [];
  if (h1.length !== 1) fail(route, `jumlah <h1> = ${h1.length}`);

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail(route, 'JSON-LD tidak valid');
    }
  }

  if (route === '/404.html') continue;

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title) fail(route, 'tidak ada <title>');
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) fail(route, 'tidak ada canonical');
  if (!noindex) {
    if (desc.length < 140 || desc.length > 155) fail(route, `meta description ${desc.length} karakter (harus 140–155)`);
    if (titles.has(title)) fail(route, `judul sama dengan ${titles.get(title)}`);
    if (descriptions.has(desc)) fail(route, `meta description sama dengan ${descriptions.get(desc)}`);
    titles.set(title, route);
    descriptions.set(desc, route);
  }

  for (const wajib of ['/tentang/', '/kontak/', '/kebijakan-privasi/', '/disclaimer/', '/syarat-ketentuan/']) {
    if (!html.includes(`href="${wajib}"`)) fail(route, `footer tidak menautkan ${wajib}`);
  }

  if (pilarOf[route]) {
    const start = html.indexOf('<div class="prose">');
    const end = html.indexOf('<section class="faq"');
    const body = html.slice(start, end);
    const links = [...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
    const mine = pilarOf[route];
    if (!links.some((l) => l.startsWith('/kalkulator-'))) fail(route, 'isi artikel belum menautkan kalkulator');
    if (!links.some((l) => l !== route && pilarOf[l] === mine)) fail(route, 'isi artikel belum menautkan artikel di pilar yang sama');
    if (!links.some((l) => pilarOf[l] && pilarOf[l] !== mine)) fail(route, 'isi artikel belum menautkan artikel di pilar lain');
    const text = html
      .slice(html.indexOf('<h1'), html.indexOf('<section class="related"'))
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<[^>]+>/g, ' ');
    const words = decode(text).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    if (words < 1200) fail(route, `artikel baru ${words} kata (template minimal 1.200)`);
  }

  if (route.startsWith('/kalkulator-') && !html.includes('Panduan terkait')) fail(route, 'tidak ada bagian "Panduan terkait"');
}

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const loc of locs) if (!routeExists(loc)) fail('/sitemap.xml', `berisi halaman yang tidak ada ${loc}`);
for (const route of Object.keys(pilarOf)) if (!locs.includes(route)) fail('/sitemap.xml', `artikel tidak ada di sitemap ${route}`);

const nArtikel = Object.keys(pilarOf).length;
const nKalkulator = locs.filter((l) => l.startsWith('/kalkulator-')).length;
console.log(`${pages.length} halaman HTML · ${nKalkulator} kalkulator · ${nArtikel} artikel · ${locs.length} URL di sitemap`);

if (errors.length) {
  console.error(`\n${errors.length} masalah ditemukan:\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log('Semua pemeriksaan lulus.');
