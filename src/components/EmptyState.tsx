interface EmptyStateProps {
  message: string
}

// Para "no hay resultados": no es un error, así que se muestra de forma neutra.
function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="notice" role="status">
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
