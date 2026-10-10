// Satu-satunya tempat untuk mengubah identitas situs, akun Google, dan iklan.
// Semua nilai kosong ('') berarti fiturnya mati sampai diisi.
export default {
  name: 'LabaKita',
  tagline: 'Kalkulator & panduan usaha kecil dan keuangan pribadi',
  // Alamat situs. Saat ini alamat Cloudflare Workers; ganti dengan domain sendiri setelah dibeli (tanpa garis miring di akhir).
  // Bisa ditimpa saat build dengan variabel lingkungan SITE_URL (misalnya untuk pratinjau Netlify).
  url: process.env.SITE_URL || 'https://labakita.wjzyy9fpzd.workers.dev',
  // false = situs pratinjau: semua halaman diberi noindex dan robots.txt memblokir mesin pencari.
  // Ubah ke true (atau set SITE_INDEXABLE=true) setelah situs memakai domain final.
  indexable: process.env.SITE_INDEXABLE ? process.env.SITE_INDEXABLE === 'true' : false,
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
