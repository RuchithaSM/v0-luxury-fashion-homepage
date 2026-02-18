'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 px-4 sm:px-6 bg-neutral-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <div className="relative aspect-square rounded-sm overflow-hidden group">
              <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/images/about-studio.jpg"
                  alt="Luxe Studio workspace"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-1 md:order-2"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Luxe Studio
            </h2>

            <p className="font-sans text-neutral-dark leading-relaxed mb-6">
              We believe in the power of thoughtful design and sustainable craftsmanship.
              Since our founding, we've been committed to creating collections that
              transcend trends and celebrate the beauty of simplicity.
            </p>

            <p className="font-sans text-neutral-dark leading-relaxed mb-8">
              Each piece is meticulously crafted by artisans who understand that luxury
              is not about excess, but about precision, quality, and timelessness. Our
              editorial approach to curation ensures that every collection resonates
              with those who appreciate refined aesthetics.
            </p>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="border-l-2 border-accent pl-6 py-4 mb-8"
            >
              <p className="font-serif italic text-xl text-neutral-dark">
                "Luxury should be understated. It's the confidence in what you wear,
                not the loudness of the label."
              </p>
            </motion.blockquote>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-semibold text-foreground">
                    Premium Materials
                  </h4>
                  <p className="font-sans text-sm text-neutral-dark">
                    Sourced from the finest suppliers globally
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-semibold text-foreground">
                    Ethical Production
                  </h4>
                  <p className="font-sans text-sm text-neutral-dark">
                    Fair labor practices and sustainable methods
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-semibold text-foreground">
                    Timeless Design
                  </h4>
                  <p className="font-sans text-sm text-neutral-dark">
                    Pieces that transcend seasonal trends
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
