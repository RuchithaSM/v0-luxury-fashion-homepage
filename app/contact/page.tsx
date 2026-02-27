'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="font-sans text-lg text-neutral-dark">
            Have questions or special requests? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Hours */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Studio Hours
              </h2>
              <div className="space-y-2 font-sans text-neutral-dark">
                <p>Monday – Friday: 10am – 6pm</p>
                <p>Saturday: 11am – 5pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Location
              </h2>
              <div className="space-y-2 font-sans text-neutral-dark">
                <p>Luxe Studio</p>
                <p>123 Luxury Avenue</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </div>

            {/* Contact Methods */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-2 font-sans text-neutral-dark">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:hello@luxestudio.com"
                    className="text-accent hover:text-accent-secondary transition-colors"
                  >
                    hello@luxestudio.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a
                    href="tel:+12125551234"
                    className="text-accent hover:text-accent-secondary transition-colors"
                  >
                    +1 (212) 555-1234
                  </a>
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Follow Us
              </h2>
              <div className="flex gap-4">
                {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-accent hover:text-accent-secondary transition-colors font-sans text-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-light rounded-sm p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-serif font-semibold text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-neutral-medium text-foreground font-sans focus:outline-none focus:border-accent transition-colors rounded-sm"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-serif font-semibold text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  suppressHydrationWarning
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-neutral-medium text-foreground font-sans focus:outline-none focus:border-accent transition-colors rounded-sm"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-serif font-semibold text-foreground mb-2"
                >
                  Subject
                </label>
                <select
                  suppressHydrationWarning
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-neutral-medium text-foreground font-sans focus:outline-none focus:border-accent transition-colors rounded-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Status</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-serif font-semibold text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  suppressHydrationWarning
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-neutral-medium text-foreground font-sans focus:outline-none focus:border-accent transition-colors rounded-sm resize-none"
                  placeholder="Your message"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                suppressHydrationWarning
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent text-background py-3 font-sans font-medium hover:bg-accent-secondary transition-colors rounded-sm"
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-accent font-sans text-sm"
                >
                  Thank you for reaching out. We'll respond soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 md:mt-24 pt-16 md:pt-24 border-t border-neutral-medium"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Visit Our Studio
          </h2>
          <div className="bg-neutral-light rounded-sm overflow-hidden h-96">
            <div className="w-full h-full bg-gradient-to-br from-neutral-medium to-neutral-dark flex items-center justify-center">
              <p className="text-neutral-light text-center">
                <p className="font-serif text-xl font-semibold mb-2">Map Coming Soon</p>
                <p className="font-sans text-sm">123 Luxury Avenue, New York, NY 10001</p>
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
