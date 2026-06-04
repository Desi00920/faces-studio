import { createRouter, publicQuery } from "./middleware.js";
import { contactRouter } from "./contact.js";
import { contentRouter } from "./content.js";
import { adminRouter } from "./admin.js";
import { googleReviewsRouter } from "./googleReviews.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  contact: contactRouter,
  content: contentRouter,
  admin: adminRouter,
  googleReviews: googleReviewsRouter,
});

export type AppRouter = typeof appRouter;
