import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Resend } from "resend";
import { z } from "zod";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import { env } from "./lib/env.js";

const app = new Hono<{ Bindings: HttpBindings }>();

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

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.get("/api/ping", (c) => c.json({ ok: true, ts: Date.now() }));
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
      from: "Faces Studio <hello@faces-studio.ch>",
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
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite.js");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
