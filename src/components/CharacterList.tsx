import type { CharacterSummary } from '../types/api'
import CharacterCard from './CharacterCard'

interface CharacterListProps {
  characters: CharacterSummary[]
  isFavorite: (id: number) => boolean
  onSelectCharacter: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

// Cuadrícula de tarjetas. Se reutiliza en Personajes, Favoritos y Episodios.
function CharacterList({
  characters,
  isFavorite,
  onSelectCharacter,
  onToggleFavorite,
}: CharacterListProps) {
  return (
    <ul className="character-grid">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard
            character={character}
            isFavorite={isFavorite(character.id)}
            onSelect={onSelectCharacter}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}

export default CharacterList
