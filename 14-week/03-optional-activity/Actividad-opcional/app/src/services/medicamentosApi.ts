// Endpoints de medicamentos. La URL, el token y los errores los maneja api.ts.
// La app no guarda ni valida los datos: solo los pide y los envía al servidor.
import { pedir } from './api';
import { borrarCopia, guardarCopia, leerCopia } from './cacheMedicamentos';

export interface Medicamento {
  id: number;
  nombre: string;
  horario: string;
  dosis: string;
  estado_confirmacion: string;
}

// Lo que el usuario escribe en el formulario; el id, el dueño y el estado los pone el servidor
export interface NuevoMedicamento {
  nombre: string;
  horario: string;
  dosis: string;
}

// GET /medicamentos -> los medicamentos del usuario que inició sesión.
// Si la lista se pidió hace poco, se reutiliza la copia y no se llama otra vez a la API.
export async function listarMedicamentos(): Promise<Medicamento[]> {
  const guardada = leerCopia();
  if (guardada) {
    return guardada;
  }
  const lista = await pedir<Medicamento[]>('/medicamentos');
  guardarCopia(lista);
  return lista;
}

// GET /medicamentos/:id -> un solo medicamento.
// Si la lista ya está en memoria, el medicamento está ahí: no hace falta otra llamada.
export async function obtenerMedicamento(id: string): Promise<Medicamento> {
  const enLista = leerCopia()?.find((m) => String(m.id) === id);
  if (enLista) {
    return enLista;
  }
  return pedir<Medicamento>(`/medicamentos/${id}`);
}

// POST /medicamentos -> crea un medicamento nuevo
// La lista guardada queda vieja (le falta el nuevo), así que se borra para volver a pedirla.
export async function crearMedicamento(medicamento: NuevoMedicamento): Promise<Medicamento> {
  const nuevo = await pedir<Medicamento>('/medicamentos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
  borrarCopia();
  return nuevo;
}
