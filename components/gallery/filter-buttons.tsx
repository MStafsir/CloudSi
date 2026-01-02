"use client"

import { motion } from "framer-motion"
import { GALLERY_CATEGORIES } from "@/lib/constants"

interface FilterButtonsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function FilterButtons({ activeCategory, onCategoryChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {GALLERY_CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? "bg-[#87CEEB] text-white shadow-md shadow-[#87CEEB]/30"
              : "bg-[#F3F4F6] text-[#64748B] hover:bg-[#E0F2FE] hover:text-[#0369A1]"
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  )
}
