// Prueba unitaria de alertaCuidador.ts: el mensaje que recibe el cuidador en una emergencia.
// Si este enlace sale mal, el cuidador recibe un número equivocado o un mapa sin la ubicación.
import { expect, test } from 'vitest';
import { enlaceSms } from './alertaCuidador';

const cuidador = { nombre: 'Carlos', telefono: '300 123-4567' };
const ubicacion = { lat: 2.9273, lng: -75.2819 }; // Neiva

test('el enlace abre un SMS al número del cuidador, sin espacios ni guiones', () => {
  const enlace = enlaceSms(cuidador, ubicacion);

  expect(enlace.startsWith('sms:3001234567?body=')).toBe(true);
});

test('el mensaje lleva un enlace de Google Maps con la ubicación', () => {
  const enlace = enlaceSms(cuidador, ubicacion);
  const mensaje = decodeURIComponent(enlace.split('?body=')[1]);

  expect(mensaje).toContain('Necesito ayuda');
  expect(mensaje).toContain('https://maps.google.com/?q=2.927300,-75.281900');
});
