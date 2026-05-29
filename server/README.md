# virtualCampus — Backend

Express + PostgreSQL API providing authentication and role/login-mode storage
for the React client in `../client`.

## What it does

- Stores user accounts in PostgreSQL with a `role` (the login mode:
  `student`, `admin`, `guardian`/parent, etc. — 11 roles total).
- On every login, records **the mode the user logged in as** in the
  `login_sessions` table, along with IP, user agent, and expiry.
- Issues JWTs; sessions are revocable (logout / expiry).

## Stack

| Concern   | Choice                      |
|-----------|-----------------------------|
| Runtime   | Node.js (ESM)               |
| Framework | Express 4                   |
| Database  | PostgreSQL (`pg` pool)      |
| Auth      | JWT (`jsonwebtoken`)        |
| Passwords | bcrypt (`bcryptjs`)         |

## Setup

```bash
cd server
npm install
cp .env.example .env        # then edit DATABASE_URL / PG* + JWT_SECRET
```

Create the database (one-time), then apply the schema and demo data:

```bash
createdb virtualcampus       # or via your PG host / Docker
npm run db:migrate           # applies src/db/schema.sql
npm run db:seed              # creates one demo user per role (password: password123)
```

No local Postgres? Quick Docker instance:

```bash
docker run --name vc-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=virtualcampus -p 5432:5432 -d postgres:16
```

## Run

```bash
npm run dev    # auto-reload (node --watch)
npm start      # production
```

Server: `http://localhost:4000`.

## API

| Method | Path                 | Auth | Purpose                                  |
|--------|----------------------|------|------------------------------------------|
| GET    | `/health`            | —    | Liveness check                           |
| GET    | `/api/roles`         | —    | List valid login modes                   |
| POST   | `/api/auth/register` | —    | Create account `{username,password,role,email?,fullName?}` |
| POST   | `/api/auth/login`    | —    | Login `{username,password,role?}` → JWT + records login mode |
| POST   | `/api/auth/logout`   | JWT  | Revoke current session                   |
| GET    | `/api/auth/me`       | JWT  | Current user + login mode                |
| GET    | `/api/auth/sessions` | JWT  | Login history for current user           |

Send the token as `Authorization: Bearer <token>`.

### Example

```bash
# login (after seeding)
curl -s localhost:4000/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"username":"admin","password":"password123","role":"admin"}'
```

## Schema

- `users` — accounts; `role` is a `user_role` enum.
- `login_sessions` — one row per login; `login_mode` stores the role chosen at
  login, with `token_jti` for revocation and `expires_at` for expiry.

See `src/db/schema.sql`.

## Wiring the client

Point the client at this API (e.g. `VITE_API_URL=http://localhost:4000`) and
replace the client-side navigation in `client/src/auth/LoginPage.jsx` with a
`POST /api/auth/login` call, storing the returned token. The `role` returned
drives which interface to route to.
