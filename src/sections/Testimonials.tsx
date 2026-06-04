import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// Fallback testimonials for initial display
const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    textDe: 'Die Behandlung bei Désirée war einfach wunderbar. Meine Haut fühlt sich so viel gesünder an und das Ambiente im Studio ist so entspannend. Ich komme definitiv wieder!',
    textEn: 'The treatment with Désirée was simply wonderful. My skin feels so much healthier and the studio ambiance is so relaxing. I will definitely come back!',
    rating: 5,
    treatment: 'Faces Signature Ritual',
  },
  {
    id: 2,
    name: 'Michael K.',
    textDe: 'Endlich eine Gesichtsbehandlung, die speziell für Männer gedacht ist. Die Gentleman\'s Ritual hat meine Haut komplett verwandelt. Sehr professionell!',
    textEn: 'Finally a facial treatment specifically designed for men. The Gentleman\'s Ritual completely transformed my skin. Very professional!',
    rating: 5,
    treatment: "Gentleman's Ritual",
  },
  {
    id: 3,
    name: 'Anna L.',
    textDe: 'Ich habe das Bio-Microneedling ausprobiert und bin begeistert. Meine Haut ist strahlender und die feinen Linien sind deutlich weniger sichtbar.',
    textEn: 'I tried the Bio-Microneedling and I am thrilled. My skin is more radiant and the fine lines are much less visible.',
    rating: 5,
    treatment: 'Bio-Microneedling',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#ff5757' : 'none'} stroke={i < count ? '#ff5757' : '#d4d0c9'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  const [activeIdx, setActiveIdx] = useState(0)
  const reviews = DEFAULT_REVIEWS

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-title', {
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

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Auto-rotate on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [reviews.length])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#1a2e26',
        padding: '120px 40px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div className="testimonial-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            {isDe ? 'Das sagen unsere Gäste' : 'What Our Guests Say'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#f6f3ee',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}
          >
            {isDe ? 'Worte, die uns\nwärmen.' : 'Words That Warm\nOur Hearts.'}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'rgba(246, 243, 238, 0.6)',
              lineHeight: 1.65,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            {isDe
              ? 'Echte Bewertungen von Gästen, die uns vertrauen.'
              : 'Real reviews from guests who trust us.'}
          </p>

          {/* Google badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              padding: '8px 16px',
              backgroundColor: 'rgba(246, 243, 238, 0.08)',
              borderRadius: '20px',
              border: '1px solid rgba(246, 243, 238, 0.15)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(246, 243, 238, 0.7)',
              }}
            >
              {isDe ? 'Bewerte uns auf Google' : 'Review us on Google'}
            </span>
            <a
              href="https://g.page/r/CRfaSrIJG-z3EAE/review"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#ff5757',
                textDecoration: 'none',
                marginLeft: '4px',
              }}
            >
              {isDe ? 'Jetzt bewerten' : 'Leave a review'}
            </a>
          </div>
        </div>

        {/* Cards - Desktop grid, Mobile carousel */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              style={{
                backgroundColor: 'rgba(246, 243, 238, 0.05)',
                border: '1px solid rgba(246, 243, 238, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s ease',
                opacity: window.innerWidth < 768 ? (idx === activeIdx ? 1 : 0.5) : 1,
                transform: window.innerWidth < 768 ? (idx === activeIdx ? 'scale(1)' : 'scale(0.95)') : 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.backgroundColor = 'rgba(246, 243, 238, 0.08)'
                el.style.borderColor = 'rgba(255, 87, 87, 0.3)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.backgroundColor = 'rgba(246, 243, 238, 0.05)'
                el.style.borderColor = 'rgba(246, 243, 238, 0.1)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <StarRating count={review.rating} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'rgba(246, 243, 238, 0.85)',
                  lineHeight: 1.7,
                  margin: '0 0 20px',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{isDe ? review.textDe : review.textEn}&rdquo;
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(246, 243, 238, 0.1)',
                  paddingTop: '16px',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#f6f3ee',
                    }}
                  >
                    {review.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: '#ff5757',
                    }}
                  >
                    {review.treatment}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'rgba(246, 243, 238, 0.3)',
                  }}
                >
                  {isDe ? 'Verifizierter Gast' : 'Verified Guest'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '24px',
          }}
          className="md:hidden"
        >
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: idx === activeIdx ? '#ff5757' : 'rgba(246, 243, 238, 0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
