"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { AnimatedHeading } from "@/components/common/animated-text"
import { useScrollObserver } from "@/components/common/scroll-observer"
import { FilterButtons } from "./filter-buttons"
import { PhotoGrid } from "./photo-grid"
import { LightboxModal } from "./lightbox-modal"
import { VideoGallery } from "./video-gallery"
import { GALLERY_DATA } from "@/lib/constants"

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const [videoRef, videoInView] = useScrollObserver<HTMLDivElement>({ threshold: 0.2 })

  // Filter photos based on category and search
  const filteredPhotos = useMemo(() => {
    return GALLERY_DATA.filter((photo) => {
      const matchesCategory = activeCategory === "all" || photo.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
    } else {
      setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <section id="gallery" className="relative py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#0369A1] bg-[#E0F2FE] rounded-full mb-4"
          >
            Gallery
          </motion.span>
          <AnimatedHeading
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 text-balance"
          >
            Momen-Momen Berharga
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[#64748B]"
          >
            Dokumentasi dari perjalanan kisah kebersamaan Mahasiswa Sistem Informasi UNTAN 2025
          </motion.p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-[#E0F2FE] bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B] placeholder:text-[#64748B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#E0F2FE] transition-colors"
                >
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <FilterButtons activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          </motion.div>
        </div>

        {/* Photo Grid */}
        <div className="mb-20">
          <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
        </div>

        {/* Video Gallery */}
        <div ref={videoRef}>
          <div className="text-center mb-10">
            <AnimatedHeading as="h3" className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Video Dokumentasi
            </AnimatedHeading>
          </div>
          <VideoGallery isInView={videoInView} />
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={filteredPhotos}
        currentIndex={currentPhotoIndex}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
