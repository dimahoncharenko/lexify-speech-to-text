'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

type ErrorBoundaryContext = {
  hasError: boolean
  error: Error | null
  setError: Dispatch<SetStateAction<Error | null>>
  setHasError: Dispatch<SetStateAction<boolean>>
}

export const ErrorBoundaryContext = createContext({} as ErrorBoundaryContext)

type ErrorBoundaryProviderProps = {
  children: React.ReactNode
}

export const ErrorBoundaryProvider = ({
  children,
}: ErrorBoundaryProviderProps) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  return (
    <ErrorBoundaryContext.Provider
      value={{
        hasError,
        error,
        setError,
        setHasError,
      }}
    >
      {children}
    </ErrorBoundaryContext.Provider>
  )
}
