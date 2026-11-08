// Obtiene la ubicación del usuario con el plugin de geolocalización de Capacitor.
// Antes de leer el GPS se revisa y se pide el permiso; si el usuario lo niega,
// no se lanza un error sin explicación: se devuelve un resultado "denegado".
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export interface Ubicacion {
  lat: number;
  lng: number;
}

// Los tres resultados posibles, para que la pantalla sepa qué mostrar
export type ResultadoUbicacion =
  | { tipo: 'ok'; ubicacion: Ubicacion }
  | { tipo: 'denegado' }
  | { tipo: 'error'; mensaje: string };

// Revisa el permiso y, si todavía no se ha preguntado, lo pide.
async function tienePermiso(): Promise<boolean> {
  // En el navegador no existe requestPermissions: es el propio navegador
  // el que pregunta cuando se llama a getCurrentPosition.
  if (!Capacitor.isNativePlatform()) {
    return true;
  }

  let permiso = await Geolocation.checkPermissions();
  if (permiso.location === 'prompt' || permiso.location === 'prompt-with-rationale') {
    permiso = await Geolocation.requestPermissions(); // aquí aparece el diálogo del sistema
  }

  // En Android el usuario puede elegir ubicación "precisa" o "aproximada"; las dos sirven
  return permiso.location === 'granted' || permiso.coarseLocation === 'granted';
}

export async function obtenerUbicacion(): Promise<ResultadoUbicacion> {
  try {
    if (!(await tienePermiso())) {
      return { tipo: 'denegado' };
    }

    const pos = await Geolocation.getCurrentPosition();
    return {
      tipo: 'ok',
      ubicacion: { lat: pos.coords.latitude, lng: pos.coords.longitude },
    };
  } catch (e) {
    const codigo = (e as { code?: string | number }).code;

    // OS-PLUG-GLOC-0003: permiso negado en el teléfono. 1: permiso negado en el navegador.
    if (codigo === 'OS-PLUG-GLOC-0003' || codigo === 1) {
      return { tipo: 'denegado' };
    }
    // OS-PLUG-GLOC-0007 / 0009: la ubicación (GPS) del teléfono está apagada
    if (codigo === 'OS-PLUG-GLOC-0007' || codigo === 'OS-PLUG-GLOC-0009') {
      return {
        tipo: 'error',
        mensaje: 'La ubicación (GPS) de tu teléfono está desactivada. Actívala y vuelve a intentarlo.',
      };
    }
    // Cualquier otro fallo, por ejemplo que el GPS no responda a tiempo
    return {
      tipo: 'error',
      mensaje: 'No se pudo obtener tu ubicación. Revisa que el GPS esté activado y vuelve a intentarlo.',
    };
  }
}
