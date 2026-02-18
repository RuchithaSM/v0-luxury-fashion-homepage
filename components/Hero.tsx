'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY
        imageRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* Parallax Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-screen"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 z-5" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={titleVariants}
        >
          Curated
        </motion.h1>

        <motion.h2
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-neutral-dark mb-8"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={titleVariants}
        >
          Collections
        </motion.h2>

        <motion.p
          className="font-sans text-base md:text-lg text-neutral-dark max-w-2xl mx-auto mb-12 leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
        >
          Discover our editorial selection of premium pieces, thoughtfully curated
          and designed for the discerning eye. Each collection tells a story of
          craftsmanship and elegance.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button suppressHydrationWarning className="px-8 py-3 border-2 border-foreground text-foreground font-sans font-medium hover:bg-foreground hover:text-background transition-all duration-300">
            Explore Collections
          </button>
          <button suppressHydrationWarning className="px-8 py-3 bg-accent text-white font-sans font-medium hover:bg-accent-secondary transition-colors duration-300">
            View New Arrivals
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-foreground rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
