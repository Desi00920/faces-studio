import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    image: '/images/prod-eucalyptus.jpg',
    name: 'Alpine Dew Serum',
    price: 'CHF 68',
  },
  {
    image: '/images/prod-leaf.jpg',
    name: 'Morning Mist Toner',
    price: 'CHF 42',
  },
  {
    image: '/images/svc-peony.jpg',
    name: 'Peony Renewal Cream',
    price: 'CHF 85',
  },
  {
    image: '/images/svc-succulent.jpg',
    name: 'Desert Rose Elixir',
    price: 'CHF 76',
  },
]

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      const cards = scrollRef.current?.children
      if (cards) {
        gsap.from(cards, {
          x: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#1a2e26',
        padding: '120px 0 120px 40px',
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
            Our Products
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#f6f3ee',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
            }}
          >
            Botanical Essentials
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 400,
              color: 'rgba(246, 243, 238, 0.65)',
              margin: '0 0 48px',
            }}
          >
            Handcrafted in small batches using Swiss Alpine botanicals
          </p>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingRight: '40px',
        }}
        className="hide-scrollbar"
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.name}
            style={{
              flex: '0 0 auto',
              width: 'clamp(200px, 25vw, 280px)',
              scrollSnapAlign: 'start',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                aspectRatio: '3/4',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLElement).style.transform = 'scale(1.04)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLElement).style.transform = 'scale(1)'
                }}
              />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#f6f3ee',
                margin: '0 0 4px',
              }}
            >
              {product.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#ff5757',
              }}
            >
              {product.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
