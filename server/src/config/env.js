import dotenv from "dotenv";

dotenv.config();

const bool = (v, fallback = false) =>
  v === undefined ? fallback : ["1", "true", "yes", "on"].includes(String(v).toLowerCase());

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",

  // Database — DATABASE_URL wins; otherwise discrete PG* vars.
  databaseUrl: process.env.DATABASE_URL || "",
  pg: {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "virtualcampus",
    ssl: bool(process.env.PGSSL),
  },

  jwtSecret: process.env.JWT_SECRET || "change-me-to-a-long-random-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
};

if (env.nodeEnv === "production" && env.jwtSecret === "change-me-to-a-long-random-secret") {
  // Fail loud rather than ship a known secret.
  throw new Error("JWT_SECRET must be set to a secure value in production.");
}
