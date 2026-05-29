import { pool } from "../config/db.js";
import { createUser, findByUsername } from "../models/userModel.js";
import { hashPassword } from "../utils/password.js";
import { ROLES } from "../utils/roles.js";

// Creates one demo account per role. Username = role, password = "password123".
async function seed() {
  const password = "password123";
  const passwordHash = await hashPassword(password);

  for (const role of ROLES) {
    const username = role;
    if (await findByUsername(username)) {
      console.log(`skip   ${username} (exists)`);
      continue;
    }
    await createUser({
      username,
      email: `${username}@example.edu`,
      fullName: `Demo ${role}`,
      passwordHash,
      role,
    });
    console.log(`create ${username} / ${password}  (role: ${role})`);
  }
  console.log("\nSeed complete. Login with any username above, password 'password123'.");
}

seed()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err.message);
    pool.end().finally(() => process.exit(1));
  });
