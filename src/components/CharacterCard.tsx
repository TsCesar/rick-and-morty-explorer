import type { CharacterSummary } from '../types/api'
import FavoriteButton from './FavoriteButton'
import StatusBadge from './StatusBadge'

interface CharacterCardProps {
  character: CharacterSummary
  isFavorite: boolean
  onSelect: (id: number) => void
  onToggleFavorite: (character: CharacterSummary) => void
}

// Tarjeta de un personaje. Tiene dos acciones separadas (dos botones reales):
// abrir el detalle y marcar/desmarcar como favorito.
function CharacterCard({ character, isFavorite, onSelect, onToggleFavorite }: CharacterCardProps) {
  return (
    <article className={`card ${isFavorite ? 'card--favorite' : ''}`}>
      <button
        type="button"
        className="card__main"
        onClick={() => onSelect(character.id)}
        aria-label={`Ver detalle de ${character.name}`}
      >
        <img
          className="card__image"
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          loading="lazy"
        />
        <span className="card__body">
          <span className="card__name">{character.name}</span>
          <StatusBadge status={character.status} />
          <span className="card__meta">
            {character.species} · {character.gender}
          </span>
        </span>
      </button>

      <div className="card__fav">
        <FavoriteButton
          name={character.name}
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(character)}
        />
      </div>
    </article>
  )
}

export default CharacterCard
