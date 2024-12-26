import { useEffect } from 'react'

import { useErrorBoundary } from '../hooks/use-error-boundary'

export const ErrorLogger = () => {
  const { error } = useErrorBoundary()

  useEffect(() => {
    if (error) {
      console.error('Logging error:', error)
    }
  }, [error])

  return null
}
