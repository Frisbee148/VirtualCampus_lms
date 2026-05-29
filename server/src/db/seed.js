import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../config/db.js";
import { findByUsername, createUser } from "../models/userModel.js";
import { hashPassword } from "../utils/password.js";
import { env } from "../config/env.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Demo mode: one shared account. Its credentials (env DEMO_USERNAME /
// DEMO_PASSWORD) are the only ones that log in, and they work for every role
// (the role is chosen in the login dropdown). We upsert the password hash so
// changing DEMO_PASSWORD in .env + re-seeding takes effect.
async function seed() {
  const username = env.demoUsername;
  const passwordHash = await hashPassword(env.demoPassword);

  const existing = await findByUsername(username);
  if (existing) {
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      passwordHash,
      existing.id,
    ]);
    console.log(`updated demo account '${username}'`);
  } else {
    await createUser({
      username,
      email: `${username}@example.edu`,
      fullName: "Demo User",
      passwordHash,
      role: "student", // placeholder; login mode comes from the dropdown
    });
    console.log(`created demo account '${username}'`);
  }

  // Seed student dashboard data
  const studentSeed = readFileSync(join(__dirname, "student_seed.sql"), "utf8");
  console.log("Applying student_seed.sql ...");
  await pool.query(studentSeed);
  console.log("Student seed data applied.");

  console.log(`\nLogin with:  username = ${username}   password = ${env.demoPassword}`);
  console.log("Works for ALL roles — just pick the role in the dropdown.");
}

seed()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err.message);
    pool.end().finally(() => process.exit(1));
  });
