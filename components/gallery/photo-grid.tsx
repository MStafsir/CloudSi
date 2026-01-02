"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { GalleryPhoto } from "@/lib/types"

interface PhotoGridProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#64748B] text-lg">No photos found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPhotoClick(index)}
            className="relative group cursor-pointer overflow-hidden rounded-lg h-64 bg-gray-200"
          >
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.altText}
              fill
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
              <p className="text-white font-medium text-sm line-clamp-2">
                {photo.caption}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-[#0369A1] bg-[#E0F2FE]/90 rounded-full w-fit capitalize">
                {photo.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Placeholder card dengan tag jika jumlah items bukan kelipatan 3 */}
      {photos.length % 3 !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: photos.length * 0.05 }}
        >
          <div className="relative group cursor-default overflow-hidden rounded-lg h-64 bg-gradient-to-br from-gray-200 to-gray-100">
            {/* Hover Overlay - Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
              <p className="text-white font-medium text-sm line-clamp-2">
                Album Kelas B
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-[#0369A1] bg-[#E0F2FE]/90 rounded-full w-fit capitalize">
                Potret
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
