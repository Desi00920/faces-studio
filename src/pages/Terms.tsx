import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function Terms() {
  const { lang } = useLang()
  const pageRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  useEffect(() => { window.scrollTo(0, 0); gsap.from(pageRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }) }, [])

  const Section = ({ titleDe, titleEn, children }: { titleDe: string; titleEn: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 12px' }}>
        {isDe ? titleDe : titleEn}
      </h2>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.7 }}>{children}</div>
    </div>
  )

  return (
    <div ref={pageRef} style={{ position: 'relative', zIndex: 1, backgroundColor: '#f6f3ee', minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '16px' }}>
          {isDe ? 'Allgemeine Geschäftsbedingungen' : 'Terms & Conditions'}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 16px' }}>
          {isDe ? 'AGB' : 'Terms'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8c8c8c', margin: '0 0 40px' }}>
          {isDe ? 'Stand: Juni 2025' : 'Last updated: June 2025'}
        </p>

        <Section titleDe="1. Geltungsbereich" titleEn="1. Scope">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Behandlungen, Produkte und Dienstleistungen, die von Faces Studio, vertreten durch Désirée Weisshaar, angeboten werden. Mit der Buchung einer Behandlung oder dem Kauf eines Produkts erkennst Du diese AGB an.'
              : 'These Terms & Conditions apply to all treatments, products, and services offered by Faces Studio, represented by Désirée Weisshaar. By booking a treatment or purchasing a product, you agree to these terms.'}
          </p>
        </Section>

        <Section titleDe="2. Buchungen & Termine" titleEn="2. Bookings & Appointments">
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>{isDe ? 'Termine können per E-Mail, Telefon oder über das Kontaktformular auf der Website vereinbart werden.' : 'Appointments can be scheduled by email, phone, or through the contact form on the website.'}</li>
            <li>{isDe ? 'Die Preise sind auf der Website angegeben und verstehen sich in Schweizer Franken (CHF), inklusive der gesetzlichen Mehrwertsteuer (sofern anwendbar).' : 'Prices are listed on the website in Swiss Francs (CHF), including applicable VAT.'}</li>
            <li>{isDe ? 'Eine Bestätigung des Termins erfolgt per E-Mail oder telefonisch.' : 'Appointment confirmation is provided by email or phone.'}</li>
          </ul>
        </Section>

        <Section titleDe="3. Stornierungsbedingungen" titleEn="3. Cancellation Policy">
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>{isDe ? 'Termine können bis 24 Stunden vor der Behandlung kostenlos storniert oder verschoben werden.' : 'Appointments can be cancelled or rescheduled free of charge up to 24 hours before the treatment.'}</li>
            <li>{isDe ? 'Bei Stornierungen innerhalb von 24 Stunden oder bei Nichterscheinen behalten wir uns vor, 50% des Behandlungspreises in Rechnung zu stellen.' : 'Cancellations within 24 hours or no-shows may be charged at 50% of the treatment price.'}</li>
            <li>{isDe ? 'Bei verspätetem Erscheinen kann die Behandlungszeit entsprechend verkürzt werden, der volle Preis bleibt bestehen.' : 'Late arrivals may result in a shortened treatment time; the full price remains applicable.'}</li>
          </ul>
        </Section>

        <Section titleDe="4. Zahlung" titleEn="4. Payment">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Zahlungen sind vor Ort nach der Behandlung fällig. Akzeptierte Zahlungsmethoden: TWINT, Bargeld (CHF). Kreditkarten werden derzeit nicht akzeptiert.'
              : 'Payment is due on-site after the treatment. Accepted payment methods: TWINT, Cash (CHF). Credit cards are currently not accepted.'}
          </p>
        </Section>

        <Section titleDe="5. Geschenkgutscheine" titleEn="5. Gift Vouchers">
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>{isDe ? 'Geschenkgutscheine sind im Studio oder auf Anfrage erhältlich.' : 'Gift vouchers are available at the studio or on request.'}</li>
            <li>{isDe ? 'Gutscheine sind übertragbar und 2 Jahre ab Ausstellungsdatum gültig.' : 'Vouchers are transferable and valid for 2 years from the date of issue.'}</li>
            <li>{isDe ? 'Eine Barauszahlung des Gutscheinwerts ist nicht möglich.' : 'Cash redemption of the voucher value is not possible.'}</li>
          </ul>
        </Section>

        <Section titleDe="6. Gesundheit & Kontraindikationen" titleEn="6. Health & Contraindications">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Bitte informiere uns vor der Behandlung über gesundheitliche Einschränkungen, Allergien, Hauterkrankungen oder Medikamenteneinnahmen. Bei bestimmten Kontraindikationen können Behandlungen abgelehnt oder angepasst werden, um Deine Sicherheit zu gewährleisten. Wir übernehmen keine Haftung für Versäumnisse, die aus unterlassener Information resultieren.'
              : 'Please inform us before the treatment of any health conditions, allergies, skin diseases, or medications. Certain contraindications may lead to refusal or modification of treatments to ensure your safety. We accept no liability for omissions resulting from failure to provide such information.'}
          </p>
        </Section>

        <Section titleDe="7. Haftung" titleEn="7. Liability">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Die Haftung von Faces Studio ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit gesetzlich zulässig. Für leichte Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten. Die Haftung für indirekte Schäden und entgangenen Gewinn ist ausgeschlossen.'
              : 'The liability of Faces Studio is limited to intent and gross negligence, as far as legally permissible. For slight negligence, we are liable only for breach of essential contractual obligations. Liability for indirect damages and lost profits is excluded.'}
          </p>
        </Section>

        <Section titleDe="8. Datenschutz" titleEn="8. Data Protection">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Informationen zum Datenschutz findest Du in unserer Datenschutzerklärung.'
              : 'For information on data protection, please refer to our Privacy Policy.'}
          </p>
        </Section>

        <Section titleDe="9. Anwendbares Recht & Gerichtsstand" titleEn="9. Governing Law & Jurisdiction">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Diese AGB unterliegen schweizerischem Recht. Gerichtsstand ist Zürich, Schweiz.'
              : 'These Terms & Conditions are governed by Swiss law. Place of jurisdiction is Zurich, Switzerland.'}
          </p>
        </Section>

        <Section titleDe="10. Salvatorische Klausel" titleEn="10. Severability">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt der Rest der Bedingungen davon unberührt.'
              : 'If any provision of these Terms & Conditions is invalid, the remaining provisions shall remain unaffected.'}
          </p>
        </Section>

        {/* Back link */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <a href="/#/" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: '32px', padding: '12px 28px', textDecoration: 'none', transition: 'all 0.3s', display: 'inline-block' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = '#1a1a1a'; el.style.color = '#f6f3ee' }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = 'transparent'; el.style.color = '#1a1a1a' }}>
            {isDe ? 'Zurück zur Startseite' : 'Back to Home'}
          </a>
        </div>
      </div>
    </div>
  )
}
