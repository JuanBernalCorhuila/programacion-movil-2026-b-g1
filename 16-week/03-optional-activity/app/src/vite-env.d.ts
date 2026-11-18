/// <reference types="vite/client" />

// Variables de entorno que usa la app (se leen al compilar con Vite)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
