'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, products } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
import ProductCard from '@/components/ProductCard'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Product not found
          </h1>
          <Link href="/shop" className="text-accent hover:text-accent-secondary transition-colors">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  // Get related products from same collection
  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-7xl mx-auto text-sm text-neutral-dark">
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="px-4 sm:px-6 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-neutral-light aspect-square rounded-sm overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-start"
          >
            {/* Header */}
            <div className="mb-8">
              <p className="text-xs tracking-widest text-neutral-dark uppercase mb-3">
                {product.collection}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                {product.title}
              </h1>
              <p className="font-serif text-2xl font-semibold text-accent mb-4">
                ${product.price}
              </p>
              <p className="font-sans text-neutral-dark text-lg">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="mb-8 pb-8 border-b border-neutral-medium">
              <p className="font-sans text-sm leading-relaxed text-foreground">
                {product.details}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block font-serif font-semibold text-foreground mb-4">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border transition-all duration-300 font-sans text-sm ${
                      selectedSize === size
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-neutral-medium text-neutral-dark hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block font-serif font-semibold text-foreground mb-4">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border transition-all duration-300 font-sans text-sm ${
                      selectedColor === color
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-neutral-medium text-neutral-dark hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-serif font-semibold text-foreground mb-4">
                Quantity
              </label>
              <div className="flex items-center border border-neutral-medium w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  suppressHydrationWarning
                  className="px-4 py-2 font-sans text-foreground hover:bg-neutral-light transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 font-sans text-foreground border-l border-r border-neutral-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  suppressHydrationWarning
                  className="px-4 py-2 font-sans text-foreground hover:bg-neutral-light transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <AddToCartButton
              productId={product.id}
              productTitle={product.title}
              productPrice={product.price}
              productImage={product.image}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              quantity={quantity}
            />

            {/* Stock Info */}
            <div className="mt-8 pt-8 border-t border-neutral-medium">
              <p className="font-sans text-sm text-neutral-dark">
                {product.stock > 10
                  ? '✓ In stock'
                  : product.stock > 0
                    ? `Only ${product.stock} left in stock`
                    : 'Out of stock'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-4 sm:px-6 border-t border-neutral-medium pt-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold text-foreground mb-8"
            >
              Related Products
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
