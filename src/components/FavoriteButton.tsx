interface FavoriteButtonProps {
  name: string
  isFavorite: boolean
  onToggle: () => void
  showLabel?: boolean // en el detalle mostramos también el texto
}

function FavoriteButton({ name, isFavorite, onToggle, showLabel = false }: FavoriteButtonProps) {
  const label = isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'

  return (
    <button
      type="button"
      className={`fav-button ${showLabel ? 'fav-button--labeled' : ''}`}
      aria-pressed={isFavorite}
      aria-label={showLabel ? undefined : `${label}: ${name}`}
      title={label}
      onClick={onToggle}
    >
      <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
      {showLabel && <span>{label}</span>}
    </button>
  )
}

export default FavoriteButton
