// Inicio de sesión: pide el token a la API y lo guarda en el almacenamiento seguro.
import { pedir } from './api';
import { borrarCopia } from './cacheMedicamentos';
import { borrarToken, guardarToken } from './tokenStorage';

// POST /login -> { token }
export async function iniciarSesion(correo: string, clave: string): Promise<void> {
  const { token } = await pedir<{ token: string }>(
    '/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, clave }),
    },
    false // el login es público: todavía no hay token que enviar
  );
  await guardarToken(token);
  borrarCopia(); // la lista guardada podría ser de otra persona o de una sesión anterior
}

// Cerrar sesión: se borra el token guardado y la copia de la lista (para que la siguiente
// persona en este teléfono no vea medicamentos ajenos). El servidor no guarda sesiones,
// así que no hay nada que avisarle.
export function cerrarSesion(): Promise<void> {
  borrarCopia();
  return borrarToken();
}
