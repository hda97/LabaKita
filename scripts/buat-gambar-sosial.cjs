// Membuat gambar promosi (Fase 6) dari konten situs:
// - public/og/<slug>.png      1200×630, gambar pratinjau saat tautan dibagikan (og:image)
// - public/pin/<slug>-1..3.jpg 1000×1500, tiga variasi pin Pinterest per halaman
// - data/materi-promosi/pinterest.csv  daftar pin untuk unggah massal Pinterest
// Butuh Playwright + Chromium. Jalankan: node scripts/buat-gambar-sosial.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const SKIP_H2 = /^(Kesalahan|Sumber|Rangkuman|Contoh|Ringkasan|Langkah berikutnya|Latihan|Rencana|Tanda|Cek cepat|Pertanyaan|Checklist|Kapan|Setelah|Kalau|Apakah)/i;

function parseArticle(file) {
  const src = fs.readFileSync(file, 'utf8');
  const [, fm, body] = src.split(/^---$/m);
  const get = (k) => (fm.match(new RegExp(`^${k}: '(.*)'$`, 'm')) || [])[1]?.replace(/''/g, "'");
  const faq = [...fm.matchAll(/- q: '(.*)'/g)].map((m) => m[1].replace(/''/g, "'"));
  const h2 = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim()).filter((h) => !SKIP_H2.test(h));
  return {
    slug: path.basename(file, '.md'),
    title: get('h1'),
    description: get('description'),
    pilar: (fm.match(/^pilar: (\w+)/m) || [])[1],
    faq,
    poin: h2.slice(0, 3),
  };
}

const PILAR = { panduan: 'Panduan', modal: 'Modal & Keuangan', hobi: 'Hobi Jadi Usaha' };

const BASE_CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,'Liberation Sans',sans-serif;-webkit-font-smoothing:antialiased}
  .fit{overflow:hidden}
  .brand{font-weight:800;letter-spacing:-.5px}
  .brand span{color:#ffd76a}
`;
// Mengecilkan huruf elemen .fit sampai muat di kotaknya.
const FIT_JS = `
  for (const el of document.querySelectorAll('.fit')) {
    let size = parseFloat(getComputedStyle(el).fontSize);
    while ((el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) && size > 16) {
      size -= 2; el.style.fontSize = size + 'px';
    }
  }
`;

function pinHtml(variant, d) {
  const kicker = d.kind === 'calc' ? 'KALKULATOR GRATIS' : PILAR[d.pilar].toUpperCase();
  if (variant === 1) {
    return `<div style="width:1000px;height:1500px;background:#0f7b55;color:#fff;padding:90px 80px;display:flex;flex-direction:column">
      <div style="font-size:34px;font-weight:700;letter-spacing:3px;opacity:.85">${esc(kicker)}</div>
      <div class="fit" style="font-size:96px;font-weight:800;line-height:1.08;margin-top:40px;height:330px">${esc(d.hook)}</div>
      <div class="fit" style="font-size:170px;font-weight:900;color:#ffd76a;line-height:1;margin-top:60px;height:190px;white-space:nowrap">${esc(d.angka)}</div>
      <div class="fit" style="font-size:46px;line-height:1.3;margin-top:30px;height:190px;opacity:.95">${esc(d.label)}</div>
      <div style="margin-top:auto;background:#fff;color:#0f7b55;border-radius:28px;padding:36px 40px;font-size:44px;font-weight:700;text-align:center">${d.kind === 'calc' ? 'Coba hitung sendiri, gratis' : 'Baca panduan lengkapnya'}</div>
      <div class="brand" style="font-size:56px;margin-top:50px;text-align:center">Laba<span>Kita</span></div>
    </div>`;
  }
  if (variant === 2) {
    const poin = d.poin.length ? d.poin : ['Rumus dan contoh angka', 'Kesalahan yang sering terjadi', 'Panduan terkait'];
    return `<div style="width:1000px;height:1500px;background:#fff8e7;color:#1c2421;padding:90px 80px;display:flex;flex-direction:column">
      <div style="font-size:34px;font-weight:700;letter-spacing:3px;color:#0f7b55">${esc(kicker)}</div>
      <div class="fit" style="font-size:84px;font-weight:800;line-height:1.1;margin-top:40px;height:420px">${esc(d.title)}</div>
      <div style="margin-top:50px;display:flex;flex-direction:column;gap:34px">
        ${poin.map((p) => `<div style="display:flex;gap:28px;align-items:flex-start"><div style="flex:none;width:64px;height:64px;border-radius:50%;background:#0f7b55;color:#fff;font-size:40px;font-weight:800;display:flex;align-items:center;justify-content:center">✓</div><div class="fit" style="font-size:46px;line-height:1.25;height:118px;font-weight:600">${esc(p)}</div></div>`).join('')}
      </div>
      <div style="margin-top:auto;text-align:center">
        <div style="font-size:40px;color:#5b6862">${d.kind === 'calc' ? 'Kalkulator + rumus + contoh' : 'Lengkap dengan contoh angka'}</div>
        <div class="brand" style="font-size:60px;margin-top:20px;color:#0f7b55">Laba<span style="color:#1c2421">Kita</span></div>
      </div>
    </div>`;
  }
  const q = d.faq[0] || d.hook;
  return `<div style="width:1000px;height:1500px;background:#14201b;color:#fff;padding:90px 80px;display:flex;flex-direction:column">
    <div style="font-size:200px;line-height:.8;color:#ffd76a;font-weight:900">?</div>
    <div class="fit" style="font-size:90px;font-weight:800;line-height:1.12;margin-top:30px;height:640px">${esc(q)}</div>
    <div class="fit" style="font-size:48px;line-height:1.3;margin-top:40px;height:200px;color:#c9d6d0">Jawabannya ada di ${esc(d.kind === 'calc' ? d.title : 'panduan ' + d.title)}</div>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center">
      <div class="brand" style="font-size:60px">Laba<span>Kita</span></div>
      <div style="font-size:38px;color:#c9d6d0">gratis, tanpa daftar</div>
    </div>
  </div>`;
}

function ogHtml(d) {
  const kicker = d.kind === 'calc' ? 'KALKULATOR GRATIS' : d.kind === 'page' ? 'LABAKITA' : PILAR[d.pilar].toUpperCase();
  return `<div style="width:1200px;height:630px;background:#fff;display:flex">
    <div style="width:26px;background:#0f7b55"></div>
    <div style="flex:1;padding:64px 72px;display:flex;flex-direction:column">
      <div style="font-size:26px;font-weight:700;letter-spacing:3px;color:#0f7b55">${esc(kicker)}</div>
      <div class="fit" style="font-size:66px;font-weight:800;line-height:1.12;color:#1c2421;margin-top:26px;max-height:230px">${esc(d.title)}</div>
      ${d.hook ? `<div class="fit" style="font-size:34px;line-height:1.3;color:#5b6862;margin-top:20px;max-height:92px">${esc(d.label.charAt(0).toUpperCase() + d.label.slice(1))}</div>` : `<div style="font-size:34px;line-height:1.3;color:#5b6862;margin-top:14px">Kalkulator gratis dan panduan dengan contoh angka nyata</div>`}
      <div style="margin-top:auto;display:flex;align-items:center;justify-content:space-between">
        <div class="brand" style="font-size:46px;color:#0f7b55">Laba<span style="color:#1c2421">Kita</span></div>
        ${d.angka ? `<div style="background:#0f7b55;color:#fff;border-radius:16px;padding:16px 28px;font-size:40px;font-weight:800">${esc(d.angka)}</div>` : ''}
      </div>
    </div>
  </div>`;
}

const page = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${inner}<script>${FIT_JS}</script></body></html>`;

(async () => {
  const site = (await import(path.join(ROOT, 'site.config.mjs'))).default;
  const { calculatorContent } = await import(path.join(ROOT, 'src/data/calculator-content.js'));
  const hooks = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/materi-promosi/hook.json'), 'utf8'));

  const items = [
    ...calculatorContent.map((c) => ({
      kind: 'calc', slug: c.slug, title: c.nama, description: c.description,
      faq: c.faq.map((f) => f.q), poin: [...c.body.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1]).slice(0, 3),
    })),
    ...fs.readdirSync(path.join(ROOT, 'src/content/artikel')).filter((f) => f.endsWith('.md'))
      .map((f) => ({ kind: 'article', ...parseArticle(path.join(ROOT, 'src/content/artikel', f)) })),
  ].map((d) => {
    if (!hooks[d.slug]) throw new Error(`hook.json belum punya teks untuk ${d.slug}`);
    return { ...d, ...hooks[d.slug] };
  });
  const pages = [
    { kind: 'page', slug: 'default', title: `${site.name}: Kalkulator & Panduan Usaha Kecil dan Keuangan` },
    { kind: 'page', slug: 'kalkulator', title: 'Kalkulator Usaha & Keuangan Gratis' },
    { kind: 'page', slug: 'panduan', title: 'Panduan Usaha: Legalitas, Pajak, Marketplace & Pembayaran' },
    { kind: 'page', slug: 'modal-keuangan', title: 'Modal & Keuangan Usaha: Pinjaman, Perbankan & Arus Kas' },
    { kind: 'page', slug: 'hobi-jadi-usaha', title: 'Hobi Jadi Usaha: Modal, HPP & Cara Memulai' },
  ];

  for (const dir of ['public/og', 'public/pin']) fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const tab = await ctx.newPage();

  for (const d of [...items, ...pages]) {
    await tab.setViewportSize({ width: 1200, height: 630 });
    await tab.setContent(page(ogHtml(d)));
    await tab.screenshot({ path: path.join(ROOT, 'public/og', `${d.slug}.png`) });
  }
  const rows = [['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords']];
  const BOARD = { calc: 'Kalkulator Usaha Gratis', panduan: 'Panduan Usaha Kecil', modal: 'Modal & Keuangan Usaha', hobi: 'Hobi Jadi Usaha' };
  for (const d of items) {
    for (const v of [1, 2, 3]) {
      await tab.setViewportSize({ width: 1000, height: 1500 });
      await tab.setContent(page(pinHtml(v, d)));
      const file = `${d.slug}-${v}.jpg`;
      await tab.screenshot({ path: path.join(ROOT, 'public/pin', file), type: 'jpeg', quality: 72 });
      const title = v === 1 ? `${d.hook}: ${d.angka}` : v === 2 ? d.title : d.faq[0] || d.title;
      rows.push([
        title.slice(0, 100),
        `${site.url}/pin/${file}`,
        BOARD[d.kind === 'calc' ? 'calc' : d.pilar],
        '',
        d.description,
        `${site.url}/${d.slug}/`,
        '',
        '',
      ]);
    }
  }
  await browser.close();
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
  fs.writeFileSync(path.join(ROOT, 'data/materi-promosi/pinterest.csv'), csv);
  console.log(`${items.length + pages.length} gambar OG, ${items.length * 3} pin, ${rows.length - 1} baris CSV`);
})();
