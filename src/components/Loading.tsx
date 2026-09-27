interface LoadingProps {
  message?: string
}

function Loading({ message = 'Cargando...' }: LoadingProps) {
  return (
    <div className="notice" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default Loading
