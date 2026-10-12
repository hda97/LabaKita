# Materi promosi (Fase 6: trafik awal)

Semua materi di sini dibuat dari konten situs. Gunakan setelah situs online di domain final, karena tautannya mengikuti `url` di `site.config.mjs`.

Aturan utama dari workflow: **jangan spam tautan**. Satu jawaban yang benar-benar membantu dengan satu tautan lebih efektif daripada sepuluh postingan promosi.

## Jadwal mingguan (bagian dari jadwal 10–15 jam)

| Hari | Kegiatan promosi | Waktu |
|---|---|---|
| Sabtu | Unggah 9–15 pin, 1–2 video pendek, jawab 3–5 pertanyaan di grup | 1–2 jam |
| Minggu | Kirim 1 pesan WhatsApp Channel, cek hasil di Analytics | 15 menit |

## 1. Pinterest

**Yang sudah disiapkan**

- `public/pin/<halaman>-1.jpg`, `-2.jpg`, `-3.jpg`: 3 desain pin vertikal (1000×1500) untuk setiap kalkulator dan artikel, total 144 pin.
  - Variasi 1: hook + angka besar (contoh: "Hitung HPP dalam 2 menit — Rp9.000").
  - Variasi 2: judul + 3 poin isi.
  - Variasi 3: pertanyaan dari FAQ.
- `data/materi-promosi/pinterest.csv`: daftar 144 pin (judul, URL gambar, papan, deskripsi, tautan) dalam format unggah massal Pinterest.
- `public/og/<halaman>.png`: gambar pratinjau 1200×630 yang otomatis muncul saat tautan dibagikan di WhatsApp, Facebook, dan X.

**Langkah**

1. Buat akun Pinterest Business dengan email website.
2. Buat 4 papan: *Kalkulator Usaha Gratis*, *Panduan Usaha Kecil*, *Modal & Keuangan Usaha*, *Hobi Jadi Usaha*.
3. Klaim domain website di pengaturan Pinterest.
4. Setelah domain final aktif, buat ulang gambar dan CSV dengan alamat yang benar:
   ```bash
   SITE_URL=https://domainmu.com node scripts/buat-gambar-sosial.cjs
   ```
   lalu deploy, supaya URL gambar di CSV bisa diakses Pinterest.
5. Unggah bertahap, misalnya 9–15 pin per minggu (bukan 120 sekaligus), lewat fitur unggah massal atau manual. Untuk unggah massal, potong CSV sesuai jumlah pin minggu itu.
6. Gambar dan teks hook diubah di `data/materi-promosi/hook.json`, lalu jalankan skrip lagi. Skrip butuh Playwright dan Chromium.

## 2. Video pendek (TikTok, Reels, Shorts)

Format: 30–60 detik, rekam layar HP saat memakai kalkulator, teks besar di layar, tautan di bio. Akhiri dengan ajakan yang tidak memaksa.

**1. Kalkulator HPP**
- Hook (0–3 detik): "Jualan brownies laku, tapi kok uangnya nggak nambah?"
- Isi: "Coba hitung HPP-nya. Bahan Rp300 ribu, upah Rp60 ribu, gas-kemasan-penyusutan Rp40 ribu, jadi 4 loyang. HPP Rp100 ribu per loyang. Kalau kamu jual Rp110 ribu, untungnya cuma Rp10 ribu."
- Penutup: "Kalkulator HPP gratisnya ada di link bio."

**2. Kalkulator harga jual**
- Hook: "Markup 30% itu BUKAN untung 30%."
- Isi: "HPP Rp9.000, markup 30% jadi Rp11.700. Margin aslinya cuma 23%. Kalau mau margin 30%, harganya Rp12.857."
- Penutup: "Hitung harga jualmu di link bio."

**3. Kalkulator BEP**
- Hook: "Berapa yang harus laku tiap bulan supaya nggak rugi?"
- Isi: "Biaya tetap Rp3 juta, harga Rp15.000, biaya per unit Rp9.000. Tiap produk nyumbang Rp6.000. Jadi minimal 500 produk sebulan, atau 20 sehari."
- Penutup: "Cek titik impas usahamu, gratis."

**4. Kalkulator cicilan**
- Hook: "Bunga 6% bisa beda Rp272 ribu. Kok bisa?"
- Isi: "Pinjam Rp10 juta 12 bulan. Bunga flat total Rp600 ribu, bunga efektif cuma sekitar Rp328 ribu. Selalu tanya: flat atau efektif?"
- Penutup: "Bandingkan cicilannya di link bio."

**5. Kalkulator gaji bersih**
- Hook: "Gaji Rp10 juta, yang masuk rekening berapa?"
- Isi: "Dipotong BPJS Kesehatan 1%, JHT 2%, JP 1%, dan PPh 21. Untuk TK/0 sekitar Rp9,3 juta. Kalau K/2, sedikit lebih besar karena PTKP naik."
- Penutup: "Hitung gaji bersihmu sendiri."

**6. Kalkulator THR**
- Hook: "Baru kerja 6 bulan, dapat THR nggak?"
- Isi: "Dapat. Masa kerja 1–12 bulan dapat proporsional. Upah Rp5 juta, kerja 6 bulan: 6/12 × Rp5 juta = Rp2,5 juta."
- Penutup: "Cek THR-mu di link bio."

**7. Kalkulator zakat penghasilan**
- Hook: "Gajimu sudah wajib zakat belum?"
- Isi: "Nisabnya 85 gram emas setahun. Kalau emas Rp1,5 juta per gram, nisab per bulan sekitar Rp10,6 juta. Penghasilan Rp12 juta, zakatnya 2,5% = Rp300 ribu."
- Penutup: "Masukkan harga emas hari ini di kalkulatornya."

**8. Kalkulator pajak UMKM**
- Hook: "Omzet di bawah Rp500 juta, bayar pajak?"
- Isi: "Untuk orang pribadi, omzet sampai Rp500 juta setahun tidak kena PPh final. Omzet Rp600 juta, yang kena cuma Rp100 juta × 0,5% = Rp500 ribu setahun. Tapi tetap wajib lapor SPT."
- Penutup: "Hitung pajak usahamu, aturannya sudah ikut PP 20/2026."

**9. Kalkulator dana darurat**
- Hook: "Usaha sepi 3 bulan, kamu siap?"
- Isi: "Pengeluaran wajib Rp4 juta sebulan, menikah: siapkan 6 bulan, Rp24 juta. Pemilik usaha sebaiknya lebih lama."
- Penutup: "Hitung target dana daruratmu."

**10. Kalkulator modal usaha**
- Hook: "Modal usaha bukan cuma beli alat."
- Isi: "Alat Rp5 juta, izin Rp1 juta, stok Rp2 juta, plus biaya operasional 3 bulan Rp9 juta, plus cadangan 10%. Totalnya Rp18,7 juta. Banyak usaha tutup karena modal kerjanya habis."
- Penutup: "Hitung modal usahamu di link bio."

## 3. Grup Facebook UMKM dan reseller

Baca aturan grup. Kalau grup melarang tautan, cukup jawab dengan isi yang membantu tanpa tautan. Contoh jawaban:

**"Cara hitung harga jual biar untung gimana ya?"**
> Hitung dulu HPP per produk: semua bahan, kemasan, gas, dan upah sendiri, dibagi jumlah produk yang jadi. Setelah itu harga = HPP ÷ (1 − margin). Misalnya HPP Rp9.000 dan mau margin 30%, harganya Rp12.857, bukan Rp11.700 (itu markup 30%, margin aslinya cuma 23%). Kalau jualan di marketplace, potongan biayanya ikut dimasukkan. Saya pernah tulis contoh lengkapnya di sini kalau mau: [tautan artikel margin]

**"Omzet kecil wajib bayar pajak nggak?"**
> Kalau usaha atas nama pribadi, omzet sampai Rp500 juta setahun tidak kena PPh final 0,5%. Tapi tetap wajib lapor SPT Tahunan, dan omzetnya dicatat. Kalau jualan di Shopee/Tokopedia/Lazada/Blibli, sejak 1 Oktober 2026 kirim surat pernyataan omzet di aplikasinya supaya tidak dipotong PPh 22.

**"Mau pinjam modal, aman yang mana?"**
> Pastikan lembaganya terdaftar di OJK (cek di ojk.go.id atau WA Kontak OJK 081-157-157-157). Untuk usaha yang sudah jalan minimal 6 bulan, KUR biasanya paling murah: 6% efektif per tahun untuk pengajuan pertama. Hitung cicilannya dulu, usahakan maksimal sepertiga laba bersih per bulan.

**"Cara bikin NIB?"**
> Gratis lewat oss.go.id. Pilih UMK perseorangan, isi NIK dan data usaha, pilih KBLI yang sesuai, setujui pernyataan mandiri. Untuk usaha risiko rendah biasanya langsung terbit. Jangan bayar calo.

**"Untung tapi kok uangnya selalu habis?"**
> Sering karena uang usaha dan uang dapur tercampur, atau banyak penjualan yang belum dibayar. Coba buka rekening khusus usaha, gaji diri sendiri dengan jumlah tetap, dan catat setiap pengambilan di luar gaji. Satu bulan saja sudah kelihatan bedanya.

## 4. WhatsApp Channel atau Telegram

Kirim 1–2 kali seminggu, singkat, dengan satu tautan.

**Artikel baru**
> 📌 Baru di LabaKita: Cara memisahkan uang usaha dan pribadi. Lengkap dengan contoh membagi uang masuk tiap minggu.
> [tautan]

**Info aturan** (kirim saat ada perubahan aturan; cek ulang sumbernya dulu)
> ⚠️ Info pajak UMKM: sejak 1 Oktober 2026, Shopee, Tokopedia, Lazada, dan Blibli memotong PPh 22 sebesar 0,5% dari omzet. Penjual perorangan dengan omzet sampai Rp500 juta setahun bisa bebas dengan mengirim surat pernyataan di aplikasi. Penjelasan: [tautan biaya admin marketplace]

**Pengingat musiman**
> 🗓️ Pengingat: batas lapor SPT Tahunan orang pribadi 31 Maret. Omzet di bawah Rp500 juta tetap wajib lapor. Panduan langkahnya: [tautan]

## 5. Email newsletter

Formulir newsletter muncul otomatis setelah `newsletterAction` diisi di `site.config.mjs`. Hadiahnya `assets/template-pembukuan-umkm.xlsx`.

**Email 1 (langsung setelah daftar)**
> Subjek: Template pembukuan usaha yang kamu minta
>
> Halo, terima kasih sudah bergabung. Template pembukuan terlampir. Cara pakainya: isi tahun dan saldo awal di tab Pengaturan, catat setiap uang masuk dan keluar di tab Kas Harian, lalu tab Ringkasan menghitung omzet, laba, dan perkiraan pajak UMKM per bulan.
>
> Kalau belum tahu HPP produkmu, mulai dari sini: [tautan kalkulator HPP]

**Email 2 (3 hari kemudian)**
> Subjek: Kesalahan harga yang paling sering
>
> Banyak penjual memakai markup 30% dan mengira untungnya 30%. Padahal margin aslinya hanya 23%. Lihat bedanya dengan contoh angka: [tautan margin vs markup]

**Email 3 (seminggu kemudian)**
> Subjek: Untung tapi kehabisan uang?
>
> Laba dan arus kas itu berbeda. Buat proyeksi kas 13 minggu supaya tahu minggu mana yang berbahaya: [tautan arus kas]

Setelah itu kirim artikel baru dan info aturan 1–2 kali seminggu.
