"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Calendar, MapPin, Users, Play } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-[#E0F2FE] transition-colors"
            >
              <X className="w-5 h-5 text-[#64748B]" />
            </button>

            {/* Featured Image */}
            <div className="relative aspect-video">
              <Image
                src={
                  event.featuredImage ||
                  "/placeholder.svg?height=400&width=700&query=university event"
                }
                alt={event.title}
                fill
                className="object-cover"
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-4">
                {event.title}
              </h3>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-[#64748B]">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#0369A1]" />
                  </div>
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#0369A1]" />
                  </div>
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#0369A1]" />
                  </div>
                  <span className="text-sm">
                    {event.participantsCount} peserta
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#64748B] leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Photo Gallery */}
              {event.photos && event.photos.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1E293B] mb-3">
                    Dokumentasi
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {event.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden"
                      >
                        <Image
                          src={
                            photo ||
                            "/placeholder.svg?height=150&width=250&query=event photo"
                          }
                          alt={`${event.title} photo ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized={true}
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Link */}
              {event.videoUrl && (
                <motion.a
                  href={event.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0369A1] text-white rounded-xl hover:bg-[#0369A1]/90 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Tonton Video</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
