"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const sampleVideos: VideoItem[] = [
  {
    id: "1",
    title: "Ospek Sistem Informasi Angkatan 2025 - Highlights",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Tubes Sistem Informasi Angkatan 2025",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

interface VideoGalleryProps {
  isInView: boolean;
}

export function VideoGallery({ isInView }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sampleVideos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl bg-[#1E293B] aspect-video"
        >
          {/* Thumbnail with Play Button */}
          <div className="relative w-full h-full">
            <img
              src={video.thumbnailUrl || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl cursor-pointer group-hover:bg-[#0369A1] transition-colors duration-300"
              >
                <Play className="w-7 h-7 text-[#0369A1] group-hover:text-white transition-colors ml-1" />
              </motion.div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="text-white font-medium">{video.title}</h4>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
