import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// Google Maps Embed API key — set in Vercel env vars before build
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
const PLACE_ID = 'ChIJf4HB3ASnmkcRwuzT001B6E4'

// Standard embed that works without any API key — reliable fallback
const FALLBACK_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.215!2d8.548649!3d47.362776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa704dc10a87f%3A0x4ec88149d3d3ecc2!2sFaces%20Studio!5e0!3m2!1sen!2sch!4v1700000000000!5m2!1sen!2sch`

export default function GoogleMap() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.map-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Build embed URL — use API key if available at build time, otherwise use fallback
  const embedUrl = API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=place_id:${PLACE_ID}&zoom=16&language=${isDe ? 'de' : 'en'}`
    : FALLBACK_EMBED

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#f6f3ee',
        padding: '0',
      }}
    >
      <div className="map-content" style={{ display: 'grid', gridTemplateColumns: '1fr', alignItems: 'center' }}>
        {/* Info panel */}
        <div
          style={{
            padding: '80px 40px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#ff5757',
              marginBottom: '16px',
            }}
          >
            {isDe ? 'Finde uns' : 'Find Us'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1a',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            {isDe ? 'Im Herzen von Zürich' : 'In the Heart of Zurich'}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: '#8c8c8c',
              lineHeight: 1.65,
              margin: '0 0 24px',
            }}
          >
            {isDe
              ? '1. Stock, Reinhardstrasse 12, 8008 Zürich'
              : '1st Floor, Reinhardstrasse 12, 8008 Zurich'}
          </p>
          <a
            href="https://www.google.com/maps/place/Faces+Studio/@47.3627799,8.5486637,16z/data=!3m1!4b1!4m6!3m5!1s0x479aa704dc10a87f:0x4ec88149d3d3ecc2!8m2!3d47.3627763!4d8.5512386!16s%2Fg%2F11z83p8gkm?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              color: '#ff5757',
              textDecoration: 'none',
              padding: '12px 24px',
              border: '1px solid #ff5757',
              borderRadius: '32px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = '#ff5757'
              el.style.color = '#f6f3ee'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = 'transparent'
              el.style.color = '#ff5757'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {isDe ? 'Auf Google Maps öffnen' : 'Open in Google Maps'}
          </a>
        </div>

        {/* Google Maps Embed */}
        <div style={{ width: '100%', height: '450px', position: 'relative' }}>
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Faces Studio Location"
          />
        </div>
      </div>
    </section>
  )
}
