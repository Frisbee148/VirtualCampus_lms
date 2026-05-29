import { getFeeStatus } from "../models/feeModel.js";
import { HttpError, asyncHandler } from "../middleware/error.js";

// GET /api/student/fees
export const feeStatus = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const data = await getFeeStatus(req.user.id, sessionId);
  res.json(data);
});
