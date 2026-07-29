// Semua teks & gambar halaman /box ada di sini.
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
  ogImage: '/images/photoshoot/DSC00889.jpg',
}

// ─── Gambar ───────────────────────────────────────────────────────────────────
// Semua foto dari photoshoot Ayamtenns sendiri (bukan stock).
// CATATAN: belum ada foto peternakan Pollo / PT Cibadak Indah Sari Farm.
// Kalau nanti dapat fotonya, taruh di /public/images/farm/ lalu ganti `src`
// pada FARM_IMAGE di bawah — layout-nya sudah siap, tidak perlu ubah komponen.
export interface Figure {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export const HERO_IMAGE: Figure = {
  src: '/images/photoshoot/DSC00889.jpg',
  alt: 'Potongan ayam goreng Ayamtenns terlempar dari keranjang saringan',
  width: 4000,
  height: 5000,
}

// Slot untuk foto peternakan. Sementara pakai foto produk sendiri.
export const FARM_IMAGE: Figure = {
  src: '/images/photoshoot/VIN01162.jpg',
  alt: 'Chicken tenders Ayamtenns di atas rak pendingin bersama saus dan acar',
  caption: 'Ayam Pollo®, digoreng di dapur kami.',
  width: 4000,
  height: 6000,
}

export const WRAPPER_IMAGE: Figure = {
  src: '/images/photoshoot/VIN01186-3.jpg',
  alt: 'Sepasang tangan memegang kertas pembungkus Ayamtenns berisi potongan ayam goreng',
  caption: 'Klaimnya kami cetak di kertas pembungkus.',
  width: 4000,
  height: 6000,
}

export const TRACE_IMAGE: Figure = {
  src: '/images/photoshoot/VIN01172.jpg',
  alt: 'Ayam goreng Ayamtenns disajikan di atas meja kayu',
  width: 4000,
  height: 6000,
}

export const OUTRO_IMAGE: Figure = {
  src: '/images/photoshoot/40.JPG',
  alt: 'Tulisan "From Zero to Ten with Tenns" di plafon gerai Ayamtenns',
  width: 5472,
  height: 3648,
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  kicker: 'Soal ayamnya',
  heading: 'KAMI TAU AYAMNYA DARI MANA',
  body: 'Kamu baru saja makan ayam dari peternakan yang bisa kami sebut namanya.',
}

// ─── Bagian 1–6 ───────────────────────────────────────────────────────────────
// `figureAfter` menempelkan gambar full-bleed setelah bagian tersebut.
export interface Section {
  id: string
  kicker: string
  heading: string
  paragraphs?: string[]
  lead?: boolean          // paragraf pertama dibuat lebih besar (gaya artikel)
  badges?: string[]
  note?: string
  pullQuote?: string      // kalimat ditonjolkan besar
  figureAfter?: Figure
  figureInline?: Figure
  reheatingPlaceholder?: string
  reheatingFinal?: string
}

export const SECTIONS: Section[] = [
  {
    id: 'asal',
    kicker: 'Bagian satu',
    heading: 'Ayamnya dari mana',
    lead: true,
    paragraphs: [
      'Kami pakai ayam Pollo®, produksi PT Cibadak Indah Sari Farm — peternakan unggas terpadu yang sudah beroperasi sejak 1975.',
      'Ayam yang sama yang dijual di supermarket. Bukan ayam kelas foodservice yang lebih murah.',
    ],
    badges: ['NKV', 'Halal', 'HACCP'],
    figureAfter: FARM_IMAGE,
  },
  {
    id: 'antibiotik',
    kicker: 'Bagian dua',
    heading: 'Tanpa antibiotik',
    paragraphs: [
      'Pollo membesarkan ayamnya tanpa antibiotik — klaim yang produsennya sendiri cantumkan di kemasan ritel mereka.',
    ],
    figureInline: WRAPPER_IMAGE,
  },
  {
    id: 'pakan',
    kicker: 'Bagian tiga',
    heading: 'Pakan prebiotik & probiotik',
    paragraphs: [
      'Pakannya mengandung prebiotik dan probiotik, supaya pencernaan ayam lebih sehat. Hasilnya daging yang lebih padat dan tidak berbau amis.',
    ],
    note: 'Ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',
  },
  {
    id: 'terlacak',
    kicker: 'Bagian empat',
    heading: 'Sumber terlacak',
    paragraphs: [
      'Satu peternakan, bukan campuran dari beberapa pemasok pasar.',
    ],
    pullQuote: 'Kami bisa menyebut asalnya karena kami memang tahu.',
    figureAfter: TRACE_IMAGE,
  },
  {
    id: 'msg',
    kicker: 'Bagian lima',
    heading: 'Tanpa MSG',
    pullQuote: 'Rasa datang dari bumbu, bukan penguat rasa.',
  },
  {
    id: 'reheat',
    kicker: 'Bagian enam',
    heading: 'Cara panasin ulang',
    // PENTING: Angka suhu dan durasi BELUM diuji. Jangan isi sampai sudah benar-benar diverifikasi.
    // Ganti `reheatingPlaceholder` setelah pengujian selesai.
    reheatingPlaceholder: '[SUHU] · [DURASI] — belum diisi',
    reheatingFinal: 'Jangan microwave. Serius.',
  },
]

// ─── Bagian 7: Level pedas ─────────────────────────────────────────────────────
// Lvl 3 Hot dan Lvl 4 X-Hot akan ditambahkan nanti.
// Keduanya BELUM ada di dapur — jangan tampilkan sampai siap.
export const SPICE = {
  kicker: 'Bagian tujuh',
  heading: 'Level pedas',
  levels: [
    { label: 'Lvl 0', name: 'No Spicy' },
    { label: 'Lvl 1', name: 'Mild' },
    { label: 'Lvl 2', name: 'Medium' },
  ],
}

// ─── Penutup ──────────────────────────────────────────────────────────────────
export const OUTRO = {
  heading: 'ADA YANG KURANG PAS?',
  body: 'Kabarin kami, kami ganti.',
  whatsappLabel: 'WhatsApp Kami',
  instagram: '@ayamtenns',
  instagramUrl: 'https://instagram.com/ayamtenns',
}
