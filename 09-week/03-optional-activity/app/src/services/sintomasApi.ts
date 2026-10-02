// Funciones para consumir la API de HelpHealth con fetch.
// La app NO guarda ni valida los datos: solo pide y envía al servidor.

const API_URL = "http://localhost:3000";

export interface Sintoma {
  id: number;
  fecha: string;
  tipo: string;
  contenido: string;
}

// Lista todos los registros de síntomas (GET /sintomas)
export async function listarSintomas(): Promise<Sintoma[]> {
  try {
    const resp = await fetch(`${API_URL}/sintomas`);
    if (!resp.ok) {
      throw new Error(`Error del servidor (${resp.status})`);
    }
    return await resp.json();
  } catch (error) {
    // Si el servidor está apagado o no hay red, fetch lanza TypeError
    if (error instanceof TypeError) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
}

// Trae un solo registro por su id (GET /sintomas/:id)
export async function obtenerSintoma(id: string): Promise<Sintoma> {
  try {
    const resp = await fetch(`${API_URL}/sintomas/${id}`);
    const datos = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      // El servidor responde { error: "..." } si el id no existe (404)
      throw new Error(datos.error || `Error del servidor (${resp.status})`);
    }
    return datos;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
}

// Crea un nuevo registro de síntoma (POST /sintomas)
export async function crearSintoma(contenido: string): Promise<Sintoma> {
  try {
    const resp = await fetch(`${API_URL}/sintomas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: "texto", contenido }),
    });
    const datos = await resp.json().catch(() => ({})); // por si la respuesta no es JSON
    if (!resp.ok) {
      // El servidor responde { error: "..." } cuando algo sale mal (ej. 400)
      throw new Error(datos.error || `Error del servidor (${resp.status})`);
    }
    return datos;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
}
