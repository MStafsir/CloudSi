"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/types";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const currentPhoto = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation - Previous */}
          {photos.length > 1 && (
            <button
              onClick={() => onNavigate("prev")}
              className="absolute left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Image Container */}
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={currentPhoto.url || "/placeholder.svg"}
                alt={currentPhoto.altText}
                width={currentPhoto.width || 1200}
                height={currentPhoto.height || 800}
                className="object-contain max-h-[75vh] rounded-lg"
                priority
                unoptimized={true}
              />
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-center"
            >
              <p className="text-white text-lg font-medium">
                {currentPhoto.caption}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {currentIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation - Next */}
          {photos.length > 1 && (
            <button
              onClick={() => onNavigate("next")}
              className="absolute right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
