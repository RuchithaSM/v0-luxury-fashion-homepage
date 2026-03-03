'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { formatINR, getPriceAfterDiscount } from '@/lib/currency'
import AddToCartButton from '@/components/AddToCartButton'
import ProductCard from '@/components/ProductCard'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' })

  return (
    <>
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
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="relative bg-neutral-light aspect-square rounded-sm overflow-hidden">
              <Image
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-accent' : 'border-neutral-medium'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
              <div className="flex items-center gap-4 mb-4">
                <p className="font-serif text-2xl font-semibold text-accent">
                  {formatINR(getPriceAfterDiscount(product.priceINR, product.discount || 0))}
                </p>
                {product.discount ? (
                  <>
                    <p className="font-sans text-lg text-neutral-dark line-through">
                      {formatINR(product.priceINR)}
                    </p>
                    <p className="font-sans text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded">
                      {product.discount}% OFF
                    </p>
                  </>
                ) : null}
              </div>
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
              <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-sm font-sans text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-neutral-medium text-foreground hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-sm font-sans text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'border-accent bg-accent text-white'
                        : 'border-neutral-medium text-foreground hover:border-accent'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <label className="block font-sans text-sm font-semibold text-foreground mb-3">
                Quantity
              </label>
              <div className="flex gap-4">
                <div className="flex items-center border border-neutral-medium rounded-sm">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 py-2 hover:bg-neutral-light transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-sans font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-neutral-light transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <AddToCartButton
                  productId={product.id}
                  productTitle={product.title}
                  productPrice={getPriceAfterDiscount(product.priceINR, product.discount || 0)}
                  productImage={product.image}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  quantity={quantity}
                />
              </div>
              <Link
                href="/checkout"
                className="px-8 py-3 border-2 border-accent text-accent font-sans font-medium hover:bg-accent hover:text-white transition-all duration-300 rounded-sm text-center"
              >
                Buy Now
              </Link>
            </div>

            {/* Stock Info */}
            <p className="mt-6 font-sans text-sm text-neutral-dark">
              {product.stock > 0 ? (
                <span className="text-green-600">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4 sm:px-6 border-t border-neutral-medium py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-accent' : 'text-neutral-medium'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-sans text-sm text-neutral-dark">
                    {product.rating?.toFixed(1)}/5 ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-6 py-2 bg-accent text-white font-sans text-sm font-medium hover:bg-accent-secondary transition-colors"
              >
                Write Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-neutral-light rounded-sm border border-neutral-medium"
              >
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">Share Your Review</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-neutral-medium text-foreground placeholder-neutral-dark font-sans focus:outline-none focus:border-accent"
                  />
                  <div>
                    <label className="block font-sans text-sm font-semibold text-foreground mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-2xl transition-colors ${
                            star <= newReview.rating ? 'text-accent' : 'text-neutral-medium'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Your review..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-neutral-medium text-foreground placeholder-neutral-dark font-sans focus:outline-none focus:border-accent h-24 resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowReviewForm(false)
                        setNewReview({ author: '', rating: 5, comment: '' })
                      }}
                      className="px-6 py-2 bg-accent text-white font-sans text-sm font-medium hover:bg-accent-secondary transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-foreground text-foreground font-sans text-sm font-medium hover:bg-foreground hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="pb-6 border-b border-neutral-medium last:border-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-serif font-semibold text-foreground">{review.author}</h4>
                      <span className="font-sans text-xs text-neutral-dark">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-accent text-sm' : 'text-neutral-medium text-sm'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="font-sans text-sm text-foreground leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))
              ) : (
                <p className="font-sans text-sm text-neutral-dark">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} {...prod} delay={0} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
