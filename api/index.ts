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

    // FormSubmit.co — no API key required, free, forwards form to the email in the URL
    // Daisy receives the email at hello@faces-studio.ch
    // First time: she'll need to click "Confirm" in the auto-reply (one-time setup)
    const formData = new URLSearchParams();
    formData.append("_subject", `Neue Terminanfrage von ${name}`);
    formData.append("_replyto", email);
    formData.append("_template", "box");
    formData.append("Name", name);
    formData.append("E-Mail", email);
    formData.append("Telefon", phone);
    formData.append("Service", service || "-");
    formData.append("Add-ons", addonsText);
    formData.append("Wunschtermin", `${preferredDate || "-"} ${preferredTime || "-"}`.trim());
    formData.append("Nachricht", message);

    const response = await fetch("https://formsubmit.co/ajax/hello@faces-studio.ch", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errText = await response.text();
      return c.json({ success: false, error: `FormSubmit returned ${response.status}: ${errText.slice(0, 200)}` }, 500);
    }

    const result: any = await response.json();
    return c.json({ success: true, id: result?.id || "formsubmit-ok" });
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
