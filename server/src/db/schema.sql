-- virtualCampus database schema
-- Idempotent: safe to run repeatedly (CREATE ... IF NOT EXISTS).

-- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Login modes / roles. Mirrors the ROLES list in client LoginPage.jsx.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'student',
      'faculty',
      'director',
      'registrar',
      'admin',
      'admin-officer',
      'guardian',
      'staff',
      'hod',
      'librarian',
      'library-operator'
    );
  END IF;
END$$;

-- Account status.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_status') THEN
    CREATE TYPE account_status AS ENUM ('active', 'inactive', 'suspended');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(64)  NOT NULL UNIQUE,
  email         VARCHAR(255) UNIQUE,
  full_name     VARCHAR(255),
  password_hash TEXT         NOT NULL,
  role          user_role    NOT NULL,
  status        account_status NOT NULL DEFAULT 'active',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);

-- One row per login. Stores the MODE the user logged in as (the role),
-- plus session metadata so logins can be audited and tokens revoked.
CREATE TABLE IF NOT EXISTS login_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  login_mode   user_role NOT NULL,            -- the role chosen at login
  token_jti    UUID NOT NULL UNIQUE,          -- JWT id, for revocation
  ip_address   INET,
  user_agent   TEXT,
  login_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at   TIMESTAMPTZ NOT NULL,
  revoked_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_login_sessions_user ON login_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_login_sessions_jti  ON login_sessions (token_jti);

-- Keep updated_at fresh on users.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
