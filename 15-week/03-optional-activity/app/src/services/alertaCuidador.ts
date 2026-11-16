// Arma el mensaje de emergencia que se le envía al cuidador por SMS.
// Es una función pura (no usa plugins ni red), por eso se puede probar sola.
import type { Cuidador } from './cuidadorStorage';
import type { Ubicacion } from './ubicacionService';

// Devuelve un enlace "sms:" que abre la app de mensajes del teléfono con el número del
// cuidador y el texto ya escritos. El texto lleva un enlace de Google Maps con la ubicación.
export function enlaceSms(cuidador: Cuidador, ubicacion: Ubicacion): string {
  const mapa = `https://maps.google.com/?q=${ubicacion.lat.toFixed(6)},${ubicacion.lng.toFixed(6)}`;
  const mensaje = `Necesito ayuda. Esta es mi ubicación: ${mapa} (enviado desde HelpHealth)`;
  const numero = cuidador.telefono.replace(/[^\d+]/g, ''); // quita espacios y guiones

  return `sms:${numero}?body=${encodeURIComponent(mensaje)}`;
}
