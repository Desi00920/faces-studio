import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

export default function CookieConsent() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)
  const isDe = lang === 'de'

  useEffect(() => {
    const accepted = localStorage.getItem('faces-cookies-accepted')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('faces-cookies-accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '520px',
        margin: '0 auto',
        zIndex: 100,
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        animation: 'slideUp 0.5s ease-out',
      }}
    >
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'rgba(246, 243, 238, 0.8)',
        lineHeight: 1.6,
        margin: '0 0 16px',
      }}>
        {isDe
          ? 'Wir verwenden Cookies und Google Analytics, um Dein Erlebnis auf unserer Website zu verbessern. Durch die Nutzung stimmst Du unserer ' : 'We use cookies and Google Analytics to improve your experience on our website. By continuing, you agree to our '}
        <a
          href="/#/privacy"
          style={{ color: '#ff5757', textDecoration: 'underline', textUnderlineOffset: '2px' }}
        >
          {isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </a>
        {isDe ? ' zu.' : '.'}
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={accept}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#f6f3ee',
            backgroundColor: '#ff5757',
            border: 'none',
            borderRadius: '24px',
            padding: '10px 24px',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          {isDe ? 'Akzeptieren' : 'Accept'}
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(246, 243, 238, 0.6)',
            backgroundColor: 'transparent',
            border: '1px solid rgba(246, 243, 238, 0.2)',
            borderRadius: '24px',
            padding: '10px 24px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(246, 243, 238, 0.5)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(246, 243, 238, 0.2)' }}
        >
          {isDe ? 'Nur notwendige' : 'Essential only'}
        </button>
      </div>
    </div>
  )
}
