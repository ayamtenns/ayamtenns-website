// Semua teks halaman /box ada di sini.
// Edit file ini untuk update konten — tidak perlu menyentuh komponen React.

// ─── Kontak ───────────────────────────────────────────────────────────────────
// Ganti dengan nomor WA aktif dalam format internasional tanpa tanda + atau spasi.
export const WHATSAPP_NUMBER = '6208111779957'

// ─── Meta & OG ────────────────────────────────────────────────────────────────
export const PAGE_META = {
  title: 'Ayamtenns — Kenalan sama ayamnya',
  description:
    'Ayam Pollo® dari PT Cibadak Indah Sari Farm. Tanpa antibiotik, tanpa MSG. Sumber terlacak.',
  ogDescription:
    'Kamu baru saja makan ayam dari peternakan yang bisa kami sebut namanya.',
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  heading: 'KAMI TAU AYAMNYA DARI MANA',
  body: 'Kamu baru saja makan ayam dari peternakan yang bisa kami sebut namanya.',
}

// ─── Bagian 01–06 ─────────────────────────────────────────────────────────────
export interface Section {
  id: string
  num: string
  heading: string
  paragraphs?: string[]
  badges?: string[]
  note?: string
  reheatingPlaceholder?: string
  reheatingFinal?: string
}

export const SECTIONS: Section[] = [
  {
    id: 'asal',
    num: '01',
    heading: 'Ayamnya dari mana',
    paragraphs: [
      'Kami pakai ayam Pollo®, produksi PT Cibadak Indah Sari Farm — peternakan unggas terpadu yang sudah beroperasi sejak 1975.',
      'Ayam yang sama yang dijual di supermarket. Bukan ayam kelas foodservice yang lebih murah.',
    ],
    badges: ['NKV', 'Halal', 'HACCP'],
  },
  {
    id: 'antibiotik',
    num: '02',
    heading: 'Tanpa antibiotik',
    paragraphs: [
      'Pollo membesarkan ayamnya tanpa antibiotik — klaim yang produsennya sendiri cantumkan di kemasan ritel mereka.',
    ],
  },
  {
    id: 'pakan',
    num: '03',
    heading: 'Pakan prebiotik & probiotik',
    paragraphs: [
      'Pakannya mengandung prebiotik dan probiotik, supaya pencernaan ayam lebih sehat. Hasilnya daging yang lebih padat dan tidak berbau amis.',
    ],
    note: 'Ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',
  },
  {
    id: 'terlacak',
    num: '04',
    heading: 'Sumber terlacak',
    paragraphs: [
      'Satu peternakan, bukan campuran dari beberapa pemasok pasar.',
      'Kami bisa menyebut asalnya karena kami memang tahu.',
    ],
  },
  {
    id: 'msg',
    num: '05',
    heading: 'Tanpa MSG',
    paragraphs: ['Rasa datang dari bumbu, bukan penguat rasa.'],
  },
  {
    id: 'reheat',
    num: '06',
    heading: 'Cara panasin ulang',
    // PENTING: Angka suhu dan durasi BELUM diuji. Jangan isi sampai sudah benar-benar diverifikasi.
    // Ganti kedua field di bawah setelah pengujian selesai.
    reheatingPlaceholder: '[SUHU] · [DURASI] — belum diisi',
    reheatingFinal: 'Jangan microwave. Serius.',
  },
]

// ─── Bagian 07: Level pedas ────────────────────────────────────────────────────
// Lvl 3 Hot dan Lvl 4 X-Hot akan ditambahkan nanti.
// Keduanya BELUM ada di dapur — jangan tampilkan sampai siap.
export const SPICE_LEVELS = [
  { label: 'Lvl 0', name: 'No Spicy' },
  { label: 'Lvl 1', name: 'Mild' },
  { label: 'Lvl 2', name: 'Medium' },
]

// ─── Penutup ──────────────────────────────────────────────────────────────────
export const OUTRO = {
  heading: 'ADA YANG KURANG PAS?',
  body: 'Kabarin kami, kami ganti.',
  whatsappLabel: 'WhatsApp Kami',
  instagram: '@ayamtenns',
  instagramUrl: 'https://instagram.com/ayamtenns',
}
