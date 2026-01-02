"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  onClick: () => void;
  delay: number;
}

export function EventCard({ event, onClick, delay }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:shadow-[#87CEEB]/15 transition-all duration-300">
        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={
              event.featuredImage ||
              "/placeholder.svg?height=300&width=500&query=university event"
            }
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Date Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
            <span className="text-sm font-semibold text-[#0369A1]">
              {formatDate(event.date)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="font-bold text-lg text-[#1E293B] mb-2 group-hover:text-[#0369A1] transition-colors line-clamp-1">
            {event.title}
          </h4>
          <p className="text-sm text-[#64748B] line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#87CEEB]" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#87CEEB]" />
              <span>{event.participantsCount} peserta</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
