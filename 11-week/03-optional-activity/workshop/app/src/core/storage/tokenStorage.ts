import * as SecureStore from "expo-secure-store";

// The ONLY thing that goes in expo-secure-store — see docs/03-api-and-data/authentication.md.
// No screen or repository reads/writes this key directly except through these functions.
const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  async get(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },
  async set(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
