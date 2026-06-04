import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { siteContent } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { verify } from "./auth.js";

let dbAvailable = true;

function checkDb() {
  if (!dbAvailable) {
    throw new Error("Database temporarily unavailable. Please try again later.");
  }
}

/**
 * Content Router — Public read, admin-only write
 */
export const contentRouter = createRouter({
  /** List all content sections (grouped by sectionKey) */
  list: publicQuery.query(async () => {
    checkDb();
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(siteContent)
        .orderBy(asc(siteContent.orderNum));

      const grouped: Record<string, typeof rows> = {};
      for (const row of rows) {
        if (!grouped[row.sectionKey]) grouped[row.sectionKey] = [];
        grouped[row.sectionKey].push(row);
      }
      return grouped;
    } catch (err: any) {
      console.error("[Content] DB error on list:", err.message);
      dbAvailable = false;
      // Retry once after a delay
      setTimeout(() => { dbAvailable = true; }, 30000);
      throw new Error("Database temporarily unavailable. Please try again later.");
    }
  }),

  /** Get content for a specific section */
  getBySection: publicQuery
    .input(z.object({ sectionKey: z.string() }))
    .query(async ({ input }) => {
      checkDb();
      try {
        const db = getDb();
        return db
          .select()
          .from(siteContent)
          .where(eq(siteContent.sectionKey, input.sectionKey))
          .orderBy(asc(siteContent.orderNum));
      } catch (err: any) {
        console.error("[Content] DB error on getBySection:", err.message);
        throw new Error("Database temporarily unavailable.");
      }
    }),

  /** Update a content field (admin only) */
  update: publicQuery
    .input(
      z.object({
        id: z.number(),
        valueDe: z.string().optional(),
        valueEn: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      checkDb();
      const token =
        ctx.req.headers.get("x-admin-token") ||
        ctx.req.headers.get("X-Admin-Token");
      if (!token) throw new Error("Unauthorized");
      const isValid = await verify(token);
      if (!isValid) throw new Error("Unauthorized");

      const db = getDb();
      const updateData: Record<string, unknown> = {};
      if (input.valueDe !== undefined) updateData.valueDe = input.valueDe;
      if (input.valueEn !== undefined) updateData.valueEn = input.valueEn;
      if (input.imageUrl !== undefined) updateData.imageUrl = input.imageUrl || null;

      await db.update(siteContent).set(updateData).where(eq(siteContent.id, input.id));
      return { success: true };
    }),

  /** Create a new content entry (admin only) */
  create: publicQuery
    .input(
      z.object({
        sectionKey: z.string(),
        fieldKey: z.string(),
        valueDe: z.string().optional(),
        valueEn: z.string().optional(),
        imageUrl: z.string().optional(),
        orderNum: z.string().default("0"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      checkDb();
      const token =
        ctx.req.headers.get("x-admin-token") ||
        ctx.req.headers.get("X-Admin-Token");
      if (!token) throw new Error("Unauthorized");
      const isValid = await verify(token);
      if (!isValid) throw new Error("Unauthorized");

      const db = getDb();
      const result = await db.insert(siteContent).values({
        sectionKey: input.sectionKey,
        fieldKey: input.fieldKey,
        valueDe: input.valueDe || null,
        valueEn: input.valueEn || null,
        imageUrl: input.imageUrl || null,
        orderNum: input.orderNum,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),
});
