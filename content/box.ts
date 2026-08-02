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

// ─── Isi artikel ──────────────────────────────────────────────────────────────
// `figureAfter` menempelkan gambar full-bleed setelah bagian tersebut.
export interface Stat {
  value: string
  label: string
}

export interface Section {
  id: string
  kicker: string
  heading: string
  paragraphs?: string[]
  lead?: boolean          // paragraf pertama dibuat lebih besar (gaya artikel)
  badges?: string[]
  note?: string
  pullQuote?: string      // kalimat ditonjolkan besar
  stats?: Stat[]          // angka yang ditonjolkan (harus ada sumbernya di SOURCES)
  bullets?: string[]      // daftar poin pendek
  figureAfter?: Figure
  figureInline?: Figure
  reheatingPlaceholder?: string
  reheatingFinal?: string
}

export const SECTIONS: Section[] = [
  {
    id: 'pilihan',
    kicker: 'Bagian satu',
    heading: 'Ada pilihan yang lebih murah',
    lead: true,
    paragraphs: [
      'Setiap tempat ayam goreng menghadapi pilihan yang sama di awal: ambil ayam kelas foodservice yang lebih murah, atau bayar lebih untuk ayam kelas ritel — yang sama dengan yang dijual di supermarket.',
      'Kami ambil yang lebih mahal. Halaman ini menjelaskan kenapa.',
    ],
    figureAfter: FARM_IMAGE,
  },
  {
    // Sumber: Permentan No. 14/2017 Pasal 16 (berlaku 1 Januari 2018).
    // Angka di `stats` dari studi longitudinal peternakan broiler Jawa Barat,
    // Poultry Science 2025 — lihat SOURCES di bawah. Jangan ubah angka tanpa
    // memeriksa ulang sumbernya.
    id: 'industri',
    kicker: 'Bagian dua',
    heading: 'Yang sebenarnya terjadi di industri ayam',
    paragraphs: [
      'Sejak 1 Januari 2018, pemerintah melarang antibiotik pemacu pertumbuhan di pakan ternak. Aturan itu berlaku untuk semua peternak di Indonesia — jadi "tanpa antibiotik pemacu pertumbuhan" bukan keistimewaan siapa pun.',
      'Tapi antibiotik untuk pencegahan masih boleh. Dan di situ ceritanya belum selesai. Sebuah studi di peternakan broiler Jawa Barat menemukan pola ini:',
    ],
    stats: [
      { value: '80%', label: 'antibiotik dipakai untuk pencegahan — diberikan ke ayam yang tidak sedang sakit' },
      { value: '11 hari', label: 'rata-rata pemberian antibiotik dalam satu siklus hidup 30 hari' },
      { value: '6,2', label: 'rata-rata jumlah antibiotik yang sudah tidak mempan pada bakteri dari peternakan itu' },
    ],
  },
  {
    id: 'kenapa',
    kicker: 'Bagian tiga',
    heading: 'Kenapa peternakan melakukannya',
    paragraphs: [
      'Broiler dipanen umur 30–35 hari. Dalam waktu sesingkat itu, dipelihara padat, satu wabah bisa menghabiskan seisi kandang. Antibiotik pencegahan jadi asuransi yang murah.',
      'Ini bukan soal peternak jahat. Ini soal kandang yang bikin ayam gampang sakit — lalu obatnya dipakai untuk menutupi itu.',
    ],
    pullQuote: 'Jadi kami cari peternakan yang menghilangkan alasannya sejak awal.',
  },
  {
    // Semua fakta di bawah dari cibadak.com/our-company & /our-products.
    id: 'peternakan',
    kicker: 'Bagian empat',
    heading: 'Peternakan yang kami pilih',
    paragraphs: [
      'Ayam kami dari PT Cibadak Indah Sari Farm — berdiri 1975 di Tangerang, dan menjalankan sendiri seluruh rantainya: peternakan indukan, penetasan, pabrik pakan, sampai kandang broiler.',
      'Seluruh kandang broiler mereka sudah tertutup sejak 2011, dengan pengatur suhu dan sirkulasi otomatis, ditambah prosedur biosecurity ketat di seluruh fasilitas.',
    ],
    bullets: [
      'Ayam tidak kepanasan',
      'Tidak berdesakan di kandang terbuka',
      'Tidak ketemu unggas liar pembawa penyakit',
    ],
    badges: ['NKV', 'Halal', 'HACCP'],
    figureAfter: CLOSED_HOUSE_IMAGE,
  },
  {
    id: 'logika',
    kicker: 'Bagian lima',
    heading: 'Logikanya sederhana',
    pullQuote: 'Ayam yang tidak gampang sakit, tidak butuh banyak alasan untuk diobati.',
    paragraphs: [
      'Kandang tertutup, penetasan sendiri, pakan sendiri — semuanya lebih mahal dibanding kandang terbuka dan pakan beli. Itu yang kami bayar.',
    ],
    figureAfter: CHICK_IMAGE,
  },
  {
    // Sumber pakan: cibadak.com (pabrik pakan sendiri + lab mikrobiologi/serologi).
    // Konteks prebiotik/probiotik sebagai pengganti AGP pasca-2018: Medion,
    // Poultry Indonesia. Efek "sederhana tapi nyata": meta-analisis Frontiers
    // in Animal Science 2025 — jangan dibesar-besarkan.
    id: 'pakan',
    kicker: 'Bagian enam',
    heading: 'Pakannya',
    paragraphs: [
      'Pakan broiler biasa isinya jagung, bungkil kedelai, dedak, dan tepung ikan. Pakan yang dipakai di sini ditambah prebiotik dan probiotik — bakteri baik dan "makanan" untuk bakteri itu.',
      'Ini justru muncul karena larangan 2018 tadi: setelah antibiotik pemacu pertumbuhan dilarang, industri mencari cara lain menjaga pencernaan ayam. Pakannya digiling di pabrik mereka sendiri, dan mereka punya laboratorium sendiri untuk uji mikrobiologi dan serologi.',
    ],
    note: 'Sejujurnya: efek prebiotik dan probiotik pada ayam itu nyata tapi sederhana, bukan keajaiban. Dan ini soal cara ayamnya dibesarkan — bukan berarti dagingnya mengandung probiotik.',
    figureAfter: FEED_MILL_IMAGE,
  },
  {
    id: 'antibiotik',
    kicker: 'Bagian tujuh',
    heading: 'Soal klaim tanpa antibiotik',
    paragraphs: [
      'Pollo mencantumkan klaim "tanpa antibiotik" di kemasan ritel mereka sendiri. Kami mengutip klaim produsennya — bukan hasil uji laboratorium kami.',
    ],
    figureInline: WRAPPER_IMAGE,
  },
  {
    id: 'terlacak',
    kicker: 'Bagian delapan',
    heading: 'Sumber terlacak',
    paragraphs: [
      'Satu peternakan, bukan campuran dari beberapa pemasok pasar. Cibadak melacak ayamnya di sepanjang proses produksi, dengan tim QC di titik-titik kritis.',
    ],
    pullQuote: 'Kami bisa menyebut asalnya karena kami memang tahu.',
    figureAfter: FLOCK_IMAGE,
  },
  {
    // Bagian ini sengaja ada. Jangan dihapus untuk "merapikan" halaman —
    // justru ini yang bikin bagian lain layak dipercaya.
    id: 'jujur',
    kicker: 'Bagian sembilan',
    heading: 'Yang tidak bisa kami klaim',
    bullets: [
      'Kami tidak menguji sendiri daging kami di laboratorium.',
      'Larangan antibiotik pemacu pertumbuhan berlaku untuk semua peternak sejak 2018 — itu bukan keistimewaan kami.',
      'Kami tidak tahu isi kandang pemasok lain, dan tidak akan mengarang soal itu.',
    ],
    // Ditaruh sebagai pullQuote supaya muncul sesudah daftar di atas — ini
    // kalimat penutupnya, bukan pembuka.
    pullQuote: 'Yang bisa kami pastikan: kami tahu ayam kami dari mana, dan kami memilih membayar lebih untuk itu.',
  },
  {
    id: 'msg',
    kicker: 'Bagian sepuluh',
    heading: 'Tanpa MSG',
    pullQuote: 'Rasa datang dari bumbu, bukan penguat rasa.',
    figureAfter: TRACE_IMAGE,
  },
  {
    id: 'reheat',
    kicker: 'Bagian sebelas',
    heading: 'Cara panasin ulang',
    // PENTING: Angka suhu dan durasi BELUM diuji. Jangan isi sampai sudah benar-benar diverifikasi.
    // Ganti `reheatingPlaceholder` setelah pengujian selesai.
    reheatingPlaceholder: '[SUHU] · [DURASI] — belum diisi',
    reheatingFinal: 'Jangan microwave. Serius.',
  },
]

// ─── Level pedas ──────────────────────────────────────────────────────────────
// Lvl 3 Hot dan Lvl 4 X-Hot akan ditambahkan nanti.
// Keduanya BELUM ada di dapur — jangan tampilkan sampai siap.
export const SPICE = {
  kicker: 'Bagian dua belas',
  heading: 'Level pedas',
  levels: [
    { label: 'Lvl 0', name: 'No Spicy' },
    { label: 'Lvl 1', name: 'Mild' },
    { label: 'Lvl 2', name: 'Medium' },
  ],
}

// ─── Sumber ───────────────────────────────────────────────────────────────────
// Setiap angka dan klaim regulasi di halaman ini harus bisa ditelusuri ke sini.
// Kalau menambah klaim baru, tambahkan sumbernya — atau jangan ditulis.
export const SOURCES = {
  heading: 'Sumber',
  intro: 'Angka dan aturan di halaman ini bisa kamu cek sendiri:',
  items: [
    {
      label: 'Larangan antibiotik pemacu pertumbuhan (AGP), berlaku 1 Januari 2018',
      detail: 'Permentan No. 14/2017 Pasal 16 — Ditjen PKH, Kementerian Pertanian',
      url: 'https://ditjenpkh.pertanian.go.id/berita/734-berdampak-negatif-bagi-kesehatan-pemerintah-larang-penggunakan-agp-pada-ternak',
    },
    {
      label: 'Pola pemakaian antibiotik & resistensi di peternakan broiler Jawa Barat',
      detail: 'Poultry Science, 2025',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12681536/',
    },
    {
      label: 'Prebiotik & probiotik sebagai pengganti AGP',
      detail: 'Medion — Mencari Alternatif Pengganti AGP',
      url: 'https://www.medion.co.id/mencari-alternatif-pengganti-agp/',
    },
    {
      label: 'Seberapa besar efek probiotik pada broiler',
      detail: 'Meta-analisis, Frontiers in Animal Science, 2025',
      url: 'https://www.frontiersin.org/journals/animal-science/articles/10.3389/fanim.2025.1679614/full',
    },
    {
      label: 'Profil peternakan, pabrik pakan, dan keterlacakan',
      detail: 'PT Cibadak Indah Sari Farm',
      url: 'https://cibadak.com/our-company/',
    },
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
