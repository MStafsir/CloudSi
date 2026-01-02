# Upload Foto Member CloudSI

## 📝 Penamaan File

Gunakan **ID member** sebagai nama file:
- Format: `XXXX.jpg` atau `XXXX.png`
- Contoh:
  - `1001.jpg` untuk Phasacola Grey Kalista (ID 1001)
  - `1002.jpg` untuk Rifkitio Hardiono (ID 1002)
  - `1016.jpg` untuk Nasywa Akmalia Hanif (ID 1016)

## 🖼️ Spesifikasi Foto

- **Format**: JPG atau PNG
- **Ukuran Ideal**: 300x300px (kotak/square)
- **Ukuran File**: Kurang dari 500KB
- **Jenis**: Portrait/headshot (foto wajah)

## 📋 Cara Upload

1. **Siapkan Foto**
   - Rename foto sesuai ID member (lihat `lib/members-data.ts` untuk ID)
   - Pastikan format JPG atau PNG
   
2. **Upload ke Folder Ini**
   - Simpan semua foto di folder `public/members/`
   - Bisa upload sekaligus atau bertahap

3. **Jalankan Script Update**
   ```bash
   node scripts/update-member-photos.js
   ```
   Script ini akan otomatis update `lib/members-data.ts`

4. **Refresh Browser**
   - Buka website dan refresh
   - Foto member seharusnya sudah berubah

## 🎯 Daftar ID Member (1001-1076)

Lihat file [`lib/members-data.ts`](../lib/members-data.ts) untuk list lengkap member beserta ID-nya.

**Total Member**: 76 orang (ID dari 1001 sampai 1076, tidak berurutan)

## ✅ Tips

- Gunakan tools seperti [TinyPNG](https://tinypng.com/) untuk compress foto
- Pastikan foto berbentuk kotak (1:1 aspect ratio) agar tidak terpotong
- Upload secara bertahap OK! Script bisa dijalankan berkali-kali
