import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// The ONLY thing that goes in expo-secure-store — see docs/03-api-and-data/authentication.md.
// No screen or repository reads/writes this key directly except through these functions.
// expo-secure-store has no web implementation, so the browser build (used in the week 11
// workshop for Lighthouse and responsive checks) falls back to AsyncStorage.
const TOKEN_KEY = "auth_token";
const isWeb = Platform.OS === "web";

export const tokenStorage = {
  async get(): Promise<string | null> {
    return isWeb ? AsyncStorage.getItem(TOKEN_KEY) : SecureStore.getItemAsync(TOKEN_KEY);
  },
  async set(token: string): Promise<void> {
    if (isWeb) await AsyncStorage.setItem(TOKEN_KEY, token);
    else await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  async clear(): Promise<void> {
    if (isWeb) await AsyncStorage.removeItem(TOKEN_KEY);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
