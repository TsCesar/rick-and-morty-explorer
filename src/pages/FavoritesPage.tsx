import CharacterList from '../components/CharacterList'
import EmptyState from '../components/EmptyState'
import type { CharacterSummary } from '../types/api'

interface FavoritesPageProps {
  favorites: CharacterSummary[]
  isFavorite: (id: number) => boolean
  onSelectCharacter: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

// No llama a la API: los favoritos ya están en el estado (y en localStorage).
function FavoritesPage({
  favorites,
  isFavorite,
  onSelectCharacter,
  onToggleFavorite,
}: FavoritesPageProps) {
  return (
    <section aria-labelledby="favorites-title">
      <h2 id="favorites-title" className="page-title">
        Favoritos
      </h2>

      {favorites.length === 0 ? (
        <EmptyState message="Todavía no tienes favoritos. Pulsa la estrella de un personaje para añadirlo." />
      ) : (
        <>
          <p className="results-count">{favorites.length} personajes guardados</p>
          <CharacterList
            characters={favorites}
            isFavorite={isFavorite}
            onSelectCharacter={onSelectCharacter}
            onToggleFavorite={onToggleFavorite}
          />
        </>
      )}
    </section>
  )
}

export default FavoritesPage
