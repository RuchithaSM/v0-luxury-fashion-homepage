import { getProductById, products } from '@/lib/products'
import Link from 'next/link'
import ProductDetailClient from '@/components/ProductDetailClient'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Product not found
          </h1>
          <Link href="/shop" className="text-accent hover:text-accent-secondary transition-colors">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  // Get related products from same collection
  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </main>
  )
}
