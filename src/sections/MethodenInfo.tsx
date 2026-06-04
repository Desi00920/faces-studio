import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function MethodenInfo() {
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
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f6f3ee', padding: '80px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '12px', textAlign: 'center' }}>
          {isDe ? 'Methoden-Info' : 'Method Info'}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', textAlign: 'center', margin: '0 0 20px' }}>
          {isDe ? 'Was ist Cupping?' : 'What is Cupping?'}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8c8c8c', lineHeight: 1.7, margin: '0 0 20px', textAlign: 'center' }}>
          {isDe
            ? 'Beim Cupping wird die Haut sanft angesaugt. Das regt die Durchblutung und den Lymphfluss an – ein echter Boost für Deine Haut:'
            : 'Cupping gently suctions the skin, stimulating blood circulation and lymphatic flow — a real boost for your skin:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {(isDe ? [
            'Tiefenreinigung der Poren (Abtransport von Talg & Stoffwechselprodukten)',
            'Unterstützt die natürliche Hautregeneration',
            'Kann Entzündungen beruhigen',
            'Lässt das Hautbild frischer und klarer wirken',
          ] : [
            'Deep pore cleansing (removes sebum & metabolic waste)',
            'Supports natural skin regeneration',
            'Can soothe inflammation',
            'Leaves skin looking fresher and clearer',
          ]).map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', backgroundColor: '#ffb8b8', borderRadius: '8px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ff5757', flexShrink: 0, marginTop: '7px' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1a1a1a', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
