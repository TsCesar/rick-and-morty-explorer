import { useState } from 'react'
import type { FormEvent } from 'react'
import { EMPTY_FILTERS } from '../services/api'
import type { CharacterFilters, StatusFilter } from '../types/api'

interface SearchFormProps {
  filters: CharacterFilters // filtros aplicados ahora mismo
  onSearch: (filters: CharacterFilters) => void
}

// Formulario controlado. Lo que el usuario escribe se guarda en "draft"
// y solo se aplica (y se llama a la API) al pulsar Buscar, no en cada tecla.
function SearchForm({ filters, onSearch }: SearchFormProps) {
  const [draft, setDraft] = useState<CharacterFilters>(filters)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch({
      name: draft.name.trim(),
      status: draft.status,
      species: draft.species.trim(),
    })
  }

  function handleClear() {
    setDraft(EMPTY_FILTERS)
    onSearch(EMPTY_FILTERS)
  }

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <div className="field field--wide">
        <label htmlFor="search-name">Nombre</label>
        <input
          id="search-name"
          type="search"
          placeholder="Ej: Rick"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="search-status">Estado</label>
        <select
          id="search-status"
          value={draft.status}
          onChange={(event) =>
            setDraft({ ...draft, status: event.target.value as StatusFilter })
          }
        >
          <option value="">Todos</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="search-species">Especie</label>
        <input
          id="search-species"
          type="text"
          placeholder="Ej: Human, Alien"
          list="species-suggestions"
          value={draft.species}
          onChange={(event) => setDraft({ ...draft, species: event.target.value })}
        />
        <datalist id="species-suggestions">
          <option value="Human" />
          <option value="Alien" />
          <option value="Humanoid" />
          <option value="Robot" />
          <option value="Animal" />
        </datalist>
      </div>

      <div className="search__actions">
        <button type="submit" className="button button--primary">
          Buscar
        </button>
        <button type="button" className="button" onClick={handleClear}>
          Limpiar
        </button>
      </div>
    </form>
  )
}

export default SearchForm
