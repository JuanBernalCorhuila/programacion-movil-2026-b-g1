import { beforeEach, describe, expect, it } from 'vitest';
import { createEmptyUserForm, readUsers, registerUser } from '@/core/userService';

describe('userService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe crear un formulario vacío', () => {
    expect(createEmptyUserForm()).toEqual({
      nombre: '',
      identificacion: '',
      email: '',
      telefono: '',
      ciudad: '',
      direccion: '',
      password: '',
    });
  });

  it('debe registrar un usuario y guardarlo en memoria local', () => {
    const user = {
      nombre: 'Ana García',
      identificacion: '123456',
      email: 'ana@test.com',
      telefono: '3001234567',
      ciudad: 'Bogotá',
      direccion: 'Carrera 1 # 2-3',
      password: 'secret123',
    };

    const result = registerUser(user);

    expect(result).toEqual(user);
    expect(readUsers()).toEqual([user]);
    expect(JSON.parse(localStorage.getItem('registered_users') ?? '[]')).toEqual([user]);
  });

  it('debe devolver una lista vacía cuando no hay usuarios registrados', () => {
    expect(readUsers()).toEqual([]);
  });
});
