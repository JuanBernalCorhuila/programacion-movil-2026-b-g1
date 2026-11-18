// Copia en memoria de la lista de medicamentos.
// Sirve para no pedirle a la API los mismos datos una y otra vez mientras la persona
// va de la lista al detalle y vuelve. La copia se pierde al cerrar la app.
import type { Medicamento } from './medicamentosApi';

// Cuánto tiempo se considera "fresca" la copia. Con 0 nunca se reutiliza,
// que es como se comportaba la app antes de optimizar (útil para comparar).
export const VIGENCIA_MS = 60_000;

let copia: { datos: Medicamento[]; guardadaEn: number } | null = null;

export function guardarCopia(datos: Medicamento[]): void {
  copia = { datos, guardadaEn: Date.now() };
}

// Devuelve la lista guardada si todavía está vigente; si venció o no hay, devuelve null
export function leerCopia(): Medicamento[] | null {
  if (copia && Date.now() - copia.guardadaEn < VIGENCIA_MS) {
    return copia.datos;
  }
  return null;
}

// Se llama cuando los datos guardados dejan de ser confiables
// (se creó un medicamento, o se inició o cerró sesión)
export function borrarCopia(): void {
  copia = null;
}
