import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Gutscheine() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
      gsap.from(textRef.current, {
        x: 40, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#1a2e26', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', alignItems: 'center' }} className="lg:!grid-cols-2">
        {/* Image */}
        <div
          ref={imgRef}
          style={{
            minHeight: '400px',
            maxHeight: '600px',
            overflow: 'hidden',
            order: 1,
          }}
        >
          <img
            src="/images/seyene-otu.jpg"
            alt="Fresh lime juice — natural skincare by Seyene Otu"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          style={{
            order: 2,
            padding: '80px 40px',
            textAlign: 'center',
          }}
        >
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '16px' }}>
            {isDe ? 'Geschenkgutscheine' : 'Gift Vouchers'}
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, fontStyle: 'italic', color: '#f6f3ee', lineHeight: 1.15, margin: '0 0 20px' }}>
            {isDe ? 'Das schönste Geschenk: Zeit für sich selbst.' : 'The Most Beautiful Gift: Time for Yourself.'}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(246, 243, 238, 0.75)', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            {isDe
              ? 'Unsere Gutscheine sind das perfekte Geschenk für Geburtstagsüberraschungen, Muttertag, Weihnachten oder einfach als Dankeschön – für jede Person, die Entspannung und Naturkosmetik schätzt.'
              : "Our vouchers are the perfect gift for birthday surprises, Mother's Day, Christmas, or simply as a thank you — for anyone who appreciates relaxation and natural cosmetics."}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(246, 243, 238, 0.55)', lineHeight: 1.65, margin: '0 0 28px', fontStyle: 'italic' }}>
            {isDe
              ? 'Gutscheine sind in jedem Wert erhältlich und können persönlich im Studio oder auf Anfrage erworben werden.'
              : 'Vouchers are available in any amount and can be purchased in person at the studio or on request.'}
          </p>
          <a
            href="/#/contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              color: '#f6f3ee', border: '1px solid rgba(246, 243, 238, 0.5)',
              borderRadius: '32px', padding: '14px 32px',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = '#f6f3ee'; el.style.color = '#1a2e26' }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = 'transparent'; el.style.color = '#f6f3ee' }}
          >
            {isDe ? 'Gutschein anfragen' : 'Request Voucher'}
          </a>

          {/* Photo credit */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(246, 243, 238, 0.3)', marginTop: '24px' }}>
            {isDe ? 'Foto: Seyene Otu / Unsplash' : 'Photo: Seyene Otu / Unsplash'}
          </p>
        </div>
      </div>
    </section>
  )
}
