# virtualCampus — Backend

Express + PostgreSQL + Redis API providing authentication, caching,
rate-limiting, and role/login-mode storage for the React client in `../client`.

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
| Cache     | Redis (`ioredis`)           |
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
npm run db:seed              # creates the single demo login (see below)
```

### Demo login (one credential, all roles)

```
username:  demo
password:  demo123
```

This is the **only** credential that works, and it works for **every role** —
pick the role in the login dropdown and you land in that interface. The chosen
role is recorded as the login mode in `login_sessions`. The CAPTCHA field is
ignored (enter anything).

Change the credentials in `.env` (`DEMO_USERNAME` / `DEMO_PASSWORD`) then re-run
`npm run db:seed`.

No local Postgres/Redis? Quick Docker instances:

```bash
docker run --name vc-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=virtualcampus -p 5432:5432 -d postgres:16
docker run --name vc-redis -p 6379:6379 -d redis:7-alpine
```

## Run

```bash
npm run dev    # auto-reload (node --watch)
npm start      # production
```

Server: `https://virtualcampus-lms.onrender.com`.

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
curl -s https://virtualcampus-lms.onrender.com/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"username":"demo","password":"demo123","role":"admin"}'
```

## Schema

- `users` — accounts; `role` is a `user_role` enum.
- `login_sessions` — one row per login; `login_mode` stores the role chosen at
  login, with `token_jti` for revocation and `expires_at` for expiry.

See `src/db/schema.sql`.

## Redis

Redis is used for three things:

| Feature            | Key pattern                | TTL   | Description |
|--------------------|----------------------------|-------|-------------|
| Session cache      | `session:active:{jti}`     | 5 min | Avoids a PG query on every authenticated request |
| User cache         | `user:id:{uuid}`           | 10 min | Caches `findById` (used by `/api/auth/me`) |
| Rate limiting      | `ratelimit:{ip}:{window}`  | varies | Fixed-window counters per IP |

**Rate limits:**
- Login: 10 attempts per 15 minutes per IP
- General API: 100 requests per minute per IP

Redis is **optional** — if it's unavailable the server falls back to
PostgreSQL-only (no caching, no rate limiting). Set `REDIS_URL` in `.env`
(defaults to `redis://localhost:6379`).

## Wiring the client

Point the client at this API (e.g. `VITE_API_URL=https://virtualcampus-lms.onrender.com`) and
replace the client-side navigation in `client/src/auth/LoginPage.jsx` with a
`POST /api/auth/login` call, storing the returned token. The `role` returned
drives which interface to route to.
