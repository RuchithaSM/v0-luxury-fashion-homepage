'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    name: 'Spring Elegance',
    description: 'Lightweight pieces for the season with refined silhouettes and premium fabrics.',
    image: '/images/collection-spring.jpg',
    itemCount: 12,
  },
  {
    id: 2,
    name: 'Urban Minimal',
    description: 'Contemporary essentials reimagined with modern proportions and clean lines.',
    image: '/images/collection-urban.jpg',
    itemCount: 8,
  },
  {
    id: 3,
    name: 'Heritage Line',
    description: 'Timeless designs with modern edge, celebrating craftsmanship and tradition.',
    image: '/images/collection-heritage.jpg',
    itemCount: 15,
  },
  {
    id: 4,
    name: 'Artisan Studio',
    description: 'Limited edition collaborations showcasing hand-finished details and uniqueness.',
    image: '/images/collection-artisan.jpg',
    itemCount: 6,
  },
]

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Collections
          </h1>
          <p className="font-sans text-lg text-neutral-dark max-w-2xl mx-auto">
            Explore our curated collections, each telling a unique story of design, craftsmanship, and luxury.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href="/shop">
                <div className="relative overflow-hidden bg-neutral-light rounded-sm mb-6 aspect-[4/5]">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </motion.div>
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/0"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Collection Info */}
                <div className="pb-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {collection.name}
                  </h2>
                  <p className="font-sans text-neutral-dark text-sm md:text-base mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-widest text-neutral-dark uppercase">
                      {collection.itemCount} items
                    </span>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-accent font-medium text-sm"
                    >
                      Explore →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 md:mt-32 pt-16 md:pt-24 border-t border-neutral-medium"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Seasonal Highlights
              </h2>
              <p className="font-sans text-neutral-dark text-lg mb-6 leading-relaxed">
                Each season, we carefully curate new pieces that celebrate the latest in luxury fashion while honoring timeless design principles. Our collections are born from collaboration with emerging designers and heritage craftspeople, ensuring every piece tells a story.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-3 bg-accent text-background font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm"
              >
                Shop Latest Arrivals
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-neutral-light rounded-sm aspect-square overflow-hidden"
            >
              <Image
                src="/images/about-studio.jpg"
                alt="Design studio"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
