// Inicio de sesión: pide el token a la API y lo guarda en el almacenamiento seguro.
import { pedir } from './api';
import { guardarToken } from './tokenStorage';

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
}
