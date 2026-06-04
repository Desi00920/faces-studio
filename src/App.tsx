import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useLenis } from './hooks/useLenis'
import { useCustomCursor } from './hooks/useCustomCursor'
import Home from './pages/Home'
import Imprint from './pages/Imprint'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'
import Navigation from './sections/Navigation'
import Footer from './sections/Footer'
import CookieConsent from './components/CookieConsent'

export default function App() {
  useLenis()
  useCustomCursor()
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  useEffect(() => {
    const timer = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh()
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div style={{ position: 'relative' }}>
      {!isAdmin && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Imprint />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </div>
  )
}
