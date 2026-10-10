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
