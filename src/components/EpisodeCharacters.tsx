import { useFetch } from '../hooks/useFetch'
import { charactersByIdsUrl, getIdsFromUrls } from '../services/api'
import type { Character, CharacterSummary, Episode } from '../types/api'
import CharacterList from './CharacterList'
import ErrorMessage from './ErrorMessage'
import Loading from './Loading'

interface EpisodeCharactersProps {
  episode: Episode
  isFavorite: (id: number) => boolean
  onSelectCharacter: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

// Personajes de un episodio. El episodio solo trae URLs, así que los pedimos
// todos en una única petición y reutilizamos CharacterList para pintarlos.
function EpisodeCharacters({
  episode,
  isFavorite,
  onSelectCharacter,
  onToggleFavorite,
}: EpisodeCharactersProps) {
  const { data, loading, error } = useFetch<Character[]>(
    charactersByIdsUrl(getIdsFromUrls(episode.characters)),
  )

  if (loading) return <Loading message="Cargando personajes..." />
  if (error) return <ErrorMessage message={error} />
  if (!data) return null

  return (
    <CharacterList
      characters={data}
      isFavorite={isFavorite}
      onSelectCharacter={onSelectCharacter}
      onToggleFavorite={onToggleFavorite}
    />
  )
}

export default EpisodeCharacters
