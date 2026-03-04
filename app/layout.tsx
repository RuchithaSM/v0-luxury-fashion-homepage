import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Luxe Studio — Premium Fashion Collections',
  description: 'Minimalist luxury Brand showcasing curated collections and editorial work',
  generator: 'Lekhstudios',
}

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: '#FAF8F3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
