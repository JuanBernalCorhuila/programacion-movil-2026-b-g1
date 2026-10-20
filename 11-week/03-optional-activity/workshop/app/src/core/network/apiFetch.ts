import { tokenStorage } from "../storage/tokenStorage";
import { AuthError, NetworkError, ValidationError } from "../errors";

// See docs/03-api-and-data/api-networking.md.
//
// This is the ONLY place a network request is made in the whole app — no feature calls
// `fetch` directly. No automatic retries here, for any method: on failure the screen shows
// a manual "Reintentar" button; this wrapper never retries silently.

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
const TIMEOUT_MS = 10_000;

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  /** Most requests need the trainer's token; login is the one exception. */
  authenticated?: boolean;
};

/**
 * Callback invoked whenever the server responds 401. Wired up once from AuthContext so a
 * 401 anywhere signs the trainer out immediately — no refresh attempt (there is no refresh
 * token, see docs/03-api-and-data/authentication.md).
 */
let onUnauthorized: (() => void) | null = null;
export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, authenticated = true } = options;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authenticated) {
    const token = await tokenStorage.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    // Network failure, timeout abort, DNS error, etc.
    throw new NetworkError("No pudimos conectar con el servidor");
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 401) {
    // Only an authenticated request's 401 means "your session died, sign out" — see
    // docs/03-api-and-data/endpoints/auth-login.md: a login attempt's own 401 (wrong
    // credentials) is NOT a session to close, there was never one to begin with.
    if (authenticated) {
      onUnauthorized?.();
      throw new AuthError("Sesión expirada");
    }
    throw new AuthError("Usuario o contraseña incorrectos");
  }

  if (!response.ok) {
    const payload = await safeJson(response);
    const message = typeof payload?.error === "string" ? payload.error : "Ocurrió un error";
    if (response.status >= 400 && response.status < 500) {
      throw new ValidationError(message);
    }
    throw new NetworkError(message);
  }

  return safeJson(response) as Promise<T>;
}

async function safeJson(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    // Fail loudly per api-networking.md, but don't crash on an empty body (e.g. some 2xx
    // responses have none) — return null and let the caller's type expectations catch a
    // genuinely malformed payload.
    return null;
  }
}
