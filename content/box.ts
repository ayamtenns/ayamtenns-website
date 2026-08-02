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
// Foto makanan: photoshoot Ayamtenns sendiri.
// Foto peternakan: diambil dari cibadak.com (halaman "Around The Farm").
//
// PENTING — HAK CIPTA: foto peternakan itu milik PT Cibadak Indah Sari Farm,
// bukan milik Ayamtenns. Pastikan izin pakainya sudah ada. Kalau belum/dicabut,
// hapus saja `credit` + ganti src-nya; layout tidak akan rusak.
//
// CATATAN KUALITAS: aslinya cuma 555x300 px, jadi agak lembut kalau dipakai
// full-bleed di layar Retina. Kalau dapat versi resolusi tinggi dari Cibadak,
// timpa file di /public/images/farm/ dan perbarui width/height di bawah.
export interface Figure {
  src: string
  alt: string
  caption?: string
  credit?: string
  width: number
  height: number
}

const CIBADAK_CREDIT = 'Foto: PT Cibadak Indah Sari Farm'

export const HERO_IMAGE: Figure = {
  src: '/images/photoshoot/DSC00889.jpg',
  alt: 'Potongan ayam goreng Ayamtenns terlempar dari keranjang saringan',
  width: 4000,
  height: 5000,
}

// ── Foto peternakan Cibadak (555x300 semua) ──
export const FARM_IMAGE: Figure = {
  src: '/images/farm/kandang-luar.jpg',
  alt: 'Deretan kandang broiler di kompleks peternakan Cibadak Indah Sari Farm',
  caption: 'Kompleks kandang broiler Cibadak.',
  credit: CIBADAK_CREDIT,
  width: 555,
  height: 300,
}

export const CLOSED_HOUSE_IMAGE: Figure = {
  src: '/images/farm/closed-house.jpg',
  alt: 'Bagian dalam kandang tertutup dengan deretan tempat pakan dan minum otomatis',
  caption: 'Kandang tertutup, pakan dan minum otomatis.',
  credit: CIBADAK_CREDIT,
  width: 555,
  height: 300,
}

export const CHICK_IMAGE: Figure = {
  src: '/images/farm/anak-ayam.jpg',
  alt: 'Anak ayam umur sehari di dalam boks dari penetasan',
  caption: 'Dari penetasan mereka sendiri.',
  credit: CIBADAK_CREDIT,
  width: 555,
  height: 300,
}

export const FEED_MILL_IMAGE: Figure = {
  src: '/images/farm/feed-mill.jpg',
  alt: 'Silo-silo pabrik pakan milik Cibadak Indah Sari Farm',
  caption: 'Pabrik pakan mereka sendiri.',
  credit: CIBADAK_CREDIT,
  width: 555,
  height: 300,
}

export const FLOCK_IMAGE: Figure = {
  src: '/images/farm/flock.jpg',
  alt: 'Kawanan ayam broiler dewasa berbulu putih di dalam kandang',
  credit: CIBADAK_CREDIT,
  width: 555,
  height: 300,
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
  caption: 'Ujungnya: di kotak kamu.',
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
    // Fakta di bagian ini bersumber dari cibadak.com/our-company & /our-products.
    // Jangan tambah klaim yang tidak ada di sana.
    id: 'terpadu',
    kicker: 'Bagian dua',
    heading: 'Satu perusahaan, dari telur sampai potong',
    paragraphs: [
      'Cibadak berdiri tahun 1975 di Tangerang dan menjalankan sendiri seluruh rantainya: peternakan indukan, penetasan, pabrik pakan, sampai kandang broiler.',
      'Artinya ayam yang kami goreng tidak berpindah-pindah tangan sebelum sampai ke dapur kami.',
    ],
    figureAfter: CHICK_IMAGE,
  },
  {
    id: 'kandang',
    kicker: 'Bagian tiga',
    heading: 'Kandang tertutup, iklim diatur',
    paragraphs: [
      'Seluruh kandang broiler mereka sudah closed house sejak 2011, dengan pengatur suhu dan sirkulasi otomatis.',
      'Ayam tidak kepanasan, tidak berdesakan di kandang terbuka, dan tidak terpapar unggas liar. Mereka juga menerapkan prosedur biosecurity ketat di seluruh fasilitas.',
    ],
    figureAfter: CLOSED_HOUSE_IMAGE,
  },
  {
    id: 'antibiotik',
    kicker: 'Bagian empat',
    heading: 'Tanpa antibiotik',
    paragraphs: [
      'Pollo membesarkan ayamnya tanpa antibiotik — klaim yang produsennya sendiri cantumkan di kemasan ritel mereka.',
    ],
    figureInline: WRAPPER_IMAGE,
  },
  {
    id: 'pakan',
    kicker: 'Bagian lima',
    heading: 'Pakan prebiotik & probiotik',
    paragraphs: [
      'Pakannya mengandung prebiotik dan probiotik, supaya pencernaan ayam lebih sehat. Hasilnya daging yang lebih padat dan tidak berbau amis.',
      // Sumber: cibadak.com — pabrik pakan sendiri (Jumbo® Feed) + laboratorium
      // uji mikrobiologi dan serologi.
      'Pakannya digiling di pabrik mereka sendiri, dan mereka punya laboratorium sendiri untuk uji mikrobiologi dan serologi.',
    ],
    note: 'Ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',
    figureAfter: FEED_MILL_IMAGE,
  },
  {
    id: 'terlacak',
    kicker: 'Bagian enam',
    heading: 'Sumber terlacak',
    paragraphs: [
      'Satu peternakan, bukan campuran dari beberapa pemasok pasar.',
      // Sumber: cibadak.com/our-products — "trace through out the production
      // process", QC di titik-titik kritis dengan sistem kontrol terpusat.
      'Cibadak melacak ayamnya di sepanjang proses produksi, dengan tim QC di titik-titik kritis.',
    ],
    pullQuote: 'Kami bisa menyebut asalnya karena kami memang tahu.',
    figureAfter: FLOCK_IMAGE,
  },
  {
    id: 'msg',
    kicker: 'Bagian tujuh',
    heading: 'Tanpa MSG',
    pullQuote: 'Rasa datang dari bumbu, bukan penguat rasa.',
    figureAfter: TRACE_IMAGE,
  },
  {
    id: 'reheat',
    kicker: 'Bagian delapan',
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
  kicker: 'Bagian sembilan',
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
