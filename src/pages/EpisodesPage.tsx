import { useState } from 'react'
import EpisodeCharacters from '../components/EpisodeCharacters'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { useFetch } from '../hooks/useFetch'
import { episodesUrl } from '../services/api'
import type { APIResponse, CharacterSummary, Episode } from '../types/api'

interface EpisodesPageProps {
  isFavorite: (id: number) => boolean
  onSelectCharacter: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

function EpisodesPage({ isFavorite, onSelectCharacter, onToggleFavorite }: EpisodesPageProps) {
  const [page, setPage] = useState(1)
  // Episodio desplegado para ver sus personajes (null = ninguno).
  const [openEpisodeId, setOpenEpisodeId] = useState<number | null>(null)

  const { data, loading, error } = useFetch<APIResponse<Episode>>(episodesUrl(page))

  function handlePageChange(newPage: number) {
    setPage(newPage)
    setOpenEpisodeId(null)
    window.scrollTo({ top: 0 })
  }

  function toggleEpisode(id: number) {
    setOpenEpisodeId(openEpisodeId === id ? null : id)
  }

  return (
    <section aria-labelledby="episodes-title">
      <h2 id="episodes-title" className="page-title">
        Episodios
      </h2>

      {loading && <Loading message="Cargando episodios..." />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <>
          <ul className="episodes">
            {data.results.map((episode) => {
              const isOpen = openEpisodeId === episode.id
              return (
                <li key={episode.id} className="episode">
                  <div className="episode__header">
                    <span className="episode-code">{episode.episode}</span>
                    <div className="episode__text">
                      <h3 className="episode__name">{episode.name}</h3>
                      <p className="episode__date">{episode.air_date}</p>
                    </div>
                    <button
                      type="button"
                      className="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleEpisode(episode.id)}
                    >
                      {isOpen ? 'Ocultar personajes' : `Ver personajes (${episode.characters.length})`}
                    </button>
                  </div>

                  {isOpen && (
                    <EpisodeCharacters
                      episode={episode}
                      isFavorite={isFavorite}
                      onSelectCharacter={onSelectCharacter}
                      onToggleFavorite={onToggleFavorite}
                    />
                  )}
                </li>
              )
            })}
          </ul>
          <Pagination page={page} totalPages={data.info.pages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  )
}

export default EpisodesPage
