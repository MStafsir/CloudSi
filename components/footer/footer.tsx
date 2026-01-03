"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  ChevronUp,
  Heart,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/cloudsi.25?igsh=dHl4N2sxa2YxZ3Rp",
      label: "Instagram",
    },
    { icon: Github, href: "https://github.com/cloudsi-untan", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/cloudsi-untan",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:cloudsi2025@untan.ac.id", label: "Email" },
  ];

  return (
    <footer className="relative bg-[#E0F2FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logos/logo-angkatan-25.png"
                  alt="CloudSI Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 48px"
                />
              </div>
              <div>
                <span className="font-bold text-[#1E293B]">Cloud</span>
                <span className="font-bold text-[#0369A1]">SI</span>
                <span className="text-sm text-[#64748B] ml-1">25</span>
              </div>
            </div>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
              Website resmi CloudSI - Angkatan 2025 Program Studi Sistem
              Informasi Universitas Tanjungpura. Rumah kami untuk tumbuh
              bersama.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#0369A1] hover:bg-[#0369A1] hover:text-white transition-colors shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#1E293B] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-[#64748B] hover:text-[#0369A1] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1E293B] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.untan.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#0369A1] transition-colors"
                >
                  UNTAN Official
                </a>
              </li>
              <li>
                <a
                  href="https://mipa.untan.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#0369A1] transition-colors"
                >
                  Fakultas MIPA
                </a>
              </li>
              <li>
                <a
                  href="https://hmsifmipauntan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#0369A1] transition-colors"
                >
                  Sistem Informasi UNTAN
                </a>
              </li>
              <li>
                <a
                  href="https://siakad.untan.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] hover:text-[#0369A1] transition-colors"
                >
                  SIAKAD UNTAN
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1E293B] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li>
                <a
                  href="mailto:cloudsi2025@untan.ac.id"
                  className="hover:text-[#0369A1] transition-colors"
                >
                  cloudsi2025@untan.ac.id
                </a>
              </li>
              <li>
                <a
                  href="tel:+62561123456"
                  className="hover:text-[#0369A1] transition-colors"
                >
                  +62 561-XXX-XXXX
                </a>
              </li>
              <li>
                Fakultas MIPA, UNTAN
                <br />
                Jl. Daya Nasional, Pontianak 78124
                <br />
                Kalimantan Barat
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#87CEEB]/30 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#64748B] flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current" />{" "}
              by CloudSI UNTAN 2025
            </p>
            <p className="text-sm text-[#64748B]">
              &copy; {new Date().getFullYear()} CloudSI UNTAN. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#0369A1] text-white shadow-lg hover:bg-[#0369A1]/90 transition-colors flex items-center justify-center"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
