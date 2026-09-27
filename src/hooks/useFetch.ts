import { useEffect, useState } from 'react'
import { fetchJson } from '../services/api'

interface FetchResult<T> {
  url: string // URL a la que corresponde este resultado
  data: T | null
  error: string | null
}

// Custom hook para no repetir en cada página la misma lógica de
// "pedir datos + loading + error". Recibe la URL que hay que cargar
// (o null si todavía no hay nada que pedir) y vuelve a pedir cuando cambia.
export function useFetch<T>(url: string | null) {
  const [result, setResult] = useState<FetchResult<T> | null>(null)

  useEffect(() => {
    if (url === null) return

    // Si la URL cambia antes de que llegue la respuesta (por ejemplo, el usuario
    // pasa de página rápido), ignoramos la respuesta antigua.
    let ignore = false

    fetchJson<T>(url)
      .then((data) => {
        if (!ignore) setResult({ url, data, error: null })
      })
      .catch((error: Error) => {
        if (!ignore) setResult({ url, data: null, error: error.message })
      })

    return () => {
      ignore = true
    }
  }, [url])

  // El resultado guardado solo vale si es de la URL actual.
  // Si no lo es, significa que la petición de la URL actual sigue en curso.
  const isCurrent = url !== null && result?.url === url

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: url !== null && !isCurrent,
    notFound: isCurrent && result.data === null && result.error === null,
  }
}
