// Endpoints del registro de síntomas. La URL, el token y los errores los maneja api.ts.
import { pedir } from './api';

// Entidad RegistroSintoma del modelo de datos (el usuario dueño lo pone el servidor)
export interface Sintoma {
  id: number;
  fecha: string; // fecha y hora en formato ISO, la pone el servidor
  tipo: string;
  contenido: string;
}

// GET /sintomas -> historial del usuario, del más reciente al más antiguo
export function listarSintomas(): Promise<Sintoma[]> {
  return pedir<Sintoma[]>('/sintomas');
}

// POST /sintomas -> guarda cómo se siente el usuario hoy
export function crearSintoma(contenido: string): Promise<Sintoma> {
  return pedir<Sintoma>('/sintomas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contenido }),
  });
}
