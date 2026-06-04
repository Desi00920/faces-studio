import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { value: '', labelDe: 'Behandlung wählen...', labelEn: 'Select treatment...' },
  { value: 'Faces Signature Ritual', labelDe: 'Faces Signature Ritual', labelEn: 'Faces Signature Ritual' },
  { value: 'Urban Reset', labelDe: 'Urban Reset', labelEn: 'Urban Reset' },
  { value: 'The Hydra Renewal', labelDe: 'The Hydra Renewal', labelEn: 'The Hydra Renewal' },
  { value: "Gentleman's Ritual", labelDe: "Gentleman's Ritual", labelEn: "Gentleman's Ritual" },
  { value: 'Clear Skin Therapy', labelDe: 'Clear Skin Therapy', labelEn: 'Clear Skin Therapy' },
  { value: 'Lash Lift', labelDe: 'Lash Lift', labelEn: 'Lash Lift' },
  { value: 'Bio-Microneedling', labelDe: 'Bio-Microneedling', labelEn: 'Bio-Microneedling' },
]

const ADDONS = [
  { id: 'lash-tint', labelDe: 'Wimpern färben', labelEn: 'Eyelash tinting', price: 'CHF 35.–' },
  { id: 'brow-tint', labelDe: 'Brauen färben', labelEn: 'Eyebrow tinting', price: 'CHF 25.–' },
  { id: 'brow-shape', labelDe: 'Brauen zupfen (Shaping)', labelEn: 'Eyebrow shaping', price: 'CHF 25.–' },
  { id: 'lip-wax', labelDe: 'Oberlippe wachsen', labelEn: 'Upper lip waxing', price: 'CHF 15.–' },
]

const TIME_SLOTS = [
  { value: '', labelDe: 'Uhrzeit wählen...', labelEn: 'Select time...' },
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' },
  { value: '15:30', label: '15:30' },
  { value: '16:00', label: '16:00' },
  { value: '16:30', label: '16:30' },
  { value: '17:00', label: '17:00' },
  { value: '17:30', label: '17:30' },
  { value: '18:00', label: '18:00' },
]

/** Get today's date in YYYY-MM-DD format */
function getToday(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1) // earliest: tomorrow
  return d.toISOString().split('T')[0]
}

/** Get date 3 months from now */
function getMaxDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 3)
  return d.toISOString().split('T')[0]
}

export default function Contact() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', addons: [] as string[], preferredDate: '', preferredTime: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const isDe = lang === 'de'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } })
      gsap.from(rightRef.current, { x: 30, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('loading')
    setErrorMsg('')

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      const contentType = response.headers.get('content-type') || ''
      const payload = contentType.includes('application/json')
        ? await response.json()
        : { success: false, error: await response.text() }

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || payload.message || 'Failed to send inquiry')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', addons: [], preferredDate: '', preferredTime: '', message: '' })
    } catch (err) {
      setStatus('error')
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('timeout') || msg.includes('Failed to fetch') || msg.includes('aborted')) {
        setErrorMsg(isDe
          ? 'Verbindungsfehler. Bitte versuche es später erneut oder kontaktiere uns per WhatsApp.'
          : 'Connection error. Please try again later or contact us via WhatsApp.')
      } else {
        setErrorMsg(msg)
      }
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '14px',
    borderBottom: '1px solid #d4d0c9', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    padding: '14px 0', backgroundColor: 'transparent', width: '100%', outline: 'none', color: '#1a1a1a', transition: 'border-color 0.3s',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle, cursor: 'pointer', appearance: 'none' as any, borderRadius: 0,
  }

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f6f3ee', padding: '120px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center' }} className="lg:!grid-cols-2">
        <div ref={leftRef}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '16px' }}>
            {isDe ? 'Kontakt' : 'Get In Touch'}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
            {isDe ? 'Termin anfragen' : 'Request Appointment'}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#8c8c8c', lineHeight: 1.65, margin: '0 0 12px', maxWidth: '400px' }}>
            {isDe
              ? 'Lust auf eine Auszeit? Buche Deine Behandlung und lass Dich von der Naturkosmetik verwöhnen.'
              : 'Fancy a break? Book your treatment and let natural cosmetics pamper you.'}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 40px' }}>
            Come find us, step inside
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:hello@faces-studio.ch" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1a1a1a', textDecoration: 'none' }}>hello@faces-studio.ch</a>
            <a href="tel:+41762665902" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1a1a1a', textDecoration: 'none' }}>+41 76 266 59 02</a>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.7 }}>
              {isDe
                ? <>Faces Studio<br />1. Stock<br />Reinhardstrasse 12<br />8008 Zürich</>
                : <>Faces Studio<br />1st Floor<br />Reinhardstrasse 12<br />8008 Zurich</>}
            </span>
            <a href="https://www.instagram.com/faces_studio_zuerich" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#ff5757', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @faces_studio_zuerich
            </a>
          </div>
        </div>

        <div ref={rightRef}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name */}
            <input type="text" placeholder={isDe ? 'Name *' : 'Name *'} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }} onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }} />

            {/* Email */}
            <input type="email" placeholder={isDe ? 'E-Mail *' : 'Email *'} required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }} onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }} />

            {/* Phone */}
            <input type="tel" placeholder={isDe ? 'Telefon *' : 'Phone *'} required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }} onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }} />

            {/* Treatment dropdown */}
            <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={selectStyle} onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }} onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }}>
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>{isDe ? (s.labelDe || s.labelEn) : s.labelEn}</option>
              ))}
            </select>

            {/* Add-on checkboxes */}
            {formData.service && formData.service !== 'Other' && (
              <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '12px' }}>
                  {isDe ? 'Add-ons (optional)' : 'Add-ons (optional)'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {ADDONS.map((addon) => {
                    const selected = formData.addons.includes(addon.id)
                    return (
                      <label
                        key={addon.id}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            addons: selected
                              ? prev.addons.filter(a => a !== addon.id)
                              : [...prev.addons, addon.id]
                          }))
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          backgroundColor: selected ? '#ffb8b8' : 'rgba(255, 183, 184, 0.12)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          border: selected ? '1.5px solid #ff5757' : '1.5px solid transparent',
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: selected ? 'none' : '1.5px solid #d4d0c9',
                          backgroundColor: selected ? '#ff5757' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                        }}>
                          {selected && <span style={{ color: '#fff', fontSize: '11px' }}>✓</span>}
                        </div>
                        <div>
                          <span style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            fontWeight: selected ? 600 : 400,
                            color: selected ? '#ff5757' : '#1a1a1a',
                            lineHeight: 1.3,
                          }}>
                            {isDe ? addon.labelDe : addon.labelEn}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            color: selected ? '#ff5757' : '#8c8c8c',
                          }}>
                            {addon.price}
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Wunschdatum + Wunschtermin row */}
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '10px' }}>
                {isDe ? 'Wunschtermin (Voranfrage)' : 'Preferred appointment (tentative)'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    min={getToday()}
                    max={getMaxDate()}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    placeholder={isDe ? 'Wunschdatum' : 'Preferred date'}
                    style={{ ...inputStyle, colorScheme: 'light' }}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }}
                    onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }}
                  />
                </div>
                <div>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    style={selectStyle}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }}
                    onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8c8c8c', marginTop: '8px', fontStyle: 'italic' }}>
                {isDe
                  ? 'Dies ist eine unverbindliche Voranfrage. Wir bestätigen den Termin per E-Mail.'
                  : 'This is a tentative request. We will confirm the appointment via email.'}
              </p>
            </div>

            {/* Message */}
            <textarea placeholder={isDe ? 'Nachricht *' : 'Message *'} rows={3} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderBottomColor = '#1a1a1a' }} onBlur={(e) => { e.target.style.borderBottomColor = '#d4d0c9' }} />

            {/* Non-binding notice */}
            <div style={{ backgroundColor: 'rgba(255, 87, 87, 0.08)', borderRadius: '14px', padding: '18px 20px', border: '1.5px solid rgba(255, 87, 87, 0.2)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#ff5757', lineHeight: 1.5, margin: '0 0 6px', fontWeight: 600, letterSpacing: '0.02em' }}>
                {isDe ? 'Jetzt unverbindlich anfragen' : 'Request without obligation'}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8c8c8c', lineHeight: 1.6, margin: 0 }}>
                {isDe
                  ? 'Deine gewählte Behandlung, das Wunschdatum und die Uhrzeit sind eine Voranfrage. Wir prüfen die Verfügbarkeit und bestätigen den Termin so schnell wie möglich per WhatsApp oder E-Mail.'
                  : 'Your selected treatment, preferred date and time are a preliminary request. We check availability and confirm the appointment as soon as possible via WhatsApp or email.'}
              </p>
            </div>

            {/* 24h notice */}
            <div style={{ backgroundColor: '#ffb8b8', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px', color: '#ff5757' }}>ⓘ</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#ff5757', lineHeight: 1.5, margin: 0 }}>
                {isDe
                  ? 'Bitte beachte: Termine müssen mindestens 24 Stunden im Voraus angefragt werden. Für kurzfristige Buchungen kontaktiere uns direkt per Telefon oder WhatsApp.'
                  : 'Please note: Appointments must be requested at least 24 hours in advance. For last-minute bookings, please contact us directly by phone or WhatsApp.'}
              </p>
            </div>

            {/* Submit button */}
            <button type="submit" disabled={status === 'loading'} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f6f3ee', backgroundColor: '#1a1a1a', border: 'none', borderRadius: '32px', padding: '18px', cursor: 'pointer', transition: 'background-color 0.3s', marginTop: '4px', opacity: status === 'loading' ? 0.6 : 1 }}
              onMouseEnter={(e) => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.backgroundColor = '#ff5757' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1a1a1a' }}>
              {status === 'loading' ? (isDe ? 'Wird gesendet...' : 'Sending...') : (isDe ? 'Jetzt unverbindlich anfragen' : 'Request without obligation')}
            </button>

            {status === 'success' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#2d7d46', textAlign: 'center' }}>
                {isDe ? 'Vielen Dank! Wir melden uns bald bei Dir.' : 'Thank you. We will reply shortly.'}
              </p>
            )}
            {status === 'error' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#ff5757', textAlign: 'center' }}>
                {errorMsg || (isDe ? 'Fehler beim Senden. Bitte versuche es erneut.' : 'Failed to send. Please try again.')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
