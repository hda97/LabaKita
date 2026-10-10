// Definisi input & output setiap kalkulator. Dipakai di server (merender formulir)
// dan di browser (menghitung). Teks panjang ada di src/data/calculator-content.js.
import * as c from './calc.js';

const rp = (name, label, value, extra = {}) => ({ name, label, type: 'rp', value, ...extra });
const num = (name, label, value, extra = {}) => ({ name, label, type: 'number', value, ...extra });
const select = (name, label, value, options) => ({ name, label, type: 'select', value, options });

export const calculators = {
  'kalkulator-hpp': {
    fields: [
      rp('bahan', 'Biaya bahan baku per produksi', 300000),
      rp('tenagaKerja', 'Biaya tenaga kerja per produksi', 100000),
      rp('overhead', 'Biaya overhead (gas, listrik, kemasan, penyusutan alat)', 50000),
      num('jumlahUnit', 'Jumlah produk yang dihasilkan', 50, { suffix: 'unit', min: 1 }),
    ],
    compute(v) {
      const r = c.hpp(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'HPP per unit', value: r.hppPerUnit, kind: 'rp', main: true },
          { label: 'Total biaya produksi', value: r.totalBiaya, kind: 'rp' },
        ],
      };
    },
  },

  'kalkulator-harga-jual': {
    fields: [
      rp('hppPerUnit', 'HPP per unit', 9000),
      select('mode', 'Cara menghitung keuntungan', 'margin', [
        ['margin', 'Margin (persen dari harga jual)'],
        ['markup', 'Markup (persen dari HPP)'],
      ]),
      num('persen', 'Target keuntungan', 30, { suffix: '%', min: 0, step: 0.1 }),
    ],
    compute(v) {
      const r = c.hargaJual(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Harga jual per unit', value: r.hargaJual, kind: 'rp', main: true },
          { label: 'Laba per unit', value: r.labaPerUnit, kind: 'rp' },
          { label: 'Margin (dari harga jual)', value: r.margin, kind: 'pct' },
          { label: 'Markup (dari HPP)', value: r.markup, kind: 'pct' },
        ],
        note: 'Bulatkan ke atas ke harga yang mudah dibayar (misalnya Rp12.900 atau Rp13.000), lalu cek harga pesaing.',
      };
    },
  },

  'kalkulator-bep': {
    fields: [
      rp('biayaTetap', 'Biaya tetap per bulan (sewa, gaji tetap, cicilan alat)', 3000000),
      rp('hargaJual', 'Harga jual per unit', 15000),
      rp('biayaVariabel', 'Biaya variabel per unit (bahan, kemasan, komisi)', 9000),
    ],
    compute(v) {
      const r = c.bep(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Titik impas per bulan', value: r.bepUnit, kind: 'int', suffix: 'unit', main: true },
          { label: 'Omzet titik impas per bulan', value: r.bepRupiah, kind: 'rp' },
          { label: 'Margin kontribusi per unit', value: r.marginKontribusi, kind: 'rp' },
          { label: 'Rasio margin kontribusi', value: r.rasioKontribusi, kind: 'pct' },
        ],
        note: 'Penjualan di atas titik impas adalah laba; di bawahnya usaha masih rugi.',
      };
    },
  },

  'kalkulator-cicilan': {
    fields: [
      rp('pokok', 'Jumlah pinjaman', 10000000),
      num('bungaTahunan', 'Bunga per tahun', 6, { suffix: '%', min: 0, step: 0.01 }),
      num('tenor', 'Tenor', 12, { suffix: 'bulan', min: 1 }),
      select('metode', 'Jenis bunga', 'anuitas', [
        ['anuitas', 'Efektif / anuitas (cicilan tetap)'],
        ['flat', 'Flat'],
      ]),
    ],
    compute(v) {
      const r = c.cicilan(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Cicilan per bulan', value: r.cicilanPerBulan, kind: 'rp', main: true },
          { label: 'Total bunga', value: r.totalBunga, kind: 'rp' },
          { label: 'Total yang dibayar', value: r.totalBayar, kind: 'rp' },
        ],
        note: 'Belum termasuk biaya provisi, administrasi, asuransi, atau materai yang bisa dikenakan bank.',
      };
    },
  },

  'kalkulator-gaji-bersih': {
    fields: [
      rp('gaji', 'Gaji pokok + tunjangan tetap per bulan', 10000000),
      select('kawin', 'Status perkawinan', 'false', [
        ['false', 'Tidak kawin'],
        ['true', 'Kawin'],
      ]),
      num('tanggungan', 'Jumlah tanggungan (maks. 3)', 0, { min: 0, max: 3 }),
      select('ikutBpjs', 'Ikut BPJS Kesehatan & Ketenagakerjaan', 'true', [
        ['true', 'Ya'],
        ['false', 'Tidak'],
      ]),
      select('jkk', 'Tingkat risiko kerja (iuran JKK)', '0.24', [
        ['0.24', 'Sangat rendah (0,24%)'],
        ['0.54', 'Rendah (0,54%)'],
        ['0.89', 'Sedang (0,89%)'],
        ['1.27', 'Tinggi (1,27%)'],
        ['1.74', 'Sangat tinggi (1,74%)'],
      ]),
      rp('batasUpahJp', 'Batas upah iuran Jaminan Pensiun (cek BPJS Ketenagakerjaan)', 10547400),
    ],
    compute(v) {
      const r = c.gajiBersih({ ...v, kawin: v.kawin === 'true', ikutBpjs: v.ikutBpjs === 'true' });
      if (r.error) return r;
      return {
        rows: [
          { label: 'Gaji bersih (take home pay) per bulan', value: r.gajiBersih, kind: 'rp', main: true },
          { label: 'BPJS Kesehatan (1%)', value: r.kesKaryawan, kind: 'rp' },
          { label: 'Jaminan Hari Tua (2%)', value: r.jhtKaryawan, kind: 'rp' },
          { label: 'Jaminan Pensiun (1%)', value: r.jpKaryawan, kind: 'rp' },
          { label: 'PPh 21 rata-rata per bulan', value: r.pphBulan, kind: 'rp' },
          { label: 'PPh 21 setahun', value: r.pphTahun, kind: 'rp' },
          { label: 'PTKP setahun', value: r.ptkp, kind: 'rp' },
        ],
        note: 'PPh 21 dihitung setahun dengan tarif Pasal 17 lalu dibagi 12. Potongan per bulan dengan tarif efektif (TER) bisa sedikit berbeda, dan selisihnya disesuaikan di bulan Desember.',
      };
    },
  },

  'kalkulator-thr': {
    fields: [
      rp('upah', 'Upah sebulan (gaji pokok + tunjangan tetap)', 5000000),
      num('masaKerjaBulan', 'Masa kerja', 6, { suffix: 'bulan', min: 0 }),
    ],
    compute(v) {
      const r = c.thr(v);
      if (r.error) return r;
      return {
        rows: [{ label: 'THR yang diterima (sebelum pajak)', value: r.thr, kind: 'rp', main: true }],
        note: r.keterangan,
      };
    },
  },

  'kalkulator-zakat-penghasilan': {
    fields: [
      rp('penghasilanBulan', 'Penghasilan', 12000000),
      select('periode', 'Periode penghasilan', 'bulan', [
        ['bulan', 'Per bulan'],
        ['tahun', 'Per tahun'],
      ]),
      rp('hargaEmas', 'Harga emas per gram hari ini', 1500000),
    ],
    compute(v) {
      const r = c.zakatPenghasilan(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Zakat yang dikeluarkan', value: r.zakat, kind: 'rp', main: true },
          { label: `Nisab per ${v.periode === 'tahun' ? 'tahun' : 'bulan'}`, value: r.nisab, kind: 'rp' },
        ],
        note: r.wajib
          ? 'Penghasilan sudah mencapai nisab, zakat 2,5% wajib dikeluarkan.'
          : 'Penghasilan belum mencapai nisab, belum wajib zakat. Sedekah tetap dianjurkan.',
      };
    },
  },

  'kalkulator-pajak-umkm': {
    fields: [
      rp('omzetTahun', 'Omzet (peredaran bruto) setahun', 600000000),
      select('jenis', 'Jenis wajib pajak', 'orang', [
        ['orang', 'Orang pribadi'],
        ['badan', 'PT perorangan atau koperasi'],
      ]),
    ],
    compute(v) {
      const r = c.pajakUmkm(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'PPh Final 0,5% setahun', value: r.pajakTahun, kind: 'rp', main: true },
          { label: 'Rata-rata per bulan', value: r.rataBulan, kind: 'rp' },
          { label: 'Omzet tidak dikenai pajak', value: r.omzetBebas, kind: 'rp' },
          { label: 'Omzet kena pajak', value: r.omzetKenaPajak, kind: 'rp' },
        ],
        note: r.melebihiBatas
          ? 'Omzet di atas Rp4,8 miliar setahun tidak lagi memakai tarif 0,5%. Gunakan pembukuan dan tarif umum.'
          : v.jenis === 'badan'
            ? 'PT perorangan dan koperasi membayar 0,5% dari seluruh omzet. Sejak PP 20/2026, CV, firma, dan PT biasa tidak lagi bisa memakai tarif ini kecuali dalam masa transisi.'
            : 'Pajak dibayar setiap bulan dari omzet bulan itu. Untuk orang pribadi, pajak baru dibayar setelah omzet kumulatif tahun itu melewati Rp500 juta.',
      };
    },
  },

  'kalkulator-dana-darurat': {
    fields: [
      rp('pengeluaranBulan', 'Pengeluaran wajib per bulan', 4000000),
      select('bulan', 'Kondisi', '6', [
        ['3', 'Lajang, penghasilan tetap (3 bulan)'],
        ['6', 'Menikah, penghasilan tetap (6 bulan)'],
        ['9', 'Menikah dengan anak (9 bulan)'],
        ['12', 'Pengusaha / penghasilan tidak tetap (12 bulan)'],
      ]),
      rp('danaSaatIni', 'Dana darurat yang sudah ada', 4000000),
      rp('tabunganBulan', 'Sanggup menabung per bulan', 1000000),
    ],
    compute(v) {
      const r = c.danaDarurat(v);
      if (r.error) return r;
      const rows = [
        { label: 'Target dana darurat', value: r.target, kind: 'rp', main: true },
        { label: 'Kekurangan', value: r.kurang, kind: 'rp' },
      ];
      if (r.lamaMenabung !== null) rows.push({ label: 'Lama menabung', value: r.lamaMenabung, kind: 'int', suffix: 'bulan' });
      return {
        rows,
        note: r.lamaMenabung === null ? 'Isi jumlah tabungan per bulan untuk melihat berapa lama target tercapai.' : '',
      };
    },
  },

  'kalkulator-modal-usaha': {
    fields: [
      rp('peralatan', 'Peralatan & mesin', 5000000),
      rp('perizinan', 'Perizinan, legalitas & desain merek', 1000000),
      rp('renovasi', 'Sewa tempat di muka / renovasi', 0),
      rp('stokAwal', 'Stok bahan awal', 2000000),
      rp('biayaBulanan', 'Biaya operasional per bulan', 3000000),
      num('bulanCadangan', 'Modal kerja disiapkan untuk', 3, { suffix: 'bulan', min: 0 }),
      num('persenCadangan', 'Dana tak terduga', 10, { suffix: '%', min: 0, step: 1 }),
    ],
    compute(v) {
      const r = c.modalUsaha(v);
      return {
        rows: [
          { label: 'Total modal yang perlu disiapkan', value: r.total, kind: 'rp', main: true },
          { label: 'Modal awal (sekali keluar)', value: r.modalAwal, kind: 'rp' },
          { label: 'Modal kerja', value: r.modalKerja, kind: 'rp' },
          { label: 'Dana tak terduga', value: r.cadangan, kind: 'rp' },
        ],
      };
    },
  },

  'kalkulator-pesangon': {
    fields: [
      rp('upah', 'Upah sebulan (gaji pokok + tunjangan tetap)', 6000000),
      num('masaKerja', 'Masa kerja', 5, { suffix: 'tahun', min: 0, step: 0.1 }),
      select('alasan', 'Alasan PHK', 'efisiensi', [
        ['efisiensi', 'Efisiensi untuk mencegah kerugian'],
        ['efisiensi_rugi', 'Efisiensi karena perusahaan merugi'],
        ['tutup_tidak_rugi', 'Perusahaan tutup bukan karena rugi'],
        ['tutup_rugi', 'Perusahaan tutup karena rugi / keadaan memaksa'],
        ['force_majeure_tidak_tutup', 'Keadaan memaksa, perusahaan tidak tutup'],
        ['pailit', 'Perusahaan pailit'],
        ['pensiun', 'Pensiun'],
        ['meninggal', 'Pekerja meninggal dunia'],
        ['sakit_berkepanjangan', 'Sakit berkepanjangan / cacat akibat kecelakaan kerja'],
      ]),
      rp('uangPenggantianHak', 'Uang penggantian hak (cuti belum diambil, ongkos pulang, dll.)', 0),
    ],
    compute(v) {
      const r = c.pesangon(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Total diterima setelah pajak', value: r.bersih, kind: 'rp', main: true },
          { label: 'Uang pesangon', value: r.up, kind: 'rp' },
          { label: 'Uang penghargaan masa kerja', value: r.upmk, kind: 'rp' },
          { label: 'Uang penggantian hak', value: r.uph, kind: 'rp' },
          { label: 'Total sebelum pajak', value: r.bruto, kind: 'rp' },
          { label: 'Perkiraan PPh 21 final pesangon', value: r.pajak, kind: 'rp' },
        ],
        note: 'Perhitungan minimal menurut PP 35/2021. Perjanjian kerja atau peraturan perusahaan boleh memberi lebih. Pekerja yang mengundurkan diri tidak mendapat pesangon dan UPMK, tetapi berhak atas uang penggantian hak dan uang pisah sesuai aturan perusahaan.',
      };
    },
  },

  'kalkulator-deposito': {
    fields: [
      rp('pokok', 'Jumlah deposito', 10000000),
      num('bungaTahunan', 'Bunga per tahun', 4, { suffix: '%', min: 0, step: 0.01 }),
      select('tenor', 'Tenor', '12', [
        ['1', '1 bulan'],
        ['3', '3 bulan'],
        ['6', '6 bulan'],
        ['12', '12 bulan'],
        ['24', '24 bulan'],
      ]),
      num('tbp', 'Tingkat bunga penjaminan LPS (cek lps.go.id)', 3.75, { suffix: '%', min: 0, step: 0.01 }),
    ],
    compute(v) {
      const r = c.deposito(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Bunga bersih', value: r.bungaBersih, kind: 'rp', main: true },
          { label: 'Bunga sebelum pajak', value: r.bungaKotor, kind: 'rp' },
          { label: 'Pajak bunga 20%', value: r.pajak, kind: 'rp' },
          { label: 'Total saat jatuh tempo', value: r.totalAkhir, kind: 'rp' },
        ],
        note: r.diAtasTbp
          ? 'Bunga di atas tingkat bunga penjaminan LPS: simpanan ini tidak dijamin LPS. Pertimbangkan bunga yang lebih rendah atau bank lain.'
          : 'Bunga tidak melebihi tingkat bunga penjaminan LPS. Bank menghitung bunga per hari, sehingga hasil sebenarnya bisa berbeda sedikit.',
      };
    },
  },

  'kalkulator-harga-sablon': {
    fields: [
      num('jumlah', 'Jumlah kaus per desain', 24, { suffix: 'kaus', min: 1 }),
      rp('hargaKaus', 'Harga kaus polos per buah', 32000),
      num('warna', 'Jumlah warna sablon', 1, { suffix: 'warna', min: 1, max: 8 }),
      rp('biayaScreen', 'Biaya screen & afdruk per warna', 60000),
      rp('tintaPerKaus', 'Tinta per kaus per warna', 1500),
      rp('kemasan', 'Kemasan & label per kaus', 1000),
      rp('upahPerJam', 'Upah per jam', 20000),
      num('jamPersiapan', 'Waktu persiapan per warna', 2, { suffix: 'jam', min: 0, step: 0.5 }),
      num('menitCetak', 'Waktu cetak per kaus per warna', 10, { suffix: 'menit', min: 0 }),
      num('margin', 'Target margin', 35, { suffix: '%', min: 0, step: 1 }),
    ],
    compute(v) {
      const r = c.hargaSablon(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Harga jual per kaus', value: r.hargaPerKaus, kind: 'rp', main: true },
          { label: 'Biaya per kaus', value: r.biayaPerKaus, kind: 'rp' },
          { label: 'Total harga pesanan', value: r.totalHarga, kind: 'rp' },
          { label: 'Total biaya pesanan', value: r.totalBiaya, kind: 'rp' },
          { label: 'Waktu kerja', value: r.jamKerja, kind: 'int', suffix: 'jam' },
        ],
        note: 'Coba ubah jumlah kaus: biaya screen dan persiapan tetap, sehingga pesanan kecil butuh harga per kaus lebih tinggi. Bulatkan harga ke atas.',
      };
    },
  },

  'kalkulator-lembur': {
    fields: [
      rp('dasarUpah', 'Upah sebulan (gaji pokok + tunjangan tetap)', 5190000),
      select('jenis', 'Hari lembur', 'kerja', [
        ['kerja', 'Hari kerja biasa'],
        ['libur6', 'Hari libur / istirahat (sistem 6 hari kerja)'],
        ['libur5', 'Hari libur / istirahat (sistem 5 hari kerja)'],
      ]),
      num('jam', 'Lama lembur', 3, { suffix: 'jam', min: 0, max: 12 }),
      num('hariPerBulan', 'Berapa kali lembur seperti ini sebulan', 1, { suffix: 'kali', min: 0 }),
    ],
    compute(v) {
      const r = c.upahLembur(v);
      if (r.error) return r;
      return {
        rows: [
          { label: 'Upah lembur per hari', value: r.perHari, kind: 'rp', main: true },
          { label: 'Upah lembur sebulan', value: r.perBulan, kind: 'rp' },
          { label: 'Upah sejam (1/173 upah sebulan)', value: r.upahSejam, kind: 'rp' },
          { label: 'Total pengali', value: r.pengali, kind: 'int', suffix: '× upah sejam' },
        ],
        note: 'Bila upah terdiri dari gaji pokok dan tunjangan tidak tetap, dasar perhitungan minimal 75% dari total upah. Upah lembur menambah penghasilan bruto untuk PPh 21.',
      };
    },
  },
};

const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const angka = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

export function formatValue({ value, kind, suffix }) {
  if (kind === 'rp') return rupiah.format(Math.round(value)).replace(/\s/g, '');
  if (kind === 'pct') return `${angka.format(value)}%`;
  if (kind === 'int') return `${angka.format(value)}${suffix ? ' ' + suffix : ''}`;
  return String(value);
}

export const formatRupiah = (v) => formatValue({ value: v, kind: 'rp' });
