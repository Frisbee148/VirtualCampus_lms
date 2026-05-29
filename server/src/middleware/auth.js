import { verifyToken } from "../utils/jwt.js";
import { isSessionActive } from "../models/sessionModel.js";
import { HttpError, asyncHandler } from "./error.js";

// Validates the Bearer token and confirms the session is still active.
// Attaches { id, role, jti } to req.user.
export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new HttpError(401, "Missing bearer token");

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }

  if (!(await isSessionActive(payload.jti))) {
    throw new HttpError(401, "Session revoked or expired");
  }

  req.user = { id: payload.sub, role: payload.role, jti: payload.jti };
  next();
});

// Restricts a route to specific login modes.
export const requireRole = (...allowed) =>
  (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return next(new HttpError(403, "Insufficient permissions"));
    }
    next();
  };
