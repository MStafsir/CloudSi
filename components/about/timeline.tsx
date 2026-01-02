"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { TIMELINE_DATA } from "@/lib/constants"

interface TimelineProps {
  isInView: boolean
}

export function Timeline({ isInView }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#87CEEB] via-[#E0F2FE] to-[#87CEEB]" />

      <div className="space-y-8 md:space-y-12">
        {TIMELINE_DATA.map((item, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-[#E0F2FE] hover:shadow-lg hover:shadow-[#87CEEB]/10 transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#0369A1] bg-[#E0F2FE] rounded-full mb-3">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-bold text-[#1E293B] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </motion.div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#87CEEB] flex items-center justify-center shadow-md z-10">
                <Calendar className="w-3 h-3 text-[#0369A1]" />
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
