import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const ADDONS = [
  { nameDe: 'Wimpern färben', nameEn: 'Eyelash tinting', price: 'CHF 35.–' },
  { nameDe: 'Brauen färben', nameEn: 'Eyebrow tinting', price: 'CHF 25.–' },
  { nameDe: 'Brauen zupfen (Shaping)', nameEn: 'Eyebrow shaping', price: 'CHF 25.–' },
  { nameDe: 'Oberlippe wachsen', nameEn: 'Upper lip waxing', price: 'CHF 15.–' },
]

export default function AddOns() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f2ede6', padding: '80px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', textAlign: 'center', margin: '0 0 8px' }}>
          {isDe ? 'Add-ons' : 'Add-ons'}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', textAlign: 'center', margin: '0 0 32px' }}>
          {isDe ? 'Ergänze Deine Gesichtsbehandlung mit einem individuellen Extra:' : 'Enhance your facial treatment with an individual extra:'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ADDONS.map((addon, i) => (
            <div
              key={addon.nameDe}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 0',
                borderBottom: i < ADDONS.length - 1 ? '1px solid #d4d0c9' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1a1a1a' }}>
                {isDe ? addon.nameDe : addon.nameEn}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#ff5757' }}>
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
