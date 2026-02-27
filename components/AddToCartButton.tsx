'use client'

import { useState } from 'react'
import { useCart, type CartItem } from '@/context/CartContext'
import { motion } from 'framer-motion'

interface AddToCartButtonProps {
  productId: string
  productTitle: string
  productPrice: number
  productImage: string
  selectedSize?: string
  selectedColor?: string
  quantity?: number
  variant?: 'default' | 'outline'
}

export default function AddToCartButton({
  productId,
  productTitle,
  productPrice,
  productImage,
  selectedSize,
  selectedColor,
  quantity = 1,
  variant = 'default',
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize && !selectedColor) {
      // For products without variants, just add
      addToCart({
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity,
      })
    } else if (!selectedSize || !selectedColor) {
      // Warn if variants are not fully selected
      alert('Please select all options (size and color)')
      return
    } else {
      addToCart({
        id: `${productId}-${selectedSize}-${selectedColor}`,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    }

    setIsAdding(true)
    setShowConfirm(true)
    setTimeout(() => setIsAdding(false), 500)
    setTimeout(() => setShowConfirm(false), 2000)
  }

  return (
    <motion.button
      suppressHydrationWarning
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`relative px-6 py-3 font-sans font-medium text-sm transition-all duration-300 ${
        variant === 'outline'
          ? 'border-2 border-accent text-accent hover:bg-accent hover:text-background'
          : 'bg-accent text-background hover:bg-accent-secondary'
      } disabled:opacity-50`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{
          opacity: showConfirm ? 0 : 1,
          y: showConfirm ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </motion.div>
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          ✓ Added to Cart
        </motion.div>
      )}
    </motion.button>
  )
}
