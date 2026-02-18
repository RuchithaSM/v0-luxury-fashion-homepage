'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface CollectionCardProps {
  title: string
  subtitle: string
  image: string
  delay: number
  href?: string
}

export default function CollectionCard({
  title,
  subtitle,
  image,
  delay,
  href = '#',
}: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a href={href} className="block">
        <div className="relative overflow-hidden bg-neutral-light aspect-square">
          {/* Image */}
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
            animate={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)' }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
            <div />
            <motion.div
              animate={{ y: isHovered ? -10 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                {title}
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-dark">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {/* Hover action button */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block px-6 py-3 border-2 border-accent text-accent font-sans font-medium text-sm">
              View Collection
            </span>
          </motion.div>
        </div>
      </a>
    </motion.div>
  )
}
