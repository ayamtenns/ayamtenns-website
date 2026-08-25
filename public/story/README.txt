Taruh foto ayam putih hidup di folder ini dengan nama: chicken.jpg

Duotone merah-hitam diterapkan lewat CSS di app/story/page.tsx,
bukan di file gambarnya — jadi foto biasa (berwarna) sudah cukup.

Atur intensitasnya lewat variabel di .st { } pada app/story/page.tsx:
  --duo-strength   seberapa kuat merahnya menembus
  --duo-contrast   kontras midtone
  --duo-bright     kecerahan
  --duo-shadow     seberapa dalam bagian gelapnya

Anggaran: hasil akhir maksimal 200KB. next/image mengonversi ke
WebP/AVIF otomatis; kalau file sumbernya sangat besar, turunkan
quality={65} di app/story/page.tsx.
