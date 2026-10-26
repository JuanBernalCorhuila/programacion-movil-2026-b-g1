// Guarda el token en el almacenamiento seguro del dispositivo.
// En Android se cifra con una llave del Android Keystore; en iOS va al Keychain.
// En el navegador (ionic serve) el plugin usa localStorage sin cifrar: solo sirve para desarrollar.
import { SecureStorage } from '@aparajita/capacitor-secure-storage';

const CLAVE_TOKEN = 'token';

export function guardarToken(token: string): Promise<void> {
  return SecureStorage.setItem(CLAVE_TOKEN, token);
}

export function obtenerToken(): Promise<string | null> {
  return SecureStorage.getItem(CLAVE_TOKEN);
}

export function borrarToken(): Promise<void> {
  return SecureStorage.removeItem(CLAVE_TOKEN);
}
