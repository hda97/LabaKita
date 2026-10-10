# Google AdSense: daftar, lolos, pasang, optimalkan (Fase 7–8)

## Kapan mendaftar

Daftar setelah **semua** ini terpenuhi:

- [ ] 10 kalkulator (sudah) dan 25–30 artikel terbit (saat ini 7; jadwal di `data/kalender-konten.csv`).
- [ ] Situs berumur sekitar 2–3 bulan di domain sendiri.
- [ ] Halaman sudah terindeks di Search Console (cek laporan **Halaman**).
- [ ] 5 halaman wajib ada dan tertaut di footer (sudah: Tentang, Kontak, Kebijakan Privasi, Disclaimer, S&K).
- [ ] Halaman Tentang Kami diperkaya dengan latar belakang dan foto asli pengelola (bagus untuk kepercayaan di topik keuangan).
- [ ] Email kontak dengan domain sendiri sudah aktif.
- [ ] Tidak ada halaman kosong, kategori tanpa isi, atau teks contoh tema. Build otomatis gagal kalau ada pilar tanpa artikel.
- [ ] `npm run check` lulus.

Google tidak menetapkan trafik minimum, tetapi meminta konten orisinal, berkualitas, punya pengunjung, dan akses ke kode HTML situs.

## Langkah pendaftaran

1. Buka adsense.google.com → daftar dengan akun Google website.
2. Masukkan URL situs, negara Indonesia, setujui persyaratan.
3. Salin ID penerbit (`ca-pub-XXXXXXXXXXXXXXXX`) ke `adsenseClient` di `site.config.mjs`. **Biarkan `adsEnabled: false`.** Commit dan push. Ini otomatis:
   - memasang kode AdSense di `<head>` semua halaman;
   - mengisi `/ads.txt` dengan baris `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
4. Setelah deploy, buka `https://domainmu/ads.txt` dan lihat sumber halaman (cari `adsbygoogle.js`) untuk memastikan.
5. Di AdSense klik **Minta peninjauan**. Biasanya beberapa hari sampai 2–4 minggu.
6. Lengkapi info pembayaran dan pajak. Saat saldo sekitar US$10, Google mengirim PIN verifikasi alamat lewat pos.
7. Isi rekening bank; pembayaran dikirim tiap bulan setelah saldo mencapai US$100.

### Kalau ditolak

| Alasan | Perbaikan |
|---|---|
| Konten bernilai rendah | Tambah kedalaman, contoh nyata, kalkulator; gabungkan atau hapus artikel tipis |
| Situs belum siap | Hapus halaman kosong dan teks contoh |
| Navigasi sulit | Menu, halaman wajib di footer, dan kotak pencarian sudah ada; cek lagi tautan rusak dengan `npm run check` |
| Pelanggaran kebijakan | Hapus konten salinan, gambar tanpa izin, topik terlarang |
| ads.txt / kode tidak ditemukan | Cek `adsenseClient`, deploy terbaru, dan `/ads.txt` |

Perbaiki selama 2–4 minggu, tambah 5–10 konten berkualitas, lalu ajukan ulang. Jangan mengajukan ulang di hari yang sama tanpa perubahan.

## Setelah disetujui

1. **Auto Ads dulu (2–4 minggu)**: di AdSense → Iklan → Menurut situs → aktifkan Iklan otomatis, termasuk **anchor** (bawah layar HP) dan **vignette** (antar halaman). Pantau waktu di situs.
2. **Unit iklan manual**: buat unit di AdSense → Iklan → Menurut unit iklan, lalu salin ID slot ke `site.config.mjs`:

| Kunci `adSlots` | Jenis unit di AdSense | Posisi di situs |
|---|---|---|
| `afterIntro` | Display responsif / in-article | Setelah paragraf pembuka artikel |
| `inArticle` | In-article | Sebelum subjudul, minimal tiap ±350 kata |
| `afterResult` | Display responsif | Di bawah hasil kalkulator |
| `endOfArticle` | Multipleks | Akhir artikel dan halaman kalkulator |

   Lalu ubah `adsEnabled: true`, commit, push. Slot yang ID-nya kosong tidak ditampilkan. Setiap slot punya ruang tetap (min-height) supaya halaman tidak bergeser saat iklan dimuat (CLS).

   Sidebar sticky desktop sengaja tidak dibuat karena tata letak satu kolom lebih cepat dan nyaman di HP; Auto Ads tetap bisa mengisi ruang samping di desktop.

3. **Pengaturan dasbor AdSense**:
   - [ ] Kontrol pemblokiran: blokir kategori sensitif (judi, pinjaman ilegal, kencan).
   - [ ] Izinkan kategori iklan umum lainnya agar lebih banyak pengiklan bersaing.
   - [ ] Iklan teks dan display aktif di semua unit.
   - [ ] **Privasi & pesan** → buat pesan persetujuan (CMP) bawaan Google untuk pengunjung Eropa/Inggris. Kebijakan privasi situs sudah menyebutkannya.
   - [ ] Hubungkan AdSense dengan Google Analytics untuk melihat RPM per halaman.

## Optimasi bulanan

- Ukur **RPM halaman**, bukan jumlah klik.
- Urutkan halaman berdasarkan RPM dan trafik → buat lebih banyak konten mirip halaman RPM tertinggi.
- Uji satu perubahan penempatan per 2 minggu; bandingkan RPM sebelum dan sesudah.
- Pantau Core Web Vitals di Search Console.
- Jangan sampai iklan lebih banyak daripada konten di layar HP pertama.

## Larangan (bisa membuat akun diblokir permanen)

- Mengklik iklan sendiri atau meminta orang lain mengklik, termasuk grup "saling klik".
- Membeli trafik murah atau trafik bot.
- Menulis ajakan "klik iklan untuk mendukung kami" atau membuat iklan menyerupai tombol/menu.
- Menyalin konten situs lain atau menulis ulang otomatis tanpa nilai tambah.
- Mempromosikan pinjol ilegal, investasi bodong, judi, atau produk tidak berizin OJK.
- Memakai gambar dari Google tanpa izin.
