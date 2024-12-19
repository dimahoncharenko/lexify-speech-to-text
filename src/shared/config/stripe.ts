import Stripe from 'stripe'

import { ENV_KEYS } from '../constants/env'

export const stripeClient = new Stripe(`${ENV_KEYS.STRIPE_KEY}`, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})
