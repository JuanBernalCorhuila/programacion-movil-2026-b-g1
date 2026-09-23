const BASE_URL = 'https://rickandmortyapi.com/api';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return (await response.json()) as T;
};

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_URL}/character`);
    const data = await handleResponse<CharactersResponse>(response);

    return data.results;
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return [];
  }
};

export const getCharacterById = async (id: number): Promise<Character | null> => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    return await handleResponse<Character>(response);
  } catch (error) {
    console.error(`Error al obtener personaje con id ${id}:`, error);
    return null;
  }
};

export const searchCharactersByName = async (name: string): Promise<Character[]> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/character/?name=${encodeURIComponent(trimmedName)}`);
    const data = await handleResponse<CharactersResponse>(response);

    return data.results;
  } catch (error) {
    console.error(`Error al buscar personajes por nombre: ${trimmedName}`, error);
    return [];
  }
};

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch(`${BASE_URL}/location`);
    const data = await handleResponse<{ results: Location[] }>(response);

    return data.results;
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    return [];
  }
};

export const getEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await fetch(`${BASE_URL}/episode`);
    const data = await handleResponse<{ results: Episode[] }>(response);

    return data.results;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
    return [];
  }
};
