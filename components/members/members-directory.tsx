"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { AnimatedHeading } from "@/components/common/animated-text"
import { SearchFilter } from "./search-filter"
import { MemberCard } from "./member-card"
import { MemberModal } from "./member-modal"
import { MEMBERS_DATA } from "@/lib/constants"
import type { Member } from "@/lib/types"

export function MembersDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeDivisiFilter, setActiveDivisiFilter] = useState("All")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((member) => {
      const matchesSearch =
        searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.konsentrasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.divisi && member.divisi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesKonsentrasi = activeFilter === "All" || member.konsentrasi === activeFilter
      const matchesDivisi = activeDivisiFilter === "All" || member.divisi === activeDivisiFilter

      return matchesSearch && matchesKonsentrasi && matchesDivisi
    })
  }, [searchQuery, activeFilter, activeDivisiFilter])

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  return (
    <section id="members" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-[#F8FBFF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#0369A1] bg-[#E0F2FE] rounded-full mb-4"
          >
            Members
          </motion.span>
          <AnimatedHeading
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 text-balance"
          >
            Anggota CloudSI
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[#64748B]"
          >
            Kenali lebih dekat para mahasiswa Sistem Informasi UNTAN angkatan 2025 dan struktur organisasi CloudSI.
          </motion.p>
        </div>

        {/* Search & Filter - Added divisi filter props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeDivisiFilter={activeDivisiFilter}
            onDivisiFilterChange={setActiveDivisiFilter}
          />
        </motion.div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
                delay={index * 0.05}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#64748B] text-lg">Tidak ada anggota yang ditemukan.</p>
          </div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-[#64748B]"
        >
          Menampilkan {filteredMembers.length} dari {MEMBERS_DATA.length} anggota
        </motion.div>
      </div>

      {/* Member Modal */}
      <MemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} member={selectedMember} />
    </section>
  )
}
