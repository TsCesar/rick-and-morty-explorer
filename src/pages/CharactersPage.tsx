import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import SearchForm from '../components/SearchForm'
import { useFetch } from '../hooks/useFetch'
import { charactersUrl, EMPTY_FILTERS } from '../services/api'
import type { APIResponse, Character, CharacterFilters, CharacterSummary } from '../types/api'

interface CharactersPageProps {
  isFavorite: (id: number) => boolean
  onSelectCharacter: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

function CharactersPage({ isFavorite, onSelectCharacter, onToggleFavorite }: CharactersPageProps) {
  const [filters, setFilters] = useState<CharacterFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)

  // La URL depende de los filtros y de la página: si cualquiera cambia,
  // useFetch hace una petición nueva.
  const { data, loading, error, notFound } = useFetch<APIResponse<Character>>(
    charactersUrl(filters, page),
  )

  // Una búsqueda nueva siempre empieza en la página 1.
  function handleSearch(newFilters: CharacterFilters) {
    setFilters(newFilters)
    setPage(1)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    window.scrollTo({ top: 0 })
  }

  return (
    <section aria-labelledby="characters-title">
      <h2 id="characters-title" className="page-title">
        Personajes
      </h2>

      <SearchForm filters={filters} onSearch={handleSearch} />

      {loading && <Loading message="Cargando personajes..." />}
      {error && <ErrorMessage message={error} />}
      {notFound && <EmptyState message="No se encontraron personajes con esos criterios." />}

      {data && (
        <>
          <p className="results-count">{data.info.count} personajes encontrados</p>
          <CharacterList
            characters={data.results}
            isFavorite={isFavorite}
            onSelectCharacter={onSelectCharacter}
            onToggleFavorite={onToggleFavorite}
          />
          <Pagination page={page} totalPages={data.info.pages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  )
}

export default CharactersPage
