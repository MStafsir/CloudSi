"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedHeading } from "@/components/common/animated-text"
import { EventCard } from "./event-card"
import { EventModal } from "./event-modal"
import { EVENTS_DATA } from "@/lib/constants"
import type { Event } from "@/lib/types"

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  return (
    <section id="events" className="relative py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#0369A1] bg-[#E0F2FE] rounded-full mb-4"
          >
            Events
          </motion.span>
          <AnimatedHeading
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 text-balance"
          >
            Kegiatan & Acara
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[#64748B]"
          >
            Berbagai kegiatan dan acara yang telah kami selenggarakan bersama.
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS_DATA.map((event, index) => (
            <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} />
    </section>
  )
}
