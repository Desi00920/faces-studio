import { Hono } from "hono";

const app = new Hono();

// Health check
app.get("/api/ping", (c) => c.json({ ok: true, ts: Date.now() }));

// Diagnostic — confirms env var status without sending email
// Lists all env vars whose names contain RESEND, DATABASE, or KEY
// to help debug env var issues.
app.get("/api/diag", (c) => {
  const allEnv = process.env;
  const matchingKeys: Record<string, { set: boolean; prefix: string; length: number }> = {};
  for (const [k, v] of Object.entries(allEnv)) {
    const upper = k.toUpperCase();
    if (upper.includes("RESEND") || upper.includes("DATABASE") || upper.includes("DB_URL")) {
      const val = v || "";
      matchingKeys[k] = {
        set: !!val,
        prefix: val ? val.slice(0, 8) : "",
        length: val.length,
      };
    }
  }
  return c.json({
    resend_api_key_set: !!process.env.RESEND_API_KEY,
    resend_api_key_prefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 6) : null,
    resend_api_key_length: (process.env.RESEND_API_KEY || "").length,
    database_url_set: !!process.env.DATABASE_URL,
    database_url_prefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.slice(0, 12) : null,
    node_env: process.env.NODE_ENV || "unknown",
    vercel_env: process.env.VERCEL_ENV || "unknown",
    vercel_region: process.env.VERCEL_REGION || "unknown",
    vercel_git_commit_sha: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
    matching_env_vars: matchingKeys,
    timestamp: new Date().toISOString(),
  });
});



// Contact form
import { z } from "zod";
import { Resend } from "resend";

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
    const body = await c.req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return c.json({ success: false, error: "Invalid input" }, 400);

    const { name, email, phone, service, addons, preferredDate, preferredTime, message } = parsed.data;

    const addonNames: Record<string, string> = {
      "lash-tint": "Wimpern färben (CHF 35.–)",
      "brow-tint": "Brauen färben (CHF 25.–)",
      "brow-shape": "Brauen zupfen (CHF 25.–)",
      "lip-wax": "Oberlippe wachsen (CHF 15.–)",
    };
    const addonsText = addons?.length
      ? addons.map((a) => addonNames[a] || a).join(", ")
      : "None";

    // Resend — sends email via the Resend API
    // Requires:
    //   1. RESEND_API_KEY env var set on Vercel
    //   2. faces-studio.ch domain verified in Resend dashboard
    //   3. DNS records (SPF/DKIM/DMARC) at Hostpoint since DNS is hosted there
    // Email goes to Daisy at hello@faces-studio.ch; reply-to is the customer
    // so Daisy can reply directly from her mail client.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Email service not configured (RESEND_API_KEY missing). Contact site admin.",
      }, 503);
    }

    const resend = new Resend(apiKey);
    const sendResult = await resend.emails.send({
      from: "Faces Studio <hello@faces-studio.ch>",
      to: ["hello@faces-studio.ch"],
      replyTo: email,
      subject: `Neue Terminanfrage von ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #1a1a1a;">
          <h2 style="font-weight: 400; color: #ff5757; margin-bottom: 24px;">Neue Terminanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8c8c8c; width: 140px;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8c8c8c;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #1a1a1a;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #8c8c8c;">Telefon</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8c8c8c;">Service</td><td style="padding: 8px 0;">${escapeHtml(service || "-")}</td></tr>
            <tr><td style="padding: 8px 0; color: #8c8c8c;">Add-ons</td><td style="padding: 8px 0;">${escapeHtml(addonsText)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8c8c8c;">Wunschtermin</td><td style="padding: 8px 0;">${escapeHtml(`${preferredDate || "-"} ${preferredTime || "-"}`.trim())}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background-color: #f6f3ee; border-radius: 8px;">
            <div style="color: #8c8c8c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;">Nachricht</div>
            <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
          </div>
          <p style="margin-top: 24px; color: #8c8c8c; font-size: 12px;">Antworte direkt auf diese E-Mail, um ${escapeHtml(name)} zu erreichen.</p>
        </div>
      `,
    });

    if (sendResult.error) {
      return c.json({
        success: false,
        error: `Resend rejected the send: ${sendResult.error.message}`,
        resend_error: sendResult.error,
      }, 502);
    }

    return c.json({ success: true, id: sendResult.data?.id || "sent" });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || "Internal error" }, 500);
  }
});

// HTML-escape user input to prevent email-content injection
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
