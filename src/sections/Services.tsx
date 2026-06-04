import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    image: '/images/svc-peony.jpg',
    title: 'Botanical Facial',
    description:
      'A 90-minute journey using cold-pressed botanical oils and plant stem cell serums.',
    price: 'From CHF 180',
  },
  {
    image: '/images/svc-succulent.jpg',
    title: 'Crystal Glow Treatment',
    description:
      'Microcurrent therapy paired with rose quartz massage for lifted, radiant skin.',
    price: 'From CHF 220',
  },
  {
    image: '/images/svc-leaves.jpg',
    title: 'Forest Bathing Facial',
    description:
      'Shinrin-yoku inspired treatment with cedarwood, hinoki, and moss extracts.',
    price: 'From CHF 195',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      const cards = cardsRef.current?.children
      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#1a1a1a',
        padding: '120px 40px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div ref={headingRef}>
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
            Our Services
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#f6f3ee',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Rituals for Every Skin
          </h2>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginTop: '60px',
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.title}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.4s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(255, 255, 255, 0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(255, 255, 255, 0.04)'
              }}
            >
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLElement).style.transform = 'scale(1.03)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLElement).style.transform = 'scale(1)'
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#f6f3ee',
                  margin: '0 0 8px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(246, 243, 238, 0.65)',
                  lineHeight: 1.6,
                  margin: '0 0 12px',
                }}
              >
                {service.description}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ff5757',
                }}
              >
                {service.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
