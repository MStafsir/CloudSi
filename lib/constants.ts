import type {
  Member,
  GalleryPhoto,
  Event,
  Achievement,
  TimelineItem,
  Stat,
} from "./types";
import { MEMBERS_DATA_FULL } from "./members-data";

// Color Palette Constants
export const COLORS = {
  primaryWhite: "#FFFFFF",
  secondaryWhite: "#F8FBFF",
  lightBlue: "#E0F2FE",
  mediumBlue: "#87CEEB",
  darkBlue: "#0369A1",
  neutralGray: "#F3F4F6",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About CloudSI" },
  { href: "#gallery", label: "Gallery" },
  { href: "#members", label: "Members" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
] as const;

export const STATS_DATA: Stat[] = [
  { label: "Anggota", value: 76, suffix: "+", icon: "users" },
  { label: "Divisi", value: 3, suffix: "", icon: "layers" },
  { label: "Program", value: 10, suffix: "+", icon: "calendar" },
  { label: "Tahun", value: 1, suffix: "", icon: "clock" },
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "Sep 2025",
    title: "Pembukaan CloudSI",
    description:
      "Angkatan 2025 Sistem Informasi UNTAN resmi terbentuk dan CloudSI lahir sebagai identitas angkatan.",
  },
  {
    year: "Okt 2025",
    title: "Pelantikan Pengurus & Divisi",
    description:
      "Pembentukan struktur organisasi dengan 3 divisi utama: Digital & Kreatif, Minat & Bakat, dan HUMAS.",
  },
  {
    year: "Nov 2025",
    title: "Launching Brand CloudSI",
    description:
      "Penetapan nama CloudSI dan identitas visual angkatan dengan makna 'Rumah' bagi seluruh anggota.",
  },
  {
    year: "Des 2025",
    title: "Program Development",
    description:
      "Pelaksanaan berbagai program divisi termasuk workshop, training, dan kegiatan pengembangan skill.",
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "1",
    title: "3 Divisi Terbentuk",
    description: "Digital & Kreatif, Minat & Bakat, HUMAS",
    icon: "layers",
    date: new Date("2025-10-15"),
  },
  {
    id: "2",
    title: "4 Bidang Penjurusan",
    description:
      "Software Engineer, IT Governance, Data Analyst, Bisnis Digital",
    icon: "award",
    date: new Date("2025-09-01"),
  },
  {
    id: "3",
    title: "Solid Community",
    description: "76 anggota angkatan yang saling mendukung",
    icon: "heart",
    date: new Date("2025-09-10"),
  },
  {
    id: "4",
    title: "Program Pengembangan",
    description: "Workshop, training, dan kompetisi untuk pengembangan skill",
    icon: "lightbulb",
    date: new Date("2025-11-05"),
  },
];

export const MEMBERS_DATA: Member[] = MEMBERS_DATA_FULL;

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: "cloudsi-1",
    url: "/gallery/foto1.jpg", 
    caption: "Foto Bersama CloudSI - Part 1",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 1",
    width: 600,
    height: 400,
  },
  {
    id: "cloudsi-2",
    url: "/gallery/foto2.jpg",
    caption: "Foto Bersama CloudSI - Part 2",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 2",
    width: 600,
    height: 400,
  },
  {
    id: "cloudsi-3",
    url: "/gallery/foto3.jpg",
    caption: "Foto Bersama CloudSI - Part 3",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 3",
    width: 600,
    height: 400,
  },
  {
    id: "cloudsi-4",
    url: "/gallery/foto4.jpg",
    caption: "Foto Bersama CloudSI - Part 4",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 4",
    width: 600,
    height: 400,
  },
  {
    id: "cloudsi-5",
    url: "/gallery/foto5.jpg",
    caption: "Foto Bersama CloudSI - Part 5",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 5",
    width: 600,
    height: 400,
  },
  {
    id: "cloudsi-6",
    url: "/gallery/foto6.jpg",
    caption: "Foto Bersama CloudSI - Part 6",
    category: "dokumentasi",
    tags: ["angkatan", "cloudsi"],
    timestamp: new Date(),
    altText: "Foto dokumentasi cloudsi 6",
    width: 600,
    height: 400,
  },
  
];

export const EVENTS_DATA: Event[] = [
  {
    id: "1",
    title: "Pelantikan Pengurus CloudSI 2025",
    date: new Date("2025-10-15"),
    description:
      "Acara pelantikan resmi pengurus angkatan dan divisi CloudSI 2025. Pembentukan struktur organisasi dengan 3 divisi utama untuk menjalankan program-program angkatan.",
    location: "Universitas Tanjungpura, Pontianak",
    participantsCount: 76,
    featuredImage:
      "https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=700&h=400&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    ],
    divisiInvolved: ["HUMAS", "Digital & Kreatif"],
  },
  {
    id: "2",
    title: "Launching Brand CloudSI",
    date: new Date("2025-11-20"),
    description:
      "Penetapan nama dan identitas visual CloudSI sebagai angkatan 2025 Sistem Informasi UNTAN. CloudSI bermakna 'Rumah' - tempat berpulang, berbagi aspirasi, dan saling mendukung.",
    location: "Fakultas MIPA UNTAN, Pontianak",
    participantsCount: 76,
    featuredImage:
      "https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=700&h=400&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    ],
    divisiInvolved: ["Digital & Kreatif", "HUMAS"],
  },
  {
    id: "3",
    title: "Workshop Data Analytics",
    date: new Date("2025-11-25"),
    description:
      "Workshop intensif tentang dasar-dasar Data Analytics menggunakan Python, SQL, dan tools visualisasi seperti Tableau dan Power BI.",
    location: "Lab Komputer FMIPA UNTAN",
    participantsCount: 60,
    featuredImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=400&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    ],
    divisiInvolved: ["Minat & Bakat"],
  },
  {
    id: "4",
    title: "Gathering CloudSI: Semester 1",
    date: new Date("2025-12-15"),
    description:
      "Acara gathering dan refleksi semester pertama CloudSI 2025. Berbagi pengalaman, evaluasi program, dan rencana semester berikutnya.",
    location: "Universitas Tanjungpura, Pontianak",
    participantsCount: 70,
    featuredImage:
      "https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=700&h=400&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    ],
    divisiInvolved: ["HUMAS", "Digital & Kreatif", "Minat & Bakat"],
  },
];

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "events", label: "Events" },
  { id: "portrait", label: "Portrait" },
  { id: "activities", label: "Activities" },
  { id: "dokumentasi", label: "Dokumentasi" },
  { id: "3d-animasi", label: "3D & Animasi" },
] as const;

export const KONSENTRASI_OPTIONS = [
  "All",
  "Software Engineer",
  "IT Governance",
  "Data Analyst Dan Bisnis Digital",
  "Cloud Infrastructure & DevOps",
] as const;

export const DIVISI_OPTIONS = [
  "All",
  "Digital & Kreatif",
  "Minat & Bakat",
  "HUMAS",
  "Belum Bergabung",
] as const;

export const ROLE_OPTIONS = [
  "All",
  "Ketua Angkatan",
  "Wakil Ketua",
  "Sekretaris A",
  "Sekretaris B",
  "Bendahara A",
  "Bendahara B",
  "Koordinator Divisi",
  "Anggota Divisi",
  "Anggota",
] as const;
