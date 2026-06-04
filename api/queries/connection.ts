import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env.js";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>> | null = null;
let lastError: string | null = null;

export function getDb() {
  // Recreate instance if DB was previously down
  if (!instance || lastError) {
    lastError = null;
    instance = drizzle(env.databaseUrl, {
      mode: "planetscale",
      schema: fullSchema,
    });
  }
  return instance;
}

export function markDbError(msg: string) {
  lastError = msg;
  instance = null;
}
