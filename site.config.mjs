// Satu-satunya tempat untuk mengubah identitas situs, akun Google, dan iklan.
// Semua nilai kosong ('') berarti fiturnya mati sampai diisi.
export default {
  name: 'LabaKita',
  tagline: 'Kalkulator & panduan usaha kecil dan keuangan pribadi',
  // Ganti dengan domain sendiri setelah dibeli (tanpa garis miring di akhir).
  url: 'https://labakita.pages.dev',
  lang: 'id',
  owner: {
    name: 'Huda',
    role: 'Pendiri & penulis LabaKita',
  },
  // Pakai email dengan domain sendiri (contoh: halo@labakita.com) setelah domain aktif.
  email: 'halo@labakita.com',

  // Google Analytics 4, contoh: 'G-XXXXXXXXXX'. Pasang sejak hari pertama.
  gaMeasurementId: '',

  // Google AdSense, contoh: 'ca-pub-1234567890123456'.
  // Mengisi ini memasang kode AdSense di <head> semua halaman dan mengisi /ads.txt.
  adsenseClient: '',
  // Setelah AdSense MENYETUJUI situs, ubah ke true untuk menampilkan unit iklan manual.
  // Selama peninjauan biarkan false (cukup kode di <head> + ads.txt).
  adsEnabled: false,
  // ID slot unit iklan manual dari dasbor AdSense (Iklan → Menurut unit iklan).
  adSlots: {
    afterIntro: '',
    inArticle: '',
    afterResult: '',
    endOfArticle: '', // multipleks
  },

  // URL action formulir newsletter (Mailchimp, MailerLite, Brevo, dsb.). Kosong = formulir disembunyikan.
  newsletterAction: '',
  newsletterEmailField: 'EMAIL',
};
