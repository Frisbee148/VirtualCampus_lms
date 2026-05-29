# virtualCampus

A college LMS web app for LNMIIT with 11 role-based interfaces (student,
faculty, HOD, director, registrar, librarian, staff, parent/guardian, and
admin roles). React frontend + Express/PostgreSQL backend.

## Structure

```
virtualCampus/
├── client/        React + Vite frontend (11 role interfaces)
├── server/        Express + PostgreSQL backend (auth + login-mode storage)
├── dev.sh         Start Postgres + backend + frontend together
└── README.md
```

## Quick start

Requires **Node.js** and **Docker** (for PostgreSQL).

### First time

```bash
# install deps
cd client && npm install && cd ..
cd server && npm install && cd ..

# backend config
cp server/.env.example server/.env      # then set JWT_SECRET

# database (Docker Postgres) + schema + demo login
cd server
npm run db:migrate
npm run db:seed
cd ..
```

The `db:seed` step needs Postgres running. `./dev.sh` starts it for you, or:

```bash
docker run --name vc-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=virtualcampus -p 5432:5432 -d postgres:16
```

### Run everything

```bash
./dev.sh
```

Starts **Postgres → backend (:4000) → frontend (:5173)**.
Press **Ctrl-C** to stop backend + frontend (Postgres container stays up;
use `./dev.sh --stop-db` to stop it too).

Then open **http://localhost:5173**.

## Demo login

One credential works for **every** role:

```
username:  demo
password:  demo123
```

Pick the role in the dropdown — you land in that interface. The CAPTCHA field
is ignored (type anything). These are the only credentials that work; change
them in `server/.env` (`DEMO_USERNAME` / `DEMO_PASSWORD`) then re-run
`npm run db:seed`.

## How auth works

- Frontend login posts to `POST /api/auth/login` with the selected role.
- Backend validates the demo credential, issues a JWT, and records the
  **login mode** (the chosen role) in the `login_sessions` table.
- The returned role drives which interface the user is routed to.

## Tech stack

| Layer    | Tech                                          |
|----------|-----------------------------------------------|
| Frontend | React 19, Vite, React Router, Tailwind, Recharts |
| Backend  | Node.js (ESM), Express 4                       |
| Database | PostgreSQL (`pg`)                              |
| Auth     | JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`)     |

Backend details and full API reference: [`server/README.md`](server/README.md).

## Ports

| Service  | URL                     |
|----------|-------------------------|
| Frontend | http://localhost:5173   |
| Backend  | http://localhost:4000   |
| Postgres | localhost:5432          |
