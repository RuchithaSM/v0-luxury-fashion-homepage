'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <span className="text-4xl text-green-600">✓</span>
          </div>
        </motion.div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Order Confirmed
        </h1>

        <p className="font-sans text-lg text-neutral-dark mb-8">
          Thank you for your purchase! Your order has been successfully placed and is being processed.
        </p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-light border border-neutral-medium rounded-sm p-8 mb-12 text-left"
        >
          <h2 className="font-serif text-xl font-bold text-foreground mb-6">What happens next?</h2>
          <ul className="space-y-4 font-sans text-neutral-dark">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">1.</span>
              <span>You will receive an order confirmation email shortly with all details and tracking information.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">2.</span>
              <span>Your items will be carefully packaged and shipped to your address within 3-5 business days.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">3.</span>
              <span>You can track your order status anytime using your order number and email address.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">4.</span>
              <span>If you have any questions, our support team is here to help at support@luxestudio.com</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 bg-accent text-white font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-foreground text-foreground font-sans font-medium hover:bg-foreground hover:text-background transition-all rounded-sm"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
