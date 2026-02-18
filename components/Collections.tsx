'use client'

import CollectionCard from './CollectionCard'
import { motion } from 'framer-motion'

const collections = [
  {
    id: 1,
    title: 'Spring Elegance',
    subtitle: 'Lightweight pieces for the season',
    image: '/images/collection-spring.jpg',
  },
  {
    id: 2,
    title: 'Urban Minimal',
    subtitle: 'Contemporary essentials reimagined',
    image: '/images/collection-urban.jpg',
  },
  {
    id: 3,
    title: 'Heritage Line',
    subtitle: 'Timeless designs with modern edge',
    image: '/images/collection-heritage.jpg',
  },
  {
    id: 4,
    title: 'Artisan Studio',
    subtitle: 'Limited edition collaborations',
    image: '/images/collection-artisan.jpg',
  },
]

export default function Collections() {
  return (
    <section
      id="collections"
      className="py-16 md:py-32 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="font-sans text-neutral-dark max-w-2xl leading-relaxed">
            Explore our curated selection of contemporary collections, each telling
            a unique story through thoughtful design and premium materials.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              title={collection.title}
              subtitle={collection.subtitle}
              image={collection.image}
              delay={index * 0.05}
              href={`/collection/${collection.id}`}
              priority={index < 2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
