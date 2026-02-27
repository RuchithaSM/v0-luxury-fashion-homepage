'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatINR } from '@/lib/currency'

export default function CheckoutPage() {
  const { cart, cartTotal, discountAmount, finalTotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/))
        newErrors.cardNumber = 'Card number must be 16 digits'
      if (!formData.cardName.trim()) newErrors.cardName = 'Card name is required'
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.expiryDate = 'Format: MM/YY'
      if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = 'CVV must be 3 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handlePlaceOrder = () => {
    if (!cart.length) {
      alert('Your cart is empty')
      return
    }

    if (validateForm()) {
      setOrderPlaced(true)
      clearCart()
      setTimeout(() => {
        window.location.href = '/order-confirmation'
      }, 2000)
    }
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-6">✓</div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Order Placed Successfully</h1>
          <p className="font-sans text-neutral-dark mb-8">
            Thank you for your purchase. Your order has been confirmed and you will receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <p className="font-sans text-sm text-neutral-dark">Redirecting to confirmation...</p>
          </div>
        </motion.div>
      </main>
    )
  }

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Your cart is empty</h1>
          <p className="font-sans text-neutral-dark mb-8">Add items to your cart before proceeding to checkout.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2 bg-accent text-white font-sans text-sm font-medium hover:bg-accent-secondary transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Shipping Information */}
              <div className="bg-neutral-light p-6 sm:p-8 rounded-sm border border-neutral-medium">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                    }`}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                      errors.lastName ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                    }`}
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none mb-4 ${
                    errors.email ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                  }`}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none mb-4 ${
                    errors.phone ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                  }`}
                />

                <textarea
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none mb-4 h-20 resize-none ${
                    errors.address ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                  }`}
                />

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                      errors.city ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                    }`}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                      errors.state ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                    }`}
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                      errors.pincode ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                    }`}
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-neutral-light p-6 sm:p-8 rounded-sm border border-neutral-medium">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Payment Method</h2>

                <div className="space-y-3 mb-6">
                  {['card', 'upi', 'netbanking'].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="font-sans text-foreground">
                        {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Net Banking'}
                      </span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits)"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className={`w-full px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                        errors.cardNumber ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                      }`}
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                        errors.cardName ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                      }`}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                          errors.expiryDate ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                        }`}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        className={`px-4 py-2 bg-white border text-foreground placeholder-neutral-dark font-sans focus:outline-none ${
                          errors.cvv ? 'border-red-500' : 'border-neutral-medium focus:border-accent'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'upi' && (
                  <input
                    type="text"
                    placeholder="UPI ID (example@upi)"
                    className="w-full px-4 py-2 bg-white border border-neutral-medium text-foreground placeholder-neutral-dark font-sans focus:outline-none focus:border-accent"
                  />
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <select className="w-full px-4 py-2 bg-white border border-neutral-medium text-foreground font-sans focus:outline-none focus:border-accent">
                    <option>Select Your Bank</option>
                    <option>HDFC Bank</option>
                    <option>ICIC Bank</option>
                    <option>SBI</option>
                    <option>Axis Bank</option>
                  </select>
                )}
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-neutral-light p-6 sm:p-8 rounded-sm border border-neutral-medium">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-medium">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="font-sans text-xs text-neutral-dark">
                          {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                        </p>
                        <p className="font-sans text-xs text-neutral-dark">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {formatINR(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-3 border-t border-neutral-medium pt-6">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-neutral-dark">Subtotal</span>
                    <span className="text-foreground font-medium">{formatINR(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-neutral-dark">Shipping</span>
                    <span className="text-foreground font-medium">{formatINR(10)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-neutral-dark">Tax (8%)</span>
                    <span className="text-foreground font-medium">{formatINR(Math.round(cartTotal * 0.08))}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-sans text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg font-bold border-t border-neutral-medium pt-3">
                    <span className="text-foreground">Total</span>
                    <span className="text-accent">
                      {formatINR(Math.round(cartTotal + Math.round(cartTotal * 0.08) + 10 - discountAmount))}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 px-6 py-3 bg-accent text-white font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm"
                >
                  Place Order
                </button>

                <Link
                  href="/cart"
                  className="block text-center mt-3 text-accent hover:text-accent-secondary font-sans text-sm transition-colors"
                >
                  Back to Cart
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
