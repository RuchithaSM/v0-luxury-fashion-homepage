'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'

export default function CartIcon() {
  const { cartCount } = useCart()

  return (
    <Link href="/cart" className="relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-6 h-6 flex items-center justify-center text-lg"
      >
        🛍️
      </motion.div>
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {cartCount}
        </motion.span>
      )}
    </Link>
  )
}
