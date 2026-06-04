import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";

const app = new Hono();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Health check
app.get("/api/ping", (c) => c.json({ ok: true, ts: Date.now() }));

// tRPC handler
app.use("/api/trpc/*", async (c) => {
  try {
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: c.req.raw,
      router: appRouter,
      createContext,
    });
  } catch (err: any) {
    console.error("[API] tRPC error:", err.message);
    return c.json(
      {
        error: { message: err.message || "Internal Server Error" },
      },
      500
    );
  }
});

// 404 for unmatched API routes
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// Vercel Node.js serverless handler
// @ts-ignore
export default async function handler(req: any, res: any) {
  console.log(`[API] ${req.method} ${req.url}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Date, X-Api-Version, x-admin-token");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "localhost";
    const url = `${protocol}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else if (typeof value === "string") {
        headers.set(key, value);
      }
    }

    let body: string | undefined;
    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      headers.set("content-type", "application/json");
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const fetchReq = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    const response = await app.fetch(fetchReq);
    console.log(`[API] Response: ${response.status}`);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    const responseBody = await response.text();
    res.end(responseBody);
  } catch (err: any) {
    console.error("[API] Fatal error:", err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
