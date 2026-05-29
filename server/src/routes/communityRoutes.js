import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { clubs, clubDetail } from "../controllers/communityController.js";

const router = Router();
router.use(requireAuth, requireRole("student"));

router.get("/clubs", clubs);
router.get("/clubs/:id", clubDetail);

export default router;
