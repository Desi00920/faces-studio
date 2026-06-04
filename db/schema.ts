import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

/**
 * Site Content Table — CMS for Daisy
 * Stores all editable content sections for the FACES STUDIO website.
 */
export const siteContent = mysqlTable("site_content", {
  id: serial("id").primaryKey(),
  sectionKey: varchar("section_key", { length: 100 }).notNull(),
  fieldKey: varchar("field_key", { length: 100 }).notNull(),
  valueDe: text("value_de"),
  valueEn: text("value_en"),
  imageUrl: varchar("image_url", { length: 500 }),
  orderNum: varchar("order_num", { length: 20 }).default("0"),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

/**
 * Admin Users Table — Simple password-based auth for CMS access
 */
export const adminUsers = mysqlTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
