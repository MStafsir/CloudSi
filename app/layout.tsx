import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CloudSI - Sistem Informasi Angkatan 2025 | Universitas Tanjungpura",
  description:
    "CloudSI adalah angkatan 2025 Program Studi Sistem Informasi Universitas Tanjungpura. Rumah kami untuk tumbuh bersama, berbagi aspirasi, dan menciptakan masa depan digital yang lebih baik.",
  keywords: [
    "CloudSI",
    "Sistem Informasi",
    "Universitas Tanjungpura",
    "UNTAN",
    "Angkatan 2025",
    "Software Engineer",
    "IT Governance",
    "Data Analyst",
    "Bisnis Digital",
    "Pontianak",
  ],
  authors: [{ name: "CloudSI UNTAN 2025" }],
  creator: "CloudSI UNTAN 2025",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://cloudsi-untan.vercel.app",
    title: "CloudSI - Sistem Informasi Angkatan 2025 | Universitas Tanjungpura",
    description:
      "CloudSI adalah rumah kami - angkatan 2025 Program Studi Sistem Informasi UNTAN",
    siteName: "CloudSI UNTAN 2025",
    images: [
      {
        url: "https://cloudsi-untan.vercel.app/images/logos/logo-angkatan-25.png",
        width: 512,
        height: 512,
        alt: "CloudSI UNTAN 2025 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudSI - Sistem Informasi UNTAN 2025",
    description:
      "Angkatan 2025 Program Studi Sistem Informasi Universitas Tanjungpura",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#87CEEB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
