import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { login } from "./auth.js";

/**
 * Admin Auth Router — Simple password login
 */
export const adminRouter = createRouter({
  login: publicQuery
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      const token = await login(input.password);
      if (!token) {
        throw new Error("Invalid password");
      }
      return { token };
    }),
});
