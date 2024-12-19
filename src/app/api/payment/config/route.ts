import { NextResponse } from 'next/server'
import { ENV_KEYS } from '@/shared/constants/env'

export const GET = () => {
  return NextResponse.json({
    publishableKey: ENV_KEYS.STRIPE_PUBLISHABLE_KEY,
  })
}
