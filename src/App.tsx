import { useState } from 'react'
import CharacterDetail from './components/CharacterDetail'
import Header from './components/Header'
import type { View } from './components/Header'
import { useFavorites } from './hooks/useFavorites'
import CharactersPage from './pages/CharactersPage'
import EpisodesPage from './pages/EpisodesPage'
import FavoritesPage from './pages/FavoritesPage'

// App solo coordina: qué vista se ve, qué personaje está abierto y los favoritos.
// Cada página se encarga de sus propios datos.
function App() {
  const [view, setView] = useState<View>('characters')
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null)
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  function handleChangeView(newView: View) {
    setView(newView)
    setSelectedCharacterId(null)
  }

  function handleSelectCharacter(id: number) {
    setSelectedCharacterId(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <Header view={view} favoritesCount={favorites.length} onChangeView={handleChangeView} />

      <main className="container main">
        {selectedCharacterId !== null && (
          <CharacterDetail
            id={selectedCharacterId}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedCharacterId(null)}
          />
        )}

        {/* Mientras se ve el detalle, la página se oculta pero NO se desmonta:
            así, al volver, conserva la búsqueda, los filtros y la página actual. */}
        <div hidden={selectedCharacterId !== null}>
          {view === 'characters' && (
            <CharactersPage
              isFavorite={isFavorite}
              onSelectCharacter={handleSelectCharacter}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {view === 'episodes' && (
            <EpisodesPage
              isFavorite={isFavorite}
              onSelectCharacter={handleSelectCharacter}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {view === 'favorites' && (
            <FavoritesPage
              favorites={favorites}
              isFavorite={isFavorite}
              onSelectCharacter={handleSelectCharacter}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <p className="container">
          Datos de{' '}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
            The Rick and Morty API
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
