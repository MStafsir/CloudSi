"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Users, Code, Calendar, Clock, Layers } from "lucide-react"
import { STATS_DATA } from "@/lib/constants"
import { animateCounter } from "@/lib/animations"

const iconMap: Record<string, any> = {
  users: Users,
  code: Code,
  calendar: Calendar,
  clock: Clock,
  layers: Layers,
}

interface StatCardProps {
  label: string
  value: number
  suffix?: string
  icon?: string
  delay: number
  isInView: boolean
}

function StatCard({ label, value, suffix = "", icon, delay, isInView }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)
  const Icon = icon ? iconMap[icon] : Users

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const timeout = setTimeout(() => {
        animateCounter(0, value, 2000, setDisplayValue)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0F2FE] hover:shadow-lg hover:shadow-[#87CEEB]/10 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#87CEEB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-[#0369A1]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1E293B]">
              {displayValue}
              <span className="text-[#0369A1]">{suffix}</span>
            </div>
            <div className="text-sm text-[#64748B] font-medium">{label}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface StatsProps {
  isInView: boolean
}

export function Stats({ isInView }: StatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {STATS_DATA.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 150} isInView={isInView} />
      ))}
    </div>
  )
}
