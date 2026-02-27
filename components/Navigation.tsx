'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import CartIcon from './CartIcon'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-medium shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-foreground hover:text-accent transition-colors"
        >
          LUXE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="font-sans text-sm text-foreground hover:text-accent transition-colors relative group"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="#collections"
            className="font-sans text-sm text-foreground hover:text-accent transition-colors relative group"
          >
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="#about"
            className="font-sans text-sm text-foreground hover:text-accent transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="#contact"
            className="font-sans text-sm text-foreground hover:text-accent transition-colors relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <CartIcon />
        </div>

        {/* Mobile Menu Button and Cart Icon */}
        <div className="md:hidden flex items-center gap-4">
          <CartIcon />
          <button
            className="p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-b border-neutral-medium">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/shop"
              className="block font-sans text-sm text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="#collections"
              className="block font-sans text-sm text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="#about"
              className="block font-sans text-sm text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="block font-sans text-sm text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
