import type { CharacterFilters } from '../types/api'

// Todas las URLs de la API se construyen aquí, y fetchJson es el único sitio
// de la aplicación donde se llama a fetch.

const BASE_URL = 'https://rickandmortyapi.com/api'

// Filtros vacíos = listado inicial sin búsqueda.
export const EMPTY_FILTERS: CharacterFilters = { name: '', status: '', species: '' }

// Listado paginado de personajes. Solo añadimos los filtros que tienen valor.
// La API busca coincidencias parciales: name=ric encuentra "Rick".
export function charactersUrl(filters: CharacterFilters, page: number): string {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.name) params.set('name', filters.name)
  if (filters.status) params.set('status', filters.status)
  if (filters.species) params.set('species', filters.species)
  return `${BASE_URL}/character?${params}`
}

export function characterUrl(id: number): string {
  return `${BASE_URL}/character/${id}`
}

// Varios personajes en una sola petición. Con la sintaxis [1,2,3] la API
// devuelve siempre un array, aunque solo pidamos un id.
export function charactersByIdsUrl(ids: number[]): string {
  return `${BASE_URL}/character/[${ids.join(',')}]`
}

export function episodesUrl(page: number): string {
  return `${BASE_URL}/episode?page=${page}`
}

export function episodesByIdsUrl(ids: number[]): string {
  return `${BASE_URL}/episode/[${ids.join(',')}]`
}

// Los personajes guardan sus episodios como URLs (".../episode/28")
// y los episodios guardan sus personajes igual. Nos quedamos con el id final.
export function getIdsFromUrls(urls: string[]): number[] {
  return urls.map((url) => Number(url.split('/').pop()))
}

// Hace la petición y devuelve el JSON.
// Un 404 significa "no hay resultados", así que devolvemos null en lugar de fallar.
// El resto de problemas lanzan un error con un mensaje apto para el usuario.
export async function fetchJson<T>(url: string): Promise<T | null> {
  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'No se ha podido conectar con la API. Revisa tu conexión e inténtalo de nuevo.',
    )
  }

  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error('La API no está disponible en este momento. Inténtalo más tarde.')
  }
  return response.json() as Promise<T>
}
