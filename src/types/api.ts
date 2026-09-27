// Tipos basados en las respuestas reales de https://rickandmortyapi.com/api

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

// Origen y localización tal y como vienen dentro de un personaje.
// Si se desconocen, la API devuelve name: "unknown" y url: "".
export interface Location {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string // suele venir vacío ("")
  gender: CharacterGender
  origin: Location
  location: Location
  image: string
  episode: string[] // URLs de los episodios
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string // código, por ejemplo "S01E01"
  characters: string[] // URLs de los personajes
  url: string
  created: string
}

// Información de paginación que acompaña a los listados.
export interface ApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface APIResponse<T> {
  info: ApiInfo
  results: T[]
}

// Datos mínimos para pintar una tarjeta. Es también lo que guardamos en favoritos.
export type CharacterSummary = Pick<
  Character,
  'id' | 'name' | 'image' | 'status' | 'species' | 'gender'
>

// Valores que acepta el parámetro ?status= de la API ('' = todos).
export type StatusFilter = '' | 'alive' | 'dead' | 'unknown'

export interface CharacterFilters {
  name: string
  status: StatusFilter
  species: string
}
