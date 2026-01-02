# Panduan Mengganti Foto Anggota CloudSI

## 📁 Struktur Folder

Buat folder `members` di dalam `public`:

\`\`\`
public/
├── members/
│   ├── pengurus/
│   │   ├── ketua-phasacola.jpg
│   │   ├── wakil-rifkitio.jpg
│   │   ├── sekretaris-a-ellen.jpg
│   │   ├── sekretaris-b-dhini.jpg
│   │   ├── bendahara-a-syarifah.jpg
│   │   └── bendahara-b-andini.jpg
│   ├── koordinator/
│   │   ├── digitalkreatif-najwa.jpg
│   │   ├── minatbakat-chayara.jpg
│   │   └── humas-ferdi.jpg
│   ├── digital-kreatif/
│   │   ├── felix.jpg
│   │   ├── nikoleta.jpg
│   │   ├── rahmat.jpg
│   │   ├── siti.jpg
│   │   └── ahmad.jpg
│   ├── minat-bakat/
│   │   ├── vita.jpg
│   │   ├── sholichin.jpg
│   │   ├── dewi.jpg
│   │   ├── budi.jpg
│   │   └── rina.jpg
│   ├── humas/
│   │   ├── aldan.jpg
│   │   ├── maya.jpg
│   │   ├── rizky.jpg
│   │   └── putri.jpg
│   └── members/
│       ├── hendra.jpg
│       ├── anisa.jpg
│       ├── dimas.jpg
│       ... (dst untuk 52 member lainnya)
\`\`\`

## 📝 Format Nama File

**Pengurus Inti:**
- `pengurus/{role-lowercase}-{first-name-lowercase}.jpg`
- Contoh: `pengurus/ketua-phasacola.jpg`, `pengurus/bendahara-a-syarifah.jpg`

**Koordinator Divisi:**
- `koordinator/{divisi-lowercase}-{first-name-lowercase}.jpg`
- Contoh: `koordinator/digitalkreatif-najwa.jpg`

**Anggota Divisi:**
- `{divisi-kebab-case}/{first-name-lowercase}.jpg`
- Contoh: `digital-kreatif/felix.jpg`, `minat-bakat/vita.jpg`

**Member Biasa:**
- `members/{first-name-lowercase}.jpg`
- Contoh: `members/hendra.jpg`, `members/anisa.jpg`

## 🖼️ Spesifikasi Foto

- **Format:** JPG atau PNG
- **Ukuran:** Minimum 150x150px, disarankan 300x300px atau lebih
- **Aspect Ratio:** 1:1 (square)
- **File Size:** Kurang dari 500KB (optimasi untuk web)
- **Jenis:** Portrait/headshot photo lebih baik (tidak full body)

## 🔄 Cara Update di Kode

Setelah upload foto ke folder `public/members`, update file `lib/members-data.ts`:

Ganti dari:
\`\`\`typescript
photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phasacola",
\`\`\`

Menjadi:
\`\`\`typescript
photoUrl: "/members/pengurus/ketua-phasacola.jpg",
\`\`\`

## ✅ Checklist

- [ ] Buat folder `public/members` dan subfoldernya
- [ ] Upload semua 76 foto ke folder yang sesuai
- [ ] Update `lib/members-data.ts` dengan path lokal
- [ ] Test preview di browser untuk memastikan foto loading
- [ ] Optimasi ukuran foto jika perlu dengan tools seperti TinyPNG atau ImageOptim
