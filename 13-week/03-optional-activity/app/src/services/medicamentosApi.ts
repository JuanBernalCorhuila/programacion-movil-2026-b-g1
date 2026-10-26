// Endpoints de medicamentos. La URL, el token y los errores los maneja api.ts.
// La app no guarda ni valida los datos: solo los pide y los envía al servidor.
import { pedir } from './api';

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

// GET /medicamentos -> los medicamentos del usuario que inició sesión
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
