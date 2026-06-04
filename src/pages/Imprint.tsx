import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

const PHOTOGRAPHERS = [
  { name: 'Jacob Lund', links: ['https://jacoblund.com/', 'https://www.instagram.com/jacoblundphoto', 'https://www.istockphoto.com/portfolio/jacoblund?mediatype=photography'] },
  { name: 'Diamond Dogs (oneinchpunch)', links: ['https://www.instagram.com/oneinchpunch_photos/', 'https://www.istockphoto.com/portfolio/diamonddogs?mediatype=photography'] },
  { name: 'g-stockstudio', links: ['https://www.instagram.com/g_stock_studio', 'https://www.istockphoto.com/portfolio/g-stockstudio?mediatype=photography'] },
  { name: 'HONG SON', links: ['https://www.instagram.com/h.son_229', 'https://www.pinterest.com/hsonstudio/', 'https://x.com/Son46901877'] },
  { name: 'Bharath Kumar', links: ['https://www.instagram.com/bharath_kumar975', 'https://pangabharath.artstation.com/'] },
  { name: 'Sherwin Tuibuen', links: ['https://www.instagram.com/sherwin.tuibuen'] },
  { name: 'Alan Ferreira', links: ['https://www.instagram.com/alan0liveiraa'] },
  { name: 'Any Lane', links: ['https://www.pexels.com/de-de/@any-lane/'] },
  { name: 'Luis Zheji', links: ['https://www.instagram.com/luis.zheji', 'https://www.pexels.com/de-de/@luis-zheji-628973/'] },
  { name: 'aedkais', links: ['https://www.istockphoto.com/portfolio/aedkais?mediatype=photography'] },
  { name: 'Larbigno', links: ['https://www.pexels.com/@larbigno/', 'https://www.instagram.com/Larbignoo'] },
  { name: 'Minan1398', links: ['https://www.pexels.com/@minan1398/', 'https://www.instagram.com/minan1398'] },
  { name: 'Larissa Farber', links: ['https://www.pexels.com/@larissafarber/'] },
  { name: 'Lisett Kruusimäe (nonbizarre)', links: ['https://www.pexels.com/@lisettkruusimae/', 'https://www.nonbizarre.com/', 'https://www.instagram.com/nonbizarre'] },
  { name: 'Eva Bronzini', links: ['https://www.pexels.com/de-de/@eva-bronzini/', 'https://www.instagram.com/evabronzini'] },
  { name: 'Mart Production', links: ['https://www.pexels.com/@mart-production/', 'https://www.instagram.com/mart.production'] },
  { name: 'Alan Cabello', links: ['https://www.pexels.com/de-de/@alancabello/', 'https://www.instagram.com/alancabello_'] },
  { name: 'Levent Simsek', links: ['https://www.instagram.com/journeyofordinary'] },
  { name: 'Seyene Otu', links: [] },
]

const CAMERA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

export default function Imprint() {
  const { lang } = useLang()
  const pageRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.from(pageRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
  }, [])

  return (
    <div ref={pageRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f6f3ee', minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        {/* Title */}
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '16px' }}>
          {isDe ? 'Impressum' : 'Imprint'}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 40px' }}>
          FACES STUDIO
        </h1>

        {/* Business Info */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 20px' }}>
            {isDe ? 'Angaben gemäss Schweizer Recht' : 'Information according to Swiss Law'}
          </h2>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8c8c8c', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 4px', color: '#1a1a1a' }}><strong>Faces Studio</strong></p>
            <p style={{ margin: '0 0 4px' }}>1. Stock / 1st Floor</p>
            <p style={{ margin: '0 0 4px' }}>Reinhardstrasse 12</p>
            <p style={{ margin: '0 0 16px' }}>8008 Zürich, Schweiz / Switzerland</p>

            <p style={{ margin: '0 0 4px' }}>
              <strong>{isDe ? 'Inhaberin' : 'Owner'}:</strong> Désirée Weisshaar
            </p>
            <p style={{ margin: '0 0 4px' }}>
              E-Mail: <a href="mailto:hello@faces-studio.ch" style={{ color: '#ff5757', textDecoration: 'none' }}>hello@faces-studio.ch</a>
            </p>
            <p style={{ margin: '0 0 4px' }}>
              Tel: <a href="tel:+41762665902" style={{ color: '#ff5757', textDecoration: 'none' }}>+41 76 266 59 02</a>
            </p>
            <p style={{ margin: '0 0 4px' }}>
              Instagram: <a href="https://www.instagram.com/faces_studio_zuerich" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5757', textDecoration: 'none' }}>@faces_studio_zuerich</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#d4d0c9', margin: '0 0 48px' }} />

        {/* Photo Credits */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 12px' }}>
            {isDe ? 'Bildnachweise' : 'Photo Credits'}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.6, margin: '0 0 28px' }}>
            {isDe
              ? 'Wir danken allen Fotografen und Künstlern, deren wunderbare Arbeiten unsere Website bereichern. Die Bilder stammen von iStock, Pexels sowie freundlicherweise direkt von den Fotografen.'
              : 'We thank all photographers and artists whose wonderful work enriches our website. Images are sourced from iStock, Pexels, and kindly provided directly by the photographers.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {PHOTOGRAPHERS.map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '8px',
                  backgroundColor: 'rgba(255, 183, 184, 0.4)',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 183, 184, 0.7)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 183, 184, 0.4)' }}
              >
                {CAMERA_ICON}
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#1a1a1a', display: 'block' }}>{p.name}</span>
                  {p.links.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {p.links.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#ff5757', textDecoration: 'none' }}
                        >
                          {link.includes('instagram') ? 'Instagram' : link.includes('pexels') ? 'Pexels' : link.includes('istock') ? 'iStock' : link.includes('artstation') ? 'ArtStation' : link.includes('pinterest') ? 'Pinterest' : 'Website'}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#d4d0c9', margin: '0 0 48px' }} />

        {/* Credits */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 16px' }}>
            {isDe ? 'Credits' : 'Credits'}
          </h2>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8c8c8c', lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 8px' }}>
              <strong style={{ color: '#1a1a1a' }}>{isDe ? 'Kreation & Konzept' : 'Creation & Concept'}:</strong> Désirée Weisshaar
            </p>
            <p style={{ margin: '0', fontSize: '13px' }}>
              {isDe ? 'Web-Entwicklung' : 'Web Development'}:
              <a href="https://ecologitex.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5757', textDecoration: 'none' }}> Shaleen Singh</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#d4d0c9', margin: '0 0 48px' }} />

        {/* Haftungsausschluss */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 16px' }}>
            {isDe ? 'Haftungsausschluss' : 'Liability Disclaimer'}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.7, margin: 0 }}>
            {isDe
              ? 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich. Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.'
              : 'Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content. The contents of this website have been created with the greatest possible care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content.'}
          </p>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <a
            href="/#/"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              color: '#1a1a1a', border: '1px solid #1a1a1a',
              borderRadius: '32px', padding: '12px 28px',
              textDecoration: 'none', transition: 'all 0.3s', display: 'inline-block',
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = '#1a1a1a'; el.style.color = '#f6f3ee' }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = 'transparent'; el.style.color = '#1a1a1a' }}
          >
            {isDe ? 'Zurück zur Startseite' : 'Back to Home'}
          </a>
        </div>
      </div>
    </div>
  )
}
