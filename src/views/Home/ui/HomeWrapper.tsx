'use client'

import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { ErrorLogger } from '@/shared/ui/error-logger'

import { HomeView } from '.'

export const HomeWrapper = () => {
  return (
    <ErrorBoundary fallback={null}>
      <ErrorLogger />
      <HomeView />
    </ErrorBoundary>
  )
}
