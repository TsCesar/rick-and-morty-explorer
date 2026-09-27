import { useFetch } from '../hooks/useFetch'
import { characterUrl, episodesByIdsUrl, getIdsFromUrls } from '../services/api'
import type { Character, CharacterSummary, Episode } from '../types/api'
import EmptyState from './EmptyState'
import ErrorMessage from './ErrorMessage'
import FavoriteButton from './FavoriteButton'
import Loading from './Loading'
import StatusBadge from './StatusBadge'

interface CharacterDetailProps {
  id: number
  isFavorite: (id: number) => boolean
  onToggleFavorite: (character: CharacterSummary) => void
  onBack: () => void
}

function CharacterDetail({ id, isFavorite, onToggleFavorite, onBack }: CharacterDetailProps) {
  const { data: character, loading, error, notFound } = useFetch<Character>(characterUrl(id))

  // Segunda petición: el personaje solo trae las URLs de sus episodios, así que
  // cuando lo tenemos pedimos todos esos episodios de una vez. Mientras no
  // haya personaje pasamos null y el hook no hace nada.
  const episodes = useFetch<Episode[]>(
    character ? episodesByIdsUrl(getIdsFromUrls(character.episode)) : null,
  )

  return (
    <section className="detail" aria-label="Detalle del personaje">
      <button type="button" className="button detail__back" onClick={onBack}>
        ← Volver
      </button>

      {loading && <Loading message="Cargando personaje..." />}
      {error && <ErrorMessage message={error} />}
      {notFound && <EmptyState message="No se ha encontrado este personaje." />}

      {character && (
        <>
          <div className="detail__main">
            <img
              className="detail__image"
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
            />

            <div className="detail__info">
              <h2 className="detail__name">{character.name}</h2>
              <StatusBadge status={character.status} />

              <dl className="detail__data">
                <div>
                  <dt>Especie</dt>
                  <dd>{character.species}</dd>
                </div>
                <div>
                  <dt>Género</dt>
                  <dd>{character.gender}</dd>
                </div>
                {character.type && (
                  <div>
                    <dt>Tipo</dt>
                    <dd>{character.type}</dd>
                  </div>
                )}
                <div>
                  <dt>Origen</dt>
                  <dd>{character.origin.name}</dd>
                </div>
                <div>
                  <dt>Localización actual</dt>
                  <dd>{character.location.name}</dd>
                </div>
              </dl>

              <FavoriteButton
                name={character.name}
                isFavorite={isFavorite(character.id)}
                onToggle={() => onToggleFavorite(character)}
                showLabel
              />
            </div>
          </div>

          <h3 className="section-title">
            Episodios en los que aparece ({character.episode.length})
          </h3>

          {episodes.loading && <Loading message="Cargando episodios..." />}
          {episodes.error && <ErrorMessage message={episodes.error} />}
          {episodes.data && (
            <ul className="episode-list">
              {episodes.data.map((episode) => (
                <li key={episode.id} className="episode-list__item">
                  <span className="episode-code">{episode.episode}</span>
                  <span className="episode-list__name">{episode.name}</span>
                  <span className="episode-list__date">{episode.air_date}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default CharacterDetail
