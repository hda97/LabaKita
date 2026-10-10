// Rumus semua kalkulator. Fungsi murni tanpa DOM supaya bisa diuji (lihat tests/calc.test.mjs).
// Semua nilai uang dalam rupiah, persen ditulis sebagai angka 0–100.

const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

/** HPP per unit dari biaya satu kali produksi (batch). */
export function hpp({ bahan, tenagaKerja, overhead, jumlahUnit }) {
  const total = n(bahan) + n(tenagaKerja) + n(overhead);
  const unit = n(jumlahUnit);
  if (unit <= 0) return { error: 'Jumlah unit harus lebih dari 0.' };
  return { totalBiaya: total, hppPerUnit: total / unit };
}

/**
 * Harga jual dari HPP.
 * mode 'margin': margin dihitung dari harga jual (laba / harga jual), harus < 100%.
 * mode 'markup': markup dihitung dari HPP (laba / HPP).
 */
export function hargaJual({ hppPerUnit, persen, mode = 'margin' }) {
  const cost = n(hppPerUnit);
  const p = n(persen);
  if (cost <= 0) return { error: 'HPP per unit harus lebih dari 0.' };
  if (p < 0) return { error: 'Persentase tidak boleh negatif.' };
  let harga;
  if (mode === 'markup') {
    harga = cost * (1 + p / 100);
  } else {
    if (p >= 100) return { error: 'Margin harus di bawah 100%.' };
    harga = cost / (1 - p / 100);
  }
  const laba = harga - cost;
  return {
    hargaJual: harga,
    labaPerUnit: laba,
    margin: (laba / harga) * 100,
    markup: (laba / cost) * 100,
  };
}

/** Titik impas (Break Even Point). */
export function bep({ biayaTetap, hargaJual, biayaVariabel }) {
  const fc = n(biayaTetap);
  const kontribusi = n(hargaJual) - n(biayaVariabel);
  if (n(hargaJual) <= 0) return { error: 'Harga jual harus lebih dari 0.' };
  if (kontribusi <= 0) {
    return { error: 'Harga jual harus lebih besar dari biaya variabel per unit; kalau tidak, usaha tidak akan pernah balik modal.' };
  }
  const unit = Math.ceil(fc / kontribusi);
  return {
    marginKontribusi: kontribusi,
    bepUnit: unit,
    bepRupiah: unit * n(hargaJual),
    rasioKontribusi: (kontribusi / n(hargaJual)) * 100,
  };
}

/**
 * Cicilan pinjaman.
 * metode 'anuitas' (bunga efektif, cicilan tetap) atau 'flat'.
 * bungaTahunan dalam persen per tahun, tenor dalam bulan.
 */
export function cicilan({ pokok, bungaTahunan, tenor, metode = 'anuitas' }) {
  const P = n(pokok);
  const months = Math.round(n(tenor));
  const r = n(bungaTahunan) / 100 / 12;
  if (P <= 0) return { error: 'Jumlah pinjaman harus lebih dari 0.' };
  if (months <= 0) return { error: 'Tenor minimal 1 bulan.' };
  if (r < 0) return { error: 'Bunga tidak boleh negatif.' };
  let perBulan;
  if (metode === 'flat') {
    perBulan = P / months + P * r;
  } else if (r === 0) {
    perBulan = P / months;
  } else {
    perBulan = (P * r) / (1 - Math.pow(1 + r, -months));
  }
  const total = perBulan * months;
  return { cicilanPerBulan: perBulan, totalBayar: total, totalBunga: total - P };
}

// Tarif PPh Pasal 17 ayat (1) huruf a (UU HPP).
export const LAPISAN_PPH17 = [
  { batas: 60_000_000, tarif: 0.05 },
  { batas: 250_000_000, tarif: 0.15 },
  { batas: 500_000_000, tarif: 0.25 },
  { batas: 5_000_000_000, tarif: 0.30 },
  { batas: Infinity, tarif: 0.35 },
];

export function pph17(pkp) {
  let sisa = Math.max(0, n(pkp));
  let bawah = 0;
  let pajak = 0;
  for (const { batas, tarif } of LAPISAN_PPH17) {
    const lapisan = Math.min(sisa, batas - bawah);
    if (lapisan <= 0) break;
    pajak += lapisan * tarif;
    sisa -= lapisan;
    bawah = batas;
  }
  return pajak;
}

// PTKP per tahun (PMK 101/PMK.010/2016).
export function ptkp({ kawin, tanggungan }) {
  const t = Math.min(3, Math.max(0, Math.round(n(tanggungan))));
  return 54_000_000 + (kawin ? 4_500_000 : 0) + t * 4_500_000;
}

/**
 * Gaji bersih karyawan tetap dengan gaji sama setiap bulan.
 * PPh 21 dihitung sebagai pajak setahun (Pasal 17) dibagi 12. Potongan bulanan
 * memakai TER bisa berbeda per bulan, tapi totalnya disetarakan di bulan Desember.
 */
export function gajiBersih({
  gaji,
  kawin = false,
  tanggungan = 0,
  ikutBpjs = true,
  jkk = 0.24,
  batasUpahJp = 10_547_400,
  batasUpahKes = 12_000_000,
}) {
  const g = n(gaji);
  if (g <= 0) return { error: 'Gaji harus lebih dari 0.' };
  const upahKes = Math.min(g, n(batasUpahKes));
  const upahJp = Math.min(g, n(batasUpahJp));

  const kesKaryawan = ikutBpjs ? upahKes * 0.01 : 0;
  const jhtKaryawan = ikutBpjs ? g * 0.02 : 0;
  const jpKaryawan = ikutBpjs ? upahJp * 0.01 : 0;

  // Premi yang dibayar perusahaan dan menurut aturan menambah penghasilan bruto.
  const kesPerusahaan = ikutBpjs ? upahKes * 0.04 : 0;
  const jkkPerusahaan = ikutBpjs ? g * (n(jkk) / 100) : 0;
  const jkmPerusahaan = ikutBpjs ? g * 0.003 : 0;

  const brutoBulan = g + kesPerusahaan + jkkPerusahaan + jkmPerusahaan;
  const brutoTahun = brutoBulan * 12;
  const biayaJabatan = Math.min(brutoTahun * 0.05, 6_000_000);
  const iuranTahun = (jhtKaryawan + jpKaryawan) * 12;
  const netoTahun = brutoTahun - biayaJabatan - iuranTahun;
  const nilaiPtkp = ptkp({ kawin, tanggungan });
  const pkp = Math.max(0, Math.floor((netoTahun - nilaiPtkp) / 1000) * 1000);
  const pphTahun = pph17(pkp);
  const pphBulan = pphTahun / 12;

  const potongan = kesKaryawan + jhtKaryawan + jpKaryawan + pphBulan;
  return {
    brutoBulan,
    kesKaryawan,
    jhtKaryawan,
    jpKaryawan,
    pphTahun,
    pphBulan,
    ptkp: nilaiPtkp,
    pkp,
    totalPotongan: potongan,
    gajiBersih: g - potongan,
  };
}

/** THR keagamaan (Permenaker No. 6 Tahun 2016). */
export function thr({ upah, masaKerjaBulan }) {
  const u = n(upah);
  const m = n(masaKerjaBulan);
  if (u <= 0) return { error: 'Upah harus lebih dari 0.' };
  if (m < 1) return { thr: 0, keterangan: 'Masa kerja kurang dari 1 bulan, belum berhak THR.' };
  if (m >= 12) return { thr: u, keterangan: 'Masa kerja 12 bulan atau lebih: THR = 1 bulan upah.' };
  return { thr: (m / 12) * u, keterangan: `Masa kerja ${m} bulan: THR proporsional ${m}/12 × upah.` };
}

/** Zakat penghasilan: 2,5% bila penghasilan mencapai nisab setara 85 gram emas per tahun. */
export function zakatPenghasilan({ penghasilanBulan, hargaEmas, periode = 'bulan' }) {
  const p = n(penghasilanBulan);
  const emas = n(hargaEmas);
  if (emas <= 0) return { error: 'Isi harga emas per gram hari ini.' };
  const nisabTahun = 85 * emas;
  const nisab = periode === 'tahun' ? nisabTahun : nisabTahun / 12;
  const wajib = p >= nisab;
  return { nisab, wajib, zakat: wajib ? p * 0.025 : 0 };
}

/**
 * PPh Final UMKM 0,5% (PP 55/2022) untuk satu tahun pajak.
 * Wajib pajak orang pribadi: omzet sampai Rp500 juta setahun tidak dikenai pajak.
 */
export function pajakUmkm({ omzetTahun, jenis = 'orang' }) {
  const o = n(omzetTahun);
  if (o < 0) return { error: 'Omzet tidak boleh negatif.' };
  const bebas = jenis === 'orang' ? 500_000_000 : 0;
  const kenaPajak = Math.max(0, o - bebas);
  const pajak = kenaPajak * 0.005;
  return {
    omzetBebas: Math.min(o, bebas),
    omzetKenaPajak: kenaPajak,
    pajakTahun: pajak,
    rataBulan: pajak / 12,
    melebihiBatas: o > 4_800_000_000,
  };
}

/** Dana darurat = pengeluaran wajib per bulan × jumlah bulan. */
export function danaDarurat({ pengeluaranBulan, bulan, danaSaatIni = 0, tabunganBulan = 0 }) {
  const target = n(pengeluaranBulan) * n(bulan);
  if (target <= 0) return { error: 'Isi pengeluaran bulanan dan jumlah bulan.' };
  const kurang = Math.max(0, target - n(danaSaatIni));
  const lama = kurang === 0 ? 0 : n(tabunganBulan) > 0 ? Math.ceil(kurang / n(tabunganBulan)) : null;
  return { target, kurang, lamaMenabung: lama };
}

/** Modal usaha = modal awal (sekali) + modal kerja beberapa bulan + cadangan. */
export function modalUsaha({ peralatan, perizinan, renovasi, stokAwal, biayaBulanan, bulanCadangan, persenCadangan = 10 }) {
  const awal = n(peralatan) + n(perizinan) + n(renovasi) + n(stokAwal);
  const kerja = n(biayaBulanan) * n(bulanCadangan);
  const cadangan = (awal + kerja) * (n(persenCadangan) / 100);
  return { modalAwal: awal, modalKerja: kerja, cadangan, total: awal + kerja + cadangan };
}

// Uang pesangon (UP) menurut masa kerja, PP 35/2021 Pasal 40 ayat (2): kelipatan upah sebulan.
export function kelipatanPesangon(tahun) {
  const t = Math.max(0, n(tahun));
  return Math.min(9, Math.floor(t) + 1);
}

// Uang penghargaan masa kerja (UPMK), PP 35/2021 Pasal 40 ayat (3).
export function kelipatanUpmk(tahun) {
  const t = Math.max(0, n(tahun));
  if (t < 3) return 0;
  if (t >= 24) return 10;
  return Math.floor((t - 3) / 3) + 2; // 3–<6: 2, 6–<9: 3, ... 21–<24: 8
}

// Pengali menurut alasan PHK (PP 35/2021 Pasal 41–57), [pengali UP, pengali UPMK].
export const ALASAN_PHK = {
  efisiensi: [1, 1], // efisiensi untuk mencegah kerugian
  efisiensi_rugi: [0.5, 1], // efisiensi karena perusahaan rugi
  tutup_rugi: [0.5, 1], // tutup karena rugi terus-menerus atau keadaan memaksa
  tutup_tidak_rugi: [1, 1],
  force_majeure_tidak_tutup: [0.75, 1],
  pailit: [0.5, 1],
  pensiun: [1.75, 1],
  meninggal: [2, 1],
  sakit_berkepanjangan: [2, 1],
};

// PPh 21 final atas pesangon (PP 68/2009).
export function pphPesangon(bruto) {
  const lapisan = [
    { batas: 50_000_000, tarif: 0 },
    { batas: 100_000_000, tarif: 0.05 },
    { batas: 500_000_000, tarif: 0.15 },
    { batas: Infinity, tarif: 0.25 },
  ];
  let sisa = Math.max(0, n(bruto));
  let bawah = 0;
  let pajak = 0;
  for (const { batas, tarif } of lapisan) {
    const bagian = Math.min(sisa, batas - bawah);
    if (bagian <= 0) break;
    pajak += bagian * tarif;
    sisa -= bagian;
    bawah = batas;
  }
  return pajak;
}

/** Pesangon PHK menurut PP 35/2021. masaKerja dalam tahun (boleh desimal). */
export function pesangon({ upah, masaKerja, alasan = 'efisiensi', uangPenggantianHak = 0 }) {
  const u = n(upah);
  if (u <= 0) return { error: 'Upah harus lebih dari 0.' };
  const pengali = ALASAN_PHK[alasan];
  if (!pengali) return { error: 'Alasan PHK tidak dikenal.' };
  const up = kelipatanPesangon(masaKerja) * u * pengali[0];
  const upmk = kelipatanUpmk(masaKerja) * u * pengali[1];
  const uph = Math.max(0, n(uangPenggantianHak));
  const bruto = up + upmk + uph;
  const pajak = pphPesangon(bruto);
  return { up, upmk, uph, bruto, pajak, bersih: bruto - pajak };
}

/** Bunga deposito: bunga sederhana per tahun, pajak final 20% bila saldo di atas Rp7,5 juta. */
export function deposito({ pokok, bungaTahunan, tenor, tbp = 3.75 }) {
  const P = n(pokok);
  const months = n(tenor);
  if (P <= 0) return { error: 'Jumlah deposito harus lebih dari 0.' };
  if (months <= 0) return { error: 'Tenor minimal 1 bulan.' };
  const kotor = P * (n(bungaTahunan) / 100) * (months / 12);
  const kenaPajak = P > 7_500_000;
  const pajak = kenaPajak ? kotor * 0.2 : 0;
  return {
    bungaKotor: kotor,
    pajak,
    bungaBersih: kotor - pajak,
    totalAkhir: P + kotor - pajak,
    diAtasTbp: n(bungaTahunan) > n(tbp),
  };
}

/** Harga sablon manual per kaus untuk satu desain. */
export function hargaSablon({ jumlah, hargaKaus, warna, biayaScreen, tintaPerKaus, upahPerJam, jamPersiapan, menitCetak, kemasan, margin }) {
  const q = Math.round(n(jumlah));
  const w = Math.max(1, Math.round(n(warna)));
  if (q <= 0) return { error: 'Jumlah kaus minimal 1.' };
  if (n(margin) >= 100) return { error: 'Margin harus di bawah 100%.' };
  const bahan = q * n(hargaKaus) + w * n(biayaScreen) + q * w * n(tintaPerKaus) + q * n(kemasan);
  const jam = w * n(jamPersiapan) + (q * w * n(menitCetak)) / 60;
  const upah = jam * n(upahPerJam);
  const total = bahan + upah;
  const perKaus = total / q;
  const harga = perKaus / (1 - n(margin) / 100);
  return { totalBiaya: total, jamKerja: jam, biayaPerKaus: perKaus, hargaPerKaus: harga, totalHarga: harga * q };
}
