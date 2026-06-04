import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useLang } from '../context/LanguageContext'

const NAV_LINKS_DE = [
  { label: 'Über mich', section: '#about' },
  { label: 'Behandlungen', section: '#treatments' },
  { label: 'Produkte', section: '#farfalla' },
  { label: 'Kontakt', section: '#contact' },
]

const NAV_LINKS_EN = [
  { label: 'About', section: '#about' },
  { label: 'Treatments', section: '#treatments' },
  { label: 'Products', section: '#farfalla' },
  { label: 'Contact', section: '#contact' },
]

export default function Navigation() {
  const { lang, toggle } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const links = lang === 'de' ? NAV_LINKS_DE : NAV_LINKS_EN

  const goHome = () => {
    navigate('/')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  const goToSection = (sectionId: string) => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      const el = document.querySelector(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(26, 46, 38, 0.92)' : 'rgba(26, 46, 38, 0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
          }}
        >
          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); goHome() }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          >
            <img
              src="/images/logo-white-v2.png"
              alt="FACES STUDIO"
              style={{ height: '40px', width: 'auto' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#f6f3ee',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
                FACES STUDIO
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  color: 'rgba(246, 243, 238, 0.6)',
                  letterSpacing: '0.08em',
                  textTransform: 'lowercase',
                  marginTop: '2px',
                }}
              >
                organic soulfood for your skin
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {links.map((link) => (
              <a
                key={link.label}
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(link.section)
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#f6f3ee',
                  textDecoration: 'none',
                  opacity: 0.85,
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.5' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.85' }}
              >
                {link.label}
              </a>
            ))}
            {/* Language toggle desktop */}
            <button
              onClick={toggle}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                color: '#f6f3ee',
                background: 'none',
                border: '1px solid rgba(246, 243, 238, 0.3)',
                borderRadius: '16px',
                padding: '4px 12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
          </div>

          {/* Mobile: Lang toggle + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="lg:hidden"
              onClick={toggle}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                color: '#f6f3ee',
                background: 'none',
                border: '1px solid rgba(246, 243, 238, 0.3)',
                borderRadius: '16px',
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#f6f3ee', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#f6f3ee', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#f6f3ee', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: 'rgba(26, 46, 38, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {links.map((link, i) => (
            <a
              key={link.label}
              href="/"
              onClick={(e) => {
                e.preventDefault()
                goToSection(link.section)
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '36px',
                color: '#f6f3ee',
                textDecoration: 'none',
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${i * 0.08}s forwards`,
              }}
            >
              {link.label}
            </a>
          ))}
          <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}
    </>
  )
}
