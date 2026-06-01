#!/usr/bin/env bash
# Start Postgres (Docker) + backend + frontend together.
# Ctrl-C stops backend and frontend. The Postgres container is left running
# (run with --stop-db to also stop it on exit).
set -eu

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PG_CONTAINER="vc-pg"
REDIS_CONTAINER="vc-redis"
STOP_DB=false
[[ "${1:-}" == "--stop-db" ]] && STOP_DB=true

# --- 1a. Postgres ----------------------------------------------------------
if ! docker ps --format '{{.Names}}' | grep -qx "$PG_CONTAINER"; then
  if docker ps -a --format '{{.Names}}' | grep -qx "$PG_CONTAINER"; then
    echo "Starting existing Postgres container '$PG_CONTAINER'..."
    docker start "$PG_CONTAINER" >/dev/null
  else
    echo "Creating Postgres container '$PG_CONTAINER'..."
    docker run --name "$PG_CONTAINER" \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=virtualcampus \
      -p 5432:5432 -d postgres:16 >/dev/null
  fi
else
  echo "Postgres container '$PG_CONTAINER' already running."
fi

echo -n "Waiting for Postgres"
until docker exec "$PG_CONTAINER" pg_isready -U postgres >/dev/null 2>&1; do
  echo -n "."; sleep 1
done
echo " ready."

# --- 1b. Redis --------------------------------------------------------------
if ! docker ps --format '{{.Names}}' | grep -qx "$REDIS_CONTAINER"; then
  if docker ps -a --format '{{.Names}}' | grep -qx "$REDIS_CONTAINER"; then
    echo "Starting existing Redis container '$REDIS_CONTAINER'..."
    docker start "$REDIS_CONTAINER" >/dev/null
  else
    echo "Creating Redis container '$REDIS_CONTAINER'..."
    docker run --name "$REDIS_CONTAINER" \
      -p 6379:6379 -d redis:7-alpine >/dev/null
  fi
else
  echo "Redis container '$REDIS_CONTAINER' already running."
fi
echo "Redis ready."

# --- cleanup ---------------------------------------------------------------
PIDS=()
cleanup() {
  echo ""
  echo "Stopping backend + frontend..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  wait 2>/dev/null || true
  if $STOP_DB; then
    echo "Stopping Postgres container..."
    docker stop "$PG_CONTAINER" >/dev/null || true
    echo "Stopping Redis container..."
    docker stop "$REDIS_CONTAINER" >/dev/null || true
  fi
  echo "Done."
}
trap cleanup INT TERM EXIT

# --- 2. Backend ------------------------------------------------------------
echo "Starting backend (http://localhost:4000)..."
( cd "$ROOT/server" && npm run dev ) &
PIDS+=($!)

# --- 3. Frontend -----------------------------------------------------------
echo "Starting frontend (http://localhost:5173)..."
( cd "$ROOT/client" && npm run dev ) &
PIDS+=($!)

echo ""
echo "All running. Press Ctrl-C to stop."
# Exit (and trigger cleanup) as soon as either process dies.
wait -n
