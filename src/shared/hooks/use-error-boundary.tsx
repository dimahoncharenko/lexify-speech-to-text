import { useContext } from 'react'

import { ErrorBoundaryContext } from '../lib/error-boundary-context'

export const useErrorBoundary = () => useContext(ErrorBoundaryContext)
