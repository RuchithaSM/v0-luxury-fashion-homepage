'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <footer id="contact" className="bg-foreground text-background py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">LUXE</h3>
            <p className="font-sans text-sm text-background/80 leading-relaxed">
              Premium portfolio and editorial collections crafted for those who
              appreciate refined aesthetics.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-4 uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Spring Elegance
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Urban Minimal
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Heritage Line
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Artisan Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-sans text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans font-semibold text-sm mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 bg-background/10 border border-background/20 text-background placeholder:text-background/50 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button
                suppressHydrationWarning
                type="submit"
                className="px-4 py-2 bg-accent text-foreground font-sans text-sm font-medium hover:bg-accent-secondary transition-colors"
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-sans text-sm text-background/80">
            © 2024 Luxe Studio. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="mailto:hello@luxestudio.com"
              className="p-2 text-background/80 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="#"
              className="p-2 text-background/80 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 text-background/80 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
