import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DETAILS = [
  '90 minutes of pure indulgence',
  'Uses 12 organic botanical extracts',
  'Includes take-home skincare sample set',
  'Personalized skin analysis included',
]

export default function FeaturedRitual() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      })

      const textElements = textRef.current?.children
      if (textElements) {
        gsap.from(textElements, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="rituals"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#f6f3ee',
        padding: '120px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'start',
        }}
        className="lg:!grid-cols-[60%_40%]"
      >
        {/* Image */}
        <div
          ref={imageRef}
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/ritual-sunset.jpg"
            alt="Pink cherry blossoms in golden sunset light"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Text */}
        <div ref={textRef} style={{ paddingTop: '0' }} className="lg:!pt-[80px]">
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
            Featured Ritual
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 400,
              color: '#1a1a1a',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
            }}
          >
            The Peony Renewal
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 400,
              color: '#8c8c8c',
              lineHeight: 1.65,
              margin: '0 0 24px',
              maxWidth: '400px',
            }}
          >
            Our signature treatment begins with a warm compress of fresh peony
            petals, followed by a gentle enzymatic peel and deep hydration mask.
            The result is skin that feels reborn — soft, luminous, and deeply
            nourished.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
            {DETAILS.map((detail) => (
              <li
                key={detail}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ff5757',
                    flexShrink: 0,
                  }}
                />
                {detail}
              </li>
            ))}
          </ul>

          <button
            onClick={scrollToContact}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#f6f3ee',
              backgroundColor: '#1a1a1a',
              border: 'none',
              borderRadius: '32px',
              padding: '14px 32px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = '#ff5757'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = '#1a1a1a'
            }}
          >
            Book This Ritual
          </button>
        </div>
      </div>
    </section>
  )
}
