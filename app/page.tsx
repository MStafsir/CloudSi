// Force cache invalidation - updated timestamp: 2025-06-10
import { Navbar } from "@/components/navigation/navbar"
import { HeroSection } from "@/components/hero-3d/hero-section"
import { AboutSection } from "@/components/about/about-section"
import { GallerySection } from "@/components/gallery/gallery-section"
import { MembersDirectory } from "@/components/members/members-directory"
import { EventsSection } from "@/components/events/events-section"
import { ContactSection } from "@/components/contact/contact-section"
import { Footer } from "@/components/footer/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <MembersDirectory />
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
