"use client"

import { motion } from "framer-motion"
import { useScrollObserver } from "@/components/common/scroll-observer"
import { AnimatedHeading } from "@/components/common/animated-text"
import { Stats } from "./stats"
import { Timeline } from "./timeline"
import { Achievements } from "./achievements"

export function AboutSection() {
  const [statsRef, statsInView] = useScrollObserver<HTMLDivElement>({ threshold: 0.2 })
  const [timelineRef, timelineInView] = useScrollObserver<HTMLDivElement>({ threshold: 0.1 })
  const [achievementsRef, achievementsInView] = useScrollObserver<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-[#F8FBFF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#0369A1] bg-[#E0F2FE] rounded-full mb-4"
          >
            Tentang CloudSI
          </motion.span>
          <AnimatedHeading
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 text-balance"
          >
            Rumah Kami, CloudSI
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-[#64748B] leading-relaxed"
          >
            Kami adalah mahasiswa Program Studi Sistem Informasi Universitas Tanjungpura angkatan 2025. CloudSI adalah
            rumah kami — tempat berpulang, tempat menyalurkan aspirasi, dan tempat saling mendukung dalam menjalani
            perjalanan akademik kami menuju masa depan digital yang lebih baik.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-20 md:mb-28">
          <Stats isInView={statsInView} />
        </div>

        {/* Timeline Section */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <AnimatedHeading as="h3" className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Perjalanan CloudSI
            </AnimatedHeading>
          </div>
          <div ref={timelineRef}>
            <Timeline isInView={timelineInView} />
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <div className="text-center mb-12">
            <AnimatedHeading as="h3" className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Pencapaian
            </AnimatedHeading>
          </div>
          <div ref={achievementsRef}>
            <Achievements isInView={achievementsInView} />
          </div>
        </div>
      </div>
    </section>
  )
}
