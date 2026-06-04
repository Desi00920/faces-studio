import { config } from "dotenv";
config();

import { createConnection } from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import { siteContent } from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const client = createConnection(DATABASE_URL);
const db = drizzle(client);

const INITIAL_CONTENT = [
  // ===== HERO =====
  { sectionKey: "hero", fieldKey: "title", valueDe: "FACES\nSTUDIO", valueEn: "FACES\nSTUDIO", orderNum: "01" },
  { sectionKey: "hero", fieldKey: "subtitle", valueDe: "Organic Facial Studio", valueEn: "Organic Facial Studio", orderNum: "02" },
  { sectionKey: "hero", fieldKey: "tagline", valueDe: "Natürliche Schönheit beginnt mit gesunder Haut.", valueEn: "Natural beauty begins with healthy skin.", orderNum: "03" },

  // ===== ABOUT =====
  { sectionKey: "about", fieldKey: "label", valueDe: "Über uns", valueEn: "About Us", orderNum: "01" },
  { sectionKey: "about", fieldKey: "heading", valueDe: "Wo Natur auf Wissenschaft trifft", valueEn: "Where Nature Meets Science", orderNum: "02" },
  { sectionKey: "about", fieldKey: "body_1", valueDe: "Faces Studio ist ein Ort der Ruhe und Regeneration im Herzen von Zürich. Wir kombinieren die Kraft der Natur mit modernsten Behandlungsmethoden, um Deine Haut in ihrem natürlichen Gleichgewicht zu unterstützen.", valueEn: "Faces Studio is a place of tranquility and regeneration in the heart of Zurich. We combine the power of nature with the most modern treatment methods to support your skin in its natural balance.", orderNum: "03" },
  { sectionKey: "about", fieldKey: "body_2", valueDe: "Jede Behandlung wird individuell auf Deine Hautbedürfnisse abgestimmt – denn Deine Haut ist einzigartig.", valueEn: "Every treatment is individually tailored to your skin's needs — because your skin is unique.", orderNum: "04" },
  { sectionKey: "about", fieldKey: "signature", valueDe: "— Désirée Weisshaar", valueEn: "— Désirée Weisshaar", orderNum: "05" },

  // ===== TREATMENTS - Bio Microneedling =====
  { sectionKey: "treatment_bio_needling", fieldKey: "title", valueDe: "Bio-Microneedling", valueEn: "Bio-Microneedling", orderNum: "01" },
  { sectionKey: "treatment_bio_needling", fieldKey: "subtitle", valueDe: "Die natürliche Hauterneuerung", valueEn: "Natural Skin Renewal", orderNum: "02" },
  { sectionKey: "treatment_bio_needling", fieldKey: "description", valueDe: "Eine schonende Behandlung mit natürlichen Mikronadeln aus pflanzlichen Sporen, die die Hautregeneration anregt und die Kollagenproduktion fördert. Ideal für feine Linien, Pigmentflecken und eine strahlendere Haut.", valueEn: "A gentle treatment with natural microneedles made from plant spores that stimulates skin regeneration and promotes collagen production. Ideal for fine lines, pigmentation spots, and a more radiant complexion.", orderNum: "03" },
  { sectionKey: "treatment_bio_needling", fieldKey: "price", valueDe: "CHF 180.–", valueEn: "CHF 180.–", orderNum: "04" },
  { sectionKey: "treatment_bio_needling", fieldKey: "duration", valueDe: "90 Min.", valueEn: "90 Min.", orderNum: "05" },
  { sectionKey: "treatment_bio_needling", fieldKey: "badge", valueDe: "Demnächst verfügbar", valueEn: "Coming soon", orderNum: "06" },

  // ===== TREATMENTS - Faces Signature Ritual =====
  { sectionKey: "treatment_signature", fieldKey: "title", valueDe: "Faces Signature Ritual", valueEn: "Faces Signature Ritual", orderNum: "01" },
  { sectionKey: "treatment_signature", fieldKey: "subtitle", valueDe: "Unsere Königsbehandlung", valueEn: "Our Signature Treatment", orderNum: "02" },
  { sectionKey: "treatment_signature", fieldKey: "description", valueDe: "Eine luxuriöse Kombination aus Tiefenreinigung, sanftem Peeling, intensiver Gesichtsmassage und einer nährenden Maske. Die Haut wird sichtbar revitalisiert und erhält ihren natürlichen Glow zurück.", valueEn: "A luxurious combination of deep cleansing, gentle peeling, intensive facial massage, and a nourishing mask. The skin is visibly revitalized and regains its natural glow.", orderNum: "03" },
  { sectionKey: "treatment_signature", fieldKey: "price", valueDe: "CHF 150.–", valueEn: "CHF 150.–", orderNum: "04" },
  { sectionKey: "treatment_signature", fieldKey: "duration", valueDe: "75 Min.", valueEn: "75 Min.", orderNum: "05" },

  // ===== TREATMENTS - Urban Reset =====
  { sectionKey: "treatment_urban", fieldKey: "title", valueDe: "Urban Reset", valueEn: "Urban Reset", orderNum: "01" },
  { sectionKey: "treatment_urban", fieldKey: "subtitle", valueDe: "Schutz für gestresste Stadt-Haut", valueEn: "Protection for Stressed City Skin", orderNum: "02" },
  { sectionKey: "treatment_urban", fieldKey: "description", valueDe: "Speziell entwickelt für Haut, die täglich Umwelteinflüssen ausgesetzt ist. Antioxidative Wirkstoffe neutralisieren freie Radikale und stärken die natürliche Hautbarriere.", valueEn: "Specially developed for skin exposed to environmental influences on a daily basis. Antioxidant active ingredients neutralize free radicals and strengthen the skin's natural barrier.", orderNum: "03" },
  { sectionKey: "treatment_urban", fieldKey: "price", valueDe: "CHF 130.–", valueEn: "CHF 130.–", orderNum: "04" },
  { sectionKey: "treatment_urban", fieldKey: "duration", valueDe: "60 Min.", valueEn: "60 Min.", orderNum: "05" },

  // ===== TREATMENTS - Hydra Renewal =====
  { sectionKey: "treatment_hydra", fieldKey: "title", valueDe: "The Hydra Renewal", valueEn: "The Hydra Renewal", orderNum: "01" },
  { sectionKey: "treatment_hydra", fieldKey: "subtitle", valueDe: "Intensive Feuchtigkeit", valueEn: "Intensive Hydration", orderNum: "02" },
  { sectionKey: "treatment_hydra", fieldKey: "description", valueDe: "Maximale Hydration für trockene, dehydrierte Haut. Hyaluronsäure und natürliche Feuchtigkeitskomplexe wirken bis in die tiefen Hautschichten und spenden langanhaltende Feuchtigkeit.", valueEn: "Maximum hydration for dry, dehydrated skin. Hyaluronic acid and natural moisture complexes work deep into the skin layers, providing long-lasting moisture.", orderNum: "03" },
  { sectionKey: "treatment_hydra", fieldKey: "price", valueDe: "CHF 140.–", valueEn: "CHF 140.–", orderNum: "04" },
  { sectionKey: "treatment_hydra", fieldKey: "duration", valueDe: "60 Min.", valueEn: "60 Min.", orderNum: "05" },

  // ===== TREATMENTS - Gentleman's Ritual =====
  { sectionKey: "treatment_gentleman", fieldKey: "title", valueDe: "Gentleman's Ritual", valueEn: "Gentleman's Ritual", orderNum: "01" },
  { sectionKey: "treatment_gentleman", fieldKey: "subtitle", valueDe: "Behandlung für Männer", valueEn: "Treatment for Men", orderNum: "02" },
  { sectionKey: "treatment_gentleman", fieldKey: "description", valueDe: "Eine gezielte Behandlung für männliche Haut: Tiefenreinigung, Rasurvorbereitung und Pflege. Die Haut wird beruhigt, irritierte Bereiche werden gemildert und das Hautbild wird spürbar verbessert.", valueEn: "A targeted treatment for male skin: deep cleansing, shave preparation, and care. The skin is soothed, irritated areas are calmed, and the complexion is noticeably improved.", orderNum: "03" },
  { sectionKey: "treatment_gentleman", fieldKey: "price", valueDe: "CHF 130.–", valueEn: "CHF 130.–", orderNum: "04" },
  { sectionKey: "treatment_gentleman", fieldKey: "duration", valueDe: "60 Min.", valueEn: "60 Min.", orderNum: "05" },

  // ===== TREATMENTS - Clear Skin Therapy =====
  { sectionKey: "treatment_clear", fieldKey: "title", valueDe: "Clear Skin Therapy", valueEn: "Clear Skin Therapy", orderNum: "01" },
  { sectionKey: "treatment_clear", fieldKey: "subtitle", valueDe: "Für unreine Haut", valueEn: "For Impure Skin", orderNum: "02" },
  { sectionKey: "treatment_clear", fieldKey: "description", valueDe: "Eine sanfte, aber effektive Behandlung bei Unreinheiten und Akne. Natürliche antibakterielle Wirkstoffe klären die Haut, regulieren die Talgproduktion und beruhigen Entzündungen.", valueEn: "A gentle but effective treatment for impurities and acne. Natural antibacterial ingredients clarify the skin, regulate sebum production, and soothe inflammation.", orderNum: "03" },
  { sectionKey: "treatment_clear", fieldKey: "price", valueDe: "CHF 120.–", valueEn: "CHF 120.–", orderNum: "04" },
  { sectionKey: "treatment_clear", fieldKey: "duration", valueDe: "60 Min.", valueEn: "60 Min.", orderNum: "05" },

  // ===== TREATMENTS - Lash Lift =====
  { sectionKey: "treatment_lash", fieldKey: "title", valueDe: "Lash Lift", valueEn: "Lash Lift", orderNum: "01" },
  { sectionKey: "treatment_lash", fieldKey: "subtitle", valueDe: "Wimpernlifting", valueEn: "Eyelash Lifting", orderNum: "02" },
  { sectionKey: "treatment_lash", fieldKey: "description", valueDe: "Ein natürliches Wimpernlifting für einen offenen, wachen Blick. Deine eigenen Wimpern werden geschwungen und verleihen den Augen mehr Ausdruck – ganz ohne künstliche Wimpern.", valueEn: "A natural eyelash lift for an open, awake look. Your own lashes are curled to give your eyes more expression — completely without artificial lashes.", orderNum: "03" },
  { sectionKey: "treatment_lash", fieldKey: "price", valueDe: "CHF 85.–", valueEn: "CHF 85.–", orderNum: "04" },
  { sectionKey: "treatment_lash", fieldKey: "duration", valueDe: "45 Min.", valueEn: "45 Min.", orderNum: "05" },

  // ===== ADD-ONS =====
  { sectionKey: "addons", fieldKey: "title", valueDe: "Add-ons", valueEn: "Add-ons", orderNum: "01" },
  { sectionKey: "addons", fieldKey: "lash_tint", valueDe: "Wimpern färben (CHF 35.–)", valueEn: "Eyelash tinting (CHF 35.–)", orderNum: "02" },
  { sectionKey: "addons", fieldKey: "brow_tint", valueDe: "Brauen färben (CHF 25.–)", valueEn: "Eyebrow tinting (CHF 25.–)", orderNum: "03" },
  { sectionKey: "addons", fieldKey: "brow_shape", valueDe: "Brauen zupfen (CHF 25.–)", valueEn: "Eyebrow shaping (CHF 25.–)", orderNum: "04" },
  { sectionKey: "addons", fieldKey: "lip_wax", valueDe: "Oberlippe wachsen (CHF 15.–)", valueEn: "Upper lip waxing (CHF 15.–)", orderNum: "05" },

  // ===== GUTSCHEINE =====
  { sectionKey: "gutscheine", fieldKey: "label", valueDe: "Geschenkgutscheine", valueEn: "Gift Vouchers", orderNum: "01" },
  { sectionKey: "gutscheine", fieldKey: "heading", valueDe: "Das schönste Geschenk: Zeit für sich selbst.", valueEn: "The Most Beautiful Gift: Time for Yourself.", orderNum: "02" },
  { sectionKey: "gutscheine", fieldKey: "body", valueDe: "Unsere Gutscheine sind das perfekte Geschenk für Geburtstagsüberraschungen, Muttertag, Weihnachten oder einfach als Dankeschön – für jede Person, die Entspannung und Naturkosmetik schätzt.", valueEn: "Our vouchers are the perfect gift for birthday surprises, Mother's Day, Christmas, or simply as a thank you — for anyone who appreciates relaxation and natural cosmetics.", orderNum: "03" },
  { sectionKey: "gutscheine", fieldKey: "note", valueDe: "Gutscheine sind in jedem Wert erhältlich und können persönlich im Studio oder auf Anfrage erworben werden.", valueEn: "Vouchers are available in any amount and can be purchased in person at the studio or on request.", orderNum: "04" },
  { sectionKey: "gutscheine", fieldKey: "cta", valueDe: "Gutschein anfragen", valueEn: "Request Voucher", orderNum: "05" },
  { sectionKey: "gutscheine", fieldKey: "image_credit", valueDe: "Foto: Seyene Otu / Unsplash", valueEn: "Photo: Seyene Otu / Unsplash", orderNum: "06" },

  // ===== CONTACT =====
  { sectionKey: "contact", fieldKey: "label", valueDe: "Kontakt", valueEn: "Get In Touch", orderNum: "01" },
  { sectionKey: "contact", fieldKey: "heading", valueDe: "Buche Dein Ritual", valueEn: "Book Your Ritual", orderNum: "02" },
  { sectionKey: "contact", fieldKey: "body", valueDe: "Lust auf eine Auszeit? Buche Deine Behandlung und lass Dich von der Naturkosmetik verwöhnen.", valueEn: "Fancy a break? Book your treatment and let natural cosmetics pamper you.", orderNum: "03" },
  { sectionKey: "contact", fieldKey: "slogan", valueDe: "Come find us, step inside", valueEn: "Come find us, step inside", orderNum: "04" },
  { sectionKey: "contact", fieldKey: "address", valueDe: "Faces Studio\n1. Stock\nReinhardstrasse 12\n8008 Zürich", valueEn: "Faces Studio\n1st Floor\nReinhardstrasse 12\n8008 Zurich", orderNum: "05" },
  { sectionKey: "contact", fieldKey: "booking_note", valueDe: "Bitte beachte: Termine über das Kontaktformular müssen mindestens 24 Stunden im Voraus angefragt werden. Für kurzfristige Buchungen kontaktiere uns direkt per Telefon oder WhatsApp.", valueEn: "Please note: Appointments requested through this form must be made at least 24 hours in advance. For last-minute bookings, please contact us directly by phone or WhatsApp.", orderNum: "06" },

  // ===== FOOTER =====
  { sectionKey: "footer", fieldKey: "tagline", valueDe: "FACES STUDIO — Organic Facial Studio Zürich", valueEn: "FACES STUDIO — Organic Facial Studio Zurich", orderNum: "01" },
];

async function seed() {
  console.log("Seeding FACES STUDIO content...");

  for (const item of INITIAL_CONTENT) {
    await db.insert(siteContent).values({
      sectionKey: item.sectionKey,
      fieldKey: item.fieldKey,
      valueDe: item.valueDe,
      valueEn: item.valueEn,
      orderNum: item.orderNum,
    });
  }

  console.log(`Inserted ${INITIAL_CONTENT.length} content entries.`);
  console.log("Done!");
  client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  client.end();
  process.exit(1);
});
