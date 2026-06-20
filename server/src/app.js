import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import { ROLES } from "./utils/roles.js";
import { notFound, errorHandler } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", true); // correct req.ip behind a proxy
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.get("/", (req, res) => {
    res.json({
      status: "ok",
      message: "VirtualCampus API is running"
    });
  });
  app.get("/api/roles", (req, res) => res.json({ roles: ROLES }));

  app.use("/api/auth", authRoutes);
  app.use("/api/student", studentRoutes);
  app.use("/api/student", courseRoutes);
  app.use("/api/student", feeRoutes);
  app.use("/api/student", communityRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
