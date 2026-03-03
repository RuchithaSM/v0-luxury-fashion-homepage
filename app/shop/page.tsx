'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/lib/products'

export default function ShopPage() {
  const searchParams = useSearchParams()
  const collectionParam = searchParams.get('collection')
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCollection, setSelectedCollection] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 50000])

  // Update collection when URL parameter changes
  useEffect(() => {
    if (collectionParam) {
      setSelectedCollection(collectionParam)
    } else {
      setSelectedCollection('')
    }
  }, [collectionParam])

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by collection if specified
    if (selectedCollection) {
      filtered = filtered.filter((p) => p.collection === selectedCollection)
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by price
    filtered = filtered.filter((p) => p.priceINR >= priceRange[0] && p.priceINR <= priceRange[1])

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.priceINR - b.priceINR)
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.priceINR - a.priceINR)
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [selectedCategory, selectedCollection, sortBy, priceRange])

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop
          </h1>
          <p className="font-sans text-neutral-dark text-lg">
            Curated collection of luxury essentials and timeless pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-neutral-light rounded-sm p-6 sticky top-32">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-serif font-semibold text-foreground mb-4">Category</h3>
                <div className="flex flex-col gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left text-sm font-sans py-2 px-0 border-b border-neutral-medium transition-colors ${
                        selectedCategory === category
                          ? 'text-accent font-semibold'
                          : 'text-neutral-dark hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-serif font-semibold text-foreground mb-4">Price Range</h3>
                <div className="flex gap-2 items-center mb-4">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>
                <p className="text-xs text-neutral-dark mt-3">
                  ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                </p>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  suppressHydrationWarning
                  className="w-full bg-background border border-neutral-medium text-foreground font-sans text-sm p-2 rounded-sm focus:outline-none focus:border-accent"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-dark">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <p className="font-serif text-xl text-neutral-dark mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedCollection('')
                    setPriceRange([0, 50000])
                    setSortBy('newest')
                  }}
                  className="text-accent hover:text-accent-secondary transition-colors font-sans font-medium"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
