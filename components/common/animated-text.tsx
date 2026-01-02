"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  typewriter?: boolean
  charDelay?: number
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  typewriter = false,
  charDelay = 50,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState(typewriter ? "" : text)

  useEffect(() => {
    if (!typewriter) return

    let currentIndex = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, charDelay)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, typewriter, charDelay, delay])

  if (typewriter) {
    return (
      <span className={className}>
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      </span>
    )
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {text}
    </motion.span>
  )
}

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function AnimatedHeading({ children, className = "", delay = 0, as: Component = "h2" }: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  )
}
