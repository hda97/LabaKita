// Data halaman /hobi-jadi-usaha/: kategori hobi, kuis, dan 7 langkah.
// Semua slug artikel harus artikel yang sudah terbit (dicek saat build di halaman hobi).

export const kategoriHobi = [
  { id: 'kuliner', nama: 'Kuliner' },
  { id: 'kerajinan', nama: 'Kerajinan' },
  { id: 'fotografi', nama: 'Fotografi' },
  { id: 'desain', nama: 'Desain & sablon' },
  { id: 'berkebun', nama: 'Berkebun' },
  { id: 'dasar', nama: 'Dasar usaha' },
];

// Artikel di grid, dikelompokkan per hobi. "dasar" berisi artikel pilar lain yang wajib dibaca pemula.
export const artikelHobi = {
  kuliner: [
    'menghitung-hpp-usaha-kue',
    'modal-usaha-kue-rumahan',
    'usaha-kue-kering-lebaran',
    'usaha-katering-rumahan',
    'usaha-frozen-food-rumahan',
    'usaha-hampers',
  ],
  kerajinan: ['usaha-kerajinan-tangan'],
  fotografi: ['memulai-jasa-foto-produk'],
  desain: ['memulai-usaha-sablon-kaos'],
  berkebun: ['bisnis-tanaman-hias'],
  dasar: ['memisahkan-uang-usaha-dan-pribadi', 'pembukuan-usaha-sederhana', 'cara-membuat-nib', 'gaji-pemilik-usaha'],
};

export const unggulan = 'menghitung-hpp-usaha-kue';
export const sampingan = ['modal-usaha-kue-rumahan', 'memulai-usaha-sablon-kaos', 'bisnis-tanaman-hias'];

export const kuis = [
  {
    key: 'hobi',
    judul: 'Di waktu luang, kamu paling sering…',
    pilihan: [
      ['kuliner', 'Memasak atau membuat kue'],
      ['kerajinan', 'Membuat kerajinan tangan'],
      ['fotografi', 'Memotret dan mengedit foto'],
      ['desain', 'Menggambar, mendesain, atau menyablon'],
      ['berkebun', 'Merawat tanaman'],
    ],
  },
  {
    key: 'modal',
    judul: 'Berapa modal awal yang siap kamu keluarkan?',
    pilihan: [
      ['0', 'Di bawah Rp500 ribu'],
      ['1', 'Rp500 ribu – Rp2 juta'],
      ['2', 'Lebih dari Rp2 juta'],
    ],
  },
  {
    key: 'waktu',
    judul: 'Berapa jam per minggu yang bisa kamu luangkan?',
    pilihan: [
      ['0', 'Kurang dari 5 jam'],
      ['1', '5–15 jam'],
      ['2', 'Lebih dari 15 jam'],
    ],
  },
];

// ide[modal]: 0 = modal kecil, 1 = sedang, 2 = lebih besar.
export const ideHobi = {
  kuliner: {
    ide: ['Pre-order kue dan camilan untuk tetangga dan kantor', 'Katering harian kecil atau frozen food', 'Hampers dan kue kering musiman dengan kemasan rapi'],
    alasan: 'Makanan dibeli berulang. Kalau rasanya cocok, pembeli pertamamu akan menjadi pelanggan tetap.',
    baca: ['menghitung-hpp-usaha-kue', 'modal-usaha-kue-rumahan'],
  },
  kerajinan: {
    ide: ['Aksesoris handmade lewat WhatsApp dan Instagram', 'Lapak marketplace ditambah bazar akhir pekan', 'Suvenir dan hampers pesanan untuk acara'],
    alasan: 'Produk handmade punya cerita, jadi bisa dijual lebih mahal dari produk pabrikan, asalkan fotonya meyakinkan.',
    baca: ['usaha-kerajinan-tangan', 'usaha-hampers'],
  },
  fotografi: {
    ide: ['Jasa foto produk UMKM pakai kamera atau HP yang ada', 'Paket foto produk bulanan untuk toko online', 'Studio mini untuk foto produk dan katalog'],
    alasan: 'Banyak usaha kecil butuh foto produk yang bagus, tapi tidak tahu harus ke mana. Portofoliomu yang menjawabnya.',
    baca: ['memulai-jasa-foto-produk', 'perbedaan-margin-dan-markup'],
  },
  desain: {
    ide: ['Desain kaos dan sablon satuan lewat jasa sablon DTF', 'Kaos komunitas dan acara dengan pesanan minimum', 'Alat sablon sendiri untuk pesanan rutin'],
    alasan: 'Satu desain bisa dijual berkali-kali, dan pesanan komunitas atau acara datang dalam jumlah besar sekaligus.',
    baca: ['memulai-usaha-sablon-kaos', 'perbedaan-margin-dan-markup'],
  },
  berkebun: {
    ide: ['Jual bibit dan stek dari rumah', 'Tanaman hias dengan pot custom', 'Paket tanaman untuk kantor, kafe, dan hadiah'],
    alasan: 'Tanaman tumbuh sendiri. Modal awalnya bisa sangat kecil kalau kamu memperbanyak dari stek.',
    baca: ['bisnis-tanaman-hias', 'pembukuan-usaha-sederhana'],
  },
};

export const mulaiDengan = [
  'Pakai alat yang sudah ada, jual ke 10 orang terdekat.',
  'Modal kecil untuk bahan dan kemasan yang rapi.',
  'Investasi alat yang mempercepat produksi, setelah ada pesanan rutin.',
];
export const ritme = [
  'Sistem pre-order seminggu sekali, supaya tidak kewalahan.',
  'Buka pesanan 2–3 kali seminggu, sisanya untuk konten.',
  'Cukup waktu untuk produksi rutin dan promosi harian.',
];

// Teks boleh berisi tautan HTML (ditulis sendiri, bukan input pengguna).
export const langkah = [
  ['Kenali hobi dan keahlianmu', 'Tulis apa yang paling sering dipuji orang dari hasil hobimu. Itu titik awal produkmu.'],
  ['Tanya 10 calon pembeli', 'Tanyakan apakah mereka mau membeli, dan berapa harga yang dianggap wajar. Catat jawabannya.'],
  [
    'Hitung modal dan harga jual',
    'Pakai <a href="#kalkulator">kalkulator di bawah</a>, lalu hitung lebih rinci dengan <a href="/kalkulator-hpp/">kalkulator HPP</a> dan <a href="/kalkulator-harga-jual/">kalkulator harga jual</a>. Pastikan untung per unit masih masuk akal setelah semua biaya.',
  ],
  ['Buat contoh produk atau portofolio', 'Cukup 3–5 contoh terbaik, difoto rapi. Ini yang akan kamu tunjukkan ke pembeli.'],
  ['Jual ke lingkaran terdekat', 'Teman, tetangga, grup kantor. Minta testimoni jujur setelah mereka membeli.'],
  ['Buka satu kanal jualan', 'Pilih satu dulu: WhatsApp Business, Instagram, atau <a href="/cara-daftar-shopee-seller/">marketplace</a>. Tekuni sebelum menambah.'],
  [
    'Catat keuangan secara terpisah',
    'Pisahkan rekening atau dompet usaha, lalu catat setiap pemasukan dan pengeluaran. Caranya ada di <a href="/memisahkan-uang-usaha-dan-pribadi/">panduan memisahkan uang usaha</a>.',
  ],
];
