import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  sessions,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const router = Router();

// Strict limiter for login — 10 attempts per 15 minutes per IP.
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again later",
});

// General API limiter — 100 requests per minute per IP.
const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
});

router.post("/register", apiLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", requireAuth, logout);
router.get("/me", apiLimiter, requireAuth, me);
router.get("/sessions", apiLimiter, requireAuth, sessions);

export default router;
