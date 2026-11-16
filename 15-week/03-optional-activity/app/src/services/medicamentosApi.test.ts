// Pruebas unitarias de la optimización: listarMedicamentos guarda una copia de la lista
// para no repetir llamadas a la API. Se prueba sin servidor: pedir() se reemplaza por una
// versión falsa que cuenta cuántas veces se la llama.
import { beforeEach, expect, test, vi } from 'vitest';
import { pedir } from './api';
import { borrarCopia } from './cacheMedicamentos';
import { crearMedicamento, listarMedicamentos, obtenerMedicamento } from './medicamentosApi';

vi.mock('./api', () => ({
  pedir: vi.fn(),
}));

const losartan = { id: 1, nombre: 'Losartán', horario: '08:00', dosis: '1 tableta', estado_confirmacion: 'pendiente' };
const vitaminaD = { id: 2, nombre: 'Vitamina D', horario: '13:00', dosis: '1 cápsula', estado_confirmacion: 'tomado' };
const lista = [losartan, vitaminaD];

beforeEach(() => {
  vi.clearAllMocks();
  borrarCopia(); // cada prueba empieza sin nada guardado
});

test('pedir la lista otra vez o abrir un detalle no vuelve a llamar a la API', async () => {
  vi.mocked(pedir).mockResolvedValue(lista);

  await listarMedicamentos(); // única llamada real
  const otraVez = await listarMedicamentos(); // sale de la copia en memoria
  const detalle = await obtenerMedicamento('2'); // también sale de la copia

  expect(pedir).toHaveBeenCalledTimes(1);
  expect(otraVez).toEqual(lista);
  expect(detalle).toEqual(vitaminaD);
});

test('después de crear un medicamento la lista se pide de nuevo y no muestra datos viejos', async () => {
  const nuevo = { id: 3, nombre: 'Terapia física', horario: '16:00', dosis: '30 min', estado_confirmacion: 'pendiente' };
  vi.mocked(pedir)
    .mockResolvedValueOnce(lista) // 1. primera lista
    .mockResolvedValueOnce(nuevo) // 2. POST que crea el medicamento
    .mockResolvedValueOnce([...lista, nuevo]); // 3. lista actualizada

  await listarMedicamentos();
  await crearMedicamento({ nombre: nuevo.nombre, horario: nuevo.horario, dosis: nuevo.dosis });
  const actualizada = await listarMedicamentos();

  expect(pedir).toHaveBeenCalledTimes(3); // se volvió a pedir la lista en lugar de usar la copia vieja
  expect(actualizada).toHaveLength(3);
  expect(actualizada).toContainEqual(nuevo);
});
