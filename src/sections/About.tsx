import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f6f3ee', padding: '120px 40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }} ref={textRef}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '20px', textAlign: 'center' }}>
          {isDe ? 'Über mich' : 'About Me'}
        </span>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1.15, margin: '0 0 16px', textAlign: 'center' }}>
          {isDe ? 'Désirée & Faces-Studio' : 'Désirée & FACES STUDIO'}
        </h2>

        <div style={{ width: '40px', height: '1px', backgroundColor: '#ff5757', margin: '0 auto 40px' }} />

        {/* Désirée's photo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 183, 184, 0.5)' }}>
            <img
              src="/images/desi.jpg"
              alt={isDe ? 'Désirée von Faces-Studio' : 'Désirée of FACES STUDIO'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1.5, margin: '0 0 32px', textAlign: 'center' }}>
          {isDe ? 'Hey, schön, dass Du da bist – herzlich willkommen!' : "Hey, so glad you're here — welcome!"}
        </p>

        {/* Story paragraphs */}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#8c8c8c', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '20px' }}>
            {isDe
              ? 'Mein Name ist Désirée, und ich arbeite seit über 10 Jahren leidenschaftlich als gelernte Naturkosmetikerin EFZ. Ästhetik, Präzision und Kreativität bilden die Basis meiner Arbeit. Mit viel Feingefühl und Authentizität sorge ich dafür, dass Du Dich rundum wohlfühlst.'
              : "My name is Désirée, and I've been passionately working as a certified natural cosmetics specialist (EFZ) for over 10 years. Aesthetics, precision, and creativity form the foundation of everything I do. With genuine care and authenticity, I make sure you feel completely at ease."}
          </p>

          {/* Poetic paragraph - moved here, unbolded, same grey style */}
          <p style={{ marginBottom: '20px' }}>
            {isDe
              ? 'Faces-Studio steht für Individualität, zeitlose, natürliche Schönheit und die einzigartigen Geschichten, die jedes Gesicht erzählt. Denn jedes Gesicht trägt seine eigene Geschichte in sich — von den feinen Linien, die vom Lachen zeugen, bis zu den sanften Konturen, die unsere Einzigartigkeit formen. Unser Ziel ist es, Deine natürliche Ausstrahlung zu unterstreichen und Dir ein rundum gutes Gefühl in Deiner Haut zu schenken.'
              : "FACES STUDIO stands for individuality, timeless natural beauty, and the unique stories that every face tells. Because every face carries its own story within — from the fine lines that bear witness to laughter, to the gentle contours that shape our uniqueness. Our goal is to highlight your natural radiance and give you a feeling of complete well-being in your own skin."}
          </p>

          <p style={{ marginBottom: '20px' }}>
            {isDe
              ? 'Bei Faces-Studio kannst Du entspannende Gesichtsbehandlungen mit hochwertigen, zertifizierten Naturkosmetikprodukten geniessen – ideal für alle, die ihre Seele baumeln lassen und eine kleine Auszeit vom Alltag geniessen möchten.'
              : "At FACES STUDIO, you'll experience deeply relaxing facial treatments using premium, certified natural cosmetic products — perfect for anyone who wants to let their soul unwind and take a well-deserved break from everyday life."}
          </p>

          <p style={{ marginBottom: '20px' }}>
            {isDe
              ? 'Nach meiner Reise durch Indien, Sri Lanka und Indonesien – bereichert von neuen Kulturen, Menschen und der faszinierenden Naturschönheit dieser Orte – freue ich mich nun, den Schritt in die Selbstständigkeit zu gehen. Diese Eindrücke fliessen in meine Arbeit ein: Ganzheitlichkeit, Authentizität und die Verbindung von Natur und Pflege.'
              : "After my journey through India, Sri Lanka, and Indonesia — enriched by new cultures, inspiring people, and the breathtaking natural beauty of these places — I'm now taking the leap into self-employment. These experiences flow directly into my work: a holistic approach, authenticity, and the deep connection between nature and skincare."}
          </p>

          <p style={{ textAlign: 'center', color: '#1a1a1a', fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', marginTop: '40px' }}>
            {isDe ? 'Tauche ein in die Welt der Entspannung. Ich freue mich auf Dich. – Désirée ✨' : "Dive into the world of relaxation. I can't wait to meet you. – Désirée ✨"}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '48px', flexWrap: 'wrap' }}>
          {[
            { num: '10+', label: isDe ? 'Jahre Erfahrung' : 'Years Experience' },
            { num: '100%', label: isDe ? 'Naturkosmetik' : 'Natural Cosmetics' },
            { num: '\u221e', label: isDe ? 'Herzensprojekt' : 'Passion Project' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 400, color: '#1a1a1a' }}>{stat.num}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c8c8c', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
