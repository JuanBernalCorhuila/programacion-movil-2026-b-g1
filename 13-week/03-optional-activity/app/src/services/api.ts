// Servicio central para hablar con la API de HelpHealth.
// Aquí viven la URL, el envío del token y el manejo de errores (sin red, 401, 500...),
// así las pantallas y los otros servicios no repiten nada de eso.
import { Network } from '@capacitor/network';
import { borrarToken, obtenerToken } from './tokenStorage';

const API_URL = 'http://localhost:3000';

// Por qué se perdió la sesión: no había token guardado, o el servidor lo rechazó (401)
export type MotivoSesion = 'sin-sesion' | 'vencida';

// App.tsx registra aquí qué hacer cuando se pierde la sesión (llevar al login)
let alPerderSesion: (motivo: MotivoSesion) => void = () => {};

export function cuandoSePierdaLaSesion(funcion: (motivo: MotivoSesion) => void) {
  alPerderSesion = funcion;
}

// Hace la petición y convierte cada fallo en un Error con un mensaje claro.
// conToken = false solo para el login, que es la única ruta pública.
export async function pedir<T>(ruta: string, opciones: RequestInit = {}, conToken = true): Promise<T> {
  // 1. Sin red: se avisa antes de intentar la petición
  const red = await Network.getStatus();
  if (!red.connected) {
    throw new Error('No tienes conexión a internet. Revisa tu wifi o tus datos móviles y vuelve a intentar.');
  }

  // 2. El token va en la cabecera Authorization: Bearer <token>
  const cabeceras = new Headers(opciones.headers);
  if (conToken) {
    const token = await obtenerToken();
    if (!token) {
      alPerderSesion('sin-sesion');
      throw new Error('Inicia sesión para continuar');
    }
    cabeceras.set('Authorization', `Bearer ${token}`);
  }

  // 3. fetch lanza TypeError cuando no logra conectarse (hay red, pero el servidor no responde)
  let resp: Response;
  try {
    resp = await fetch(`${API_URL}${ruta}`, { ...opciones, headers: cabeceras });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Intenta de nuevo en unos minutos.');
  }

  const datos = await resp.json().catch(() => ({})); // por si la respuesta no es JSON

  // 4. 401 en una ruta protegida: el token venció o no es válido. Se borra y se vuelve al login
  if (resp.status === 401 && conToken) {
    await borrarToken();
    alPerderSesion('vencida');
    throw new Error('Tu sesión venció. Inicia sesión de nuevo.');
  }

  // 5. Cualquier otro error (400, 401 del login, 404, 500): fetch no lanza, hay que revisar resp.ok
  if (!resp.ok) {
    throw new Error(datos.error || `Error del servidor (${resp.status})`);
  }
  return datos;
}
