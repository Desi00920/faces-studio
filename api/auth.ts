/**
 * Simple Admin Authentication — Password-based JWT
 *
 * Daisy logs in with a password stored in the ADMIN_PASSWORD env var.
 * On successful login, a JWT token is returned and stored in localStorage.
 * All admin mutations require the token in the x-admin-token header.
 */

import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || process.env.APP_SECRET || "faces-studio-admin-secret"
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function login(password: string): Promise<string | null> {
  if (!ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD not set in environment");
    return null;
  }

  if (password !== ADMIN_PASSWORD) {
    return null;
  }

  // Create JWT token
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  return token;
}

export async function verify(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET_KEY, { clockTolerance: 60 });
    return true;
  } catch {
    return false;
  }
}
