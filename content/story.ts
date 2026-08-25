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
// Foto ditaruh di /public/story/chicken.jpg. Duotone-nya dari CSS, bukan file —
// ganti fotonya kapan saja tanpa edit ulang di Photoshop.
export const HERO = {
  heading: 'KAMI TAU AYAMNYA DARI MANA',
  sub: 'Cerita ayam di balik setiap kotak.',
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
// Bobotnya sengaja tidak seragam: `size` mengatur besar teksnya.
export const CLAIMS = {
  lead: 'Tanpa antibiotik.',
  body: 'Pakan berprebiotik dan probiotik — untuk pencernaan ayam yang lebih sehat. Dagingnya lebih padat, tidak berbau amis.',
  note: 'Ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',
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
// Lvl 3 Hot dan Lvl 4 X-Hot menyusul.
// JANGAN ditampilkan sekarang — keduanya belum ada di dapur.
export const SPICE = {
  heading: 'Level pedas',
  levels: [
    { label: 'Lvl 0', name: 'No Spicy' },
    { label: 'Lvl 1', name: 'Mild' },
    { label: 'Lvl 2', name: 'Medium' },
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
