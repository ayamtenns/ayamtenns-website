// Semua teks halaman /story ada di sini.
// Edit file ini untuk update konten — tidak perlu menyentuh komponen.

// ─── Kontak ───────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '628111779957'

// ─── Meta ─────────────────────────────────────────────────────────────────────
export const PAGE_META = {
  title: 'Ayamtenns — Kenalan sama ayamnya',
  description: 'Cerita ayam di balik setiap kotak. Nashville hot chicken, BSD City.',
  ogImage: '/story/chicken.jpg',
}

// ─── Bar cepat (sticky) ───────────────────────────────────────────────────────
export const QUICK_BAR = {
  reheat: 'Panasin ulang',
  whatsapp: 'WhatsApp',
}

// ─── 01 · Hero ────────────────────────────────────────────────────────────────
// Foto ditaruh di /public/story/chicken.jpg. Grade-nya dari CSS, bukan file —
// ganti fotonya kapan saja tanpa edit ulang di Photoshop.
//
// Judulnya sengaja sama dengan yang tercetak di kemasan. Orang memegang kotak
// bertulis "RAISED RIGHT.", memindai, lalu kalimat itu muncul lagi — halaman
// ini melanjutkan kotaknya, bukan memperkenalkan diri dari nol.
export const HERO = {
  kicker: 'Dipindai dari kotakmu',
  heading: 'RAISED RIGHT.',
  sub: 'Ayam yang baru kamu makan datang dari satu peternakan. Bukan campuran. Nomor sertifikatnya ada di bawah — silakan dicek.',
  image: {
    src: '/story/chicken.jpg',
    alt: 'Ayam putih hidup di peternakan',
  },
}

// ─── 02 · Rantai pasok ────────────────────────────────────────────────────────
// `here: true` menandai titik tempat pembaca berada sekarang.
export interface Stage {
  label: string
  detail: string
  here?: boolean
}

export const SUPPLY_CHAIN: Stage[] = [
  { label: 'PETERNAKAN', detail: 'Banten' },
  { label: 'RUMAH POTONG', detail: 'Bersertifikat NKV' },
  { label: 'DAPUR KAMI', detail: 'BSD & Gading Serpong' },
  { label: 'KOTAK INI', detail: 'Yang kamu pegang', here: true },
]

// ─── 03 · Jangan percaya kami ─────────────────────────────────────────────────
// Nomor-nomor ini dicek di pengecek resmi Ditjen PKH. Formnya tidak menerima
// nomor lewat URL, jadi nomornya dibuat bisa disalin sekali tap.
export const VERIFY_URL =
  'https://simpol.ditjenpkh.pertanian.go.id/v2/informasi_produk_hewan/ceknoregph'

export const TRUST = {
  heading: 'JANGAN PERCAYA KAMI',
  sub: 'Cek sendiri.',
  items: [
    { label: 'NKV RPHU', value: '3604120-008' },
    { label: 'Registrasi Produk Hewan', value: 'PHD360404052400280' },
  ],
  cta: 'Cek di Ditjen PKH',
  copied: 'Tersalin',
}

// ─── 04 · Klaim ───────────────────────────────────────────────────────────────
// Bobotnya sengaja tidak seragam — yang keras dibaca dulu, sisanya menyusul.
// Setiap klaim ayam di sini tercetak di kemasan ritel pemasok. Jangan tambah
// klaim yang tidak ada di sana.
export const CLAIMS = {
  lead: 'Tanpa antibiotik.',
  leadSub: 'Dibesarkan tanpa antibiotik, dan itu tercetak di kemasan pemasoknya sendiri — bukan cuma kami yang bilang.',

  body: 'Pakannya mengandung prebiotik dan probiotik. Pencernaan ayam yang lebih sehat menghasilkan daging yang lebih padat dan tidak berbau amis.',
  note: 'Ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',

  // Nilai baru: butter di minyak cabainya.
  butterLabel: 'Minyak cabai',
  butter: 'Butter Elle & Vire.',
  butterBody: 'Butter Prancis, bukan margarin. Itu yang bikin lapisan terakhirnya gurih, bukan cuma pedas.',

  msg: 'Tanpa MSG. Rasa datang dari bumbu, bukan penguat rasa.',
}

// ─── 05 · Cara panasin ulang ──────────────────────────────────────────────────
// PENTING: angka suhu dan durasi BELUM diuji. Jangan diisi sampai benar-benar
// dites di dapur — menebak angka di sini menyesatkan pelanggan.
export const REHEAT = {
  heading: 'Cara panasin ulang',
  placeholder: '[SUHU] · [DURASI] — belum diisi',
  final: 'Jangan microwave. Serius.',
}

// ─── 06 · Level pedas ─────────────────────────────────────────────────────────
// Kelimanya sudah ada di dapur (dikonfirmasi 26 Agustus 2026), dan kemasan
// mencetak "FIVE HEAT LEVEL — from No Spicy to X-Hot", jadi halaman ini harus
// menampilkan kelimanya supaya tidak bertabrakan dengan kotaknya.
export const SPICE = {
  heading: 'Level pedas',
  sub: 'Dari No Spicy sampai X-Hot. Seberapa kuat kamu?',
  levels: [
    { label: 'Lvl 0', name: 'No Spicy' },
    { label: 'Lvl 1', name: 'Mild' },
    { label: 'Lvl 2', name: 'Medium' },
    { label: 'Lvl 3', name: 'Hot' },
    { label: 'Lvl 4', name: 'X-Hot' },
  ],
}

// ─── 07 · Penutup ─────────────────────────────────────────────────────────────
export const OUTRO = {
  heading: 'ADA YANG KURANG PAS?',
  body: 'Kabarin kami, kami bantu urus.',
  whatsappLabel: 'WhatsApp kami',
  instagram: '@ayamtenns',
  instagramUrl: 'https://instagram.com/ayamtenns',
}
