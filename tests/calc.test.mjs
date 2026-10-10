// Setiap rumus diuji dengan contoh yang dihitung manual (lihat komentar).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../src/lib/calc.js';

const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);

test('HPP: (300.000 + 100.000 + 50.000) / 50 = 9.000', () => {
  const r = c.hpp({ bahan: 300000, tenagaKerja: 100000, overhead: 50000, jumlahUnit: 50 });
  assert.equal(r.totalBiaya, 450000);
  assert.equal(r.hppPerUnit, 9000);
  assert.ok(c.hpp({ bahan: 1, tenagaKerja: 0, overhead: 0, jumlahUnit: 0 }).error);
});

test('Harga jual: margin 30% dari HPP 9.000 = 12.857,14; markup 30% = 11.700', () => {
  const m = c.hargaJual({ hppPerUnit: 9000, persen: 30, mode: 'margin' });
  near(m.hargaJual, 12857.142857);
  near(m.margin, 30);
  const k = c.hargaJual({ hppPerUnit: 9000, persen: 30, mode: 'markup' });
  near(k.hargaJual, 11700);
  near(k.markup, 30);
  near(k.margin, (2700 / 11700) * 100);
  assert.ok(c.hargaJual({ hppPerUnit: 9000, persen: 100, mode: 'margin' }).error);
});

test('BEP: 3.000.000 / (15.000 − 9.000) = 500 unit = Rp7.500.000', () => {
  const r = c.bep({ biayaTetap: 3000000, hargaJual: 15000, biayaVariabel: 9000 });
  assert.equal(r.bepUnit, 500);
  assert.equal(r.bepRupiah, 7500000);
  near(r.rasioKontribusi, 40);
  assert.equal(c.bep({ biayaTetap: 1000, hargaJual: 1001, biayaVariabel: 0 }).bepUnit, 1);
  assert.ok(c.bep({ biayaTetap: 1, hargaJual: 5000, biayaVariabel: 5000 }).error);
});

test('Cicilan Rp10 juta, 6%/tahun, 12 bulan', () => {
  // Flat: 10.000.000/12 + 10.000.000 × 0,5% = 883.333,33
  near(c.cicilan({ pokok: 10e6, bungaTahunan: 6, tenor: 12, metode: 'flat' }).cicilanPerBulan, 883333.33);
  // Anuitas: 10.000.000 × 0,005 / (1 − 1,005^−12) = 860.664,30
  const a = c.cicilan({ pokok: 10e6, bungaTahunan: 6, tenor: 12, metode: 'anuitas' });
  near(a.cicilanPerBulan, 860664.30);
  near(a.totalBunga, 327971.56, 0.1);
  near(c.cicilan({ pokok: 1200, bungaTahunan: 0, tenor: 12 }).cicilanPerBulan, 100);
});

test('PPh Pasal 17 dan PTKP', () => {
  assert.equal(c.pph17(0), 0);
  assert.equal(c.pph17(60e6), 3e6);
  assert.equal(c.pph17(100e6), 9e6); // 3jt + 40jt × 15%
  assert.equal(c.pph17(500e6), 3e6 + 28.5e6 + 62.5e6);
  assert.equal(c.ptkp({ kawin: false, tanggungan: 0 }), 54e6);
  assert.equal(c.ptkp({ kawin: true, tanggungan: 5 }), 72e6); // tanggungan maks 3
});

test('Gaji bersih Rp10 juta, TK/0, BPJS, JKK 0,24%', () => {
  // Bruto/bln = 10.000.000 + 400.000 (Kes 4%) + 24.000 (JKK) + 30.000 (JKM) = 10.454.000
  // Bruto/thn 125.448.000 − biaya jabatan 6.000.000 − iuran JHT+JP 3.600.000 = 115.848.000
  // PKP = 115.848.000 − 54.000.000 = 61.848.000 → PPh = 3.000.000 + 1.848.000 × 15% = 3.277.200
  const r = c.gajiBersih({ gaji: 10e6, kawin: false, tanggungan: 0, ikutBpjs: true, jkk: 0.24 });
  near(r.brutoBulan, 10454000);
  assert.equal(r.pkp, 61848000);
  near(r.pphTahun, 3277200);
  near(r.pphBulan, 273100);
  near(r.gajiBersih, 10e6 - 100000 - 200000 - 100000 - 273100);
});

test('Gaji di bawah PTKP tidak kena PPh 21', () => {
  const r = c.gajiBersih({ gaji: 4e6, ikutBpjs: false });
  assert.equal(r.pphTahun, 0);
  assert.equal(r.gajiBersih, 4e6);
});

test('THR', () => {
  assert.equal(c.thr({ upah: 5e6, masaKerjaBulan: 6 }).thr, 2.5e6);
  assert.equal(c.thr({ upah: 5e6, masaKerjaBulan: 24 }).thr, 5e6);
  assert.equal(c.thr({ upah: 5e6, masaKerjaBulan: 0 }).thr, 0);
});

test('Zakat penghasilan: nisab 85 gram emas per tahun', () => {
  const a = c.zakatPenghasilan({ penghasilanBulan: 10e6, hargaEmas: 1.5e6 });
  assert.equal(a.nisab, 10.625e6);
  assert.equal(a.wajib, false);
  const b = c.zakatPenghasilan({ penghasilanBulan: 12e6, hargaEmas: 1.5e6 });
  assert.equal(b.zakat, 300000);
});

test('Pajak UMKM 0,5%', () => {
  assert.equal(c.pajakUmkm({ omzetTahun: 600e6, jenis: 'orang' }).pajakTahun, 500000);
  assert.equal(c.pajakUmkm({ omzetTahun: 400e6, jenis: 'orang' }).pajakTahun, 0);
  assert.equal(c.pajakUmkm({ omzetTahun: 600e6, jenis: 'badan' }).pajakTahun, 3e6);
  assert.equal(c.pajakUmkm({ omzetTahun: 5e9 }).melebihiBatas, true);
});

test('Dana darurat', () => {
  const r = c.danaDarurat({ pengeluaranBulan: 4e6, bulan: 6, danaSaatIni: 4e6, tabunganBulan: 1e6 });
  assert.equal(r.target, 24e6);
  assert.equal(r.kurang, 20e6);
  assert.equal(r.lamaMenabung, 20);
});

test('Modal usaha', () => {
  const r = c.modalUsaha({ peralatan: 5e6, perizinan: 1e6, renovasi: 0, stokAwal: 2e6, biayaBulanan: 3e6, bulanCadangan: 3, persenCadangan: 10 });
  assert.equal(r.modalAwal, 8e6);
  assert.equal(r.modalKerja, 9e6);
  near(r.cadangan, 1.7e6);
  near(r.total, 18.7e6);
});

test('Pesangon: tabel PP 35/2021', () => {
  assert.equal(c.kelipatanPesangon(0.5), 1);
  assert.equal(c.kelipatanPesangon(1), 2);
  assert.equal(c.kelipatanPesangon(7.9), 8);
  assert.equal(c.kelipatanPesangon(8), 9);
  assert.equal(c.kelipatanPesangon(20), 9);
  assert.equal(c.kelipatanUpmk(2.9), 0);
  assert.equal(c.kelipatanUpmk(3), 2);
  assert.equal(c.kelipatanUpmk(6), 3);
  assert.equal(c.kelipatanUpmk(21), 8);
  assert.equal(c.kelipatanUpmk(23.9), 8);
  assert.equal(c.kelipatanUpmk(24), 10);
});

test('Pesangon: upah Rp6 juta, 5 tahun, efisiensi', () => {
  // UP 6 × 6jt = 36jt; UPMK 2 × 6jt = 12jt; total 48jt, di bawah Rp50jt → PPh 0
  const r = c.pesangon({ upah: 6e6, masaKerja: 5, alasan: 'efisiensi' });
  assert.equal(r.up, 36e6);
  assert.equal(r.upmk, 12e6);
  assert.equal(r.pajak, 0);
  // Pensiun 10 tahun upah 8jt: UP 9 × 8jt × 1,75 = 126jt; UPMK 4 × 8jt = 32jt; total 158jt
  // PPh: 0 + 5% × 50jt + 15% × 58jt = 2,5jt + 8,7jt = 11,2jt
  const p = c.pesangon({ upah: 8e6, masaKerja: 10, alasan: 'pensiun' });
  assert.equal(p.up, 126e6);
  assert.equal(p.upmk, 32e6);
  assert.equal(p.pajak, 11.2e6);
  assert.equal(c.pesangon({ upah: 6e6, masaKerja: 5, alasan: 'pailit' }).up, 18e6);
});

test('Deposito: Rp10 juta, 4%, 12 bulan', () => {
  // Bunga 400.000, pajak 20% = 80.000, bersih 320.000
  const r = c.deposito({ pokok: 10e6, bungaTahunan: 4, tenor: 12 });
  near(r.bungaKotor, 400000);
  near(r.pajak, 80000);
  near(r.totalAkhir, 10320000);
  assert.equal(r.diAtasTbp, true);
  // Rp5 juta tidak dipotong pajak
  assert.equal(c.deposito({ pokok: 5e6, bungaTahunan: 3, tenor: 6 }).pajak, 0);
});

test('Harga sablon: 24 kaus 1 warna = Rp42.000 per kaus (contoh artikel)', () => {
  // Bahan: 24×32.000 + 60.000 + 24×1.500 + 24×1.000 = 888.000; jam: 2 + 24×10/60 = 6; upah 120.000
  const r = c.hargaSablon({ jumlah: 24, hargaKaus: 32000, warna: 1, biayaScreen: 60000, tintaPerKaus: 1500, upahPerJam: 20000, jamPersiapan: 2, menitCetak: 10, kemasan: 1000, margin: 35 });
  near(r.totalBiaya, 1008000);
  near(r.biayaPerKaus, 42000);
  near(r.hargaPerKaus, 64615.38);
});

test('Upah lembur: upah Rp5.190.000 → Rp30.000 per jam', () => {
  // Hari kerja 3 jam: 1,5 + 2 + 2 = 5,5 × 30.000 = 165.000
  const a = c.upahLembur({ dasarUpah: 5190000, jenis: 'kerja', jam: 3 });
  near(a.upahSejam, 30000);
  near(a.perHari, 165000);
  // Libur, 6 hari kerja, 9 jam: 7×2 + 3 + 4 = 21 × 30.000 = 630.000
  near(c.upahLembur({ dasarUpah: 5190000, jenis: 'libur6', jam: 9 }).perHari, 630000);
  // Libur, 5 hari kerja, 9 jam: 8×2 + 3 = 19 × 30.000 = 570.000
  near(c.upahLembur({ dasarUpah: 5190000, jenis: 'libur5', jam: 9 }).perHari, 570000);
  near(c.upahLembur({ dasarUpah: 5190000, jenis: 'kerja', jam: 2, hariPerBulan: 10 }).perBulan, 1050000);
  assert.ok(c.upahLembur({ dasarUpah: 5190000, jenis: 'kerja', jam: 5 }).error);
});
