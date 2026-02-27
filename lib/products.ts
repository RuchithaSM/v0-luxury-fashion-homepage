export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Product {
  id: string
  title: string
  priceINR: number
  image: string
  images: string[]
  collection: string
  category: string
  description: string
  details: string
  sizes: string[]
  colors: string[]
  stock: number
  reviews: Review[]
  discount?: number
  rating?: number
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Silk Blend Blazer',
    priceINR: 32725,
    image: '/images/collection-spring.jpg',
    images: ['/images/collection-spring.jpg', '/images/product-1-alt.jpg', '/images/product-1-detail.jpg'],
    collection: 'Spring Elegance',
    category: 'Outerwear',
    description: 'Lightweight and refined silk blend blazer perfect for the season',
    details: 'Made from premium silk-cotton blend. Features tailored cut and mother-of-pearl buttons. Perfect layering piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Taupe', 'Charcoal'],
    stock: 15,
    discount: 10,
    rating: 4.5,
    reviews: [
      {
        id: '1',
        author: 'Priya Sharma',
        rating: 5,
        comment: 'Excellent quality and fit. The silk blend is incredibly soft and drapes beautifully.',
        date: '2024-02-15',
      },
      {
        id: '2',
        author: 'Rajesh Kumar',
        rating: 4,
        comment: 'Great blazer, perfect for office wear. Highly recommend.',
        date: '2024-02-10',
      },
    ],
  },
  {
    id: '2',
    title: 'Minimal Slip Dress',
    priceINR: 25075,
    image: '/images/collection-urban.jpg',
    images: ['/images/collection-urban.jpg', '/images/product-2-alt.jpg', '/images/product-2-detail.jpg'],
    collection: 'Urban Minimal',
    category: 'Dresses',
    description: 'Contemporary slip dress with modern edge',
    details: 'Sleek silhouette in premium crepe fabric. Features adjustable straps and subtle seaming detail.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Ivory', 'Sage'],
    stock: 22,
    discount: 15,
    rating: 4.8,
    reviews: [
      {
        id: '1',
        author: 'Anaya Mehta',
        rating: 5,
        comment: 'Perfect for any occasion. The crepe fabric is luxurious and comfortable.',
        date: '2024-02-18',
      },
      {
        id: '2',
        author: 'Vikram Singh',
        rating: 4,
        comment: 'True to size, elegant design. Very satisfied.',
        date: '2024-02-12',
      },
    ],
  },
  {
    id: '3',
    title: 'Heritage Wool Coat',
    priceINR: 40375,
    image: '/images/collection-heritage.jpg',
    images: ['/images/collection-heritage.jpg', '/images/product-3-alt.jpg', '/images/product-3-detail.jpg'],
    collection: 'Heritage Line',
    category: 'Outerwear',
    description: 'Timeless wool coat with modern proportions',
    details: 'Crafted from pure virgin wool. Unlined for breathability. Features statement collar and functional pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Navy'],
    stock: 12,
    discount: 0,
    rating: 4.9,
    reviews: [
      {
        id: '1',
        author: 'Divya Gupta',
        rating: 5,
        comment: 'Stunning piece! The quality is exceptional. Worth every penny.',
        date: '2024-02-20',
      },
      {
        id: '2',
        author: 'Arjun Nair',
        rating: 5,
        comment: 'Premium wool, impeccable tailoring. Highly recommended.',
        date: '2024-02-08',
      },
    ],
  },
  {
    id: '4',
    title: 'Artisan Linen Shirt',
    priceINR: 20825,
    image: '/images/collection-artisan.jpg',
    images: ['/images/collection-artisan.jpg', '/images/product-4-alt.jpg', '/images/product-4-detail.jpg'],
    collection: 'Artisan Studio',
    category: 'Tops',
    description: 'Hand-finished linen shirt celebrating craftsmanship',
    details: 'Premium European linen. Hand-stitched details. Each piece has unique variations from artisan production.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Linen', 'Rust'],
    stock: 18,
    discount: 20,
    rating: 4.6,
    reviews: [
      {
        id: '1',
        author: 'Neha Singh',
        rating: 5,
        comment: 'Beautiful linen quality. Breathable and perfect for summer.',
        date: '2024-02-17',
      },
      {
        id: '2',
        author: 'Aditya Verma',
        rating: 4,
        comment: 'Great shirt, slightly loose fit but very comfortable.',
        date: '2024-02-05',
      },
    ],
  },
  {
    id: '5',
    title: 'Tailored Trousers',
    priceINR: 27625,
    image: '/images/collection-spring.jpg',
    images: ['/images/collection-spring.jpg', '/images/product-5-alt.jpg', '/images/product-5-detail.jpg'],
    collection: 'Spring Elegance',
    category: 'Bottoms',
    description: 'Perfectly tailored trousers with elegant drape',
    details: 'High-waisted silhouette in Italian fabric. Features hook closure and side zip. Modern fit with generous proportions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Taupe', 'Black'],
    stock: 20,
    discount: 5,
    rating: 4.7,
    reviews: [
      {
        id: '1',
        author: 'Pooja Mishra',
        rating: 5,
        comment: 'Excellent tailoring. The fit is perfect and comfortable for all-day wear.',
        date: '2024-02-19',
      },
      {
        id: '2',
        author: 'Rohan Patel',
        rating: 4,
        comment: 'Great quality trousers, true to size.',
        date: '2024-02-09',
      },
    ],
  },
  {
    id: '6',
    title: 'Minimal Leather Belt',
    priceINR: 15725,
    image: '/images/collection-urban.jpg',
    images: ['/images/collection-urban.jpg', '/images/product-6-alt.jpg', '/images/product-6-detail.jpg'],
    collection: 'Urban Minimal',
    category: 'Accessories',
    description: 'Essential leather belt with understated elegance',
    details: 'Full-grain Italian leather. Brushed gold hardware. Adjustable fit with refined buckle design.',
    sizes: ['One Size'],
    colors: ['Natural', 'Black', 'Cognac'],
    stock: 35,
    discount: 12,
    rating: 4.4,
    reviews: [
      {
        id: '1',
        author: 'Sneha Iyer',
        rating: 5,
        comment: 'Beautiful leather quality. The buckle is elegant and durable.',
        date: '2024-02-16',
      },
      {
        id: '2',
        author: 'Sanjay Das',
        rating: 4,
        comment: 'Classic design, good quality. A versatile accessory.',
        date: '2024-02-06',
      },
    ],
  },
  {
    id: '7',
    title: 'Cashmere Cardigan',
    priceINR: 37825,
    image: '/images/collection-heritage.jpg',
    images: ['/images/collection-heritage.jpg', '/images/product-7-alt.jpg', '/images/product-7-detail.jpg'],
    collection: 'Heritage Line',
    category: 'Knitwear',
    description: 'Luxurious cashmere cardigan for layering',
    details: 'Pure cashmere. Minimalist rib knit. Features mother-of-pearl buttons and side pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Oatmeal', 'Charcoal'],
    stock: 10,
    discount: 8,
    rating: 4.9,
    reviews: [
      {
        id: '1',
        author: 'Anjali Kumar',
        rating: 5,
        comment: 'Pure luxury. The cashmere is incredibly soft and warm.',
        date: '2024-02-21',
      },
      {
        id: '2',
        author: 'Varun Sethi',
        rating: 5,
        comment: 'Premium quality, perfect investment piece.',
        date: '2024-02-03',
      },
    ],
  },
  {
    id: '8',
    title: 'Studio Canvas Tote',
    priceINR: 19125,
    image: '/images/collection-artisan.jpg',
    images: ['/images/collection-artisan.jpg', '/images/product-8-alt.jpg', '/images/product-8-detail.jpg'],
    collection: 'Artisan Studio',
    category: 'Bags',
    description: 'Handcrafted canvas tote with leather details',
    details: 'Heavy-duty natural canvas. Leather handles and bottom reinforcement. Interior slip pocket and key clip.',
    sizes: ['One Size'],
    colors: ['Canvas', 'Black', 'Tan'],
    stock: 28,
    discount: 10,
    rating: 4.5,
    reviews: [
      {
        id: '1',
        author: 'Khushi Kapoor',
        rating: 5,
        comment: 'Spacious and durable. Perfect everyday bag with great craftsmanship.',
        date: '2024-02-14',
      },
      {
        id: '2',
        author: 'Nikhil Roy',
        rating: 4,
        comment: 'Good quality tote. Handles are strong and reliable.',
        date: '2024-02-04',
      },
    ],
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
