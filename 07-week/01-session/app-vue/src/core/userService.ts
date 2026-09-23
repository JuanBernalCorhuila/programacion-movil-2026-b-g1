export interface UserForm {
  nombre: string;
  identificacion: string;
  email: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  password: string;
}

const STORAGE_KEY = 'registered_users';
const memoryStorage: Record<string, string> = {};

const getStorage = (): Storage | { getItem: (key: string) => string | null; setItem: (key: string, value: string) => void; removeItem: (key: string) => void } => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  return {
    getItem: (key: string) => memoryStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      memoryStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete memoryStorage[key];
    },
  };
};

export const createEmptyUserForm = (): UserForm => ({
  nombre: '',
  identificacion: '',
  email: '',
  telefono: '',
  ciudad: '',
  direccion: '',
  password: '',
});

export const registerUser = (user: UserForm): UserForm => {
  const storage = getStorage();
  const savedUsers = readUsers();
  const updatedUsers = [...savedUsers, user];

  storage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  return user;
};

export const readUsers = (): UserForm[] => {
  const storage = getStorage();
  const storedUsers = storage.getItem(STORAGE_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    return JSON.parse(storedUsers) as UserForm[];
  } catch {
    return [];
  }
};
