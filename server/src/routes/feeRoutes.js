import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { feeStatus } from "../controllers/feeController.js";

const router = Router();
router.use(requireAuth, requireRole("student"));

router.get("/fees", feeStatus);

export default router;
