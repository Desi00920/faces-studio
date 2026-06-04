import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  { image: '/images/farfalla-01-alpine-rose.jpg', nameDe: 'Alpine Rose A+ Bakuchiol Intensivkur', nameEn: 'Alpine Rose A+ Bakuchiol Intensive Serum', cat: 'Serum' },
  { image: '/images/farfalla-02-cleansing-milk.jpg', nameDe: 'Ultrasens Cleansing Prebio', nameEn: 'Ultrasens Cleansing Prebio Milk', cat: 'Cleansing' },
  { image: '/images/farfalla-03-shower-gel.jpg', nameDe: 'Hippie Rose Duschgel Happiness', nameEn: 'Hippie Rose Shower Gel Happiness', cat: 'Body Care' },
  { image: '/images/farfalla-04-face-cream.jpg', nameDe: 'Hydro Skinergy Rockrose Mg+', nameEn: 'Hydro Skinergy Energizing Face Cream', cat: 'Face Cream' },
  { image: '/images/farfalla-05-roll-on.jpg', nameDe: 'Schlaf schön Gute Nacht Roll-on', nameEn: 'Sleep Well Good Night Roll-on', cat: 'Aromatherapy' },
  { image: '/images/farfalla-06-sun-lipstick.jpg', nameDe: 'Sun Lip Stick SPF 20', nameEn: 'Sun Lip Stick SPF 20', cat: 'Sun Care' },
  { image: '/images/farfalla-07-sun-cream.jpg', nameDe: 'Sun Cream SPF 50', nameEn: 'Sun Cream SPF 50 High Protection', cat: 'Sun Care' },
  { image: '/images/farfalla-aromamour.jpg', nameDe: 'Aromamour Aromamischung Liebeslust', nameEn: 'Aromamour Aroma Blend Love Desire', cat: 'Aromatherapy' },
  { image: '/images/farfalla-08-keyvisual.jpg', nameDe: 'farfalla Swiss Aroma Care', nameEn: 'farfalla Swiss Aroma Care', cat: 'Brand' },
]

export default function FarfallaGallery() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRODUCTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (i: number) => setActiveIndex(i)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % PRODUCTS.length)

  return (
    <section id="farfalla" ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#ffffff', padding: '100px 0' }}>
      {/* Header */}
      <div ref={headingRef} style={{ textAlign: 'center', padding: '0 40px', marginBottom: '48px' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '12px' }}>
          Swiss Aroma Care / Est. 1982
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1, margin: '0 0 24px' }}>
          farfalla
        </h2>

        {/* New paragraphs */}
        <div style={{ maxWidth: '640px', margin: '0 auto 20px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.65, margin: '0 0 12px' }}>
            {isDe ? 'Welche Produkte verwende ich bei Faces Studio?' : 'What products do I use at FACES STUDIO?'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8c8c8c', lineHeight: 1.65, margin: '0 0 16px' }}>
            {isDe
              ? 'Ich benutze die zertifizierten Bio Naturkosmetikprodukte von Farfalla. Diese hochwertigen Produkte sorgen dafür, dass Deine Haut perfekt gepflegt und rundum versorgt ist.'
              : 'I use certified organic natural cosmetics from farfalla. These premium products ensure your skin is perfectly cared for and fully nourished.'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.65, margin: 0 }}>
            {isDe
              ? 'Hier eine kleine Auswahl aus dem umfangreichen Sortiment von farfalla, die wir in unseren Behandlungen verwenden. Entdecke viele weitere Produkte im Faces Studio.'
              : 'Here is a small selection from farfalla\'s extensive range that we use in our treatments. Discover many more products at FACES STUDIO.'}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ aspectRatio: '1/1', backgroundColor: '#fafafa', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '20px' }}>
          {PRODUCTS.map((p, i) => (
            <img
              key={p.nameDe}
              src={p.image}
              alt={isDe ? p.nameDe : p.nameEn}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '30px',
                opacity: i === activeIndex ? 1 : 0, transition: 'opacity 0.6s ease',
              }}
            />
          ))}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(transparent, rgba(26,46,38,0.85))' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757' }}>
              {PRODUCTS[activeIndex].cat}
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, color: '#f6f3ee', margin: '2px 0 0' }}>
              {isDe ? PRODUCTS[activeIndex].nameDe : PRODUCTS[activeIndex].nameEn}
            </p>
          </div>
        </div>

        <button onClick={goPrev} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', background: 'rgba(26,46,38,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#f6f3ee', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={goNext} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: 'rgba(26,46,38,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#f6f3ee', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIndex ? '24px' : '8px', height: '8px', borderRadius: '4px',
                backgroundColor: i === activeIndex ? '#ff5757' : '#d4d0c9', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
