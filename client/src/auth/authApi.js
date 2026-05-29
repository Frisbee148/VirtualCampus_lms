// Thin client for the virtualCampus backend auth API.
// Base URL comes from VITE_API_URL (see client/.env), defaults to local server.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const TOKEN_KEY = "vc_token";
const USER_KEY = "vc_user";

/* ---- token / user storage ---- */

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

const storeAuth = (token, user) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* ignore storage failures (private mode, etc.) */
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
};

/* ---- requests ---- */

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Network / server-down.
    throw new Error("Cannot reach server. Is the backend running on " + API_URL + "?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

/* ---- public API ---- */

// Logs in; on success stores token + user and returns the payload.
export async function login({ username, password, role }) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: { username, password, role },
  });
  storeAuth(data.token, data.user);
  return data; // { token, expiresAt, user, loginMode }
}

// Revokes the session server-side, then clears local storage.
export async function logout() {
  try {
    await request("/api/auth/logout", { method: "POST", auth: true });
  } catch {
    /* even if the call fails, clear local creds below */
  }
  clearAuth();
}

export function getCurrentUser() {
  return request("/api/auth/me", { auth: true });
}
