import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { container } from "../../../core/di/container";
import { registerUnauthorizedHandler } from "../../../core/network/apiFetch";
import { AuthError, NetworkError } from "../../../core/errors";
import { strings } from "./strings";

// Exact shape documented in docs/01-architecture/features/auth.md.
type AuthState = {
  status: "idle" | "loading" | "authenticated" | "error";
  errorMessage?: string;
};

type AuthContextValue = {
  state: AuthState;
  /** Convenience the navigator reads — see docs/01-architecture/navigation.md. */
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "idle" });

  const logout = useCallback(async () => {
    await container.auth.logout.execute();
    setState({ status: "idle" });
  }, []);

  // Silently restore a still-valid session on app start — not literally spelled out in
  // any screen doc, but the alternative (always showing Login even with a valid stored
  // token) contradicts "sign the trainer out only on a real 401", so this is the
  // reasonable reading of that rule applied to app startup.
  useEffect(() => {
    (async () => {
      const token = await container.auth.repository.getStoredToken();
      setState({ status: token ? "authenticated" : "idle" });
    })();
  }, []);

  // Any 401 from anywhere in the app (not just login) signs the trainer out immediately —
  // see docs/03-api-and-data/api-networking.md status handling table.
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      setState({ status: "idle" });
    });
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setState({ status: "loading" });
    try {
      await container.auth.login.execute(username, password);
      setState({ status: "authenticated" });
    } catch (err) {
      const message =
        err instanceof AuthError
          ? strings.errors.invalidCredentials
          : err instanceof NetworkError
            ? strings.errors.generic
            : strings.errors.generic;
      setState({ status: "error", errorMessage: message });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ state, isAuthenticated: state.status === "authenticated", login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
