import { apiFetch } from "../../../core/network/apiFetch";
import { cache } from "../../../core/storage/cache";
import { tokenStorage } from "../../../core/storage/tokenStorage";
import { AuthRepository } from "../domain/AuthRepository";

// See docs/03-api-and-data/endpoints/auth-login.md for the exact request/response shape.
export class AuthRepositoryImpl implements AuthRepository {
  async login(username: string, password: string): Promise<void> {
    // authenticated: false — there is no token yet, this call gets one.
    const { token } = await apiFetch<{ token: string }>("/auth/login", {
      method: "POST",
      body: { username, password },
      authenticated: false,
    });
    await tokenStorage.set(token);
  }

  async logout(): Promise<void> {
    // See docs/03-api-and-data/authentication.md#sign-out
    await tokenStorage.clear();
    await cache.clearAll();
  }

  getStoredToken(): Promise<string | null> {
    return tokenStorage.get();
  }
}
