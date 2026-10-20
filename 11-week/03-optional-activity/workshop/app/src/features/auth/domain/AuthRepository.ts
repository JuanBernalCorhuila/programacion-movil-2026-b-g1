// Domain layer: zero outward dependencies (no fetch, no AsyncStorage import here) — see
// docs/01-architecture/layers-and-state.md.

export interface AuthRepository {
  /** Throws AuthError on wrong credentials. Stores the token internally on success. */
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  /** Used once on app start to silently restore a still-valid session, if any. */
  getStoredToken(): Promise<string | null>;
}
