// Funciones para consumir la API de HelpHealth con fetch.
// La app no guarda ni valida los datos: solo los pide y los envía al servidor.

const API_URL = 'http://localhost:3000';

export interface Medicamento {
  id: number;
  nombre: string;
  horario: string;
  dosis: string;
  estado_confirmacion: string;
}

// Lo que el usuario escribe en el formulario; el id y el estado los pone el servidor
export interface NuevoMedicamento {
  nombre: string;
  horario: string;
  dosis: string;
}

// Hace la petición y convierte los dos tipos de fallo en un Error con un mensaje claro:
// - fetch lanza TypeError cuando no logra conectarse (servidor apagado o sin red).
// - Si el servidor responde 400, 404 o 500, fetch NO lanza error: hay que revisar resp.ok.
async function pedir<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  let resp: Response;
  try {
    resp = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  const datos = await resp.json().catch(() => ({})); // por si la respuesta no es JSON
  if (!resp.ok) {
    // La API responde { error: "..." } cuando algo sale mal
    throw new Error(datos.error || `Error del servidor (${resp.status})`);
  }
  return datos;
}

// GET /medicamentos -> lista todos los medicamentos
export function listarMedicamentos(): Promise<Medicamento[]> {
  return pedir<Medicamento[]>('/medicamentos');
}

// GET /medicamentos/:id -> un solo medicamento
export function obtenerMedicamento(id: string): Promise<Medicamento> {
  return pedir<Medicamento>(`/medicamentos/${id}`);
}

// POST /medicamentos -> crea un medicamento nuevo
export function crearMedicamento(medicamento: NuevoMedicamento): Promise<Medicamento> {
  return pedir<Medicamento>('/medicamentos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
}
