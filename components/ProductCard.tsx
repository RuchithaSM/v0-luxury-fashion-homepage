'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { formatINR, getPriceAfterDiscount } from '@/lib/currency'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div
          className="relative overflow-hidden bg-neutral-light aspect-square rounded-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image */}
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/0"
            animate={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="pt-6 pb-4">
        <p className="text-xs tracking-widest text-neutral-dark uppercase mb-2">
          {product.collection}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-1 hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-dark mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-semibold text-foreground">
              {formatINR(getPriceAfterDiscount(product.priceINR, product.discount || 0))}
            </span>
            {product.discount ? (
              <p className="text-xs text-red-600 font-medium">-{product.discount}% OFF</p>
            ) : null}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-accent text-sm font-medium">View →</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
