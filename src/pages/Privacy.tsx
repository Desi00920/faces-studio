import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function Privacy() {
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
          {isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 16px' }}>
          {isDe ? 'Datenschutz' : 'Privacy'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8c8c8c', margin: '0 0 40px' }}>
          {isDe ? 'Stand: Juni 2025' : 'Last updated: June 2025'}
        </p>

        <Section titleDe="1. Verantwortliche Stelle" titleEn="1. Data Controller">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Verantwortlich für die Datenverarbeitung auf dieser Website ist Désirée Weisshaar, Faces Studio, Reinhardstrasse 12, 8008 Zürich, Schweiz. Kontakt: hello@faces-studio.ch'
              : 'The data controller for this website is Désirée Weisshaar, Faces Studio, Reinhardstrasse 12, 8008 Zurich, Switzerland. Contact: hello@faces-studio.ch'}
          </p>
        </Section>

        <Section titleDe="2. Welche Daten wir erfassen" titleEn="2. What Data We Collect">
          <p style={{ margin: '0 0 8px' }}>
            {isDe
              ? 'Wenn Du das Kontaktformular auf unserer Website nutzt, erfassen wir folgende personenbezogene Daten:'
              : 'When you use the contact form on our website, we collect the following personal data:'}
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>{isDe ? 'Name' : 'Name'}</li>
            <li>{isDe ? 'E-Mail-Adresse' : 'Email address'}</li>
            <li>{isDe ? 'Telefonnummer (optional)' : 'Phone number (optional)'}</li>
            <li>{isDe ? 'Behandlungsinteresse / Service (optional)' : 'Service interest (optional)'}</li>
            <li>{isDe ? 'Deine Nachricht' : 'Your message'}</li>
          </ul>
        </Section>

        <Section titleDe="3. Zweck der Datenverarbeitung" titleEn="3. Purpose of Data Processing">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Deine Daten werden ausschliesslich verwendet, um auf Deine Anfrage zu antworten und Dir einen Termin für eine Behandlung anzubieten. Es erfolgt keine Weitergabe Deiner Daten an Dritte zu Marketingzwecken.'
              : 'Your data is used solely to respond to your inquiry and offer you a treatment appointment. We do not share your data with third parties for marketing purposes.'}
          </p>
        </Section>

        <Section titleDe="4. E-Mail-Versand über Resend" titleEn="4. Email Delivery via Resend">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Die über das Kontaktformular übermittelten Daten werden per E-Mail über Resend (resend.com) an hello@faces-studio.ch gesendet. Resend ist ein E-Mail-Dienst mit Sitz in den USA. Die Datenübertragung erfolgt verschlüsselt (TLS). Resend verarbeitet die Daten gemäss den DSGVO-Standardvertragsklauseln (SCC).'
              : 'Data submitted through the contact form is sent via email using Resend (resend.com) to hello@faces-studio.ch. Resend is an email service based in the USA. Data transmission is encrypted (TLS). Resend processes data in accordance with GDPR Standard Contractual Clauses (SCC).'}
          </p>
        </Section>

        <Section titleDe="5. Hosting" titleEn="5. Hosting">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Diese Website wird über einen Hosting-Dienst in der Schweiz bereitgestellt. Die Serverstandorte befinden sich innerhalb der Europäischen Wirtschaftsraum (EWR) bzw. der Schweiz.'
              : 'This website is provided through a hosting service in Switzerland. Server locations are within the European Economic Area (EEA) and Switzerland.'}
          </p>
        </Section>

        <Section titleDe="6. Google Analytics" titleEn="6. Google Analytics">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Diese Website verwendet Google Analytics (GA4), um anonymisierte Informationen über die Nutzung der Website zu erfassen. Google Analytics verwendet Cookies. Die IP-Anonymisierung ist aktiviert. Du kannst die Verwendung von Cookies in Deinen Browsereinstellungen deaktivieren. Weitere Informationen: Google Analytics Datenschutzerklärung.'
              : 'This website uses Google Analytics (GA4) to collect anonymized information about website usage. Google Analytics uses cookies. IP anonymization is enabled. You can disable cookies in your browser settings. For more information: Google Analytics Privacy Policy.'}
          </p>
        </Section>

        <Section titleDe="7. Aufbewahrungsdauer" titleEn="7. Data Retention">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Deine personenbezogenen Daten werden so lange aufbewahrt, wie es für die Bearbeitung Deiner Anfrage erforderlich ist, maximal 12 Monate. Nach Ablauf dieser Frist werden die Daten gelöscht.'
              : 'Your personal data is retained only as long as necessary to process your inquiry, for a maximum of 12 months. After this period, the data is deleted.'}
          </p>
        </Section>

        <Section titleDe="8. Deine Rechte" titleEn="8. Your Rights">
          <p style={{ margin: '0 0 8px' }}>
            {isDe
              ? 'Du hast das Recht auf:'
              : 'You have the right to:'}
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>{isDe ? 'Auskunft über Deine gespeicherten Daten' : 'Access to your stored data'}</li>
            <li>{isDe ? 'Berichtigung unrichtiger Daten' : 'Rectification of inaccurate data'}</li>
            <li>{isDe ? 'Löschung Deiner Daten' : 'Erasure of your data'}</li>
            <li>{isDe ? 'Einschränkung der Verarbeitung' : 'Restriction of processing'}</li>
            <li>{isDe ? 'Widerspruch gegen die Verarbeitung' : 'Objection to processing'}</li>
            <li>{isDe ? 'Datenübertragbarkeit' : 'Data portability'}</li>
          </ul>
          <p style={{ margin: '12px 0 0' }}>
            {isDe
              ? 'Um Deine Rechte auszuüben, sende eine E-Mail an hello@faces-studio.ch. Wir werden Deine Anfrage innerhalb von 30 Tagen bearbeiten.'
              : 'To exercise your rights, send an email to hello@faces-studio.ch. We will process your request within 30 days.'}
          </p>
        </Section>

        <Section titleDe="9. Cookies" titleEn="9. Cookies">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Diese Website verwendet ausschliesslich funktionale Cookies, die für den Betrieb der Website erforderlich sind. Für Google Analytics-Cookies wird Deine Zustimmung eingeholt (Consent-Banner).'
              : 'This website uses only functional cookies necessary for the operation of the website. For Google Analytics cookies, your consent is obtained (consent banner).'}
          </p>
        </Section>

        <Section titleDe="10. Änderungen" titleEn="10. Changes">
          <p style={{ margin: 0 }}>
            {isDe
              ? 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist immer auf dieser Seite verfügbar.'
              : 'We reserve the right to update this privacy policy as needed. The current version is always available on this page.'}
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
