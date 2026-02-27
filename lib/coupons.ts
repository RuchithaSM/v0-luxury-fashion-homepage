export interface Coupon {
  code: string
  discountPercent: number
  minAmount?: number
  maxUses?: number
  expiryDate?: string
  description: string
}

export const availableCoupons: Coupon[] = [
  {
    code: 'LUXURY10',
    discountPercent: 10,
    minAmount: 15000,
    description: '10% off on purchases above ₹15,000',
  },
  {
    code: 'SPRING20',
    discountPercent: 20,
    minAmount: 0,
    description: '20% off on Spring Collection',
  },
  {
    code: 'FIRST15',
    discountPercent: 15,
    minAmount: 5000,
    description: '15% off - New Customer',
  },
  {
    code: 'SAVE25',
    discountPercent: 25,
    minAmount: 25000,
    description: '25% off on purchases above ₹25,000',
  },
  {
    code: 'SUMMER5',
    discountPercent: 5,
    minAmount: 0,
    description: '5% off on all items',
  },
]

export function validateCoupon(code: string, cartTotal: number): { valid: boolean; discount?: number; error?: string } {
  const coupon = availableCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase())

  if (!coupon) {
    return { valid: false, error: 'Coupon code not found' }
  }

  if (coupon.minAmount && cartTotal < coupon.minAmount) {
    return {
      valid: false,
      error: `Minimum purchase amount of ₹${coupon.minAmount} required`,
    }
  }

  const discountAmount = Math.round(cartTotal * (coupon.discountPercent / 100))
  return { valid: true, discount: discountAmount }
}

export function applyCoupon(code: string, cartTotal: number): { success: boolean; discountAmount?: number; error?: string } {
  const result = validateCoupon(code, cartTotal)
  if (result.valid && result.discount !== undefined) {
    return { success: true, discountAmount: result.discount }
  }
  return { success: false, error: result.error }
}
