import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

interface TreatmentData {
  id: string
  image: string
  comingSoon?: boolean
  durationDe: string
  durationEn: string
  price: string
  titleDe: string
  titleEn: string
  subtitleDe: string
  subtitleEn: string
  descDe: string
  descEn: string
  bulletsDe: string[]
  bulletsEn: string[]
  noteDe?: string
  noteEn?: string
  specialDe?: string
  specialEn?: string
}

const TREATMENTS: TreatmentData[] = [
  {
    id: 'bio-microneedling',
    image: '/images/bio-microneedling.jpg',
    comingSoon: false,
    durationDe: '60 Minuten',
    durationEn: '60 Minutes',
    price: 'CHF 205.–',
    titleDe: 'Bio-Microneedling',
    titleEn: 'Bio-Microneedling',
    subtitleDe: 'Die natürliche Revolution der Hauterneuerung',
    subtitleEn: 'The Natural Revolution in Skin Renewal',
    descDe: 'Du wünschst Dir ein verfeinertes, strahlendes Hautbild – ganz ohne Metallnadeln oder Säuren? Unser Bio-Microneedling nutzt die Kraft der Natur, um den Erneuerungsprozess Deiner Haut von 28 Tagen auf nur ca. 7 Tage zu verkürzen. Mikroskopisch kleine Bio-Nadeln aus dem Süßwasserschwamm (Spongilla Spicules) stimulieren die Haut sanft, kurbeln die Kollagenbildung massiv an und bringen Deine frische, gesunde Haut an die Oberfläche.',
    descEn: "Want refined, radiant skin — without metal needles or harsh acids? Our Bio-Microneedling harnesses nature's power to shortcut your skin's renewal cycle from 28 days to just 7. Microscopic bio-needles from freshwater sponges (Spongilla Spicules) gently stimulate your skin, massively boost collagen production, and bring fresh, healthy cells to the surface. It's like hitting the reset button on your complexion.",
    bulletsDe: [
      'Sofort-Glow: Fahle Haut wirkt sofort frischer und vitaler',
      'Anti-Aging: Glättet Fältchen und strafft die Haut (Kollagen-Booster)',
      'Ebenmäßiger Teint: Mindert Pigmentflecken, Pickelmale und Aknenarben',
      'Porenverfeinerung: Reguliert die Talgproduktion und verfeinert das Hautbild',
    ],
    bulletsEn: [
      'Instant Glow: Dull skin looks fresher and more vital immediately',
      'Anti-Aging Power: Smooths fine lines and firms skin (natural collagen boost)',
      'Even Tone: Reduces pigmentation spots, acne marks, and scars',
      'Pore Refinement: Regulates sebum and visibly shrinks pores',
    ],
    noteDe: 'Für: Reife & regenerationsbedürftige Haut, unreine Haut & Mischhaut, großporige Haut, Haut mit Pickelmalen oder Pigmentverschiebungen. Ein leichtes Prickeln nach der Behandlung ist normal – das zeigt, dass die Bio-Nadeln arbeiten.',
    noteEn: 'Best for: Mature skin needing regeneration, blemished & combination skin, large pores, acne marks, and pigmentation issues. A slight tingling sensation after treatment is normal — it means the bio-needles are actively working.',
  },
  {
    id: 'faces-signature',
    image: '/images/decobild.jpg',
    durationDe: '90 Minuten',
    durationEn: '90 Minutes',
    price: 'CHF 185.–',
    titleDe: 'Faces Signature Ritual',
    titleEn: 'Faces Signature Ritual',
    subtitleDe: 'Das vollständige Verwöhnprogramm für Körper & Seele',
    subtitleEn: 'The Ultimate Indulgence for Body & Soul',
    descDe: 'Das Faces Studio Ritual vereint effektive Hautpflege mit tiefer Entspannung. Nach Reinigung, Peeling und Ausreinigung wird ein hochwirksames Feuchtigkeitsserum mittels Gua-Sha-Massage intensiv in Haut und Dekolleté eingearbeitet. Eine Anti-Aging-Maske, entspannende Handmassage und Abschlusspflege sorgen für ein sichtbar frisches, pralles und strahlendes Hautbild.',
    descEn: "The FACES STUDIO ritual combines effective skincare with deep relaxation. After cleansing, exfoliation, and gentle extraction, a powerful hydrating serum is worked deep into your skin and décolleté using Gua Sha massage. An anti-aging mask, soothing hand massage, and finishing care leave you with visibly fresh, plump, and radiant skin. This is our signature — the treatment that defines everything we stand for.",
    bulletsDe: [
      'Tiefenreinigung, Peeling & sanfte Ausreinigung',
      'Gua-Sha-Massage mit Feuchtigkeitsserum',
      'Intensive Anti-Aging-Maske',
      'Wohltuende Handmassage',
      'Abschlusspflege',
    ],
    bulletsEn: [
      'Deep cleansing, exfoliation & gentle extraction',
      'Gua Sha massage with hydrating serum',
      'Intensive anti-aging mask',
      'Soothing hand massage',
      'Finishing care',
    ],
  },
  {
    id: 'urban-reset',
    image: '/images/urbanreset.jpg',
    durationDe: '50 Minuten',
    durationEn: '50 Minutes',
    price: 'CHF 145.–',
    titleDe: 'Urban Reset',
    titleEn: 'Urban Reset',
    subtitleDe: 'Kurz & Wirksam – für alle, die wenig Zeit, aber grosse Wirkung wollen',
    subtitleEn: 'Short & Powerful — Maximum Results, Minimum Time',
    descDe: 'Mitten im Zürich-Trubel kurz abschalten und die Haut neu starten. Diese kompakte Behandlung kombiniert eine porentiefe Reinigung, ein sanftes Peeling und ein tief einziehendes Feuchtigkeitsserum. Feuchtigkeitsmaske und abschliessende Pflege sorgen für ein frisches, gepflegtes Finish – perfekt als Mittagspausen-Ritual oder kurze Auszeit.',
    descEn: "Step away from the Zurich hustle and give your skin a fresh start. This compact treatment combines deep pore cleansing, gentle exfoliation, and a deeply absorbed hydrating serum. A moisture mask and finishing care deliver a fresh, polished look — perfect as a lunch-break ritual or a brief escape from the city buzz. Sometimes the best skincare is the kind that fits into your real life.",
    bulletsDe: [
      'Porentiefe Reinigung & sanftes Peeling',
      'Feuchtigkeitsserum per Klopftechnik eingearbeitet',
      'Intensiv-Feuchtigkeitsmaske',
      'Sofortergebnis: frisch & gepflegt',
    ],
    bulletsEn: [
      'Deep pore cleansing & gentle exfoliation',
      'Hydrating serum worked in with tapping technique',
      'Intensive moisture mask',
      'Instant results: fresh & polished',
    ],
  },
  {
    id: 'hydra-glow',
    image: '/images/citrus-awakening.jpg',
    durationDe: '90 Minuten',
    durationEn: '90 Minutes',
    price: 'CHF 195.–',
    titleDe: 'The Hydra Renewal',
    titleEn: 'The Hydra Renewal',
    subtitleDe: 'Für zeitlose Ausstrahlung & sichtbar gestraffte Haut',
    subtitleEn: 'Timeless Radiance & Visibly Lifted Skin',
    specialDe: 'Spezial: hochwertige Alginat Maske',
    specialEn: 'Spezial: hochwertige Alginat Maske',
    descDe: 'Diese revitalisierende Premium-Behandlung ist auf Kollagenstimulation, Lifting und tiefen Glow ausgerichtet – ganz ohne invasive Eingriffe. Nach Reinigung und Peeling wird ein hochwirksames Serum via Gua-Sha-Massage in Gesicht und Dekolleté eingearbeitet. Eine reichhaltige Anti-Aging-Maske und entspannende Kopfmassage runden das Erlebnis ab. Abschlusspflege.',
    descEn: "This revitalizing premium treatment is all about collagen stimulation, lifting, and deep hydration glow — completely non-invasive. After cleansing and exfoliation, a potent serum is massaged into your face and décolleté using Gua Sha technique. A rich anti-aging mask and relaxing scalp massage complete the experience. Finishing care. Think of it as a gym session for your face — toned, lifted, and absolutely glowing.",
    bulletsDe: [
      'Reinigung & Peeling',
      'Gua-Sha-Lifting: Gesicht & Dekolleté',
      'Hochwirksames Anti-Aging-Serum',
      'Intensive regenerierende Maske',
      'Kopfmassage & abschliessende Straffungspflege',
    ],
    bulletsEn: [
      'Cleansing & exfoliation',
      'Gua Sha lifting: face & décolleté',
      'High-performance anti-aging serum',
      'Intensive regenerating mask',
      'Scalp massage & firming finish',
    ],
  },
  {
    id: 'gentlemans-ritual',
    image: '/images/maennerhaut.jpg',
    durationDe: '80 Minuten',
    durationEn: '80 Minutes',
    price: 'CHF 185.–',
    titleDe: "Gentleman's Ritual",
    titleEn: "Gentleman's Ritual",
    subtitleDe: 'Unkomplizierte Pflege für einen guten, wohltuenden Moment',
    subtitleEn: 'Straightforward Care for a Feel-Good Moment',
    descDe: 'Effektive Hautpflege ohne Schnickschnack – und trotzdem ein echtes Wohlgefühl. Nach Reinigung, Peeling und Ausreinigung folgen eine entspannende Nacken-Gesichtsmassage, hochwirksames Serum, eine angenehme Gesichtsmaske und eine wohltuende Kopfmassage. Abschlusspflege. Mission: completed.',
    descEn: "Effective skincare without the fuss — but still a real feel-good experience. After cleansing, exfoliation, and extraction, you'll enjoy a relaxing neck and face massage, potent serum, a pleasant face mask, and a soothing scalp massage. Finishing care. Mission: completed.",
    bulletsDe: [
      'Gründliche Reinigung, Peeling & Ausreinigung',
      'Nacken- & Gesichtsmassage',
      'Feuchtigkeits- / Klärungsmaske',
      'Entspannende Kopfmassage',
      'Abschlusspflege',
    ],
    bulletsEn: [
      'Thorough cleansing, exfoliation & extraction',
      'Neck & face massage',
      'Hydrating / clarifying mask',
      'Relaxing scalp massage',
      'Finishing care',
    ],
  },
  {
    id: 'clear-skin',
    image: '/images/clear-skin.jpg',
    durationDe: '60 Minuten',
    durationEn: '60 Minutes',
    price: 'CHF 155.–',
    titleDe: 'Clear Skin Therapy',
    titleEn: 'Clear Skin Therapy',
    subtitleDe: 'Für reine, beruhigte Haut – ohne Kompromisse',
    subtitleEn: 'Clear, Calm Skin — No Compromises',
    descDe: 'Gezielt gegen Unreinheiten, Rötungen und gestresste Haut. Mittels Cupping werden Unreinheiten schonend an die Oberfläche gebracht. Ein klärendes Serum beruhigt, während eine Heilerde-Maske mit Aloe Vera tief reinigt und Feuchtigkeit spendet. Abgerundet durch eine entspannende Handmassage. Abschlusspflege.',
    descEn: "Targeted treatment for blemishes, redness, and stressed skin. Using cupping therapy, impurities are gently brought to the surface. A clarifying serum soothes inflammation while a healing clay mask with aloe vera deep-cleanses and hydrates. Rounded off with a relaxing hand massage. Finishing care. If your skin feels like it's been through a war, this is the peace treaty it deserves.",
    bulletsDe: [
      'Peeling & sanfte Ausreinigung',
      'Cupping zur Tiefenreinigung der Poren',
      'Klärendes Serum – reduziert Rötungen',
      'Heilerde-Maske mit Aloe Vera',
      'Gegen unreine Haut',
    ],
    bulletsEn: [
      'Exfoliation & gentle extraction',
      'Cupping for deep pore cleansing',
      'Clarifying serum — reduces redness',
      'Healing clay mask with aloe vera',
      'For blemished skin',
    ],
  },
  {
    id: 'lash-lift',
    image: '/images/lashlift.jpg',
    durationDe: '60 Minuten',
    durationEn: '60 Minutes',
    price: 'CHF 115.–',
    titleDe: 'Lash Lift',
    titleEn: 'Lash Lift',
    subtitleDe: 'Natürliches Wimpern-Lifting inkl. Wimpernfärbung',
    subtitleEn: 'Natural Eyelash Lifting incl. Tinting',
    descDe: 'Grosse Augen, natürlicher Look – ohne tägliches Nachhelfen. Das Lash Lift verleiht Deinen Wimpern einen natürlichen Schwung und öffnet den Blick. Die anschliessende Färbung in intensivem Schwarz macht das Ergebnis komplett. Hält bis zu 7 Wochen.',
    descEn: "Big eyes, natural look — zero daily effort required. Our Lash Lift gives your natural lashes a beautiful curl that opens up your entire eye area. The follow-up tinting in rich black completes the look. Results last up to 7 weeks. Imagine waking up every morning with perfectly lifted, dark lashes — no mascara, no curler, no hassle.",
    bulletsDe: [
      'Natürlich geschwungene Wimpern ohne Extensions',
      'Inkl. Wimpernfärbung in intensivem Schwarz',
      'Hält bis zu 7 Wochen',
    ],
    bulletsEn: [
      'Naturally curled lashes — no extensions needed',
      'Includes lash tinting in rich black',
      'Lasts up to 7 weeks',
    ],
  },
]

function TreatmentCard({ t, index }: { t: TreatmentData; index: number }) {
  const { lang } = useLang()
  const cardRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'
  const isDark = index % 2 === 0

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 60, opacity: 0, duration: 0.8, delay: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, [])

  const bgColor = isDark ? '#1a1a1a' : '#f6f3ee'
  const textColor = isDark ? '#f6f3ee' : '#1a1a1a'
  const mutedColor = isDark ? 'rgba(246, 243, 238, 0.65)' : '#8c8c8c'
  const noteBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffb8b8'

  return (
    <div id={t.id} ref={cardRef} style={{ backgroundColor: bgColor }}>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '1280px', margin: '0 auto' }}
        className="lg:!grid-cols-2"
      >
        <div
          style={{ minHeight: '350px', maxHeight: '550px', overflow: 'hidden', order: 1 }}
          className={`lg:!order-${index % 2 === 0 ? '1' : '2'}`}
        >
          <img
            src={t.image}
            alt={isDe ? t.titleDe : t.titleEn}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div
          style={{ order: 2, padding: '50px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          className={`lg:!order-${index % 2 === 0 ? '2' : '1'} lg:!px-[50px]`}
        >
          {t.comingSoon && (
            <span style={{
              display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f6f3ee', backgroundColor: '#ff5757',
              padding: '6px 14px', borderRadius: '20px', marginBottom: '14px', width: 'fit-content',
            }}>
              Coming Soon
            </span>
          )}

          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '10px' }}>
            {isDe ? t.durationDe : t.durationEn} · {t.price}
          </span>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 400, color: textColor, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
            {isDe ? t.titleDe : t.titleEn}
          </h3>

          <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 400, fontStyle: 'italic', color: mutedColor, margin: '0 0 20px' }}>
            {isDe ? t.subtitleDe : t.subtitleEn}
          </p>

          {(t.specialDe || t.specialEn) && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#000000',
              margin: '0 0 20px',
              letterSpacing: '0.01em',
            }}>
              {isDe ? t.specialDe : t.specialEn}
            </p>
          )}

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 400, color: textColor, lineHeight: 1.65, margin: '0 0 18px' }}>
            {isDe ? t.descDe : t.descEn}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
            {(isDe ? t.bulletsDe : t.bulletsEn).map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '14px', color: textColor, marginBottom: '7px', lineHeight: 1.5 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ff5757', flexShrink: 0, marginTop: '7px' }} />
                {b}
              </li>
            ))}
          </ul>

          {t.noteDe && (
            <div style={{ backgroundColor: noteBg, borderRadius: '8px', padding: '14px 18px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: mutedColor, lineHeight: 1.6, margin: 0 }}>
                {isDe ? t.noteDe : t.noteEn}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Treatments() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isDe = lang === 'de'

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
  }, [])

  return (
    <section id="treatments" ref={sectionRef} style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ backgroundColor: '#f6f3ee', padding: '120px 40px 40px', textAlign: 'center' }}>
        <div ref={headingRef} style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff5757', marginBottom: '16px' }}>
            {isDe ? 'Deine Behandlungen' : 'Your Treatments'}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            {isDe ? 'Rituale für strahlende Haut' : 'Rituals for Radiant Skin'}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8c8c8c', lineHeight: 1.65, margin: '0 0 8px' }}>
            {isDe
              ? '✦ Vor jeder Behandlung: kurzes Hautgespräch bei einem Getränk, damit wir optimal auf Deinen aktuellen Hautzustand und Deine Wünsche eingehen können.'
              : '✦ Before every treatment: a brief skin consultation over a drink, so we can perfectly tailor the session to your current skin condition and wishes.'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8c8c8c', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
            {isDe
              ? '✦ Bevor Dein Ritual beginnt, wählst Du einen Duft, der Dich begleitet – ein sanfter Einstieg, der Dich auf die Reise einstimmt, die Du gerade brauchst.'
              : '✦ Before your ritual begins, you choose a scent to accompany you — a gentle entry that prepares you for the journey you need right now.'}
          </p>
        </div>
      </div>

      <TreatmentCard t={TREATMENTS[0]} index={0} />

      <div style={{ backgroundColor: '#f6f3ee', padding: '60px 40px 20px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.15em', color: '#ff5757',
          border: '1px solid #ff5757', borderRadius: '24px', padding: '10px 28px',
        }}>
          {isDe ? 'Verfügbare Behandlungen' : 'Available Treatments'}
        </span>
      </div>

      {TREATMENTS.slice(1).map((t, i) => (
        <TreatmentCard key={t.id} t={t} index={i + 1} />
      ))}
    </section>
  )
}
