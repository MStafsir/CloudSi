"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";
import type { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
  onClick: () => void;
  delay: number;
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const roleBadgeColors: Record<string, string> = {
  "Ketua Angkatan": "bg-blue-900 text-white",
  "Wakil Ketua": "bg-blue-900 text-white",
  "Wakil Ketua Angkatan": "bg-blue-900 text-white",
  "Sekretaris A": "bg-blue-800 text-white",
  "Sekretaris B": "bg-blue-800 text-white",
  "Bendahara A": "bg-sky-600 text-white",
  "Bendahara B": "bg-sky-600 text-white",
  "Koordinator Divisi": "bg-sky-600 text-white",
  "Anggota Divisi": "bg-teal-600 text-white",
  Anggota: "bg-slate-400 text-white",
  Member: "bg-slate-400 text-white",
};

function MemberCardComponent({ member, onClick, delay }: MemberCardProps) {
  const roleColor =
    roleBadgeColors[member.role || "Member"] || "bg-slate-400 text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.5) }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl p-6 border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:shadow-[#87CEEB]/15 transition-all duration-300 h-full flex flex-col">
        {/* Profile Photo - 150x150px */}
        <div className="relative w-[150px] h-[150px] mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#0369A1] p-[4px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src={
                  member.photoUrl ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                    encodeURIComponent(member.name) || "/placeholder.svg"
                  }`
                }
                alt={member.name}
                width={150}
                height={150}
                className="w-full h-full object-cover"
                unoptimized={true}
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center flex-1 flex flex-col">
          <h4 className="font-bold text-[#1E293B] group-hover:text-[#0369A1] transition-colors text-lg leading-tight">
            {member.name}
          </h4>
          <p className="text-sm text-[#64748B] mb-3">{member.nim}</p>

          {/* Role Badge */}
          {member.role && (
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 mx-auto ${roleColor}`}
            >
              {member.role}
            </span>
          )}

          {/* Konsentrasi & Divisi Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            <span className="inline-block px-2.5 py-1 text-xs font-medium text-[#0369A1] bg-[#E0F2FE] rounded-full border border-[#87CEEB]/30">
              {member.konsentrasi}
            </span>
            {member.divisi && (
              <span className="inline-block px-2.5 py-1 text-xs font-medium text-[#64748B] bg-[#F3F4F6] rounded-full border border-[#E5E7EB]">
                {member.divisi}
              </span>
            )}
          </div>

          {/* Bio - line-clamp-2 */}
          <p className="text-sm text-[#64748B] line-clamp-2 mb-4 flex-1">
            {member.bio}
          </p>

          {/* Social Links - hover to show */}
          <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
            {Object.entries(member.social).map(([platform, handle]) => {
              if (!handle) return null;
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              if (!Icon) return null;

              const href =
                platform === "instagram"
                  ? `https://instagram.com/${handle.replace("@", "")}`
                  : platform === "linkedin"
                  ? `https://linkedin.com/in/${handle}`
                  : `https://github.com/${handle}`;

              return (
                <motion.a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0369A1] hover:bg-[#0369A1] hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const MemberCard = memo(MemberCardComponent);
