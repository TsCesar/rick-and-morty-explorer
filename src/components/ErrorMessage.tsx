interface ErrorMessageProps {
  message: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="notice notice--error" role="alert">
      <p className="notice__title">Algo ha salido mal</p>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
