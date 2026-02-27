'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { validateCoupon } from '@/lib/coupons'

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  applyCoupon: (code: string) => { success: boolean; discountAmount?: number; error?: string }
  removeCoupon: () => void
  appliedCoupon?: string
  discountAmount: number
  finalTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | undefined>(undefined)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }

      return [...prevCart, newItem]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const handleApplyCoupon = (code: string) => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const result = validateCoupon(code, cartTotal)
    
    if (result.valid && result.discount !== undefined) {
      setAppliedCoupon(code.toUpperCase())
      setDiscountAmount(result.discount)
      return { success: true, discountAmount: result.discount }
    }
    
    return { success: false, error: result.error }
  }

  const removeCoupon = () => {
    setAppliedCoupon(undefined)
    setDiscountAmount(0)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const finalTotal = cartTotal - discountAmount
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        applyCoupon: handleApplyCoupon,
        removeCoupon,
        appliedCoupon,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
