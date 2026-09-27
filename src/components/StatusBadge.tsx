import type { CharacterStatus } from '../types/api'

interface StatusBadgeProps {
  status: CharacterStatus
}

// Muestra el estado con un punto de color (verde, rojo o gris según el estado).
function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status status--${status.toLowerCase()}`}>
      {status === 'unknown' ? 'Unknown' : status}
    </span>
  )
}

export default StatusBadge
