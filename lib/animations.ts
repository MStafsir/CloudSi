// Animation configurations and helper functions

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

// Counter animation helper
export const animateCounter = (start: number, end: number, duration: number, callback: (value: number) => void) => {
  const startTime = performance.now()

  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out quad
    const easeProgress = 1 - (1 - progress) * (1 - progress)
    const currentValue = Math.floor(start + (end - start) * easeProgress)

    callback(currentValue)

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  requestAnimationFrame(updateCounter)
}

// Typewriter effect helper
export const typewriterEffect = (text: string, callback: (displayText: string) => void, charDelay = 50) => {
  let currentIndex = 0

  const typeChar = () => {
    if (currentIndex <= text.length) {
      callback(text.slice(0, currentIndex))
      currentIndex++
      setTimeout(typeChar, charDelay)
    }
  }

  typeChar()
}

// Scroll animation variants
export const scrollReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
}

// 3D Animation configs for Three.js
export const heroRotationSpeed = 0.002
export const particleCount = 150
export const particleSpeed = 0.001
