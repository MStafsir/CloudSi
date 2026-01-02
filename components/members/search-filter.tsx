"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { KONSENTRASI_OPTIONS, DIVISI_OPTIONS } from "@/lib/constants"

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeFilter: string
  onFilterChange: (filter: string) => void
  activeDivisiFilter?: string
  onDivisiFilterChange?: (filter: string) => void
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeDivisiFilter = "All",
  onDivisiFilterChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
        <input
          type="text"
          placeholder="Cari nama, NIM, atau bidang..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-[#E0F2FE] bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B] placeholder:text-[#64748B]"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#E0F2FE] transition-colors"
          >
            <X className="w-4 h-4 text-[#64748B]" />
          </button>
        )}
      </div>

      <div className="w-full">
        <p className="text-sm text-[#64748B] text-center mb-2">Bidang Penjurusan</p>
        <div className="flex flex-wrap justify-center gap-2">
          {KONSENTRASI_OPTIONS.map((option) => (
            <motion.button
              key={option}
              onClick={() => onFilterChange(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === option
                  ? "bg-[#87CEEB] text-white shadow-md shadow-[#87CEEB]/30"
                  : "bg-[#F3F4F6] text-[#64748B] hover:bg-[#E0F2FE] hover:text-[#0369A1]"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {onDivisiFilterChange && (
        <div className="w-full">
          <p className="text-sm text-[#64748B] text-center mb-2">Divisi</p>
          <div className="flex flex-wrap justify-center gap-2">
            {DIVISI_OPTIONS.map((option) => (
              <motion.button
                key={option}
                onClick={() => onDivisiFilterChange(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeDivisiFilter === option
                    ? "bg-[#0369A1] text-white shadow-md shadow-[#0369A1]/30"
                    : "bg-[#F3F4F6] text-[#64748B] hover:bg-[#E0F2FE] hover:text-[#0369A1]"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
