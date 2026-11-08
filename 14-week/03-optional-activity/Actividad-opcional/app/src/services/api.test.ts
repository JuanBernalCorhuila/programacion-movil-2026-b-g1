// Prueba unitaria de services/api.ts: la pieza que decide qué hacer con el token,
// con el 401 y con la falta de internet. Se prueba sola, sin red real ni teléfono:
// el plugin de red, el almacenamiento del token y fetch se reemplazan por versiones falsas.
import { beforeEach, expect, test, vi } from 'vitest';
import { Network } from '@capacitor/network';
import { cuandoSePierdaLaSesion, pedir } from './api';
import { borrarToken, obtenerToken } from './tokenStorage';

vi.mock('@capacitor/network', () => ({
  Network: { getStatus: vi.fn() },
}));

vi.mock('./tokenStorage', () => ({
  obtenerToken: vi.fn(),
  borrarToken: vi.fn(),
}));

const fetchFalso = vi.fn();
const alPerderSesion = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('fetch', fetchFalso);
  vi.mocked(Network.getStatus).mockResolvedValue({ connected: true, connectionType: 'wifi' });
  cuandoSePierdaLaSesion(alPerderSesion);
});

test('un 401 en una ruta protegida borra el token y manda al usuario al login', async () => {
  vi.mocked(obtenerToken).mockResolvedValue('token-vencido');
  fetchFalso.mockResolvedValue(
    new Response(JSON.stringify({ error: 'Tu sesión venció' }), { status: 401 })
  );

  await expect(pedir('/medicamentos')).rejects.toThrow('Tu sesión venció');

  expect(borrarToken).toHaveBeenCalledTimes(1); // el token que ya no sirve se elimina
  expect(alPerderSesion).toHaveBeenCalledWith('vencida'); // y se avisa para ir al login
});

test('sin internet no se hace la petición y se explica el problema', async () => {
  vi.mocked(Network.getStatus).mockResolvedValue({ connected: false, connectionType: 'none' });

  await expect(pedir('/medicamentos')).rejects.toThrow('No tienes conexión a internet');

  expect(fetchFalso).not.toHaveBeenCalled(); // ni siquiera se intenta llamar a la API
});

test('la petición protegida envía el token en la cabecera Authorization', async () => {
  vi.mocked(obtenerToken).mockResolvedValue('token-valido');
  fetchFalso.mockResolvedValue(new Response(JSON.stringify([{ id: 1 }]), { status: 200 }));

  const datos = await pedir('/medicamentos');

  const cabeceras = fetchFalso.mock.calls[0][1].headers as Headers;
  expect(cabeceras.get('Authorization')).toBe('Bearer token-valido');
  expect(datos).toEqual([{ id: 1 }]);
});
