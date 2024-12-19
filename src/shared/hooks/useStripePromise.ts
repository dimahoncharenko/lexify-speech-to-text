'use client'

import { useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

export const useStripePromise = () => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    fetch('/api/payment/config').then(async r => {
      const { publishableKey } = await r.json()
      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  return stripePromise
}
