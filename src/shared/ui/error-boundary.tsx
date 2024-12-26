import React from 'react'

import { useErrorBoundary } from '../hooks/use-error-boundary'

type Props = {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const ErrorBoundary = ({ children, fallback }: Props) => {
  const { hasError, error } = useErrorBoundary()

  if (hasError) {
    return fallback ? fallback : <h1>{error?.message}</h1>
  }

  return children
}
