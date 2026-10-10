// Teks halaman kalkulator: judul SEO, penjelasan rumus, contoh, FAQ, dan tautan terkait.
// Panjang meta description dicek otomatis saat build (140–160 karakter).

export const kategoriKalkulator = [
  { id: 'usaha', nama: 'Usaha & Harga' },
  { id: 'pinjaman', nama: 'Pinjaman & Pajak' },
  { id: 'karyawan', nama: 'Gaji & Karyawan' },
  { id: 'pribadi', nama: 'Keuangan Pribadi' },
];

export const calculatorContent = [
  {
    slug: 'kalkulator-hpp',
    kategori: 'usaha',
    nama: 'Kalkulator HPP',
    keyword: 'kalkulator HPP',
    title: 'Kalkulator HPP Gratis: Cara Menghitung HPP per Produk',
    h1: 'Kalkulator HPP (Harga Pokok Produksi)',
    description:
      'Hitung HPP per produk dalam 1 menit: masukkan biaya bahan, tenaga kerja, dan overhead. Lengkap dengan rumus, contoh angka, dan kesalahan yang umum.',
    intro:
      'HPP (harga pokok produksi) per unit adalah total biaya bahan baku, tenaga kerja, dan overhead dalam satu kali produksi dibagi jumlah produk yang dihasilkan. Isi kalkulator di bawah dengan biaya satu kali produksi (satu batch) untuk melihat modal sebenarnya per produk.',
    rumus: 'HPP per unit = (bahan baku + tenaga kerja + overhead) ÷ jumlah unit',
    body: `
<h2>Cara menghitung HPP</h2>
<ol>
  <li><strong>Pilih satu kali produksi.</strong> Misalnya satu adonan yang menghasilkan 50 bungkus kue.</li>
  <li><strong>Jumlahkan bahan baku.</strong> Semua bahan yang habis dalam produksi itu, dihitung dari harga beli terakhir.</li>
  <li><strong>Hitung tenaga kerja.</strong> Upah yang dibayar untuk produksi itu. Kalau dikerjakan sendiri, tetap beri nilai upah wajar supaya hasilnya tidak menipu.</li>
  <li><strong>Hitung overhead.</strong> Gas, listrik, air, kemasan, dan penyusutan alat yang terpakai untuk produksi itu.</li>
  <li><strong>Bagi dengan jumlah produk yang layak jual.</strong> Produk gagal atau rusak tidak ikut dihitung.</li>
</ol>
<h2>Contoh</h2>
<p>Satu kali produksi kue kering memakai bahan Rp300.000, upah pembantu Rp100.000, serta gas, listrik, dan toples Rp50.000. Hasilnya 50 toples layak jual. HPP per toples = Rp450.000 ÷ 50 = <strong>Rp9.000</strong>.</p>
<h2>Kesalahan yang sering terjadi</h2>
<ul>
  <li>Tidak menghitung upah sendiri, sehingga harga jual terlihat untung padahal pemilik bekerja gratis.</li>
  <li>Lupa kemasan, ongkos belanja bahan, dan potongan aplikasi marketplace.</li>
  <li>Memakai harga bahan lama. Perbarui HPP setiap kali harga bahan naik.</li>
</ul>`,
    faq: [
      {
        q: 'Apa bedanya HPP dan harga jual?',
        a: 'HPP adalah modal untuk membuat satu produk. Harga jual adalah HPP ditambah keuntungan. Setelah tahu HPP, gunakan kalkulator harga jual untuk menentukan harga dengan margin yang diinginkan.',
      },
      {
        q: 'Apakah biaya sewa tempat masuk HPP?',
        a: 'Biaya sewa termasuk biaya tetap. Untuk usaha kecil, sewa bisa dimasukkan ke overhead secara proporsional, atau dihitung terpisah lewat kalkulator BEP agar terlihat berapa produk yang harus terjual setiap bulan.',
      },
      {
        q: 'Seberapa sering HPP harus dihitung ulang?',
        a: 'Setiap kali harga bahan utama berubah, dan minimal sebulan sekali untuk usaha makanan karena harga bahan pokok sering naik turun.',
      },
    ],
    artikel: ['menghitung-hpp-usaha-kue', 'modal-usaha-kue-rumahan'],
    kalkulator: ['kalkulator-harga-jual', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-harga-jual',
    kategori: 'usaha',
    nama: 'Kalkulator Harga Jual & Margin',
    keyword: 'cara menghitung harga jual',
    title: 'Kalkulator Harga Jual & Margin: Cara Menghitung Harga Jual',
    h1: 'Kalkulator Harga Jual & Margin Keuntungan',
    description:
      'Tentukan harga jual dari HPP dengan target margin atau markup. Kalkulator langsung menunjukkan laba per unit, margin, dan markup beserta contoh hitungan.',
    intro:
      'Harga jual dengan target margin dihitung dari HPP dibagi (1 − margin). Kalau yang dipakai markup, harga jual adalah HPP dikali (1 + markup). Masukkan HPP per unit dan target keuntungan untuk melihat keduanya sekaligus.',
    rumus: 'Harga jual (margin) = HPP ÷ (1 − margin%)  ·  Harga jual (markup) = HPP × (1 + markup%)',
    body: `
<h2>Margin atau markup?</h2>
<p><strong>Margin</strong> adalah laba dibagi harga jual. <strong>Markup</strong> adalah laba dibagi HPP. Dengan HPP Rp9.000, markup 30% menghasilkan harga Rp11.700, tetapi margin 30% menghasilkan harga Rp12.857. Banyak pemilik usaha merasa sudah untung 30% padahal yang dipakai markup, sehingga margin sebenarnya hanya sekitar 23%.</p>
<h2>Langkah menentukan harga jual</h2>
<ol>
  <li>Hitung HPP per unit dengan <a href="/kalkulator-hpp/">kalkulator HPP</a>.</li>
  <li>Tambahkan biaya per unit yang belum masuk HPP: potongan marketplace, ongkos kirim yang ditanggung penjual, dan biaya promosi.</li>
  <li>Tentukan target margin. Usaha makanan rumahan umumnya memakai margin 30–50%, tapi patokan terbaik adalah harga pesaing dan biaya tetap usaha.</li>
  <li>Bulatkan ke harga psikologis yang mudah dibayar, lalu cek apakah penjualan per bulan cukup untuk menutup biaya tetap dengan <a href="/kalkulator-bep/">kalkulator BEP</a>.</li>
</ol>
<h2>Contoh</h2>
<p>HPP keripik Rp9.000 per bungkus, potongan marketplace sekitar Rp900. Biaya per unit Rp9.900. Dengan target margin 35%, harga jual = Rp9.900 ÷ 0,65 = Rp15.231, dibulatkan menjadi <strong>Rp15.500</strong>.</p>`,
    faq: [
      {
        q: 'Berapa margin keuntungan yang wajar untuk UMKM?',
        a: 'Tidak ada angka baku. Yang penting margin cukup untuk menutup biaya tetap, upah pemilik, dan menyisakan laba. Bandingkan dengan harga pesaing dan uji apakah volume penjualan tercapai.',
      },
      {
        q: 'Kenapa margin tidak bisa 100% atau lebih?',
        a: 'Margin adalah bagian laba dari harga jual. Laba tidak mungkin sama dengan atau melebihi harga jual itu sendiri, jadi margin selalu di bawah 100%. Markup boleh lebih dari 100%.',
      },
      {
        q: 'Apakah harga jual sudah termasuk pajak?',
        a: 'Kalkulator ini tidak menambahkan pajak. Usaha yang memakai PPh Final 0,5% membayar pajak dari omzet, sehingga sebaiknya 0,5% itu ikut diperhitungkan sebagai biaya per unit.',
      },
    ],
    artikel: ['perbedaan-margin-dan-markup', 'menghitung-hpp-usaha-kue'],
    kalkulator: ['kalkulator-hpp', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-bep',
    kategori: 'usaha',
    nama: 'Kalkulator BEP (Titik Impas)',
    keyword: 'kalkulator BEP',
    title: 'Kalkulator BEP: Hitung Titik Impas Usaha per Bulan',
    h1: 'Kalkulator BEP (Break Even Point)',
    description:
      'Hitung BEP atau titik impas usaha: berapa unit dan omzet per bulan agar tidak rugi. Masukkan biaya tetap, harga jual, dan biaya variabel per unit.',
    intro:
      'BEP (break even point) dalam unit adalah biaya tetap dibagi selisih harga jual dan biaya variabel per unit. Angka ini menunjukkan berapa produk yang harus terjual setiap bulan supaya usaha tidak rugi.',
    rumus: 'BEP (unit) = biaya tetap ÷ (harga jual − biaya variabel per unit)',
    body: `
<h2>Biaya tetap dan biaya variabel</h2>
<ul>
  <li><strong>Biaya tetap</strong> tidak berubah walaupun penjualan naik atau turun: sewa, gaji karyawan tetap, cicilan alat, langganan aplikasi.</li>
  <li><strong>Biaya variabel</strong> bertambah setiap ada produk terjual: bahan baku, kemasan, komisi reseller, potongan marketplace.</li>
</ul>
<h2>Contoh</h2>
<p>Biaya tetap Rp3.000.000 per bulan. Harga jual Rp15.000, biaya variabel Rp9.000 per unit, sehingga setiap produk menyumbang Rp6.000. BEP = Rp3.000.000 ÷ Rp6.000 = <strong>500 unit per bulan</strong>, atau omzet Rp7.500.000. Produk ke-501 dan seterusnya adalah laba.</p>
<h2>Cara memakai hasil BEP</h2>
<ol>
  <li>Bagi BEP bulanan dengan jumlah hari buka. 500 unit dalam 25 hari berarti minimal 20 unit per hari.</li>
  <li>Kalau angka harian itu tidak realistis, ada tiga pilihan: naikkan harga, tekan biaya variabel, atau kurangi biaya tetap.</li>
  <li>Untuk tahu kapan modal awal kembali, baca panduan <a href="/lama-balik-modal-usaha/">menghitung lama balik modal</a>.</li>
</ol>`,
    faq: [
      {
        q: 'Apa beda BEP dan balik modal?',
        a: 'BEP menunjukkan penjualan minimum agar laba bulanan nol (tidak untung, tidak rugi). Balik modal (payback period) menunjukkan berapa bulan laba yang terkumpul bisa menutup modal awal.',
      },
      {
        q: 'Kenapa hasilnya dibulatkan ke atas?',
        a: 'Produk tidak bisa dijual setengah. Kalau hasil hitungan 499,2 unit, maka baru di unit ke-500 biaya tetap tertutup.',
      },
      {
        q: 'Bagaimana menghitung BEP kalau produknya banyak?',
        a: 'Pakai harga jual dan biaya variabel rata-rata tertimbang sesuai porsi penjualan tiap produk, atau hitung BEP dalam rupiah dengan rasio margin kontribusi.',
      },
    ],
    artikel: ['lama-balik-modal-usaha', 'perbedaan-margin-dan-markup'],
    kalkulator: ['kalkulator-hpp', 'kalkulator-modal-usaha'],
  },
  {
    slug: 'kalkulator-cicilan',
    kategori: 'pinjaman',
    nama: 'Kalkulator Cicilan Pinjaman & KUR',
    keyword: 'hitung cicilan KUR',
    title: 'Kalkulator Cicilan KUR & Pinjaman: Bunga Flat dan Efektif',
    h1: 'Kalkulator Cicilan Pinjaman (KUR, Bank, Koperasi)',
    description:
      'Hitung cicilan per bulan, total bunga, dan total bayar pinjaman KUR atau bank. Pilih bunga efektif (anuitas) atau flat, lengkap dengan contoh hitungan.',
    intro:
      'Cicilan pinjaman dengan bunga efektif (anuitas) dihitung dengan rumus anuitas sehingga besarnya tetap setiap bulan, sedangkan bunga flat dihitung dari pokok awal sepanjang tenor. Masukkan jumlah pinjaman, bunga per tahun, dan tenor untuk melihat cicilannya.',
    rumus: 'Anuitas: P × r ÷ (1 − (1 + r)^−n)  ·  Flat: P ÷ n + P × r  (r = bunga per bulan, n = tenor)',
    body: `
<h2>Contoh menghitung cicilan</h2>
<p>Pinjaman Rp10.000.000, bunga 6% per tahun (0,5% per bulan), tenor 12 bulan.</p>
<ul>
  <li><strong>Bunga efektif/anuitas:</strong> cicilan Rp860.664 per bulan, total bunga sekitar Rp327.972.</li>
  <li><strong>Bunga flat:</strong> cicilan Rp883.333 per bulan, total bunga Rp600.000.</li>
</ul>
<p>Angka bunga yang sama bisa menghasilkan total bunga berbeda jauh. Selalu tanyakan ke bank: bunganya flat atau efektif? Penjelasan lengkapnya ada di <a href="/bunga-flat-vs-efektif/">perbedaan bunga flat dan efektif</a>.</p>
<h2>Tentang bunga KUR</h2>
<p>Suku bunga Kredit Usaha Rakyat (KUR) ditetapkan pemerintah dan dapat berubah, termasuk berbeda untuk debitur baru dan debitur yang mengajukan berulang. Cek angka terbaru di situs resmi KUR Kemenko Perekonomian (kur.ekon.go.id) atau langsung ke bank penyalur sebelum mengisi kalkulator.</p>
<h2>Sebelum mengambil pinjaman</h2>
<ol>
  <li>Pastikan cicilan tidak lebih dari sekitar sepertiga laba bersih usaha per bulan.</li>
  <li>Tanyakan biaya di luar bunga: provisi, administrasi, asuransi, dan denda keterlambatan.</li>
  <li>Hanya meminjam dari lembaga yang terdaftar dan diawasi OJK. Cek legalitasnya di ojk.go.id.</li>
</ol>`,
    faq: [
      {
        q: 'Mana yang lebih murah, bunga flat atau efektif?',
        a: 'Pada angka bunga yang sama, bunga efektif lebih murah karena dihitung dari sisa pokok yang terus berkurang. Bunga flat selalu dihitung dari pokok awal.',
      },
      {
        q: 'Apakah hasil kalkulator sama persis dengan tabel bank?',
        a: 'Bisa berbeda sedikit karena pembulatan dan biaya tambahan. Gunakan hasil ini sebagai perkiraan, lalu minta simulasi resmi dari bank.',
      },
      {
        q: 'Berapa tenor yang sebaiknya dipilih?',
        a: 'Tenor panjang membuat cicilan per bulan kecil, tapi total bunga lebih besar. Pilih tenor terpendek yang cicilannya masih aman untuk arus kas usaha.',
      },
    ],
    artikel: ['bunga-flat-vs-efektif', 'lama-balik-modal-usaha'],
    kalkulator: ['kalkulator-modal-usaha', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-gaji-bersih',
    kategori: 'karyawan',
    nama: 'Kalkulator Gaji Bersih',
    keyword: 'kalkulator gaji bersih',
    title: 'Kalkulator Gaji Bersih: Hitung Take Home Pay, BPJS & PPh 21',
    h1: 'Kalkulator Gaji Bersih (Take Home Pay)',
    description:
      'Hitung gaji bersih setelah potongan BPJS Kesehatan, JHT, Jaminan Pensiun, dan PPh 21. Cocok untuk karyawan dan pemilik usaha yang menggaji pegawai.',
    intro:
      'Gaji bersih adalah gaji kotor dikurangi iuran BPJS bagian karyawan (Kesehatan 1%, JHT 2%, Jaminan Pensiun 1%) dan PPh 21. Masukkan gaji dan status PTKP untuk melihat rincian potongannya.',
    rumus: 'Gaji bersih = gaji − BPJS Kesehatan 1% − JHT 2% − JP 1% − PPh 21',
    body: `
<h2>Rincian yang dihitung</h2>
<ul>
  <li><strong>BPJS Kesehatan:</strong> karyawan 1%, perusahaan 4%, dengan batas upah Rp12.000.000.</li>
  <li><strong>Jaminan Hari Tua (JHT):</strong> karyawan 2%, perusahaan 3,7%.</li>
  <li><strong>Jaminan Pensiun (JP):</strong> karyawan 1%, perusahaan 2%, dengan batas upah yang disesuaikan BPJS Ketenagakerjaan setiap tahun. Ubah angka batasnya di kalkulator bila sudah ada pengumuman terbaru.</li>
  <li><strong>JKK dan JKM:</strong> dibayar penuh perusahaan, tetapi menurut aturan pajak ikut menambah penghasilan bruto, sama seperti BPJS Kesehatan bagian perusahaan.</li>
  <li><strong>PPh 21:</strong> penghasilan bruto setahun dikurangi biaya jabatan (5%, maksimal Rp6.000.000 setahun), iuran JHT dan JP karyawan, dan PTKP, lalu dikenai tarif Pasal 17.</li>
</ul>
<h2>PTKP</h2>
<p>Penghasilan tidak kena pajak setahun: Rp54.000.000 untuk diri sendiri, tambah Rp4.500.000 bila kawin, dan Rp4.500.000 untuk setiap tanggungan, maksimal tiga orang.</p>
<p>Untuk memahami potongan PPh 21 bulanan dengan tarif efektif rata-rata (TER) dan penyesuaian di bulan Desember, baca <a href="/cara-menghitung-pph-21/">cara menghitung PPh 21 karyawan</a>.</p>`,
    faq: [
      {
        q: 'Kenapa potongan PPh 21 di slip gaji berbeda dengan kalkulator?',
        a: 'Sejak 2024 potongan Januari–November memakai tarif efektif rata-rata (TER), sedangkan Desember menghitung ulang pajak setahun. Kalkulator ini menampilkan pajak setahun dibagi 12, sehingga potongan bulanan bisa berbeda tetapi total setahunnya sama bila gaji tetap.',
      },
      {
        q: 'Apakah iuran BPJS Kesehatan karyawan mengurangi pajak?',
        a: 'Tidak. Yang mengurangi penghasilan bruto hanya biaya jabatan serta iuran JHT dan Jaminan Pensiun yang dibayar karyawan.',
      },
      {
        q: 'Bagaimana kalau ada bonus atau THR?',
        a: 'Bonus dan THR menambah penghasilan bruto setahun sehingga PPh 21 setahun ikut naik. Kalkulator ini menghitung gaji tetap bulanan tanpa bonus.',
      },
    ],
    artikel: ['cara-menghitung-pph-21', 'pajak-umkm-0-5-persen'],
    kalkulator: ['kalkulator-thr', 'kalkulator-zakat-penghasilan'],
  },
  {
    slug: 'kalkulator-thr',
    kategori: 'karyawan',
    nama: 'Kalkulator THR',
    keyword: 'kalkulator THR',
    title: 'Kalkulator THR: Hitung THR Karyawan Sesuai Masa Kerja',
    h1: 'Kalkulator THR Keagamaan',
    description:
      'Hitung THR sesuai Permenaker No. 6 Tahun 2016: satu bulan upah untuk masa kerja 12 bulan, proporsional untuk masa kerja 1–12 bulan, dengan contoh.',
    intro:
      'Pekerja dengan masa kerja 12 bulan atau lebih berhak atas THR sebesar satu bulan upah. Pekerja dengan masa kerja minimal 1 bulan tapi kurang dari 12 bulan menerima THR proporsional: masa kerja dibagi 12, dikali satu bulan upah.',
    rumus: 'THR = (masa kerja dalam bulan ÷ 12) × upah sebulan, maksimal 1 bulan upah',
    body: `
<h2>Dasar aturan</h2>
<p>Ketentuan THR keagamaan diatur dalam Peraturan Menteri Ketenagakerjaan Nomor 6 Tahun 2016. Upah sebulan yang dipakai adalah gaji pokok ditambah tunjangan tetap, atau upah bersih tanpa tunjangan bila sistem pengupahannya demikian. THR wajib dibayar paling lambat tujuh hari sebelum hari raya keagamaan pekerja.</p>
<h2>Contoh</h2>
<ul>
  <li>Upah Rp5.000.000, masa kerja 6 bulan: THR = 6/12 × Rp5.000.000 = <strong>Rp2.500.000</strong>.</li>
  <li>Upah Rp5.000.000, masa kerja 2 tahun: THR = <strong>Rp5.000.000</strong>.</li>
</ul>
<h2>Untuk pemilik usaha</h2>
<p>Sisihkan dana THR setiap bulan (upah ÷ 12 per karyawan) supaya tidak mengganggu arus kas menjelang Lebaran. THR juga termasuk penghasilan yang dikenai PPh 21; penjelasannya ada di <a href="/cara-menghitung-pph-21/">cara menghitung PPh 21</a>. Aturan khusus berlaku untuk pekerja harian lepas, sehingga cek ketentuan terbaru Kementerian Ketenagakerjaan.</p>`,
    faq: [
      {
        q: 'Apakah karyawan kontrak berhak THR?',
        a: 'Ya. Pekerja dengan perjanjian kerja waktu tertentu (kontrak) maupun tetap berhak THR selama masa kerjanya minimal satu bulan.',
      },
      {
        q: 'Apakah THR dipotong pajak?',
        a: 'THR adalah penghasilan yang dikenai PPh 21 di bulan pembayarannya. Kalkulator ini menampilkan THR sebelum pajak.',
      },
      {
        q: 'Kapan batas waktu pembayaran THR?',
        a: 'Paling lambat tujuh hari sebelum hari raya keagamaan masing-masing pekerja.',
      },
    ],
    artikel: ['cara-menghitung-pph-21', 'modal-usaha-kue-rumahan'],
    kalkulator: ['kalkulator-gaji-bersih', 'kalkulator-dana-darurat'],
  },
  {
    slug: 'kalkulator-zakat-penghasilan',
    kategori: 'pribadi',
    nama: 'Kalkulator Zakat Penghasilan',
    keyword: 'kalkulator zakat penghasilan',
    title: 'Kalkulator Zakat Penghasilan: Nisab 85 Gram Emas & Kadar 2,5%',
    h1: 'Kalkulator Zakat Penghasilan (Zakat Profesi)',
    description:
      'Hitung zakat penghasilan atau zakat profesi 2,5% dengan nisab setara 85 gram emas per tahun. Cukup masukkan penghasilan dan harga emas hari ini.',
    intro:
      'Zakat penghasilan sebesar 2,5% wajib dikeluarkan bila penghasilan mencapai nisab, yaitu setara 85 gram emas per tahun. Untuk penghasilan bulanan, nisabnya adalah nilai 85 gram emas dibagi 12.',
    rumus: 'Zakat = 2,5% × penghasilan, bila penghasilan ≥ nisab (85 gram emas per tahun)',
    body: `
<h2>Dasar perhitungan</h2>
<p>Ketentuan nisab 85 gram emas dan kadar 2,5% mengikuti panduan BAZNAS. Karena harga emas berubah setiap hari, nisab dalam rupiah juga berubah. Isi harga emas per gram hari ini dari sumber resmi agar hasilnya tepat.</p>
<h2>Contoh</h2>
<p>Harga emas Rp1.500.000 per gram. Nisab setahun = 85 × Rp1.500.000 = Rp127.500.000, atau Rp10.625.000 per bulan. Penghasilan Rp12.000.000 per bulan sudah mencapai nisab, zakatnya 2,5% × Rp12.000.000 = <strong>Rp300.000</strong> per bulan.</p>
<h2>Zakat dan pajak</h2>
<p>Zakat yang dibayar melalui badan atau lembaga amil zakat resmi dapat dikurangkan dari penghasilan bruto saat menghitung pajak penghasilan, asalkan ada bukti setorannya. Simpan bukti pembayaran zakat untuk lampiran SPT Tahunan. Lihat juga <a href="/cara-menghitung-pph-21/">cara menghitung PPh 21</a>.</p>`,
    faq: [
      {
        q: 'Zakat dihitung dari penghasilan kotor atau bersih?',
        a: 'Ada perbedaan pendapat ulama. Kalkulator ini memakai penghasilan yang diisi pengguna, jadi masukkan penghasilan kotor atau bersih sesuai pendapat yang diikuti, atau tanyakan ke lembaga amil zakat.',
      },
      {
        q: 'Bagaimana kalau penghasilan tidak tetap?',
        a: 'Jumlahkan penghasilan setahun, pilih periode per tahun, lalu bandingkan dengan nisab setahun.',
      },
      {
        q: 'Apakah zakat bisa mengurangi pajak?',
        a: 'Zakat yang dibayar ke badan atau lembaga amil zakat resmi dapat menjadi pengurang penghasilan bruto, bukan pengurang pajak langsung.',
      },
    ],
    artikel: ['cara-menghitung-pph-21', 'bunga-flat-vs-efektif'],
    kalkulator: ['kalkulator-gaji-bersih', 'kalkulator-dana-darurat'],
  },
  {
    slug: 'kalkulator-pajak-umkm',
    kategori: 'pinjaman',
    nama: 'Kalkulator Pajak UMKM 0,5%',
    keyword: 'pajak UMKM 0,5%',
    title: 'Kalkulator Pajak UMKM 0,5%: Hitung PPh Final dari Omzet',
    h1: 'Kalkulator Pajak UMKM (PPh Final 0,5%)',
    description:
      'Hitung PPh Final UMKM 0,5% dari omzet setahun, termasuk omzet Rp500 juta yang tidak kena pajak bagi orang pribadi. Dilengkapi contoh dan cara bayar.',
    intro:
      'Pajak UMKM adalah PPh Final 0,5% dari omzet (peredaran bruto) bagi usaha dengan omzet tidak lebih dari Rp4,8 miliar setahun. Wajib pajak orang pribadi tidak dikenai pajak atas omzet sampai Rp500 juta dalam satu tahun pajak.',
    rumus: 'Pajak = 0,5% × (omzet setahun − Rp500 juta untuk orang pribadi)',
    body: `
<h2>Contoh</h2>
<p>Pedagang perorangan dengan omzet Rp600.000.000 setahun. Rp500.000.000 pertama tidak kena pajak, sisanya Rp100.000.000 × 0,5% = <strong>Rp500.000</strong> setahun. Kalau usaha yang sama berbentuk CV atau PT, seluruh omzet dikenai 0,5%, yaitu Rp3.000.000.</p>
<h2>Cara membayar per bulan</h2>
<ol>
  <li>Catat omzet setiap bulan.</li>
  <li>Untuk orang pribadi, pajak mulai dibayar di bulan saat omzet kumulatif tahun itu melewati Rp500 juta, dihitung dari bagian yang melewati batas.</li>
  <li>Setor dengan kode billing paling lambat tanggal 15 bulan berikutnya.</li>
  <li>Laporkan omzet dan pajak yang sudah dibayar di SPT Tahunan.</li>
</ol>
<p>Penjelasan lengkap tentang siapa yang boleh memakai tarif ini dan batas waktunya ada di <a href="/pajak-umkm-0-5-persen/">panduan pajak UMKM 0,5%</a>. Aturan pajak sering diperbarui; cek selalu ke pajak.go.id.</p>`,
    faq: [
      {
        q: 'Apakah usaha dengan omzet di bawah Rp500 juta harus lapor pajak?',
        a: 'Pajaknya nol, tetapi wajib pajak yang sudah punya NPWP tetap wajib melaporkan SPT Tahunan, termasuk omzet usahanya.',
      },
      {
        q: 'Apakah batas Rp500 juta berlaku untuk PT dan CV?',
        a: 'Tidak. Batas omzet tidak kena pajak Rp500 juta hanya untuk wajib pajak orang pribadi.',
      },
      {
        q: 'Sampai kapan tarif 0,5% bisa dipakai?',
        a: 'Tarif ini punya batas waktu yang berbeda untuk orang pribadi, CV/firma/koperasi, dan PT, dan ketentuannya pernah diperpanjang. Cek aturan terbaru di pajak.go.id.',
      },
    ],
    artikel: ['pajak-umkm-0-5-persen', 'perbedaan-margin-dan-markup'],
    kalkulator: ['kalkulator-harga-jual', 'kalkulator-gaji-bersih'],
  },
  {
    slug: 'kalkulator-dana-darurat',
    kategori: 'pribadi',
    nama: 'Kalkulator Dana Darurat',
    keyword: 'kalkulator dana darurat',
    title: 'Kalkulator Dana Darurat: Berapa yang Harus Disiapkan?',
    h1: 'Kalkulator Dana Darurat',
    description:
      'Hitung target dana darurat sesuai kondisi: lajang, menikah, punya anak, atau pengusaha. Lihat juga kekurangannya dan berapa bulan target tercapai.',
    intro:
      'Dana darurat adalah pengeluaran wajib per bulan dikali jumlah bulan sesuai kondisi. Perencana keuangan umumnya menyarankan 3–6 bulan untuk penghasilan tetap, dan lebih lama untuk keluarga dengan anak atau pemilik usaha.',
    rumus: 'Dana darurat = pengeluaran wajib per bulan × jumlah bulan',
    body: `
<h2>Pengeluaran wajib itu apa saja?</h2>
<p>Kebutuhan yang tetap harus dibayar walaupun penghasilan berhenti: makan, sewa atau cicilan rumah, listrik, air, transportasi, pulsa, iuran BPJS, dan cicilan utang. Hiburan dan belanja keinginan tidak ikut dihitung.</p>
<h2>Untuk pemilik usaha</h2>
<p>Pisahkan dana darurat pribadi dan dana cadangan usaha. Dana cadangan usaha minimal menutup biaya tetap usaha beberapa bulan; hitung kebutuhannya dengan <a href="/kalkulator-modal-usaha/">kalkulator modal usaha</a>.</p>
<h2>Di mana menyimpannya?</h2>
<p>Pilih tempat yang aman dan cepat dicairkan: tabungan terpisah, deposito jangka pendek, atau reksa dana pasar uang dari lembaga yang diawasi OJK. Hindari instrumen yang nilainya bisa turun tajam.</p>`,
    faq: [
      {
        q: 'Lebih baik melunasi utang atau mengumpulkan dana darurat dulu?',
        a: 'Banyak perencana menyarankan mengumpulkan dana darurat kecil lebih dulu (misalnya satu bulan pengeluaran), lalu melunasi utang berbunga tinggi, kemudian melanjutkan dana darurat.',
      },
      {
        q: 'Apakah emas cocok untuk dana darurat?',
        a: 'Emas bisa sebagai pelengkap, tetapi harganya naik turun dan ada selisih harga jual-beli. Sebagian besar dana darurat sebaiknya di instrumen yang nilainya stabil.',
      },
      {
        q: 'Kapan dana darurat boleh dipakai?',
        a: 'Untuk kejadian mendesak yang tidak terduga: kehilangan penghasilan, sakit, atau perbaikan penting. Setelah dipakai, isi kembali secepatnya.',
      },
    ],
    artikel: ['bunga-flat-vs-efektif', 'lama-balik-modal-usaha'],
    kalkulator: ['kalkulator-gaji-bersih', 'kalkulator-zakat-penghasilan'],
  },
  {
    slug: 'kalkulator-modal-usaha',
    kategori: 'usaha',
    nama: 'Kalkulator Modal Usaha',
    keyword: 'menghitung modal usaha',
    title: 'Kalkulator Modal Usaha: Hitung Modal Awal & Modal Kerja',
    h1: 'Kalkulator Modal Usaha',
    description:
      'Hitung total modal usaha: modal awal untuk peralatan dan izin, modal kerja beberapa bulan, serta dana tak terduga. Cocok untuk usaha rumahan.',
    intro:
      'Total modal usaha adalah modal awal (peralatan, perizinan, tempat, stok pertama) ditambah modal kerja untuk beberapa bulan pertama, plus cadangan untuk biaya tak terduga. Banyak usaha baru gagal bukan karena produknya, tapi karena modal kerjanya habis sebelum penjualan stabil.',
    rumus: 'Modal = modal awal + (biaya operasional per bulan × jumlah bulan) + dana tak terduga',
    body: `
<h2>Komponen modal usaha</h2>
<ul>
  <li><strong>Modal awal:</strong> dikeluarkan sekali, misalnya oven, mesin, etalase, perizinan, desain logo, renovasi, dan stok bahan pertama.</li>
  <li><strong>Modal kerja:</strong> biaya operasional bulanan sebelum usaha untung: bahan, gaji, sewa, listrik, promosi. Siapkan untuk 3–6 bulan.</li>
  <li><strong>Dana tak terduga:</strong> 10–20% dari total untuk harga yang ternyata lebih mahal atau alat yang rusak.</li>
</ul>
<h2>Contoh</h2>
<p>Peralatan Rp5.000.000, izin dan desain Rp1.000.000, stok awal Rp2.000.000, biaya operasional Rp3.000.000 per bulan selama 3 bulan, cadangan 10%. Total = (Rp8.000.000 + Rp9.000.000) × 110% = <strong>Rp18.700.000</strong>.</p>
<p>Contoh rinci untuk usaha rumahan ada di <a href="/modal-usaha-kue-rumahan/">modal usaha kue rumahan</a>. Setelah tahu kebutuhan modal, cek apakah pinjaman masuk akal lewat <a href="/kalkulator-cicilan/">kalkulator cicilan</a>.</p>`,
    faq: [
      {
        q: 'Apakah modal usaha harus dari uang sendiri?',
        a: 'Tidak harus. Bisa dari tabungan, keluarga, atau pinjaman resmi seperti KUR. Usahakan modal kerja awal dari dana sendiri agar cicilan tidak membebani bulan-bulan pertama.',
      },
      {
        q: 'Berapa bulan modal kerja yang harus disiapkan?',
        a: 'Minimal tiga bulan. Usaha yang butuh waktu membangun pelanggan, seperti kafe atau jasa, sebaiknya enam bulan.',
      },
      {
        q: 'Bagaimana cara menekan modal awal?',
        a: 'Mulai dari rumah, sewa atau beli alat bekas yang masih layak, jual lewat pre-order, dan tambah peralatan setelah penjualan terbukti.',
      },
    ],
    artikel: ['modal-usaha-kue-rumahan', 'lama-balik-modal-usaha'],
    kalkulator: ['kalkulator-bep', 'kalkulator-cicilan'],
  },
];

export const getCalculator = (slug) => calculatorContent.find((c) => c.slug === slug);
