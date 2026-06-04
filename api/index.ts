import { Hono } from "hono";
import { Resend } from "resend";

const app = new Hono();

// Health check
app.get("/api/ping", (c) => c.json({ ok: true, ts: Date.now() }));

// Contact form
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  service: z.string().optional(),
  addons: z.array(z.string()).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().min(1),
});

app.post("/api/contact", async (c) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return c.json({ success: false, error: "Contact form not configured" }, 500);

    const body = await c.req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return c.json({ success: false, error: "Invalid input" }, 400);

    const { name, email, phone, service, addons, preferredDate, preferredTime, message } = parsed.data;
    const resend = new Resend(apiKey);

    const addonNames: Record<string, string> = {
      "lash-tint": "Wimpern färben (CHF 35.–)",
      "brow-tint": "Brauen färben (CHF 25.–)",
      "brow-shape": "Brauen zupfen (CHF 25.–)",
      "lip-wax": "Oberlippe wachsen (CHF 15.–)",
    };
    const addonsText = addons?.length
      ? addons.map((a) => addonNames[a] || a).join("\n  - ")
      : "None";

    const { data, error } = await resend.emails.send({
      from: "Faces Studio <noreply@faces-studio.ch>",
      to: ["hello@faces-studio.ch"],
      replyTo: email,
      subject: `Neue Terminanfrage von ${name}`,
      text: [
        `NEUE TERMINANFRAGE — FACES STUDIO`,
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone}`,
        `Service: ${service || "-"}`,
        `Add-ons: ${addonsText}`,
        `Wunschtermin: ${preferredDate || "-"} ${preferredTime || "-"}`,
        `Nachricht: ${message}`,
      ].join("\n"),
    });

    if (error) return c.json({ success: false, error: error.message }, 500);
    return c.json({ success: true, id: data?.id });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || "Internal error" }, 500);
  }
});

// 404
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// Vercel handler
export default async function handler(req: any, res: any) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v == null) continue;
    if (Array.isArray(v)) for (const x of v) headers.append(k, x);
    else if (typeof v === "string") headers.set(k, v);
    else headers.set(k, String(v));
  }
  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
    headers.set("content-type", "application/json");
    body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  }
  try {
    const response = await app.fetch(new Request(url, { method: req.method, headers, body }));
    res.statusCode = response.status;
    response.headers.forEach((v: string, k: string) => res.setHeader(k, v));
    res.end(await response.text());
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
}
