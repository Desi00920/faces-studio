import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "missing");

export const contactRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().min(1, "Phone number is required"),
        service: z.string().optional(),
        addons: z.array(z.string()).optional(),
        preferredDate: z.string().optional(),
        preferredTime: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!process.env.RESEND_API_KEY) {
          return { success: false, error: "Contact form not configured — missing API key" };
        }
      const { name, email, phone, service, addons, preferredDate, preferredTime, message } = input;

      const addonNames: Record<string, string> = {
        "lash-tint": "Wimpern färben (CHF 35.\u2013)",
        "brow-tint": "Brauen färben (CHF 25.\u2013)",
        "brow-shape": "Brauen zupfen (CHF 25.\u2013)",
        "lip-wax": "Oberlippe wachsen (CHF 15.\u2013)",
      };

      const addonsText = addons && addons.length > 0
        ? addons.map((a) => addonNames[a] || a).join("\n  - ")
        : "None";

      const { data, error } = await resend.emails.send({
        from: "Faces Studio <noreply@faces-studio.ch>",
        to: ["hello@faces-studio.ch"],
        replyTo: email,
        subject: `\ud83d\udcde Neue Terminanfrage von ${name}`,
        text: `
================================================
NEUE TERMINANFRAGE — FACES STUDIO
================================================

KUNDENDATEN
------------
Name:  ${name}
E-Mail: ${email}
Telefon: ${phone || "Nicht angegeben"}

BEHANDLUNG
-----------
Service: ${service || "Nicht angegeben"}

Add-ons:
  - ${addonsText}

WUNSCHTERMIN (VORANFRAGE — UNVERBINDLICH)
--------------------------------------------
Datum: ${preferredDate || "Nicht angegeben"}
Uhrzeit: ${preferredTime || "Nicht angegeben"}

⚠️  Dies ist eine unverbindliche Voranfrage.
     Bitte prüfe die Verfügbarkeit und bestätige
     den Termin per E-Mail an ${email}

NACHRICHT
----------
${message}

================================================
Gesendet am: ${new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' })}
Faces Studio — Reinhardstrasse 12, 8008 Zürich
================================================
`,
      });

      if (error) {
        console.error("[Contact] Resend error:", error);
        throw new Error("Failed to send email: " + error.message);
      }

      console.log("[Contact] Email sent:", data?.id);
      return { success: true, id: data?.id };
      } catch (err: any) {
        console.error("[Contact] Mutation error:", err.message);
        throw new Error(err.message || "Failed to send inquiry");
      }
    }),
});
