import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Collections from '@/components/Collections'
import About from '@/components/About'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Collections />
      <About />
      <Footer />
      <ScrollToTop />
    </>
  )
}
