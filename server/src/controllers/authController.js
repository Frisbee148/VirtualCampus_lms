import { createUser, findByUsername, findById } from "../models/userModel.js";
import {
  createSession,
  revokeSession,
  listSessionsForUser,
} from "../models/sessionModel.js";
import { hashPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { isValidRole } from "../utils/roles.js";
import { env } from "../config/env.js";
import { HttpError, asyncHandler } from "../middleware/error.js";

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { username, password, role, email, fullName } = req.body || {};

  if (!username || !password || !role) {
    throw new HttpError(400, "username, password and role are required");
  }
  if (!isValidRole(role)) {
    throw new HttpError(400, `Invalid role: ${role}`);
  }
  if (String(password).length < 6) {
    throw new HttpError(400, "Password must be at least 6 characters");
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ username, email, fullName, passwordHash, role });

  res.status(201).json({ user });
});

// POST /api/auth/login
// Demo mode: a single shared credential (env DEMO_USERNAME / DEMO_PASSWORD) is
// the ONLY accepted login. The role is whatever the client picked in the
// dropdown — the same account can log in as any role. The chosen mode is
// recorded in login_sessions.
export const login = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body || {};
  if (!username || !password) {
    throw new HttpError(400, "username and password are required");
  }

  // Only the configured demo credentials are valid.
  if (username !== env.demoUsername || password !== env.demoPassword) {
    throw new HttpError(401, "Invalid credentials");
  }

  // Role picked at login becomes the login mode; defaults to student.
  const loginMode = role || "student";
  if (!isValidRole(loginMode)) {
    throw new HttpError(400, `Invalid role: ${loginMode}`);
  }

  // The demo account row backs every session (FK on login_sessions).
  const user = await findByUsername(env.demoUsername);
  if (!user) {
    throw new HttpError(500, "Demo account missing — run `npm run db:seed`.");
  }

  const { token, jti, expiresAt } = signToken({ userId: user.id, role: loginMode });

  await createSession({
    userId: user.id,
    loginMode,
    jti,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    expiresAt,
  });

  res.json({
    token,
    expiresAt,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.full_name,
      role: loginMode,
    },
    loginMode,
  });
});

// POST /api/auth/logout  — revokes the current session.
export const logout = asyncHandler(async (req, res) => {
  await revokeSession(req.user.jti);
  res.json({ ok: true });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  const user = await findById(req.user.id);
  if (!user) throw new HttpError(404, "User not found");
  res.json({ user, loginMode: req.user.role });
});

// GET /api/auth/sessions  — login history for the current user.
export const sessions = asyncHandler(async (req, res) => {
  const rows = await listSessionsForUser(req.user.id);
  res.json({ sessions: rows });
});
