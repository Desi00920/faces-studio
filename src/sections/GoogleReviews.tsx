import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import { trpc } from '@/providers/trpc'

gsap.registerPlugin(ScrollTrigger)

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#ff5757' : 'none'} stroke={i < count ? '#ff5757' : '#d4d0c9'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isDe = lang === 'de'

  const { data, isLoading } = trpc.googleReviews.list.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!data?.reviews?.length) return
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [data])

  // If no reviews yet, show a subtle CTA to leave one
  if (!isLoading && (!data?.reviews || data.reviews.length === 0)) {
    return (
      <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#1a2e26', padding: '80px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 28px', backgroundColor: 'rgba(246,243,238,0.06)', borderRadius: '40px', border: '1px solid rgba(246,243,238,0.12)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(246,243,238,0.7)' }}>
              {isDe ? 'Sei einer der ersten, der uns auf Google bewertet' : 'Be one of the first to review us on Google'}
            </span>
            <a href="https://g.page/r/CRfaSrIJG-z3EAE/review" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#ff5757', textDecoration: 'none', fontWeight: 500 }}>
              {isDe ? 'Jetzt bewerten' : 'Leave a review'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  const reviews = data?.reviews || []

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#1a2e26', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(246,243,238,0.6)' }}>
              Google Reviews
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, fontStyle: 'italic', color: '#f6f3ee', lineHeight: 1.15, margin: '0 0 8px' }}>
            {isDe ? 'Das sagen unsere Gäste' : 'What Our Guests Say'}
          </h2>
          {data?.averageRating && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <StarRating count={Math.round(data.averageRating)} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#f6f3ee', fontWeight: 600 }}>
                {data.averageRating.toFixed(1)}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(246,243,238,0.5)' }}>
                ({data.totalReviews} {isDe ? 'Bewertungen' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        {/* Review Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="review-card"
              style={{
                backgroundColor: 'rgba(246, 243, 238, 0.05)',
                border: '1px solid rgba(246, 243, 238, 0.1)',
                borderRadius: '16px',
                padding: '28px',
                transition: 'all 0.3s ease',
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
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(246, 243, 238, 0.85)', lineHeight: 1.7, margin: '12px 0 20px', fontStyle: 'italic' }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(246, 243, 238, 0.1)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {review.photoUrl ? (
                    <img src={review.photoUrl} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ff5757', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#f6f3ee' }}>
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#f6f3ee' }}>{review.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(246,243,238,0.4)' }}>{review.relativeTime}</span>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
