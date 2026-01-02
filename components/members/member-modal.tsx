"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import type { Member } from "@/lib/types";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function MemberModal({ isOpen, onClose, member }: MemberModalProps) {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-[#E0F2FE] transition-colors"
            >
              <X className="w-5 h-5 text-[#64748B]" />
            </button>

            {/* Header with Photo */}
            <div className="bg-gradient-to-br from-[#E0F2FE] to-[#87CEEB]/30 pt-8 pb-16 px-6 text-center">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#0369A1] p-[4px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={
                        member.photoUrl ||
                        "/placeholder.svg?height=128&width=128&query=student portrait"
                      }
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 -mt-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold text-[#1E293B] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#64748B] mb-3">{member.nim}</p>

                {member.role && (
                  <div className="mb-3">
                    <span className="px-4 py-1.5 text-sm font-semibold text-white bg-[#0369A1] rounded-full">
                      {member.role}
                    </span>
                  </div>
                )}

                {/* Konsentrasi & Divisi */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-[#0369A1] bg-[#E0F2FE] rounded-full">
                    {member.konsentrasi}
                  </span>
                  {member.divisi && (
                    <span className="px-3 py-1 text-xs font-medium text-[#64748B] bg-[#F3F4F6] rounded-full">
                      {member.divisi}
                    </span>
                  )}
                </div>

                {/* Bio */}
                <p className="text-[#64748B] leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Contact */}
                <div className="flex items-center justify-center gap-2 text-sm text-[#64748B] mb-6">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-[#0369A1] transition-colors"
                  >
                    {member.email}
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {Object.entries(member.social).map(([platform, handle]) => {
                    if (!handle) return null;
                    const Icon =
                      socialIcons[platform as keyof typeof socialIcons];
                    if (!Icon) return null;

                    return (
                      <motion.a
                        key={platform}
                        href={`https://${platform}.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0369A1] hover:bg-[#0369A1] hover:text-white transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
