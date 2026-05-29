import { getClubs, getClubDetail } from "../models/communityModel.js";
import { HttpError, asyncHandler } from "../middleware/error.js";

// GET /api/student/clubs
export const clubs = asyncHandler(async (req, res) => {
  const data = await getClubs(req.user.id);
  res.json({ clubs: data });
});

// GET /api/student/clubs/:id
export const clubDetail = asyncHandler(async (req, res) => {
  const data = await getClubDetail(req.params.id);
  if (!data) throw new HttpError(404, "Club not found");
  res.json(data);
});
