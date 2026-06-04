import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const { lang, setLang } = useLang()
  const navigate = useNavigate()
  const footerRef = useRef<HTMLElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(246, 243, 238, 0.7)',
    textDecoration: 'none', display: 'block', marginBottom: '10px', transition: 'color 0.3s',
  }
  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(246, 243, 238, 0.4)', marginBottom: '16px',
  }

  const goToSection = (sectionId: string) => {
    navigate('/')
    setTimeout(() => {
      const el = document.querySelector(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <footer ref={footerRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#1a1a1a', padding: '80px 40px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, fontStyle: 'italic', color: '#f6f3ee', letterSpacing: '0.04em', marginBottom: '4px' }}>
              FACES STUDIO
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400, color: 'rgba(246, 243, 238, 0.5)', textTransform: 'lowercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              organic soulfood for your skin
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(246, 243, 238, 0.5)', lineHeight: 1.6 }}>
              Nature. Art. Soul.
            </div>
          </div>

          {/* Studio */}
          <div>
            <div style={headingStyle}>{isDe ? 'Studio' : 'Studio'}</div>
            {[
              { label: isDe ? 'Über mich' : 'About', section: '#about' },
              { label: isDe ? 'Behandlungen' : 'Treatments', section: '#treatments' },
              { label: isDe ? 'Produkte' : 'Products', section: '#farfalla' },
              { label: isDe ? 'Kontakt' : 'Contact', section: '#contact' },
            ].map((l) => (
              <a key={l.label} href="/" onClick={(e) => { e.preventDefault(); goToSection(l.section) }} style={linkStyle}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#f6f3ee' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(246, 243, 238, 0.7)' }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={headingStyle}>{isDe ? 'Rechtliches' : 'Legal'}</div>
            <a href="/#/impressum" style={linkStyle}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#f6f3ee' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(246, 243, 238, 0.7)' }}>
              {isDe ? 'Impressum' : 'Imprint'}
            </a>
            <a href="/#/privacy" style={linkStyle}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#f6f3ee' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(246, 243, 238, 0.7)' }}>
              {isDe ? 'Datenschutz' : 'Privacy'}
            </a>
            <a href="/#/terms" style={linkStyle}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#f6f3ee' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(246, 243, 238, 0.7)' }}>
              {isDe ? 'AGB' : 'Terms'}
            </a>
          </div>

          {/* Connect */}
          <div>
            <div style={headingStyle}>{isDe ? 'Folge uns' : 'Follow Us'}</div>
            <a
              href="https://www.instagram.com/faces_studio_zuerich"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f6f3ee' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(246, 243, 238, 0.7)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>

          {/* Payment */}
          <div>
            <div style={headingStyle}>{isDe ? 'Zahlung' : 'Payment'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['TWINT', 'Cash / Bargeld'].map((p) => (
                <span key={p} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(246, 243, 238, 0.7)' }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <div style={headingStyle}>{isDe ? 'Sprache' : 'Language'}</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setLang('de')} style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: lang === 'de' ? '#f6f3ee' : 'rgba(246, 243, 238, 0.5)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>DE</button>
              <span style={{ color: 'rgba(246, 243, 238, 0.3)' }}>/</span>
              <button onClick={() => setLang('en')} style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: lang === 'en' ? '#f6f3ee' : 'rgba(246, 243, 238, 0.5)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>EN</button>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(246, 243, 238, 0.1)', margin: '48px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(246, 243, 238, 0.35)' }}>
            &copy; 2025 FACES STUDIO. {isDe ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(246, 243, 238, 0.35)' }}>
            Zürich, Switzerland
          </span>
        </div>
      </div>
    </footer>
  )
}
