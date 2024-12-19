'use client'

import { createContext } from 'react'
import { Stripe } from '@stripe/stripe-js'

import { useStripePromise } from '../hooks/useStripePromise'

type Context = {
  stripePromise: Promise<Stripe | null> | null
}

export const StripeContext = createContext({} as Context)

type StripeProviderProps = {
  children: React.ReactNode
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const stripePromise = useStripePromise()

  return (
    <StripeContext.Provider value={{ stripePromise }}>
      {children}
    </StripeContext.Provider>
  )
}
