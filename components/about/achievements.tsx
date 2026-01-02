"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Trophy, Award, Heart, Lightbulb } from "lucide-react"
import { ACHIEVEMENTS_DATA } from "@/lib/constants"

const iconMap: Record<string, any> = {
  trophy: Trophy,
  award: Award,
  heart: Heart,
  lightbulb: Lightbulb,
}

interface AchievementsProps {
  isInView: boolean
}

export function Achievements({ isInView }: AchievementsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {ACHIEVEMENTS_DATA.map((achievement, index) => {
        const Icon = iconMap[achievement.icon] || Trophy

        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group cursor-pointer"
          >
            <div className="h-full bg-gradient-to-br from-[#E0F2FE] to-white rounded-2xl p-6 border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:shadow-[#87CEEB]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mb-4 group-hover:bg-[#0369A1] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#0369A1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-[#1E293B] mb-2 group-hover:text-[#0369A1] transition-colors">
                {achievement.title}
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">{achievement.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
