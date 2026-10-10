# Status pelaksanaan workflow

Peta setiap fase di dokumen *Workflow Website Usaha & Keuangan sampai Monetisasi Iklan* ke apa yang sudah dikerjakan di repo ini dan apa yang harus dilakukan manual (butuh akun, pembayaran, atau waktu).

Tanda: ✅ selesai di kode · 👤 harus dilakukan pemilik · ⏳ berjalan sesuai jadwal

## Fase 0 — Persiapan

| Tugas | Status |
|---|---|
| Nama website | ✅ **LabaKita** (ganti di `site.config.mjs` kalau perlu) |
| Spreadsheet perencanaan konten (keyword, pilar, status, URL, tanggal terbit) | ✅ `data/keyword-plan.csv`, `data/kalender-konten.csv` |
| Akun Google khusus website, rekening bank, NPWP | 👤 lihat [DEPLOY.md](DEPLOY.md) §1 |
| Sisihkan 10–15 jam per minggu | 👤 |

## Fase 1 — Riset niche & keyword

| Tugas | Status |
|---|---|
| 100 keyword dikelompokkan ke 4 pilar | ✅ `data/keyword-plan.csv` (100 keyword → 65 halaman tujuan; keyword mirip digabung ke satu halaman) |
| Volume & CPC dari Google Keyword Planner | 👤 kolom `volume_bulanan` dan `cpc_rp` masih kosong; isi dari Keyword Planner, lalu dahulukan keyword bernilai tinggi |

## Fase 2 — Domain, hosting & teknis

| Tugas | Status |
|---|---|
| Situs statis (Astro) untuk Cloudflare Pages | ✅ |
| HTTPS | 👤 otomatis di Cloudflare Pages setelah deploy |
| Tema ringan & responsif di HP | ✅ tanpa framework JS, font sistem, diuji tanpa scroll horizontal di lebar 390 px |
| URL pendek tanpa tanggal (`/kalkulator-hpp/`) | ✅ |
| Meta tag SEO manual | ✅ title, description, canonical, Open Graph di setiap halaman |
| Cache & kompresi | ✅ `public/_headers` + kompresi bawaan Cloudflare |
| PageSpeed HP ≥ 80 | 👤 cek di pagespeed.web.dev setelah deploy |
| Backup | ✅ Git |
| Google Analytics 4 sejak hari pertama | ✅ siap, 👤 isi `gaMeasurementId` |

## Fase 3 — Halaman wajib & struktur

| Tugas | Status |
|---|---|
| Tentang Kami, Kontak, Kebijakan Privasi (cookie, GA, DoubleClick, cara opt-out), Disclaimer (bukan nasihat, affiliate, hasil kalkulator perkiraan), S&K | ✅ semua tertaut di footer setiap halaman |
| Foto & latar belakang pengelola di Tentang Kami | 👤 |
| Email dengan domain sendiri | 👤 lalu ubah `email` di `site.config.mjs` |
| Menu: Kalkulator, Panduan, Modal & Keuangan, Hobi Jadi Usaha, kotak Cari di header | ✅ |
| Internal link: setiap artikel → 1 kalkulator + 1 artikel pilar sama + 1 pilar lain | ✅ diperiksa otomatis `npm run check` |
| Setiap kalkulator punya "Panduan terkait" di bawah hasil | ✅ |

## Fase 4 — Produksi konten

| Tugas | Status |
|---|---|
| Bulan 1: 5 kalkulator inti + artikel pendamping | ✅ HPP, harga jual & margin, BEP, cicilan, gaji bersih + 5 artikel pendamping |
| Bulan 2: 5 kalkulator berikutnya | ✅ THR, zakat, pajak UMKM, dana darurat, modal usaha |
| Bulan 2–3: 8 panduan, 6 hobi, 4 modal | ⏳ 2 artikel tambahan sudah terbit (pajak UMKM, modal usaha kue); 23 artikel berikutnya terjadwal di `data/kalender-konten.csv` sampai total 30 |
| Template artikel (jawaban langsung, contoh angka, kesalahan umum, FAQ, terkait, tanggal & penulis) | ✅ semua artikel 1.200+ kata, diperiksa otomatis |
| Rumus kalkulator diuji dengan contoh manual | ✅ `npm test` (12 tes) + uji di browser |
| E-E-A-T: sumber resmi | ✅ setiap artikel regulasi/keuangan punya bagian sumber resmi |
| E-E-A-T: pengalaman nyata | 👤 sunting artikel dengan pengalaman dan contoh sendiri sebelum daftar AdSense |

## Fase 5 — SEO & indexing

| Tugas | Status |
|---|---|
| `/sitemap.xml`, `/robots.txt` | ✅ otomatis dari konten |
| Search Console (verifikasi DNS), kirim sitemap, Bing Webmaster | 👤 [DEPLOY.md](DEPLOY.md) §6 |
| Keyword di judul, URL, H1, paragraf pertama, subjudul | ✅ |
| Meta description 140–155 karakter | ✅ dicek saat build dan `npm run check` |
| Schema: FAQPage, WebApplication (kalkulator), Article, BreadcrumbList, WebSite+SearchAction | ✅ |
| Schema HowTo | Tidak dipakai: Google berhenti menampilkan hasil kaya HowTo sejak 2023, jadi tidak menambah apa pun. Langkah-langkah tetap ditulis sebagai daftar bernomor |
| Tidak ada dua halaman membidik keyword sama | ✅ judul & deskripsi unik dicek otomatis; pemetaan keyword → halaman di `keyword-plan.csv` |
| Rutin bulanan Search Console, backlink | 👤 |
| Kalkulator bisa disematkan situs lain (backlink) | ✅ tidak ada header yang memblokir iframe; aturan penyematan di S&K |

## Fase 6 — Trafik awal

| Tugas | Status |
|---|---|
| Formulir email "template pembukuan gratis" | ✅ komponen siap + `assets/template-pembukuan-umkm.xlsx`; 👤 buat akun newsletter (MailerLite/Brevo/Mailchimp), isi `newsletterAction`, dan pasang template sebagai email otomatis |
| Pinterest, grup Facebook, TikTok/Reels, WhatsApp Channel | 👤 tanpa spam link |

## Fase 7 — AdSense

✅ Kode `<head>` dan `/ads.txt` otomatis terisi begitu `adsenseClient` diisi. 👤 Daftar setelah syarat di [ADSENSE.md](ADSENSE.md) terpenuhi (target bulan 3–4).

## Fase 8 — Pasang & optimalkan iklan

✅ Slot manual siap: setelah paragraf pembuka, di dalam artikel tiap ±350 kata, di bawah hasil kalkulator, multipleks di akhir. Ruang tetap untuk mencegah CLS. Aktif hanya bila `adsEnabled: true`. 👤 Auto Ads, kontrol pemblokiran, CMP, hubungkan Analytics.

## Fase 9 — Monetisasi lanjutan (bulan 6+)

| Tugas | Status |
|---|---|
| Disclaimer affiliate & konten bersponsor | ✅ |
| Affiliate, produk digital (template premium, e-book), Midtrans/Xendit/Lynk.id/Mayar | 👤 bulan 6+ |
| Template pembukuan sebagai produk/hadiah | ✅ versi gratis siap |
| Versi bahasa Inggris & ad network premium | 👤 bulan 12 |

## KPI mingguan

Halaman terindeks, klik & tayangan Google, pageview per sesi (target > 1,5), RPM halaman & klik affiliate, pelanggan email baru. Catat di spreadsheet yang sama dengan rencana konten.
