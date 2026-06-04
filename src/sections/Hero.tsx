import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { lang } = useLang()
  const labelRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.15)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9)
      .to(labelRef.current, { opacity: 1, duration: 0.5, ease: 'power3.out' }, 1.0)

    return () => { tl.kill() }
  }, [])

  const scrollToBioMicroneedling = () => {
    const el = document.querySelector('#bio-microneedling')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', zIndex: 1, display: 'flex', alignItems: 'flex-end', pointerEvents: 'none' }}>
      <div style={{ padding: '0 40px 15vh', maxWidth: '540px', pointerEvents: 'auto' }}>
        <span ref={labelRef} style={{ display: 'block', opacity: 0, fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '20px' }}>
          {lang === 'de' ? 'Zürich, Schweiz' : 'Zurich, Switzerland'}
        </span>
        <h1 style={{ margin: 0, padding: 0 }}>
          <span ref={line1Ref} style={{ display: 'block', opacity: 0, transform: 'translateY(30px)', fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, color: '#f6f3ee', textShadow: '0 2px 30px rgba(0,0,0,0.4)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {lang === 'de' ? 'organic soul food' : 'organic soul food'}
          </span>
          <span ref={line2Ref} style={{ display: 'block', opacity: 0, transform: 'translateY(30px)', fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, color: '#f6f3ee', textShadow: '0 2px 30px rgba(0,0,0,0.4)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {lang === 'de' ? 'for your skin' : 'for your skin'}
          </span>
        </h1>
        <p ref={subtitleRef} style={{ opacity: 0, transform: 'translateY(20px)', fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 400, color: 'rgba(246, 243, 238, 0.85)', maxWidth: '420px', marginTop: '24px', lineHeight: 1.65 }}>
          {lang === 'de'
            ? 'Botanische Gesichtsbehandlungen mit den kostbarsten Zutaten der Natur. Erlebe das Ritual der wahren Selbstfürsorge.'
            : "Botanical facials crafted with nature's most precious ingredients. Experience the ritual of true self-care."}
        </p>
        <a
          ref={ctaRef}
          href="#bio-microneedling"
          onClick={(e) => { e.preventDefault(); scrollToBioMicroneedling() }}
          style={{ display: 'inline-block', opacity: 0, transform: 'translateY(20px)', marginTop: '32px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f6f3ee', border: '1px solid #f6f3ee', borderRadius: '32px', padding: '14px 32px', textDecoration: 'none', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = '#f6f3ee'; el.style.color = '#1a2e26' }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = 'transparent'; el.style.color = '#f6f3ee' }}
        >
          {lang === 'de' ? 'Entdecke Deine Rituale' : 'Discover Your Rituals'}
        </a>
      </div>
    </section>
  )
}
