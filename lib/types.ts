// TypeScript interfaces for the CloudSI Website

export interface Member {
  id: string
  name: string
  nim: string
  konsentrasi: "Software Engineer" | "IT Governance" | "Data Analyst" | "Bisnis Digital" | "Belum Dipilih" | "Cloud Infrastructure & DevOps" | "Data Analyst Dan Bisnis Digital"
  email: string
  photoUrl: string
  bio: string
  divisi?: "Digital & Kreatif" | "Minat & Bakat" | "HUMAS" | "Pengurus Inti" | "Belum Bergabung"
  role?:
    | "Ketua Angkatan"
    | "Wakil Ketua"
    | "Wakil Ketua Angkatan"
    | "Sekretaris A"
    | "Sekretaris B"
    | "Bendahara A"
    | "Bendahara B"
    | "Koordinator Divisi"
    | "Anggota Divisi"
    | "Member"
    | "Anggota"
  social: {
    instagram?: string
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface GalleryPhoto {
  id: string
  url: string
  caption: string
  category: "events" | "portrait" | "activities" | "dokumentasi" | "3d-animasi"
  tags: string[]
  timestamp: Date
  altText: string
  width?: number
  height?: number
}

export interface Event {
  id: string
  title: string
  date: Date
  description: string
  location: string
  participantsCount: number
  featuredImage: string
  photos: string[]
  videoUrl?: string
  divisiInvolved?: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  date: Date
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  icon?: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
  icon?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  newsletter: boolean
}

export interface AngkatanMetadata {
  year: number
  totalMembers: number
  description: string
  eventsCount: number
}
