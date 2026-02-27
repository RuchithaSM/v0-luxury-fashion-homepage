export interface Product {
  id: string
  title: string
  price: number
  image: string
  collection: string
  category: string
  description: string
  details: string
  sizes: string[]
  colors: string[]
  stock: number
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Silk Blend Blazer',
    price: 385,
    image: '/images/collection-spring.jpg',
    collection: 'Spring Elegance',
    category: 'Outerwear',
    description: 'Lightweight and refined silk blend blazer perfect for the season',
    details: 'Made from premium silk-cotton blend. Features tailored cut and mother-of-pearl buttons. Perfect layering piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Taupe', 'Charcoal'],
    stock: 15,
  },
  {
    id: '2',
    title: 'Minimal Slip Dress',
    price: 295,
    image: '/images/collection-urban.jpg',
    collection: 'Urban Minimal',
    category: 'Dresses',
    description: 'Contemporary slip dress with modern edge',
    details: 'Sleek silhouette in premium crepe fabric. Features adjustable straps and subtle seaming detail.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Ivory', 'Sage'],
    stock: 22,
  },
  {
    id: '3',
    title: 'Heritage Wool Coat',
    price: 475,
    image: '/images/collection-heritage.jpg',
    collection: 'Heritage Line',
    category: 'Outerwear',
    description: 'Timeless wool coat with modern proportions',
    details: 'Crafted from pure virgin wool. Unlined for breathability. Features statement collar and functional pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Navy'],
    stock: 12,
  },
  {
    id: '4',
    title: 'Artisan Linen Shirt',
    price: 245,
    image: '/images/collection-artisan.jpg',
    collection: 'Artisan Studio',
    category: 'Tops',
    description: 'Hand-finished linen shirt celebrating craftsmanship',
    details: 'Premium European linen. Hand-stitched details. Each piece has unique variations from artisan production.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Linen', 'Rust'],
    stock: 18,
  },
  {
    id: '5',
    title: 'Tailored Trousers',
    price: 325,
    image: '/images/collection-spring.jpg',
    collection: 'Spring Elegance',
    category: 'Bottoms',
    description: 'Perfectly tailored trousers with elegant drape',
    details: 'High-waisted silhouette in Italian fabric. Features hook closure and side zip. Modern fit with generous proportions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Taupe', 'Black'],
    stock: 20,
  },
  {
    id: '6',
    title: 'Minimal Leather Belt',
    price: 185,
    image: '/images/collection-urban.jpg',
    collection: 'Urban Minimal',
    category: 'Accessories',
    description: 'Essential leather belt with understated elegance',
    details: 'Full-grain Italian leather. Brushed gold hardware. Adjustable fit with refined buckle design.',
    sizes: ['One Size'],
    colors: ['Natural', 'Black', 'Cognac'],
    stock: 35,
  },
  {
    id: '7',
    title: 'Cashmere Cardigan',
    price: 445,
    image: '/images/collection-heritage.jpg',
    collection: 'Heritage Line',
    category: 'Knitwear',
    description: 'Luxurious cashmere cardigan for layering',
    details: 'Pure cashmere. Minimalist rib knit. Features mother-of-pearl buttons and side pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Oatmeal', 'Charcoal'],
    stock: 10,
  },
  {
    id: '8',
    title: 'Studio Canvas Tote',
    price: 225,
    image: '/images/collection-artisan.jpg',
    collection: 'Artisan Studio',
    category: 'Bags',
    description: 'Handcrafted canvas tote with leather details',
    details: 'Heavy-duty natural canvas. Leather handles and bottom reinforcement. Interior slip pocket and key clip.',
    sizes: ['One Size'],
    colors: ['Canvas', 'Black', 'Tan'],
    stock: 28,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((product) => product.collection === collection)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export const categories = ['All', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Knitwear', 'Accessories', 'Bags']
