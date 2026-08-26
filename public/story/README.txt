Foto hero halaman /story. Nama file harus: chicken.jpg

Fotonya TIDAK diedit di file. Semua penyesuaian nada dilakukan lewat CSS
di app/story/page.tsx, di blok .st { }, supaya foto bisa diganti kapan
saja tanpa buka Photoshop.

NADA FOTO
  --photo-contrast   naikkan untuk memisahkan ayam dari latar (sekarang 1.22)
  --photo-bright     turunkan untuk memperdalam hitam (sekarang 0.94)
  --photo-sat        1 = warna asli. Jaga tetap dekat 1 supaya merah
                     jengger tidak palsu (sekarang 1.06)

GRADE MERAH (tipis, bukan duotone)
  --grade-strength   kekuatan siraman merah di midtone (sekarang 0.14)
                     isi 0 untuk mematikan sama sekali
  --grade-red        warna siramannya (#D91C1C)

  Pakai blend soft-light: menyentuh midtone saja, membiarkan bagian hitam
  dan merah asli jengger apa adanya. Jangan naikkan ke atas ~0.25 —
  lewat itu fotonya mulai terlihat dicelup, bukan di-grade.

FRAMING
  --duo-zoom         perbesar untuk memotong latar kosong di atas ayam
  --duo-origin       titik jangkar saat diperbesar
  --duo-focus        titik fokus crop di layar lebar

  Layar potret dan lanskap punya nilai sendiri — lihat media query
  (min-aspect-ratio: 1/1). Potret perlu zoom, lanskap tidak.

KETERBACAAN
  Ada scrim gelap di bawah foto supaya headline putih tetap terbaca.
  Sudah diukur: skenario terburuk (bulu putih murni) menghasilkan
  kontras 5,35:1 — di atas ambang WCAG 3:1 untuk teks besar.
  Kalau ganti foto yang jauh lebih terang, ukur ulang.

ANGGARAN
  Maksimal 200KB hasil akhir. Foto sekarang: 23KB di lebar mobile.
  next/image mengonversi ke WebP/AVIF otomatis. Kalau file sumber
  sangat besar, turunkan quality={65} di app/story/page.tsx.
