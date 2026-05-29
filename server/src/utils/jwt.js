import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";

// Signs a token carrying the user id, the login mode (role), and a unique
// jti so the matching login_sessions row can be revoked.
export function signToken({ userId, role }) {
  const jti = randomUUID();
  const token = jwt.sign({ sub: userId, role, jti }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
  const { exp } = jwt.decode(token);
  return { token, jti, expiresAt: new Date(exp * 1000) };
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}
