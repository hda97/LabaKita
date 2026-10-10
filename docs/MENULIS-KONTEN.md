# Menulis konten (Fase 4)

## Ritme

- Sebelum daftar AdSense: **10 kalkulator + 25–30 artikel**, terbit bertahap 3–4 konten per minggu. Jadwalnya ada di `data/kalender-konten.csv`.
- Setelah itu: 2–4 konten per minggu. Mulai bulan ke-4, perbarui artikel yang mulai masuk halaman 2 Google dan tambah topik dari kueri di Search Console.
- Jadwal mingguan (10–15 jam): Senin riset 3–4 keyword · Selasa–Kamis tulis 1 artikel/hari atau 1 kalkulator · Jumat edit, internal link, terbitkan · Sabtu bagikan ke Pinterest, grup Facebook, TikTok · Minggu cek Search Console & Analytics.

## Menambah artikel

1. Pilih keyword dari `data/keyword-plan.csv`. **Satu keyword utama = satu halaman**; keyword yang mirip digabung ke halaman yang sama (kolom `halaman_tujuan`).
2. Buat file `src/content/artikel/<slug>.md`. Nama file menjadi URL (`/<slug>/`), pendek, tanpa tanggal.
3. Frontmatter (diperiksa otomatis saat build):

```yaml
---
title: 'Judul SEO berisi keyword + manfaat'          # tag <title>
h1: 'Judul yang tampil di halaman'
description: '140–155 karakter, mengundang klik'     # build gagal kalau di luar 140–155
pilar: panduan        # panduan | modal | hobi
keyword: 'keyword utama'
published: 2026-10-20
updated: 2026-10-20
kalkulator: kalkulator-hpp   # kalkulator utama yang terkait
faq:                  # 3–5 pertanyaan dari People Also Ask
  - q: 'Pertanyaan?'
    a: 'Jawaban.'
---
```

4. Isi mengikuti template:
   1. Paragraf pembuka yang langsung menjawab dalam 2–3 kalimat (keyword utama ada di paragraf ini).
   2. Tautan ke kalkulator atau tabel ringkas di awal.
   3. Langkah demi langkah dengan contoh angka nyata (`##` untuk subjudul, keyword di 1–2 subjudul).
   4. Kesalahan yang sering terjadi.
   5. Sumber resmi (DJP, OJK, BPJS, OSS, Kemnaker, dsb.).
   6. FAQ, artikel terkait, tanggal, dan nama penulis ditambahkan otomatis oleh layout.
5. **Aturan internal link** (diperiksa `npm run check`): isi artikel menautkan minimal 1 kalkulator, 1 artikel di pilar yang sama, dan 1 artikel di pilar lain.
6. Minimal **1.200 kata** (diperiksa `npm run check`).
7. Jalankan `npm run build && npm run check`, lalu perbarui status di `data/keyword-plan.csv` dan `data/kalender-konten.csv`.

Artikel yang belum siap bisa diberi `draft: true` supaya tidak ikut terbit.

## Menambah kalkulator

1. Tulis rumusnya di `src/lib/calc.js` dan **ujinya dengan contoh hitungan manual** di `tests/calc.test.mjs`.
2. Daftarkan input & output di `src/lib/calculators.js` (kunci = slug, misalnya `kalkulator-pesangon`).
3. Tambahkan teksnya di `src/data/calculator-content.js`: judul SEO, deskripsi 140–155 karakter, intro, rumus, isi, 3 FAQ, artikel & kalkulator terkait.
4. `npm test && npm run build && npm run check`.

## Standar kualitas (E-E-A-T)

- Pakai contoh dan angka dari pengalaman nyata atau wawancara pelaku usaha; tambahkan pengalamanmu sendiri ke artikel yang sudah ada.
- Cantumkan sumber resmi untuk aturan dan angka.
- Boleh memakai AI untuk riset dan draf, tetapi setiap artikel wajib disunting, diberi contoh sendiri, dan dicek faktanya.
- Perbarui artikel pajak dan pinjaman setiap ada aturan baru dan minimal tiap 3 bulan; ubah `updated` di frontmatter.
- Gambar: foto sendiri, Unsplash, Pexels, atau buatan sendiri. Jangan memakai gambar dari Google tanpa izin.

## Hal yang harus dicek berkala

| Kapan | Apa |
|---|---|
| Awal tahun | Batas upah Jaminan Pensiun (default kalkulator gaji bersih: Rp10.547.400) |
| Saat ada aturan baru | Tarif & jangka waktu PPh Final UMKM, tarif TER PPh 21, bunga KUR |
| Setiap 3 bulan | Semua artikel pilar Panduan dan Modal & Keuangan |
