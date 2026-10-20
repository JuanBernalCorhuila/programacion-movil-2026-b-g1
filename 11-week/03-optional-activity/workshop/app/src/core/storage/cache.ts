import AsyncStorage from "@react-native-async-storage/async-storage";

// Read-through cache only — NEVER the source of truth. See docs/03-api-and-data/persistence.md
// for the exact key list and docs/03-api-and-data/offline-sync.md for when it's used.
//
// This corte only needs the students-list key; cache:students:detail:<id> and
// cache:attendance:history:<id> are added when StudentDetail/attendance are built.
const CACHE_KEYS = {
  studentsList: "cache:students:list",
} as const;

export const cache = {
  keys: CACHE_KEYS,

  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async clear(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  /** Clears everything this app has cached — used on sign-out. */
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(CACHE_KEYS));
  },
};