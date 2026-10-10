# Deploy: domain, hosting & alat Google (Fase 0, 2, 5)

## 1. Akun & nama (Fase 0, manual)

- [ ] Buat **satu akun Google khusus website** untuk Search Console, Analytics, dan AdSense.
- [ ] Pendaftar AdSense minimal 18 tahun. Kalau belum, akun dibuat atas nama orang tua/wali.
- [ ] Siapkan rekening bank atas nama yang sama dengan akun AdSense, dan NPWP (NIK) untuk info pajak AdSense.
- [ ] Nama situs memakai **LabaKita** (bisa diganti di `site.config.mjs`). Pastikan tidak memakai merek orang lain dan domainnya tersedia.

## 2. Domain

1. Beli domain `.com` atau `.id` (contoh: `labakita.com`) di registrar mana pun, atau langsung di Cloudflare Registrar.
2. Ubah `url` di `site.config.mjs` ke domain itu, misalnya `https://labakita.com`, lalu commit.
3. Ubah `email` ke alamat dengan domain sendiri (misalnya `halo@labakita.com`). Cloudflare Email Routing bisa meneruskannya gratis ke Gmail.

## Mode pratinjau dan mode produksi

`site.config.mjs` punya saklar `indexable`. Nilai bawaannya `false` (pratinjau): semua halaman diberi `noindex` dan `robots.txt` memblokir seluruh situs. Ini dipakai untuk pratinjau di alamat sementara seperti `*.netlify.app`, supaya reputasi SEO tidak terbangun di alamat yang nanti ditinggalkan.

Setelah domain final aktif, build dengan `npm run build:prod` (atau set variabel `SITE_INDEXABLE=true`), lalu daftarkan domain itu di Search Console.

## 3. Cloudflare Pages (hosting gratis, HTTPS otomatis)

1. Masuk ke dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, pilih repo `LabaKita`.
2. Pengaturan build:
   - Framework preset: **Astro**
   - Build command: `npm run build:prod` (situs boleh diindeks Google). Pakai `npm run build` untuk pratinjau yang tidak diindeks.
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`, dan `SITE_URL` = `https://domainmu.com` (atau ubah `url` di `site.config.mjs`)
3. Deploy. Situs aktif di `https://<nama-proyek>.pages.dev`.
4. **Custom domains** → tambahkan domainmu. Kalau DNS domain di Cloudflare, sertifikat SSL (HTTPS) dibuat otomatis.
5. Setiap push ke branch utama akan men-deploy ulang otomatis.

Header cache & keamanan ada di `public/_headers`.

### Alternatif: Cloudflare Workers (Workers Builds)

Kalau proyek dibuat lewat **Workers & Pages → Create → Workers → Import a repository**, Cloudflare memakai Workers dengan static assets. Konfigurasinya sudah ada di `wrangler.jsonc` (menyajikan folder `dist/`, halaman 404 sendiri, dan garis miring di akhir URL).

Pengaturan build di **Settings → Build**:

- Build command: `npm run build` (pratinjau) atau `npm run build:prod` (setelah domain final)
- Deploy command: `npx wrangler deploy`
- Root directory: kosong (akar repo)
- Build variables: `SITE_URL` = alamat situs, misalnya `https://labakita.<akunmu>.workers.dev` atau domainmu; Node mengikuti `.nvmrc` (22)
- Branch produksi: branch yang berisi kode situs

Konfigurasi ini sudah diuji dengan `wrangler deploy --dry-run` dan `wrangler dev` (runtime Workers lokal).

## 4. Kecepatan (target PageSpeed HP ≥ 80 sebelum iklan)

Situs ini tanpa framework JavaScript di sisi browser, font sistem, dan CSS kecil, jadi skornya tinggi secara bawaan. Setelah deploy, cek di pagespeed.web.dev untuk beranda, satu kalkulator, dan satu artikel. Gambar yang ditambahkan nanti sebaiknya WebP, dengan nama file dan alt text deskriptif.

## 5. Google Analytics 4 (sejak hari pertama)

1. analytics.google.com → buat properti → aliran data **Web** → masukkan domain.
2. Salin **Measurement ID** (`G-XXXXXXXXXX`) ke `gaMeasurementId` di `site.config.mjs`, commit, push.

## 6. Google Search Console & Bing (Fase 5)

1. search.google.com/search-console → **Tambahkan properti** → **Domain** → verifikasi lewat **DNS (TXT)** di Cloudflare.
2. **Sitemap** → kirim `sitemap.xml`.
3. Pastikan `robots.txt` (`/robots.txt`) tidak memblokir halaman penting. Hanya `/cari/` yang diblokir.
4. bing.com/webmasters → **Impor dari Google Search Console**.
5. Untuk artikel baru: Search Console → **Inspeksi URL** → **Minta pengindeksan**.

## 7. Backup

Seluruh situs ada di Git (GitHub), jadi setiap commit adalah backup. Spreadsheet perencanaan (`data/*.csv`) juga ikut tersimpan.
