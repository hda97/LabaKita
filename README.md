# LabaKita

Website kalkulator & panduan untuk usaha kecil dan keuangan pribadi, dibangun mengikuti dokumen *Workflow Website Usaha & Keuangan sampai Monetisasi Iklan*. Situs statis (Astro) yang siap dipasang gratis di Cloudflare Pages.

**Isi saat ini:** 14 kalkulator, 34 artikel (1.200+ kata, tersebar di 3 pilar), 5 halaman wajib AdSense, sitemap, robots.txt, ads.txt, pencarian, schema markup, dan slot iklan yang tinggal diaktifkan.

## Mulai

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # uji rumus semua kalkulator dengan contoh hitungan manual
npm run build      # hasil di dist/
npm run check      # validasi hasil build (tautan, meta, aturan internal link, jumlah kata)
```

Butuh Node.js 22.12 atau lebih baru (lihat `.nvmrc`).

## Tampilan

Tipografi Source Serif 4 (judul) dan IBM Plex Sans/Mono (isi), warna hijau tunggal, mode gelap, dan tombol A−/A+ untuk ukuran teks. Semua token warna ada di awal `src/styles/global.css`. Pilihan tema, ukuran teks, artikel yang sudah dibaca, langkah yang dicentang, dan hasil kuis hanya disimpan di `localStorage` perangkat pembaca (tidak dikirim ke server).

## Mengubah identitas, Analytics, dan iklan

Semua ada di **`site.config.mjs`**: nama situs, domain, email, ID Google Analytics 4, ID AdSense, saklar iklan, ID slot iklan, dan URL formulir newsletter. Nilai kosong berarti fiturnya mati. Lihat [docs/ADSENSE.md](docs/ADSENSE.md) untuk urutan pengisiannya.

## Struktur

| Lokasi | Isi |
|---|---|
| `src/lib/calc.js` | Rumus semua kalkulator (fungsi murni, diuji di `tests/`) |
| `src/lib/calculators.js` | Input dan output setiap kalkulator |
| `src/data/calculator-content.js` | Judul SEO, penjelasan, contoh, FAQ, dan tautan terkait setiap kalkulator |
| `src/content/artikel/*.md` | Artikel (satu file = satu halaman, URL = nama file) |
| `src/data/pilar.js` | Tiga pilar artikel: Panduan, Modal & Keuangan, Hobi Jadi Usaha |
| `src/pages/` | Halaman: beranda, indeks kalkulator & pilar, 5 halaman wajib, cari, sitemap, robots, ads.txt |
| `src/lib/rehype-ads.mjs` | Menyisipkan iklan di dalam artikel (setelah paragraf pembuka dan tiap ±350 kata) |
| `scripts/check-site.mjs` | Pemeriksaan otomatis aturan workflow pada hasil build |
| `data/keyword-plan.csv` | 100 keyword per pilar beserta halaman tujuannya (Fase 1) |
| `data/kalender-konten.csv` | Status 30 artikel terbit (target Fase 4 tercapai) |
| `assets/template-pembukuan-umkm.xlsx` | Template pembukuan untuk hadiah formulir email (Fase 6 & 9) |
| `src/pages/embed/` | Kalkulator versi sematan untuk blog lain (backlink, Fase 5) |
| `public/og/`, `public/pin/` | Gambar pratinjau tautan dan 144 pin Pinterest, dibuat `scripts/buat-gambar-sosial.cjs` |
| `public/thumb/` | Thumbnail kartu artikel/kalkulator (WebP 480×252), dibuat `scripts/buat-thumbnail.py` dari `public/og/` |
| `src/pages/hobi-jadi-usaha/index.astro`, `src/data/hobi.js` | Halaman Hobi Jadi Usaha: kuis, 7 langkah, kalkulator laba, dan saringan artikel per hobi |
| `data/materi-promosi/` | Teks hook pin dan CSV unggah massal Pinterest |

## Dokumentasi

- [docs/WORKFLOW.md](docs/WORKFLOW.md): status setiap fase workflow, apa yang sudah dikerjakan di kode dan apa yang harus dikerjakan manual.
- [docs/DEPLOY.md](docs/DEPLOY.md): domain, Cloudflare Pages, Search Console, Bing, Analytics.
- [docs/MENULIS-KONTEN.md](docs/MENULIS-KONTEN.md): cara menambah artikel dan kalkulator sesuai template dan standar kualitas.
- [docs/ADSENSE.md](docs/ADSENSE.md): syarat, langkah daftar, mengaktifkan iklan, dan larangan.
- [docs/MATERI-PROMOSI.md](docs/MATERI-PROMOSI.md): materi Pinterest, naskah video pendek, template jawaban grup, WhatsApp Channel, dan email.
- [docs/FAKTA-DIPERIKSA.md](docs/FAKTA-DIPERIKSA.md): angka dan aturan yang sering berubah, di mana dipakai, dan kapan dicek ulang.
