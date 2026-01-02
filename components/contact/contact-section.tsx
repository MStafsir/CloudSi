"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import { AnimatedHeading } from "@/components/common/animated-text"
import type { ContactFormData } from "@/lib/types"

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "", newsletter: false })

    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-[#F8FBFF] to-[#E0F2FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#0369A1] bg-white rounded-full mb-4"
          >
            Contact Us
          </motion.span>
          <AnimatedHeading
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 text-balance"
          >
            Hubungi CloudSI
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[#64748B]"
          >
            Ada pertanyaan atau ingin berkolaborasi dengan CloudSI? Jangan ragu untuk menghubungi kami.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0F2FE]">
              <h3 className="text-xl font-bold text-[#1E293B] mb-6">Informasi Kontak</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">Email</p>
                    <a href="mailto:cloudsi2025@untan.ac.id" className="text-[#64748B] hover:text-[#0369A1]">
                      cloudsi2025@untan.ac.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">Phone</p>
                    <a href="tel:+62561123456" className="text-[#64748B] hover:text-[#0369A1]">
                      +62 561-XXX-XXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">Location</p>
                    <p className="text-[#64748B]">
                      Fakultas MIPA, Universitas Tanjungpura
                      <br />
                      Jl. Daya Nasional, Pontianak 78124
                      <br />
                      Kalimantan Barat, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0F2FE]">
              <h3 className="text-lg font-bold text-[#1E293B] mb-4">Ketua Angkatan</h3>
              <p className="text-[#1E293B] font-medium">Phasacola Grey Kalista</p>
              <p className="text-sm text-[#64748B]">CloudSI 2025</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E0F2FE]">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#1E293B] mb-2">Pesan Terkirim!</h3>
                    <p className="text-[#64748B]">Terima kasih! Kami akan segera menghubungi Anda.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                          Nama
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400" : "border-[#E0F2FE]"} bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B]`}
                          placeholder="Nama lengkap"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-[#E0F2FE]"} bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B]`}
                          placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? "border-red-400" : "border-[#E0F2FE]"} bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B]`}
                        placeholder="Subject pesan"
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#1E293B] mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-red-400" : "border-[#E0F2FE]"} bg-white focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-all text-[#1E293B] resize-none`}
                        placeholder="Tulis pesan Anda..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#0369A1] border-[#E0F2FE] rounded focus:ring-[#87CEEB]"
                      />
                      <label htmlFor="newsletter" className="text-sm text-[#64748B]">
                        Subscribe to our newsletter for updates
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0369A1] text-white font-semibold rounded-xl hover:bg-[#0369A1]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Kirim Pesan</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
