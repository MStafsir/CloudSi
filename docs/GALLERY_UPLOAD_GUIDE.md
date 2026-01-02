# Panduan Upload Foto Gallery (Momen Berharga)

## 1. Siapkan Foto
- **Format**: JPG atau PNG
- **Rekomendasi Nama**: Gunakan huruf kecil dan tanda strip (contoh: `kegiatan-seru.jpg`)
- **Lokasi Upload**: Masukkan file foto ke dalam folder `public/gallery/`

## 2. Update Kode
Buka file `lib/constants.ts` dan edit bagian `GALLERY_DATA`.
Saya sudah menambahkan template di paling bawah (ID: 9).

**Yang perlu diubah:**
```typescript
  {
    id: "9", // Pastikan ID unik
    url: "/gallery/nama-file-anda.jpg", // <-- Ganti dengan nama file foto yang baru Anda upload
    caption: "Judul Foto Momen Baru",   // <-- Ganti judul
    category: "dokumentasi",            // <-- Pilih: 'events', 'activities', 'dokumentasi', 'portrait'
    ...
  },
```

## 3. Cek di Website
Setelah save, refresh halaman web dan foto baru akan muncul di bagian "Momen-Momen Berharga".
