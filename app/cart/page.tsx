'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatINR } from '@/lib/currency'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, applyCoupon, removeCoupon, discountAmount, appliedCoupon } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  const shippingCost = cart.length > 0 ? 10 : 0
  const tax = Math.round(cartTotal * 0.08)
  const finalTotal = Math.round(cartTotal + shippingCost + tax - discountAmount)

  const handleApplyCoupon = () => {
    setCouponError('')
    setCouponSuccess('')
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    const result = applyCoupon(couponCode)
    if (result.success) {
      setCouponSuccess(`Coupon applied! You save ${formatINR(result.discountAmount || 0)}`)
      setCouponCode('')
    } else {
      setCouponError(result.error || 'Invalid coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponError('')
    setCouponSuccess('')
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shopping Cart
          </h1>
          <p className="text-neutral-dark">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 pb-6 border-b border-neutral-medium"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-neutral-light rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-neutral-dark mb-1">
                            Size: <span className="font-medium">{item.size}</span>
                          </p>
                        )}
                        {item.color && (
                          <p className="text-sm text-neutral-dark">
                            Color: <span className="font-medium">{item.color}</span>
                          </p>
                        )}
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-semibold text-foreground">
                          {formatINR(item.price * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-neutral-medium">
                            <button
                              suppressHydrationWarning
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="px-3 py-1 hover:bg-neutral-light transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 border-l border-r border-neutral-medium">
                              {item.quantity}
                            </span>
                            <button
                              suppressHydrationWarning
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-neutral-light transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-dark hover:text-foreground transition-colors text-sm font-sans"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center text-accent hover:text-accent-secondary transition-colors font-sans font-medium"
                >
                  ← Continue Shopping
                </Link>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-neutral-light rounded-sm p-8 sticky top-32">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Coupon Section */}
                {!appliedCoupon && (
                  <div className="mb-6 pb-6 border-b border-neutral-medium">
                    <label className="block font-sans text-sm font-semibold text-foreground mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-white border border-neutral-medium text-foreground placeholder-neutral-dark font-sans text-sm focus:outline-none focus:border-accent"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-accent text-white font-sans text-sm font-medium hover:bg-accent-secondary transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-xs font-sans">{couponError}</p>
                    )}
                  </div>
                )}

                {appliedCoupon && (
                  <div className="mb-6 pb-6 border-b border-neutral-medium bg-green-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-sm text-green-700 font-medium">
                        Coupon {appliedCoupon} Applied
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-700 hover:text-green-900 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {couponSuccess && (
                  <div className="mb-6 pb-6 border-b border-neutral-medium bg-green-50 p-3 rounded">
                    <p className="text-green-700 text-sm font-sans">{couponSuccess}</p>
                  </div>
                )}

                {/* Summary Lines */}
                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-medium">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-neutral-dark">Subtotal</span>
                    <span className="text-foreground font-medium">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-neutral-dark">Shipping</span>
                    <span className="text-foreground font-medium">
                      {formatINR(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-neutral-dark">Tax (8%)</span>
                    <span className="text-foreground font-medium">
                      {formatINR(tax)}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm font-sans text-green-600">
                      <span>Discount</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif font-semibold text-foreground">Total</span>
                  <span className="font-serif text-2xl font-bold text-accent">
                    {formatINR(finalTotal)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="block w-full bg-accent text-white text-center py-3 font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm mb-4"
                >
                  Proceed to Checkout
                </Link>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full border-2 border-accent text-accent py-3 font-sans font-medium hover:bg-accent hover:text-background transition-colors rounded-sm"
                >
                  Clear Cart
                </button>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-neutral-medium space-y-3">
                  <div className="flex gap-2 text-sm text-neutral-dark">
                    <span>✓</span>
                    <span>Free shipping on orders over $500</span>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-dark">
                    <span>✓</span>
                    <span>30-day return guarantee</span>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-dark">
                    <span>✓</span>
                    <span>Secure checkout with SSL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <p className="font-serif text-2xl text-neutral-dark mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="px-8 py-3 bg-accent text-background font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}
