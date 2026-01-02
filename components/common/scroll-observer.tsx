"use client"

import type React from "react"

import { useEffect, useRef, useState, type RefObject } from "react"

interface UseScrollObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollObserver<T extends HTMLElement>(
  options: UseScrollObserverOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

interface ScrollObserverProps {
  children: (isInView: boolean) => React.ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  className?: string
}

export function ScrollObserver({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  className = "",
}: ScrollObserverProps) {
  const [ref, isInView] = useScrollObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  })

  return (
    <div ref={ref} className={className}>
      {children(isInView)}
    </div>
  )
}
