import { useEffect, useState } from 'react'
import type { CharacterSummary } from '../types/api'

const STORAGE_KEY = 'rick-morty-favorites'

// Lee los favoritos guardados. Si no hay nada o el contenido no es válido,
// empezamos con una lista vacía.
function loadFavorites(): CharacterSummary[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as CharacterSummary[]) : []
  } catch {
    return []
  }
}

// Custom hook que agrupa el estado de favoritos y su persistencia en localStorage.
// Se usa una sola vez (en App) y App pasa los datos por props a quien los necesite.
export function useFavorites() {
  // Inicialización perezosa: localStorage se lee solo en el primer render.
  const [favorites, setFavorites] = useState<CharacterSummary[]>(loadFavorites)

  // Cada vez que cambian los favoritos, los guardamos.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function isFavorite(id: number): boolean {
    return favorites.some((favorite) => favorite.id === id)
  }

  // Añade o quita. Guardamos solo los campos que necesita una tarjeta,
  // no el personaje completo (con su lista de episodios, fechas, etc.).
  function toggleFavorite(character: CharacterSummary) {
    if (isFavorite(character.id)) {
      setFavorites(favorites.filter((favorite) => favorite.id !== character.id))
    } else {
      const { id, name, image, status, species, gender } = character
      setFavorites([...favorites, { id, name, image, status, species, gender }])
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}
