// Guarda el contacto de confianza (entidad Cuidador) en el propio teléfono.
// Se guarda local y no en la API porque el botón de emergencia tiene que poder
// usarlo aunque no haya internet ni sesión iniciada.
// Preferences guarda datos sencillos: en Android usa SharedPreferences; en el navegador, localStorage.
import { Preferences } from '@capacitor/preferences';

const CLAVE_CUIDADOR = 'cuidador';

export interface Cuidador {
  nombre: string;
  telefono: string;
}

export async function guardarCuidador(cuidador: Cuidador): Promise<void> {
  // Preferences solo guarda texto, por eso el objeto se convierte a JSON
  await Preferences.set({ key: CLAVE_CUIDADOR, value: JSON.stringify(cuidador) });
}

// Devuelve el cuidador guardado, o null si todavía no se ha configurado
export async function obtenerCuidador(): Promise<Cuidador | null> {
  const { value } = await Preferences.get({ key: CLAVE_CUIDADOR });
  return value ? (JSON.parse(value) as Cuidador) : null;
}
