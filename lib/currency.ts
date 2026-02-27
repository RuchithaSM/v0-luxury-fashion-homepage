export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateDiscount(price: number, discountPercent: number): number {
  return Math.round(price * (discountPercent / 100))
}

export function getPriceAfterDiscount(price: number, discountPercent: number): number {
  return price - calculateDiscount(price, discountPercent)
}
