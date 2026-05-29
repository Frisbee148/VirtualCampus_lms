import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  sessions,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.get("/sessions", requireAuth, sessions);

export default router;
