import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../config/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  console.log("Applying schema.sql ...");
  await pool.query(schema);
  console.log("Schema applied.");

  const studentSchema = readFileSync(join(__dirname, "student_schema.sql"), "utf8");
  console.log("Applying student_schema.sql ...");
  await pool.query(studentSchema);
  console.log("Student schema applied.");
}

migrate()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration failed:", err.message);
    pool.end().finally(() => process.exit(1));
  });
